// camera and facemesh model
let model;

async function setupCamera() {
    const video = document.getElementById('video');
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    video.srcObject = stream;
    await new Promise(resolve => video.onloadedmetadata = resolve);
    video.play();
}

async function setupModel() {
    model = await facemesh.load();
}

async function initialize() {
    await setupCamera();
    await setupModel();
    setInterval(analyzeEmotion, 1);
}

initialize();
