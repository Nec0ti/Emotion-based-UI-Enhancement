function updateBackgroundColor(emotion) {
    let color;
    switch (emotion) {
        case 'happy':
            color = 'lightgreen';
            break;
        case 'angry':
            color = 'darkred';
            break;
        case 'sad':
            color = 'lightblue';
            break;
        default:
            color = 'white';
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
        case 'surprised':
            message = 'Surprised? Things might look different.';
            break;
        default:
            message = 'Please look into the camera to determine your emotion.';
            break;
    }
    messageElement.textContent = message;
}


function drawFaceMesh(face) {
    const mesh = face.scaledMesh;

    if (!mesh || mesh.length < 300) {
        console.error('Mesh veya mesh uzunluğu yetersiz:', mesh);
        return;
    }

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // To draw facial features
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;

    // Sample points for drawing facial features
    const facialFeatures = [
        [33, 34, 35, 36], // left eye
        [263, 264, 265, 266], // right eye
        [70, 63, 105, 66], // left eyebrow
        [296, 293, 334, 300], // right eyebrow
        [78, 82, 86, 88], // mouth corners
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
