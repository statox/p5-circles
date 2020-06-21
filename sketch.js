let circles;
let imgColors;
let img;
let imgIndex;
const MAX_INITIAL_SIZE = 5;
const NEW_CIRCLES_BY_ITERATION = 100;
const NEW_CIRCLES_ATTEMPTS = 500;

const IMAGES = [
    'data/kitten1.png',
    'data/kitten2.webp',
    'data/kitten4.jpg',
    'data/kitten5.jpg',
    'data/kitten6.webp',
    'data/kitten7.jpg',
    'data/kitten9.jpg',
    'data/kitten.jpg',
    'data/kittens3.jpg'
];

function reset() {
    noLoop();

    imgIndex++;
    if (imgIndex >= IMAGES.length) {
        imgIndex = 0;
    }
    const path = IMAGES[imgIndex];

    img = loadImage(path, (img) => {
        pixelDensity(1);
        circles = [];
        imgColors = [];

        img.loadPixels();
        let d = img.pixels.length;
        for (let i = 0; i < d; i+=4) {
            r = img.pixels[i];
            g = img.pixels[i+1];
            b = img.pixels[i+2];
            a = img.pixels[i+3];

            imgColors.push(color(r, g, b, a))
        }
        loop();
    });
}

function setup() {
    createCanvas(1000, 1000);
    imgIndex = 0;

    reset();
}

function draw() {
    background(0);
    frameRate(10);

    image(img, 0, img.height);
    newCircles();

    let circlesArea = 0;
    circles.forEach(circle => {
        circle.show();

        circlesArea += int(circle.r * circle.r * PI);

        const intersectionIndex = circles.findIndex(other => {
            if (other.x === circle.x && other.y === circle.y) {
                return false;
            }

            if (dist(circle.x, circle.y, other.x, other.y) < circle.r + other.r) {
                return true;
            }

            return false;
        });
        const hasIntersection = intersectionIndex > -1;

        if (!circle.reachedEdges() && !hasIntersection) {
            circle.grow();
        }
    });

    let totalArea = img.width * img.height;
    let coveredPercentage = circlesArea * 100 / totalArea;
    if (coveredPercentage > 60) {
        console.log('finished');
        reset();
    } else {
        console.log(circles.length, circlesArea, totalArea, coveredPercentage);
    }
}

function newCircle() {
    let x = random(img.width);
    let y = random(img.height);
    let r = random(MAX_INITIAL_SIZE);

    const intersection = circles.findIndex(other => {
        if (dist(x, y, other.x, other.y) < other.r + r) {
            return true;
        }
        return false;
    });

    if (intersection !== -1) {
        return;
    }

    let color = imgColors[int(x) + int(y) * img.width];
    return new Circle(x, y, r, color);
}

function newCircles() {
    let totalNewCircles = NEW_CIRCLES_BY_ITERATION;
    let remainingAttemps = NEW_CIRCLES_ATTEMPTS;
    let countNewCircles = 0;

    while (countNewCircles < totalNewCircles && remainingAttemps > 0) {
        remainingAttemps--;

        const newC = newCircle();
        if (newC !== undefined) {
            circles.push(newC);
            countNewCircles++;
        }
    }
}
