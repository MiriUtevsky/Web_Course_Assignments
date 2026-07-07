const animals = document.querySelectorAll(".animal");
const backgroundMusic = document.getElementById("background-music");
const musicToggle = document.getElementById("music-toggle");

const ANIMAL_ACTIVE_TIME = 3000;

let currentAnimalSound = null;
let animalSoundTimer = null;


// Sound files for all animals
const animalSounds = {
    monkey: new Audio("sounds/animals/monkey.mp3"),
    lion: new Audio("sounds/animals/lion.mp3"),
    bird: new Audio("sounds/animals/bird.mp3"),
    owl: new Audio("sounds/animals/owl.mp3"),
    wolf: new Audio("sounds/animals/wolf.mp3"),
    crocodile: new Audio("sounds/animals/crocodile.mp3"),
    frog: new Audio("sounds/animals/frog.mp3"),
    snake: new Audio("sounds/animals/snake.mp3")
};


// Try to play background music when the page loads
window.addEventListener("load", function () {
    backgroundMusic.volume = 0.2;

    backgroundMusic.play().catch(function () {
        console.log("Background music will start after user interaction.");
    });
});


// Activate animal by mouse click
animals.forEach(function (animal) {
    animal.addEventListener("click", function () {
        activateAnimal(animal);
    });
});


// Activate animal by keyboard key
document.addEventListener("keydown", function (event) {
    const pressedKey = event.key.toLowerCase();

    animals.forEach(function (animal) {
        if (animal.dataset.key === pressedKey) {
            activateAnimal(animal);
        }
    });
});


// Run the animal animation and sound
function activateAnimal(animal) {
    const animalName = animal.dataset.animal;
    const image = animal.querySelector("img");

    playAnimalGif(image);
    playAnimalSound(animalName);
    startBackgroundMusic();
}


// Replace the static image with the GIF for 3 seconds
function playAnimalGif(image) {
    const staticSource = image.dataset.static;
    const gifSource = image.dataset.gif;

    // New JavaScript element not learned in class:
    // Date.now() returns the current timestamp.
    // Adding it to the GIF URL forces the browser to reload the GIF
    // so the animation starts again from the beginning.
    image.src = gifSource + "?time=" + Date.now();

    setTimeout(function () {
        image.src = staticSource;
    }, ANIMAL_ACTIVE_TIME);
}


// Play the selected animal sound for exactly 3 seconds
function playAnimalSound(animalName) {
    if (currentAnimalSound !== null) {
        currentAnimalSound.pause();
        currentAnimalSound.currentTime = 0;
        currentAnimalSound.loop = false;
    }

    if (animalSoundTimer !== null) {
        clearTimeout(animalSoundTimer);
    }

    const sound = animalSounds[animalName];

    currentAnimalSound = sound;

    sound.currentTime = 0;
    sound.loop = true;
    sound.play();

    animalSoundTimer = setTimeout(function () {
        sound.pause();
        sound.currentTime = 0;
        sound.loop = false;

        if (currentAnimalSound === sound) {
            currentAnimalSound = null;
        }

        animalSoundTimer = null;
    }, ANIMAL_ACTIVE_TIME);
}


// Start background music if autoplay was blocked
function startBackgroundMusic() {
    if (backgroundMusic.paused) {
        backgroundMusic.play();
    }
}


// Toggle background music mute on/off
musicToggle.addEventListener("click", function () {
    backgroundMusic.muted = !backgroundMusic.muted;

    if (backgroundMusic.muted) {
        musicToggle.textContent = "Unmute";
    } else {
        musicToggle.textContent = "Mute";
    }
});