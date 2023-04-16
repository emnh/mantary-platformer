export function testCollisionDivs(f) {
    const { describe, it, expect } = f;

    describe("Checking collision divs", function() {
        const div = f.createElement("div");
        f.contextAppendChild(div);
        div.style.display = "block";

        const div1 = f.createElement("div");
        div1.style.width = "100px";
        div1.style.height = "100px";
        div1.style.backgroundColor = "red";
        div1.style.position = "absolute";
        div1.style.left = "50px";
        div1.style.top = "50px";
        div.appendChild(div1);

        const div2 = f.createElement("div");
        div2.style.width = "100px";
        div2.style.height = "100px";
        div2.style.backgroundColor = "blue";
        div2.style.position = "absolute";
        div2.style.left = "80px";
        div2.style.top = "80px";
        div.appendChild(div2);

        it("should return true when they overlap", () => {
            expect(f.checkCollisionDivs(div1, div2, f)).toBe(true)
        });
    });
};