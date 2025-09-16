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
}

loadDressUp = async (dressup) => {
    state.isLoading = await dressup.start();
    switchSection(TITLE);
}

// This is where the magic happens

class DressUp {
    constructor(layers, display, options) {
        this.layers = layers;
        this.display = display;
        this.options = options;
        this.images = {};
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

    createCanvases() {}

    createOptions() {}

    async start() {
        this.preloadImages();
        this.createCanvases();
        this.createOptions();

        return false;
    }
}
