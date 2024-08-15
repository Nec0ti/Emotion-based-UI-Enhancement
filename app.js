const video = document.getElementById('video');

async function setupCamera() {
    const stream = await navigator.mediaDevices.getUserMedia({
        video: true
    });
    video.srcObject = stream;
    await new Promise(resolve => video.onloadedmetadata = resolve);
    video.play();
}

async function analyzeEmotion() {
    const model = await facemesh.load();
    const predictions = await model.estimateFaces(video, false);

    if (predictions.length > 0) {
        const prediction = predictions[0];
        const expressions = getExpressionsFromPrediction(prediction);

        const emotion = detectEmotion(expressions);

        updateBackgroundColor(emotion);
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
            break;
        case 'angry':
            color = '#ff5555';
            break;
        case 'sad':
            color = '#aaaaff';
            break;
        default:
            color = '#ffffff';
    }

    document.body.style.backgroundColor = color;
}

setupCamera().then(() => {
    analyzeEmotion(); // START ANALYZING
});
