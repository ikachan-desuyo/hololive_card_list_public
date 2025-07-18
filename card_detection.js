const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// カメラ映像を取得
navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
        video.srcObject = stream;
    })
    .catch(err => {
        console.error('Error accessing webcam:', err);
    });

video.addEventListener('loadeddata', () => {
    setInterval(detectCards, 100);
});

function detectCards() {
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    // OpenCV.js 処理
    const src = cv.matFromImageData(imageData);
    const gray = new cv.Mat();
    const edges = new cv.Mat();
    const contours = new cv.MatVector();
    const hierarchy = new cv.Mat();

    // グレースケール変換
    cv.cvtColor(src, gray, cv.COLOR_RGBA2GRAY, 0);

    // エッジ検出
    cv.Canny(gray, edges, 50, 150);

    // 輪郭を検出
    cv.findContours(edges, contours, hierarchy, cv.RETR_TREE, cv.CHAIN_APPROX_SIMPLE);

    // 縦横比を使ってカードをフィルタリング
    for (let i = 0; i < contours.size(); i++) {
        const contour = contours.get(i);
        const rect = cv.boundingRect(contour);
        const aspectRatio = rect.width / rect.height;

        // 縦横比がカードの範囲内であるか確認
        if (aspectRatio > 0.7 && aspectRatio < 0.8) {
            ctx.strokeStyle = 'red';
            ctx.lineWidth = 2;
            ctx.strokeRect(rect.x, rect.y, rect.width, rect.height);
        }
    }

    // 解放
    src.delete();
    gray.delete();
    edges.delete();
    contours.delete();
    hierarchy.delete();
}