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
    state.isLoading = await dressup.start() ? false : true;
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
