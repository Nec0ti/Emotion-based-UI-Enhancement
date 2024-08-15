# Emotion-based UI Enhancement
**THIS PROJECTS MADE FOR *HACKATHON WITH LEWIS 9-16* AUGUST 2024**

This project is a web application that dynamically adjusts the background color and content of the webpage based on the user's facial expressions. The user interface changes according to the detected emotions such as happiness, anger, sadness, and surprise.

## Features

- **Happiness**: The background turns light green, and buttons and text display positive messages.
- **Anger**: The background turns red, buttons disappear with a popping effect, and text displays negative messages.
- **Sadness**: The background turns light blue, and tears appear from the buttons and text.
- **Surprise**: The background turns yellow, and buttons and text continuously move around.

## Technologies

- **TensorFlow.js**: Utilizes the `facemesh` model to analyze facial expressions.
- **HTML5**: For camera and canvas usage.
- **CSS**: For screen effects and animations.
- **JavaScript**: For dynamic interface updates and functionality.

## Installation

1. **Clone the Repository**
    
    bash
    
    Copy code
    
    `git clone https://github.com/Nec0ti/Emotion-based-UI-Enhancement.git cd Emotion-based-UI-Enhancement`
    
2. **Add Required Libraries**
    
    This project requires TensorFlow.js and facemesh libraries. Include them in the `index.html` file.
    
    html
    
    Copy code
    
   `<script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs"></script>`
   
   &
   
   `<script src="https://cdn.jsdelivr.net/npm/@tensorflow-models/facemesh"></script>`
        

## Usage

- **Happiness**: Smile at the camera and observe how the screen changes.
- **Anger**: Change your facial expression to show anger and see the screen's reaction.
- **Sadness**: Display a sad expression and watch how the screen adapts.
- **Surprise**: Show a surprised face and see how the screen responds.

## File Structure

- **`index.html`**: Contains the HTML structure of the application.
- **`style.css`**: Contains the styles for the application.
- **`script.js`**: Main JavaScript file that uses TensorFlow.js and facemesh to analyze emotions.
- **`ruhappy.js`**: JavaScript file that dynamically changes the screen based on detected emotions.

## Contributors

- **Necoti**: Project initiator and main developer

## License

This project is licensed under the MIT License.

## Contact

For any questions or contribution suggestions, please contact halilnecatig2@gmail.com.
