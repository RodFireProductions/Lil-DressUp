// -- Lil'Dress Up -- //
//// Configuration ////

let dressup_display = document.getElementById("canvases");
let dressup_options = document.getElementById("options");
let dressup_download = document.getElementById("download_b");
let dressup_final = {
    canvas: document.getElementById("final_dress"),
    button: document.getElementById("finish_b")
};
let dressup_size = {
    width: "500",
    height: "500"
}

let options_order = [
    "Hair",
    "Tail",
    "Background"
]

let layers = {
    background: {
        permanent: false,
        label: "Background",
        images: [
            "backgrounds/bg_01.png",
            "backgrounds/bg_02.png"
        ]
    },
    tail: {
        permanent: false,
        label: "Tail",
        images: [
            "tails/tail_01.png"
        ]
    },
    hair_bottom: {
        permanent: false,
        images: [
            "hairs/hair_01_back.png"
        ]
    },
    body: {
        permanent: true,
        images: [
            "permanents/body.png"
        ]
    },
    hair_top: {
        permanent: false,
        label: "Hair",
        linked: [
            "hair_bottom"
        ],
        images: [
            "hairs/hair_01_front.png"
        ]
    },
    watermark: {
        permanent: true,
        images: [
            "permanents/watermark.png"
        ]
    },
}

let the_game = new DressUp(layers, dressup_size, dressup_display, dressup_options, dressup_download, dressup_final, options_order);

loadDressUp(the_game);
