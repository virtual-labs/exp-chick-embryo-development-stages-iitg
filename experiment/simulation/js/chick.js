let currentAnimation = 0;
const animations = Array.from({length: 21}, (_, i) => `./json/${i+1}_Day_${i+1}.json`);
let animationInstance = null;

const titles = ['Embryo development', 
                'Heart development', 
                'Blood vessels grow, and limbs develop.', 
                'Limb, bud, eye, ear develop.',
                'Growth of beak and claw, and limb growth.',
                'Formation of reproductive organ',
                'Beak development',
                'Feather germs start to form',
                'Further development of feather',
                'Toenail starts to form.',
                'Flight feather appear',
                'Scales on the legs start to form.',
                'Eyelids form',
                'Embryo beings to assume the hatching position',
                'Gut retraction to abdominal cavity',
                'The chick starts breathing air from the air cell.',
                'The chick tucks its head between its legs.',
                'The chick occupies almost the entire egg, and its movement increases in preparation for hatching.',
                'Internal pipping and lung respiration begins',
                'External pipping begins',
                'Egg Hatching'];


document.getElementById('prev').style.display = 'none';

document.getElementById('start').addEventListener('click', () => {
    loadAnimation();
    document.getElementById('start').style.display = 'none';
    document.getElementById('play-all').style.display = 'inline-block';
    document.getElementById('next').style.display = 'inline-block';
    // Do not display the Previous button yet

    // Make the 'Play-All' button clickable and change its color back
    const playAllButton = document.getElementById('play-all');
    playAllButton.disabled = false;
    playAllButton.style.backgroundColor = ''; // Change the color back to the original
});

document.getElementById('play-all').addEventListener('click', () => {
    playAllAnimations();

    // Hide the 'Prev' and 'Next' buttons
    document.getElementById('prev').style.display = 'none';
    document.getElementById('next').style.display = 'none';

    // Show the 'Start' button
    document.getElementById('start').style.display = 'inline-block';

    // Make the 'Play-All' button unclickable and change its color
    const playAllButton = document.getElementById('play-all');
    playAllButton.disabled = true;
    playAllButton.style.backgroundColor = '#cccccc'; // Change the color to a lighter shade
});


document.getElementById('next').addEventListener('click', () => {
    currentAnimation = (currentAnimation + 1) % animations.length;
    loadAnimation(); // Load and play the current animation

    // Display the 'Prev' button when the 'Next' button is clicked for the first time
    // and currentAnimation is not the first animation
    if (currentAnimation !== 0) {
        document.getElementById('prev').style.display = 'inline-block';
    }

    // If currentAnimation has reached the end of the animations array, change the button text to 'End'
    if (currentAnimation === animations.length - 1) {
        const nextButton = document.getElementById('next');
        nextButton.textContent = 'End';
        nextButton.disabled = true;
        nextButton.style.backgroundColor = '#cccccc'; // Change the color to a lighter shade
    }
});


document.getElementById('prev').addEventListener('click', () => {
    currentAnimation = (currentAnimation - 1 + animations.length) % animations.length;    
    loadAnimation(); // Load and play the current animation

    // Hide the 'Prev' button if the currentAnimation is the first animation
    if (currentAnimation === 0) {
        document.getElementById('prev').style.display = 'none';
    }

    // Check if the 'Next' button's textContent is 'End'
    const nextButton = document.getElementById('next');
    if (nextButton.textContent === 'End') {
        // Change the 'Next' button's textContent back to 'Next'
        nextButton.textContent = 'Next';

        // Enable the 'Next' button
        nextButton.disabled = false;
        nextButton.style.backgroundColor = ''; // Change the color back to the original    
    }
});

function loadAnimation() {
    console.log(`Loading animation ${currentAnimation}`); // Log when an animation is loaded
    if(animationInstance) {
        animationInstance.destroy();
    }
    animationInstance = lottie.loadAnimation({
        container: document.getElementById('simulation_container'),
        renderer: 'svg',
        loop: false,
        autoplay: true,
        path: animations[currentAnimation]
    });
    animationInstance.setSpeed(0.30); // Reduce the speed of the animation to 75% of the original speed    
    
    // Set the title
    document.getElementById('title').textContent = titles[currentAnimation];
}

function playAllAnimations() {
    currentAnimation = 0;
    playAnimation(currentAnimation);
}

function playAnimation(index) {
    return new Promise((resolve, reject) => {
        loadAnimation();
        animationInstance.addEventListener('complete', () => {
            console.log(`Animation ${index} completed`); // Log when an animation completes
            resolve();
        });
    }).then(() => {
        if (currentAnimation < animations.length - 1) {
            currentAnimation++;            
            playAnimation(currentAnimation);
        }
    }).finally(() => {
        // If all animations have completed, display the 'Prev' button
        if (currentAnimation === animations.length - 1) {
            document.getElementById('prev').style.display = 'inline-block';

             // Make the 'Play-All' button clickable and change its color back
             const playAllButton = document.getElementById('play-all');
             playAllButton.disabled = false;
             playAllButton.style.backgroundColor = ''; // Change the color back to the original         
        }
    });
}