// -- Lil'Dress Up -- //
///// Game Logic //////

const LOADING = 0;
const TITLE = 1;
const GAME = 2;
const FINISH = 3;

// The index of these sections need to corelate to the above values.
let sections = [
    document.getElementById("loading"),
    document.getElementById("title"),
    document.getElementById("game"),
    document.getElementById("finish")
]

state = {
    section: LOADING,
    isLoading: true
}

switchSection = (section) => {
    sections.forEach((item, i) => {
        item.classList.add("hidden");
    });
    sections[section].classList.remove("hidden");
    state.section = section;
}

loadDressUp = async (dressup) => {
    state.isLoading = await dressup.start();
    switchSection(TITLE);
}

// Event Listeners

document.getElementById("start_b").addEventListener("click", function() {
    switchSection(2);
});

document.getElementById("finish_b").addEventListener("click", function() {
    switchSection(3);
});

document.getElementById("back_b").addEventListener("click", function() {
    switchSection(2);
});

document.getElementById("download_b").addEventListener("click", function() {
    // TODO: download final canvas
});

// This is where the magic happens

class DressUp {
    constructor(layers, size, display, options) {
        this.layers = layers;
        this.size = size;
        this.display = display;
        this.options = options;
        this.images = {};
        this.canvases = {};
        this.current = [];
    }

    preloadImages() {
        for (const i in this.layers) {
            this.layers[i].images.forEach((item, j) => {
                if (!Array.isArray(this.images[i])) {
                    this.images[i] = [];
                }
                this.images[i].push(new Image);
                this.images[i][j].src = "./images/" + item;
            });
        }
    }

    createCanvases() {
        this.display.setAttribute("style", `width: ${this.size.width}px; height: ${this.size.height}px;`)
        let index = 0;
        for (const i in this.layers) {
            if (this.layers[i].permanent) {
                if (this.layers[i].images.length == 1) {
                    let div = document.createElement("div");
                    div.setAttribute(
                        "style", `background-image: url("${this.images[i][0].src}"); z-index: ${index}; top: -${this.size.height*index}px; width: ${this.size.width}px; height: ${this.size.height}px;`
                    );
                    this.display.append(div);
                } else {
                    let canvas = document.createElement("canvas");
                    canvas.innerHTML = "Your browser does not support HTML5 Canvas.";
                    canvas.setAttribute("width", this.size.width);
                    canvas.setAttribute("height", this.size.height);
                    canvas.setAttribute("style", `z-index: ${index}; top: -${this.size.height*index}px;`);
                    let ctx = canvas.getContext("2d");

                    this.images[i].forEach((img, j) => {
                        ctx.drawImage(img, 0, 0, this.size.width, this.size.height);
                    });

                    this.display.append(canvas);
                }
            } else {
                let canvas = document.createElement("canvas");
                canvas.innerHTML = "Your browser does not support HTML5 Canvas.";
                canvas.setAttribute("width", this.size.width);
                canvas.setAttribute("height", this.size.height);
                canvas.setAttribute("style", `z-index: ${index}; top: -${this.size.height*index}px;`);
                let ctx = canvas.getContext("2d");
                ctx.drawImage(this.images[i][0], 0, 0, this.size.width, this.size.height);

                this.display.append(canvas);
                this.canvases[i] = canvas;
            }
            index++;
        }
    }

    createOptions() {}

    async start() {
        this.preloadImages();
        this.createCanvases();
        this.createOptions();

        return false;
    }
}
