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

// This is where the magic happens

class DressUp {
    constructor(layers, size, display, options, download, final, order) {
        this.layers = layers;
        this.size = size;
        this.display = display;
        this.options = options;
        this.download = download;
        this.final = final;
        this.order = order;
        this.images = {};
        this.canvases = {};
        this.current = {};
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
                this.canvases[i] = ctx;
                this.current[i] = 0;
            }
            index++;
        }
    }

    iterateOptions(option, which) {
        switch (which) {
            case "previous":
                option.layers.forEach((layer, i) => {
                    if (this.current[layer] != 0) {
                        this.current[layer]--;
                    } else {
                        this.current[layer] = this.images[layer].length - 1;
                    }
                    this.canvases[layer].clearRect(0, 0, this.size.width, this.size.height);
                    this.canvases[layer].drawImage(this.images[layer][this.current[layer]], 0, 0, this.size.width, this.size.height);
                });
                break;
            case "next":
                option.layers.forEach((layer, i) => {
                    if (this.current[layer] != (this.images[layer].length - 1)) {
                        this.current[layer]++;
                    } else {
                        this.current[layer] = 0;
                    }
                    this.canvases[layer].clearRect(0, 0, this.size.width, this.size.height);
                    this.canvases[layer].drawImage(this.images[layer][this.current[layer]], 0, 0, this.size.width, this.size.height);
                });
                break;
            default:
                console.error("Something is wrong with iteration!");
        }
    }

    createListeners(option) {
        let self = this;
        option.previous.addEventListener("click", function() {
            self.iterateOptions(option, "previous");
        });
        option.next.addEventListener("click", function() {
            self.iterateOptions(option, "next");
        });
    }

    createOptions() {
        let options = [];
        for (const i in this.canvases) {
            if (this.layers[i].label) {
                let field = document.createElement("fieldset");
                let label = document.createElement("legend");
                label.innerHTML = this.layers[i].label;
                field.append(label);

                // buttons
                let p_button = document.createElement("button");
                let n_button = document.createElement("button");
                p_button.innerHTML = "&#129032;";
                n_button.innerHTML = "&#129034;";
                p_button.setAttribute("type", "button");
                n_button.setAttribute("type", "button");
                p_button.setAttribute("name", "previous");
                n_button.setAttribute("name", "next");

                field.append(p_button);
                field.append(n_button);

                // layers
                let layers = [];
                layers.push(i);
                if (this.layers[i].linked) {
                    this.layers[i].linked.forEach((linked, j) => {
                        layers.push(linked);
                    });
                }

                //
                let option = {
                    label: this.layers[i].label,
                    html: field,
                    previous: p_button,
                    next: n_button,
                    layers: layers
                }
                options.push(option);
                this.createListeners(option);
            }
        }

        this.order.forEach((label, i) => {
            let option = options.filter(obj => {
                return obj.label === label;
            });

            this.options.append(option[0].html);
        });
    }

    downloadImage(self) {
        let img = self.final.canvas.toDataURL("image/png");
        self.download.setAttribute("download", "lil_dressup.png");
        self.download.setAttribute("href", img);
    }

    finalize(self) {
        self.final.canvas.setAttribute("width", this.size.width);
        self.final.canvas.setAttribute("height", this.size.height);
        let ctx = self.final.canvas.getContext("2d");

        for (const layer in self.layers) {
            if (self.current.hasOwnProperty(layer)) {
                ctx.drawImage(self.images[layer][self.current[layer]], 0, 0, self.size.width, self.size.height);
            } else {
                self.images[layer].forEach((img, i) => {
                    ctx.drawImage(img, 0, 0, self.size.width, self.size.height);
                });
            }
        }

        self.downloadImage(self);
    }

    async start() {
        this.preloadImages();
        this.createCanvases();
        this.createOptions();

        let self = this;
        this.final.button.addEventListener("click", function(){
            self.finalize(self);
        });

        return false;
    }
}
