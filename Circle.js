function Circle(x, y, r, c) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.c = c;
    this.growing = true;
    this.shrinking = false;

    this.grow = function() {
        if (this.growing) {
            this.r = this.r + 0.5;
        }

        if (this.shrinking) {
            this.r = this.r - 0.5;
        }
    }

    this.reachedEdges = function() {
        if (
            this.x+this.r >= img.width || this.x-this.r <= 0
            || this.y+this.r >= img.height || this.y-this.r <= 0
        ) {
            return true;
        }
        return false;
    };

    this.show = function() {
        try {
            stroke(this.c);
            fill(this.c);
        } catch (e) {
            stroke(255);
            fill(255);
        }
        // noFill();
        ellipse(this.x, this.y, this.r*2, this.r*2);
    };

    this.toggleGrowth = function() {
        this.growing = !this.growing;
        this.shrinking = !this.shrinking;
    }
}
