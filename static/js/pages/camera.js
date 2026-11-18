export default function camera() {
    console.log('Rendering camera page');
    return `
        <h1>Kamera oldal</h1>
        <p>Ez a kamera oldal tartalma.</p>
        <video id="camera-stream" autoplay playsinline></video>
        <button id="capture">Kamera felvétel</button>
    `;
};

let stream = null;

export async function startCamera() {
    try {
        stream = await navigator.mediaDevices.getUserMedia({
            video: {
                facingMode: "environment"
            },
            audio: false
        });

        const video = document.getElementById('camera-stream');
        video.srcObject = stream;

    } catch (error) {
        console.error("Kamera indítása sikertelen:", error);
    }
    document.getElementById('camera-stream').addEventListener('click', () => {
        // Handle camera stream click event
        alert("Kamera streamre kattintva.");
        captureImage();
    });
}

export async function stopCamera() {
    if (stream) {
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
        stream = null;
        alert("Kamera leállítva.");
    }
}

async function captureImage() {
    if (!stream) {
        console.error("Nincs aktív kamera stream.");
        return;
    }

    const video = document.getElementById('camera-stream');
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const context = canvas.getContext('2d');
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    const imageDataUrl = canvas.toDataURL('image/png');
    console.log(`Kép rögzítve (x${canvas.width},y${canvas.height})`);
    //alert("Kép rögzítve. Ellenőrizze a konzolt a részletekért.");
}