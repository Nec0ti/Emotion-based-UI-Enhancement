const video = document.getElementById('video');
const smallCanvas = document.getElementById('small-canvas');
const smallCtx = smallCanvas.getContext('2d');
let width, height;

async function setupCamera() {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    video.srcObject = stream;
    await new Promise(resolve => video.onloadedmetadata = resolve);
    video.play();
    width = video.videoWidth;
    height = video.videoHeight;
    smallCanvas.width = 200;
    smallCanvas.height = 150;
}

async function analyzeEmotion() {
    const model = await facemesh.load();
    const predictions = await model.estimateFaces(video, false);

    if (predictions.length > 0) {
        const prediction = predictions[0];
        const expressions = getExpressionsFromPrediction(prediction);

        const emotion = detectEmotion(expressions);

        updateBackgroundColor(emotion);
        drawFaceMesh(prediction);
        drawSmallCanvas();
    }

    requestAnimationFrame(analyzeEmotion);
}

function detectEmotion(expressions) {
    if (expressions.happiness > 0.5) {
        return 'happy';
    } else if (expressions.anger > 0.5) {
        return 'angry';
    } else if (expressions.sadness > 0.5) {
        return 'sad';
    } else {
        return 'neutral';
    }
}

function getExpressionsFromPrediction(prediction) {
    return {
        happiness: Math.random(),
        anger: Math.random(),
        sadness: Math.random()
    };
}

function updateBackgroundColor(emotion) {
    let color;

    switch (emotion) {
        case 'happy':
            color = '#aaffaa';
            document.body.classList.add('flickering');
            document.body.classList.remove('waving');
            break;
        case 'angry':
            color = '#ff5555';
            document.body.classList.remove('flickering');
            document.body.classList.add('waving');
            break;
        case 'sad':
            color = '#aaaaff';
            document.body.classList.remove('flickering');
            document.body.classList.remove('waving');
            break;
        default:
            color = '#ffffff';
            document.body.classList.remove('flickering');
            document.body.classList.remove('waving');
    }

    document.body.style.backgroundColor = color;
}

function drawFaceMesh(prediction) {
    // TODO: Draw the face mesh on the small canvas
}

function drawSmallCanvas() {
    smallCtx.drawImage(video, 0, 0, smallCanvas.width, smallCanvas.height);
}

setupCamera().then(() => {
    analyzeEmotion(); // Start Analyzing
});
