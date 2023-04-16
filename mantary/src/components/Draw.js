export function Draw(docInterface, player) {

    let playerDiv = null;

    function setupDraw() {
        const div = docInterface.createElement("div");
        div.id = "player";
        div.style.position = "absolute";
        div.style.width = "100px";
        div.style.height = "100px";
        div.style.backgroundColor = "green";
        playerDiv = div;
        docInterface.bodyAppendChild(div);
    }

    function updateDraw() {
        playerDiv.style.left = player.getScreenX() + "px";
        playerDiv.style.top = player.getScreenY() + "px";
    }

    function start() {
        setupDraw();
        player.registerRaf("updateDraw", updateDraw);
    }

    function stop() {
        player.unregisterRaf(draw);
    }

    return { start, stop };
}