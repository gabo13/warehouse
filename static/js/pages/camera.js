export default function camera() {
    console.log('Rendering camera page');
    return `
        <h1>Kamera oldal</h1>
        <p>Ez a kamera oldal tartalma.</p>
        <video id="camera-stream" autoplay playsinline></video>
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
}

export async function stopCamera() {
    if (stream) {
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
        stream = null;
    }
}