// -- Lil'Dress Up -- //
/**
 * @module Lil'DressUp
 * @description The basic functionalities of Lil'DressUp.
 * @author RodFireProductions <howdy@deadinsideartist.art>
 * @license WTFPL-2.0
 */

/**
 * Dress Up option with its related data.
 * @typedef   {Object} Option
 * @property  {string} label - The name of the option.
 * @property  {HTMLFieldSetElement} html - The associated fieldset.
 * @property  {HTMLButtonElement} previous - The associated previous button.
 * @property  {HTMLButtonElement} next - The associated next button.
 * @property  {string[]} layers - The associated layer names.
 */

/**
 * Layer data.
 * @typedef   {Object} Layer
 * @property  {string} name - Name of the layer
 * @property  {boolean} permanent - Whether the layer is unchangeable.
 * @property  {string} [label] - The label used for option generation. Only IF NOT a linked layer or permanent.
 * @property  {string[]} [linked] - Links other layers (use {@link Layer.name}) to this layer.
 * @property  {string[]} images - Array of image file locations relative to {@link DressUp#image_location}.
 */

/**
 * Class representing a dress up game.
 */
class DressUp {
    /**
     * Creates DressUP class.
     * @param  {Layer[]} layers - All layer data, i.e. names, labels, images, optionality.
     * @param  {Object} size - The display sizes for the canvases.
     * @param  {number} size.width - Width of canvas in pixels.
     * @param  {number} size.height - Height of canvas in pixels.
     * @param  {HTMLElement} display - The div for injecting the layer elements.
     * @param  {HTMLElement} options - The form for injecting the option elements.
     * @param  {HTMLAnchorElement} download - The anchor for downloading final canvas.
     * @param  {Object} final - The final canvas and button.
     * @param  {HTMLCanvasElement} final.canvas - The final canvas.
     * @param  {HTMLButtonElement} final.button - The final button.
     * @param  {string[]} order - The order of options presented.
     * @param  {string} image_location - Location of the parent image folder of all images.
     */
    constructor(layers, size, display, options, download, final, order, image_location) {
        this.layers = layers;
        this.size = size;
        this.display = display;
        this.options = options;
        this.download = download;
        this.final = final;
        this.order = order;
        this.image_location = image_location;

        /**
         * Object containing all images sorted by layer name.
         * @type  {Object}
         */
        this.images = {};

        /**
         * Object containing all rewritable canvases.
         * @type  {Object}
         */
        this.canvases = {};

        /**
         * Object containing all non-permanent layers' current image index.
         * @type  {Object}
         */
        this.current = {};
    }

    /**
     * Loads images from {@link DressUp#layers} to {@link DressUp#images}.
     */
    preloadImages() {
        this.layers.forEach((layer, i) => {
            layer.images.forEach((item, j) => {
                if (!Array.isArray(this.images[layer.name])) {
                    this.images[layer.name] = [];
                }
                this.images[layer.name].push(new Image());
                this.images[layer.name][j].src = this.image_location + item;
            });
        });
    }

    /**
     * Creates canvases (and divs) for each layers.
     */
    createCanvases() {
        this.display.setAttribute("style", `width: ${this.size.width}px; height: ${this.size.height}px;`);
        let index = 0;
        this.layers.forEach((layer, i) => {
            if (layer.permanent) {
                if (layer.images.length == 1) {
                    let div = document.createElement("div");
                    div.setAttribute(
                        "style",
                        `background-image: url("${this.images[layer.name][0].src}"); z-index: ${index}; top: -${this.size.height * index}px; width: ${
                            this.size.width
                        }px; height: ${this.size.height}px;`
                    );
                    this.display.append(div);
                } else {
                    let canvas = document.createElement("canvas");
                    canvas.innerHTML = "Your browser does not support HTML5 Canvas.";
                    canvas.setAttribute("width", this.size.width);
                    canvas.setAttribute("height", this.size.height);
                    canvas.setAttribute("style", `z-index: ${index}; top: -${this.size.height * index}px;`);
                    let ctx = canvas.getContext("2d");

                    this.images[layer.name].forEach((img, j) => {
                        ctx.drawImage(img, 0, 0, this.size.width, this.size.height);
                    });

                    this.display.append(canvas);
                }
            } else {
                let canvas = document.createElement("canvas");
                canvas.innerHTML = "Your browser does not support HTML5 Canvas.";
                canvas.setAttribute("width", this.size.width);
                canvas.setAttribute("height", this.size.height);
                canvas.setAttribute("style", `z-index: ${index}; top: -${this.size.height * index}px;`);
                let ctx = canvas.getContext("2d");
                ctx.drawImage(this.images[layer.name][0], 0, 0, this.size.width, this.size.height);

                this.display.append(canvas);
                this.canvases[layer.name] = ctx;
                this.current[layer.name] = 0;
            }
            index++;
        });
    }

    /**
     * Iterates the {@link DressUp#images} index of the specified option layer(s). Also updates {@link DressUp#current}.
     * @param  {Option} option - The target option.
     * @param  {string} which - Strings "previous" OR "next".
     */
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
                    if (this.current[layer] != this.images[layer].length - 1) {
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

    /**
     * Creates click EventListeners for the specified option's buttons. The EventListeners call the {@link DressUp#iterateOptions} method.
     * @param  {Option} option - The target option.
     */
    createListeners(option) {
        let self = this;
        option.previous.addEventListener("click", function () {
            self.iterateOptions(option, "previous");
        });
        option.next.addEventListener("click", function () {
            self.iterateOptions(option, "next");
        });
    }

    /**
     * Creates fieldsets for each non-permanent layer.
     */
    createOptions() {
        let options = [];
        for (const i in this.canvases) {
            let layer = this.layers.find((l) => l.name === i);
            if (layer.label) {
                let field = document.createElement("fieldset");
                let label = document.createElement("legend");
                label.innerHTML = layer.label;
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
                if (layer.linked) {
                    layer.linked.forEach((linked, j) => {
                        layers.push(linked);
                    });
                }

                /**
                 * @type {Option}
                 */
                let option = {
                    label: layer.label,
                    html: field,
                    previous: p_button,
                    next: n_button,
                    layers: layers
                };

                options.push(option);
                this.createListeners(option);
            }
        }

        this.order.forEach((label, i) => {
            let option = options.filter((obj) => {
                return obj.label === label;
            });

            this.options.append(option[0].html);
        });
    }

    /**
     * Injects png url of {@link DressUp#final} to {@link DressUp#download}.
     * @param  {DressUp} self - Reference to parent DressUp object.
     */
    downloadImage(self) {
        let img = self.final.canvas.toDataURL("image/png");
        self.download.setAttribute("download", "lil_dressup.png");
        self.download.setAttribute("href", img);
    }

    /**
     * Layers the {@link DressUp#images} based on {@link DressUp#current} onto the {@link DressUp#final} canvas.
     * @param  {DressUp} self - Reference to parent DressUp object.
     */
    finalize(self) {
        self.final.canvas.setAttribute("width", this.size.width);
        self.final.canvas.setAttribute("height", this.size.height);
        let ctx = self.final.canvas.getContext("2d");

        self.layers.forEach((layer, i) => {
            if (self.current.hasOwnProperty(layer.name)) {
                ctx.drawImage(self.images[layer.name][self.current[layer.name]], 0, 0, self.size.width, self.size.height);
            } else {
                self.images[layer.name].forEach((img, i) => {
                    ctx.drawImage(img, 0, 0, self.size.width, self.size.height);
                });
            }
        });

        self.downloadImage(self);
    }

    /**
     * Calls all set up functions. Aka, starts the game.
     * @async
     * @return {Promise<boolean>} - Whether the game properly loaded.
     */
    async start() {
        let self = this;
        try {
            await this.preloadImages();
            await this.createCanvases();
            await this.createOptions();

            await this.final.button.addEventListener("click", function () {
                self.finalize(self);
            });

            return true; // It worked :)
        } catch (e) {
            console.error(`Lil'DressUp couldn't fully load! ${e}`);
            return false;
        }
    }
}
