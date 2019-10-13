export class Point {
    private x: number;
    private y: number;

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    get X() {
        return this.x;
    }

    get Y() {
        return this.y;
    }
}
