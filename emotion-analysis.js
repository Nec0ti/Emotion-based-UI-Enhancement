const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let emotion = 'neutral'; // Start with neutral emotion

async function analyzeEmotion() {
    const video = document.getElementById('video');
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
        return 'neutral'; // Return neutral color if not enough data
    }

    // Indices for facial features
    const leftEyeIndices = [33, 34, 35, 36];
    const rightEyeIndices = [263, 264, 265, 266];
    const leftEyebrowIndices = [70, 63, 105, 66];
    const rightEyebrowIndices = [296, 293, 334, 300];
    const mouthIndices = [78, 82, 86, 88];

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
    const eyeDistance = Math.sqrt(
        Math.pow(leftEye[0][0] - rightEye[0][0], 2) +
        Math.pow(leftEye[0][1] - rightEye[0][1], 2)
    );

    // Thresholds for different emotions
    const eyeHeightThreshold = 8;
    const mouthOpenThreshold = 6;
    const mouthWidthThreshold = 20;
    const eyebrowHeightThreshold = 15;
    const eyeDistanceThreshold = 50;

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
        return 'surprised'; // Surprised
    } else {
        return 'neutral'; // Neutral
    }
}
