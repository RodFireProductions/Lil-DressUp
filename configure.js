// -- Lil'Dress Up -- //
//// Configuration ////

let dressup_display = document.getElementById("canvases");
let dressup_options = document.getElementById("options");

let layers = {
    watermark: {
        permanet: true,
        images: [
            "permanents/watermark.png"
        ]
    },
    hair_top: {
        permanet: false,
        label: "Hair",
        linked: [
            "hair_bottom"
        ],
        images: [
            "hairs/hair_01_front.png"
        ]
    },
    body: {
        permanet: true,
        images: [
            "permanents/body.png"
        ]
    },
    hair_bottom: {
        permanet: false,
        images: [
            "hairs/hair_01_back.png"
        ]
    },
    tail: {
        permanent: false,
        label: "Tail",
        images: [
            "tails/tail_01.png"
        ]
    },
    background: {
        permanent: false,
        images: [
            "backgrounds/bg_01.png",
            "backgrounds/bg_02.png"
        ]
    }
}

let the_game = new DressUp(layers, dressup_display, dressup_options);

loadDressUp(the_game);
