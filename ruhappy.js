// wait  for the page to load completely for the script to work.
window.addEventListener('load', function() {
    const messageElement = document.getElementById('message');
    const actionButton = document.getElementById('actionButton');
    const feedbackElement = document.getElementById('feedback');
    
    function updateDisplay(emotion) {
        switch (emotion) {
            case 'happy':
                showHappyState();
                break;
            case 'angry':
                showAngryState();
                break;
            case 'sad':
                showSadState();
                break;
            case 'surprised':
                showSurprisedState();
                break;
            default:
                resetState();
                break;
        }
    }

    function showHappyState() {
        // Happy state screen edits
        document.body.style.transition = 'background-color 1s ease';
        document.body.style.backgroundColor = 'lightgreen';

        actionButton.style.display = 'block'; // show button
        actionButton.textContent = 'Click me!'; // button text

        feedbackElement.textContent = 'You look happy! Enjoy your day!'; // good message

        // css animations
        actionButton.style.transform = 'scale(1)'; // normal scale
        feedbackElement.style.color = 'green'; // green color
    }

    function showAngryState() {
        // Screen edits when angry
        document.body.style.backgroundColor = 'red'; // change background color

        actionButton.style.display = 'none'; // hide button

        feedbackElement.textContent = 'Grrr... Calm down!'; // bad message
        feedbackElement.style.color = 'black'; // black

        // destroy buttons with explosion animation
        feedbackElement.style.animation = 'explode 1s forwards';
    }

    function showSadState() {
        // Sad state screen edits
        document.body.style.backgroundColor = 'lightblue'; // change background color

        actionButton.style.display = 'block'; // show button
        actionButton.textContent = '😢'; // Button text

        feedbackElement.textContent = 'It’s okay to be sad. Take care!'; // Sad message
        feedbackElement.style.color = 'blue'; // Sad color

        // css animations for tear effect
        actionButton.style.animation = 'tears 2s infinite';
        feedbackElement.style.animation = 'tears 2s infinite';
    }

    function showSurprisedState() {
        // Screen edits in suprised state
        document.body.style.backgroundColor = 'yellow'; // change background color

        actionButton.style.display = 'block'; // show button
        actionButton.textContent = '😲'; // button text

        feedbackElement.textContent = 'Wow, that’s surprising!'; // Surprised message
        feedbackElement.style.color = 'orange'; // Surprised color

        // Button and feedback element CSS animations
        actionButton.style.position = 'absolute';
        feedbackElement.style.position = 'absolute';

        // Randomly move the action button and feedback element
        setInterval(() => {
            actionButton.style.top = `${Math.random() * window.innerHeight}px`;
            actionButton.style.left = `${Math.random() * window.innerWidth}px`;

            feedbackElement.style.top = `${Math.random() * window.innerHeight}px`;
            feedbackElement.style.left = `${Math.random() * window.innerWidth}px`;
        }, 1000);
    }

    function resetState() {
        // Restore default state
        document.body.style.backgroundColor = 'white';
        actionButton.style.display = 'block';
        actionButton.textContent = 'Click me!';
        feedbackElement.textContent = 'Please look into the camera to determine your emotion.';
        feedbackElement.style.color = 'black';

        actionButton.style.animation = '';
        feedbackElement.style.animation = '';
        actionButton.style.position = '';
        feedbackElement.style.position = '';
    }

    // CSS Animations
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes explode {
            0% { transform: scale(1); }
            100% { transform: scale(0); opacity: 0; }
        }
        @keyframes tears {
            0% { transform: translateY(0); }
            50% { transform: translateY(10px); }
            100% { transform: translateY(0); }
        }
    `;
    document.head.appendChild(style);
        updateDisplay($);
});
