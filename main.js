// -- Lil'Dress Up -- //
///// Game Logic //////

const LOADING = 0;
const TITLE = 1;
const GAME = 2;
const FINISH = 3;

/**
 * The different game screens.
 * The index of these sections need to corelate to the above values.
 * @type {HTMLElement[]}
 */
let sections = [
    document.getElementById("loading"),
    document.getElementById("title"),
    document.getElementById("game"),
    document.getElementById("finish")
];

/**
 * The game's state
 * @property {number} section - Index value of {@link sections}.
 * @property {boolean} isLoading - Opposite return value of {@link DressUp#start}.
 */
let state = {
    section: LOADING,
    isLoading: true
};

/**
 * Function that switches between game screens.
 * @param {number} section - Corresponding index of {@link sections} for the target section.
 */
let switchSection = (section) => {
    sections.forEach((item, i) => {
        item.classList.add("hidden");
    });
    sections[section].classList.remove("hidden");
    state.section = section;
};

/**
 * Function for loading in the target {@link DressUp} object.
 * @param {DressUp} dressup - The target game.
 */
let loadDressUp = async (dressup) => {
    state.isLoading = (await dressup.start()) ? false : true;
    switchSection(TITLE);
};

// Event listeners for switching between game screens.

document.getElementById("start_b").addEventListener("click", function () {
    switchSection(2);
});

document.getElementById("finish_b").addEventListener("click", function () {
    switchSection(3);
});

document.getElementById("back_b").addEventListener("click", function () {
    switchSection(2);
});
