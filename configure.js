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
    "Necklaces",
    "Accessories",
    "Background"
]

let layers = {
    background: {
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
    tail: {
        permanent: false,
        label: "Tail",
        images: [
            "null.png",
            "tails/tail_01.png",
            "tails/tail_02.png",
            "tails/tail_03.png"
        ]
    },
    hair_bottom: {
        permanent: false,
        images: [
            "null.png",
            "hairs/hair_01_back.png",
            "hairs/hair_02_back.png",
            "hairs/hair_03_back.png"
        ]
    },
    body: {
        permanent: true,
        images: [
            "permanents/body.png"
        ]
    },
    accessories: {
        permanent: false,
        label: "Accessories",
        images: [
            "null.png",
            "accessories/acc_01.png",
            "accessories/acc_02.png"
        ]
    },
    necklaces: {
        permanent: false,
        label: "Necklaces",
        images: [
            "null.png",
            "necklaces/necklace_01.png",
            "necklaces/necklace_02.png",
            "necklaces/necklace_03.png"
        ]
    },
    hair_top: {
        permanent: false,
        label: "Hair",
        linked: [
            "hair_bottom"
        ],
        images: [
            "null.png",
            "hairs/hair_01_front.png",
            "hairs/hair_02_front.png",
            "hairs/hair_03_front.png"
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
