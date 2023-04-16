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
function extractFunctionSignatures(ast) {
  const signatures = [];

  walk.simple(ast, {
    FunctionDeclaration(node) {
      signatures.push(`function ${node.id.name}(${node.params.map(p => p.name).join(', ')})`);
    },
    ArrowFunctionExpression(node) {
      signatures.push(`(${node.params.map(p => p.name).join(', ')}) =>`);
    },
    FunctionExpression(node) {
      if (node.id) {
        signatures.push(`function ${node.id.name}(${node.params.map(p => p.name).join(', ')})`);
      } else {
        signatures.push(`(${node.params.map(p => p.name).join(', ')}) =>`);
      }
    }
  });

  return signatures;
}

// define the function to recursively enumerate all .js files in the directory and its subdirectories
function enumerateJSFiles(directory) {
  fs.readdir(directory, (err, files) => {
    if (err) {
      console.error(err);
    } else {
      files.forEach(file => {
        const fullPath = path.join(directory, file);
        // console.log("Path:", fullPath);

        fs.stat(fullPath, (err, stats) => {
          if (err) {
            console.error(err);
          } else {
            if (stats.isDirectory()) {
              enumerateJSFiles(fullPath);
            } else if (path.extname(fullPath) === '.js') {
              fs.readFile(fullPath, 'utf8', (err, data) => {
                if (err) {
                  console.error(err);
                } else {
                  const ast = acorn.parse(data, acornOptions);
                  const signatures = extractFunctionSignatures(ast);
                  console.log(`Functions in ${fullPath}:`);
                  console.log(signatures.join('\n'));
                }
              });
            }
          }
        });
      });
    }
  });
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
          enumerateJSFiles(directoryToWatch);
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
          enumerateJSFiles(directoryToWatch);
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
