const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let model;
let emotion = 'neutral'; // Start with neutral emotion

async function setupCamera() {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    video.srcObject = stream;
    await new Promise(resolve => video.onloadedmetadata = resolve);
    video.play();
}

async function setupModel() {
    model = await facemesh.load(); // load facemesh model
}

async function initialize() {
    await setupCamera();
    await setupModel();
    setInterval(analyzeEmotion, 1); 
}

initialize();

async function analyzeEmotion() {
    const predictions = await model.estimateFaces(video, false);

    if (predictions.length > 0) {
        emotion = detectEmotion(predictions[0]);
        updateBackgroundColor(emotion);
        displayMessage(emotion);
        drawFaceMesh(predictions[0]);
    }
}

function detectEmotion(face) {
    const mesh = face.scaledMesh;

    if (!mesh || mesh.length < 300) {
        console.error('Mesh or mesh length is insufficient:', mesh);
        return 'neutral'; // if no mesh or mesh is too short, return 'neutral'
    }

    // Indices for facial features
    const leftEyeIndices = [33, 30, 35, 34]; // Left eye
    const rightEyeIndices = [263, 260, 265, 264]; // Right eye
    const leftEyebrowIndices = [70, 63, 105, 66]; // Left eyebrow
    const rightEyebrowIndices = [296, 293, 334, 300]; // Right eyebrow
    const mouthIndices = [78, 82, 86, 88]; // Mouth corners

    // Get features
    const leftEye = leftEyeIndices.map(index => mesh[index] || [0, 0]);
    const rightEye = rightEyeIndices.map(index => mesh[index] || [0, 0]);
    const leftEyebrow = leftEyebrowIndices.map(index => mesh[index] || [0, 0]);
    const rightEyebrow = rightEyebrowIndices.map(index => mesh[index] || [0, 0]);
    const mouth = mouthIndices.map(index => mesh[index] || [0, 0]);

    // Feature extraction
    const leftEyeHeight = Math.abs(leftEye[1][1] - leftEye[3][1]);
    const rightEyeHeight = Math.abs(rightEye[1][1] - rightEye[3][1]);
    const mouthOpen = Math.abs(mouth[1][1] - mouth[3][1]);
    const mouthWidth = Math.sqrt(
        Math.pow(mouth[1][0] - mouth[3][0], 2) +
        Math.pow(mouth[1][1] - mouth[3][1], 2)
    );
    const leftEyebrowHeight = Math.abs(leftEyebrow[0][1] - leftEyebrow[2][1]);
    const rightEyebrowHeight = Math.abs(rightEyebrow[0][1] - rightEyebrow[2][1]);

    // Distance between eyes
    const eyeDistance = Math.sqrt(
        Math.pow(leftEye[0][0] - rightEye[0][0], 2) +
        Math.pow(leftEye[0][1] - rightEye[0][1], 2)
    );

    // Threshold values ​​for parameters
    const eyeHeightThreshold = 10; // Eye height threshold
    const mouthOpenThreshold = 5; // Mouth open threshold
    const mouthWidthThreshold = 15; // Mouth width threshold
    const eyebrowHeightThreshold = 12; // Eyebrow height threshold
    const eyeDistanceThreshold = 55; // Eye distance threshold

    // Perception by emotions
    if (leftEyeHeight > eyeHeightThreshold && rightEyeHeight > eyeHeightThreshold) {
        return 'angry'; // Angry
    } else if (mouthOpen > mouthOpenThreshold && mouthWidth > mouthWidthThreshold &&
               leftEyebrowHeight < eyebrowHeightThreshold && rightEyebrowHeight < eyebrowHeightThreshold) {
        return 'happy'; // Happy
    } else if (mouthOpen < 4 && leftEyebrowHeight < eyebrowHeightThreshold &&
               rightEyebrowHeight < eyebrowHeightThreshold) {
        return 'sad'; // Sad
    } else if (eyeDistance > eyeDistanceThreshold) {
        return 'surprised'; // Suprised
    } else {
        return 'neutral'; // Neutral
    }
}


function updateBackgroundColor(emotion) {
    let color;
    switch (emotion) {
        case 'happy':
            color = 'green';
            break;
        case 'angry':
            color = 'red';
            break;
        case 'sad':
            color = 'lightblue';
            break;
        default:
            color = 'black';
            break;
    }
    document.body.style.transition = 'background-color 1s ease';
    document.body.style.backgroundColor = color;
}

function displayMessage(emotion) {
    const messageElement = document.getElementById('message');
    let message;
    switch (emotion) {
        case 'happy':
            message = 'You look happy! Feel free to explore.';
            break;
        case 'angry':
            message = 'You seem angry. Be careful, you might break something!';
            break;
        case 'sad':
            message = 'You look sad. Maybe try a happy button to cheer up!';
            break;
        default:
            message = '';
            break;
    }
    messageElement.textContent = message;
}

function drawFaceMesh(face) {
    const mesh = face.scaledMesh;

    if (!mesh || mesh.length < 300) {
        console.error('Mesh or mesh length is insufficient:', mesh);
        return;
    }

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // To draw the face mesh
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;

    // To draw the facial features
    const facialFeatures = [
        [30, 30, 35, 34], // Left eye
        [263, 264, 265, 264], // Right eye
        [70, 63, 105, 66], // Left eyebrow
        [296, 293, 334, 300], // Right eyebrow
        [78, 82, 86, 88], // Mouth corners
    ];

    facialFeatures.forEach(feature => {
        ctx.beginPath();
        feature.forEach((index, idx) => {
            const [x, y] = mesh[index];
            if (idx === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });
        ctx.closePath();
        ctx.stroke();
    });

    // Plotting the coordinates of each point
    ctx.fillStyle = 'blue';
    mesh.forEach(point => {
        const [x, y] = point;
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, 2 * Math.PI);
        ctx.fill();
    });
}
