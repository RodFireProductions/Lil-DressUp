// -- Lil'Dress Up -- //
//// Configuration ////

/** The div for your canvases. */
let dressup_display = document.getElementById("canvases");
/** The form for your options. */
let dressup_options = document.getElementById("options");
/** The anchor that will download the final image. */
let dressup_download = document.getElementById("download_b");
/**
 * @property {HTMLCanvasElement} canvas - The canvas that displays the final image.
 * @property {HTMLButtonElement} button - The button that calls DressUp.finalize().
 */
let dressup_final = {
    canvas: document.getElementById("final_dress"),
    button: document.getElementById("finish_b")
};
/**
 * @property {number} width - Width of canvas in pixels.
 * @property {number} height - Height of canvas in pixels.
 */
let dressup_size = {
    width: 500,
    height: 500
};

/**
 * The diplay order of options.
 * These should exactly match the label of the corresponding layer.
 */
let options_order = ["Hair", "Tail", "Necklaces", "Accessories", "Background"];

/** Location of image folder. */
let dressup_location = "./images/";

/**
 * The bulk of the game's information.
 * This defines the different layers and their attributes.
 * The order here MATTERS! It's back to front!
 * @type {Layer[]} */
let layers = [
    {
        name: "background",
        permanent: false,
        label: "Background",
        images: [
            "null.png",
            "backgrounds/bg_01.png",
            "backgrounds/bg_02.png",
            "backgrounds/bg_03.png",
            "backgrounds/bg_04.png",
            "backgrounds/bg_05.png",
            "backgrounds/bg_06.png"
        ]
    },
    {
        name: "tail",
        permanent: false,
        label: "Tail",
        images: ["null.png", "tails/tail_01.png", "tails/tail_02.png", "tails/tail_03.png"]
    },
    {
        name: "hair_bottom",
        permanent: false,
        // This layer is being linked to hair_top, therefore it shouldn't have a label.
        images: ["null.png", "hairs/hair_01_back.png", "hairs/hair_02_back.png", "hairs/hair_03_back.png"]
    },
    {
        name: "body",
        permanent: true,
        images: ["permanents/body.png"]
    },
    {
        name: "accessories",
        permanent: false,
        label: "Accessories",
        images: ["null.png", "accessories/acc_01.png", "accessories/acc_02.png"]
    },
    {
        name: "necklaces",
        permanent: false,
        label: "Necklaces",
        images: ["null.png", "necklaces/necklace_01.png", "necklaces/necklace_02.png", "necklaces/necklace_03.png"]
    },
    {
        name: "hair_top",
        permanent: false,
        label: "Hair",
        linked: ["hair_bottom"],
        images: ["null.png", "hairs/hair_01_front.png", "hairs/hair_02_front.png", "hairs/hair_03_front.png"]
    },
    {
        name: "watermark",
        permanent: true,
        images: ["permanents/watermark.png"]
    }
];

/** The game :) */
let the_game = new DressUp(layers, dressup_size, dressup_display, dressup_options, dressup_download, dressup_final, options_order, dressup_location);

loadDressUp(the_game);
