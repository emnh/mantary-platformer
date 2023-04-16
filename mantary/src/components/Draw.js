export function Draw(docInterface, player) {

    let playerDiv = null;

    function setupDraw() {
        const div = docInterface.createElement("div");
        div.width = "100px";
        div.height = "100px";
        div.style.backgroundColor = "green";
        playerDiv = div;
        docInterface.bodyAppendChild(div);
    }

    function draw() {
        playerDiv.style.left = player.getScreenX() + "px";
        playerDiv.style.top = player.getScreenY() + "px";
    }

    function start() {
        setupDraw();
        player.registerRaf(draw);
    }

    function stop() {
        player.unregisterRaf(draw);
    }

    return { start, stop };
}