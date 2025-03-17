const gameContainer = document.getElementById('game-container');
const character = document.getElementById('character');
const scoreDisplay = document.getElementById('score');
let characterPosition = gameContainer.offsetWidth / 2 - character.offsetWidth / 2;
const characterSpeed = 10;
const fallingObjectSpeed = 3;
let score = 0;

// Update character position based on keyboard input
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        characterPosition = Math.max(0, characterPosition - characterSpeed);
    } else if (e.key === 'ArrowRight') {
        characterPosition = Math.min(gameContainer.offsetWidth - character.offsetWidth, characterPosition + characterSpeed);
    }
    character.style.left = `${characterPosition}px`;
});

// Create falling objects at random positions
function createFallingObject() {
    const fallingObject = document.createElement('div');
    fallingObject.classList.add('falling-object');
    fallingObject.style.left = `${Math.random() * (gameContainer.offsetWidth - 30)}px`;
    gameContainer.appendChild(fallingObject);

    let fallingObjectPosition = 0;
    const fallingInterval = setInterval(() => {
        if (fallingObjectPosition < gameContainer.offsetHeight - 30) {
            fallingObjectPosition += fallingObjectSpeed;
            fallingObject.style.top = `${fallingObjectPosition}px`;

            // Check if character caught the falling object
            const characterRect = character.getBoundingClientRect();
            const objectRect = fallingObject.getBoundingClientRect();
            if (
                objectRect.left < characterRect.right &&
                objectRect.right > characterRect.left &&
                objectRect.bottom > characterRect.top &&
                objectRect.top < characterRect.bottom
            ) {
                clearInterval(fallingInterval);
                gameContainer.removeChild(fallingObject);
                score++;
                scoreDisplay.innerText = `Score: ${score}`;
            }
        } else {
            clearInterval(fallingInterval);
            gameContainer.removeChild(fallingObject);
        }
    }, 16);

    setTimeout(createFallingObject, Math.random() * 2000 + 1000);
}

// Start the game by creating the first falling object
createFallingObject();
let isDragging = false;

// Handle touch start event
character.addEventListener('touchstart', (e) => {
    isDragging = true;
});

// Handle touch move event
character.addEventListener('touchmove', (e) => {
    if (isDragging) {
        const touchX = e.touches[0].clientX - gameContainer.getBoundingClientRect().left;
        // Ensure character doesn't move outside the container
        characterPosition = Math.max(0, Math.min(gameContainer.offsetWidth - character.offsetWidth, touchX - character.offsetWidth / 2));
        character.style.left = `${characterPosition}px`;
    }
});

// Handle touch end event
character.addEventListener('touchend', () => {
    isDragging = false;
});
