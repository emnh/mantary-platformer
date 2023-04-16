export function testCollisionRects({ functions: {
    checkCollisionRects, describe, it, expect
} }) {
    describe("checkCollisionRects", () => {
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
            const rect4 = { left: 100, top: 100, right: 200, bottom: 200 };
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