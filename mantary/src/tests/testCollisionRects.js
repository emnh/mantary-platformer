export function testCollisionRects(f) {

    const {
        checkCollisionRects: oldCheck, describe, it, expect
    } = f;

    describe("Checking rectange collisions", () => {
        const checkCollisionRects = function(rect1, rect2) {
            const result = oldCheck(rect1, rect2);
    
            const div = f.createElement("div");
            f.contextAppendChild(div);
            div.style.display = "block";
            div.style.position = "relative";
    
            const div1 = f.createElement("div");
            div1.style.width = (rect1.right - rect1.left) + "px";
            div1.style.height = (rect1.bottom - rect1.top) + "px";
            div1.style.backgroundColor = "red";
            div1.style.position = "absolute";
            div1.style.left = rect1.left + "px";
            div1.style.top = rect1.top + "px";
            div.appendChild(div1);
    
            const div2 = f.createElement("div");
            div2.style.width = (rect2.right - rect2.left) + "px";
            div2.style.height = (rect2.bottom - rect2.top) + "px";
            div2.style.backgroundColor = "blue";
            div2.style.position = "absolute";
            div2.style.left = rect2.left + "px";
            div2.style.top = rect2.top + "px";
            div.appendChild(div2);
            
            return result;
        };

        const rect1 = { left: 0, top: 0, right: 100, bottom: 100 };
        const rect2 = { left: 50, top: 50, right: 150, bottom: 150 };
        const rect3 = { left: 200, top: 200, right: 300, bottom: 300 };

        it("should return true when two rectangles overlap", () => {
            expect(checkCollisionRects(rect1, rect2)).toBe(true);
        });

        it("should return false when two rectangles don't overlap", () => {
            expect(checkCollisionRects(rect1, rect3)).toBe(false);
        });

        it("should return true when two rectangles share an edge", () => {
            const rect4 = { left: 100, top: 0, right: 200, bottom: 100 };
            expect(checkCollisionRects(rect1, rect4)).toBe(true);
        });

        it("should return true when two rectangles share a corner", () => {
            const rect5 = { left: 100, top: 100, right: 150, bottom: 150 };
            expect(checkCollisionRects(rect1, rect5)).toBe(true);
        });

        it("should return true when one rectangle is completely inside the other", () => {
            const rect6 = { left: 25, top: 25, right: 75, bottom: 75 };
            expect(checkCollisionRects(rect1, rect6)).toBe(true);
        });
    });
};