const fs = require('fs');
const path = require('path');
const chokidar = require('chokidar');
const acorn = require('acorn');
const walk = require('acorn-walk');

const directoryToWatch = './src'; // replace with the directory you want to watch

// define the options to pass to Acorn for parsing the JavaScript files
const acornOptions = {
  ecmaVersion: 2022,
  sourceType: 'module',
  locations: true,
  allowReturnOutsideFunction: true,
  allowAwaitOutsideFunction: true
};

// define a function to extract function signatures from the parsed AST
function extractFunctionSignatures(fullPath, ast) {
  const signatures = [];

  walk.simple(ast, {
    FunctionDeclaration(node) {
      signatures.push(`${fullPath}: function ${node.id.name}(${node.params.map(p => p.name).join(', ')})`);
    },
    ArrowFunctionExpression(node) {
      signatures.push(`${fullPath}: (${node.params.map(p => p.name).join(', ')}) =>`);
    },
    FunctionExpression(node) {
      if (node.id) {
        signatures.push(`${fullPath}: function ${node.id.name}(${node.params.map(p => p.name).join(', ')})`);
      } else {
        signatures.push(`${fullPath}: (${node.params.map(p => p.name).join(', ')}) =>`);
      }
    }
  });

  return signatures;
}

function extractFunctionImports(fullPath, ast) {
  const imports = [];

  walk.simple(ast, {
    FunctionDeclaration(node) {
      imports.push(`import { ${node.id.name} } from '${fullPath}';`);
    },
    ArrowFunctionExpression(node) {
      imports.push(`const func = (${node.params.map(p => p.name).join(', ')}) =>`);
    },
    FunctionExpression(node) {
      if (node.id) {
        imports.push(`import { ${node.id.name} } from '${fullPath}';`);
      } else {
        imports.push(`const func = (${node.params.map(p => p.name).join(', ')}) =>`);
      }
    }
  });

  return imports;
}

async function enumerateJSFilesHelper(directory) {
  const signatureList = [];
  const importList = [];

  const files = await fs.promises.readdir(directory);
  for (const file of files) {
    const fullPath = path.join(directory, file);
    const stats = await fs.promises.stat(fullPath);

    if (stats.isDirectory()) {
      const [subListSignatures, sublistImports] = await enumerateJSFilesHelper(fullPath);
      signatureList.push(...subListSignatures);
      importList.push(...sublistImports);
    } else if (path.extname(fullPath) === '.js') {
      const data = await fs.promises.readFile(fullPath, 'utf8');
      let ast = null;
      try {
        ast = acorn.parse(data, acornOptions);
      } catch (err) {
        console.error("Error parsing file:", fullPath);
        console.error(err);
        continue;
      }
      const signatures = extractFunctionSignatures(fullPath, ast);
      const imports = extractFunctionImports(fullPath, ast);
      signatureList.push(...signatures);
      importList.push(...imports);
    }
  }
  return [signatureList, importList];
}

async function enumerateJSFiles(directory) {
  console.clear();
  const [signatures, imports] = await enumerateJSFilesHelper(directory);
  signatures.sort();
  imports.sort();
  console.log('/*');
  console.log(signatures.join('\n'));
  console.log('*/');
  console.log("");
  console.log(imports.join('\n'));
  console.log("");
}

function wrapInTryCatch(func) {
  return function () {
    try {
      return func.apply(this, arguments);
    } catch (err) {
      console.error("Error caught in function:", func.name);
      console.error(err);
    }
  }
}

// define the function to watch the directory for file changes
function watchDirectory(directory) {
  const watcher = chokidar.watch(directory, { ignoreInitial: true });

  watcher.on('add', file => {
    if (path.extname(file) === '.js') {
      fs.readFile(file, 'utf8', (err, data) => {
        if (err) {
          console.error(err);
        } else {
          wrapInTryCatch(() => enumerateJSFiles(directory))();
          // const ast = acorn.parse(data, acornOptions);
          // const signatures = extractFunctionSignatures(ast);
          // console.log(`Functions in ${file}:`);
          // console.log(signatures.join('\n'));
        }
      });
    }
  });

  watcher.on('change', file => {
    if (path.extname(file) === '.js') {
      fs.readFile(file, 'utf8', (err, data) => {
        if (err) {
          console.error(err);
        } else {
          wrapInTryCatch(() => enumerateJSFiles(directory))();
          // const ast = acorn.parse(data, acornOptions);
          // const signatures = extractFunctionSignatures(ast);
          // console.log(`Functions in ${file}:`);
          // console.log(signatures.join('\n'));
        }
      });
    }
  });
}

// call the watchDirectory function to start watching the directory
watchDirectory(directoryToWatch);
