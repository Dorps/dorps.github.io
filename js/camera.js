// //access to the camera
// //###################################################################3
// var videoElement = document.querySelector('video');
// var videoSelect = document.querySelector('select#videoSource');

// navigator.mediaDevices.enumerateDevices()
//   .then(gotDevices).then(getStream).catch(handleError);

// videoSelect.onchange = getStream;

// function gotDevices(deviceInfos) {
//   for (var i = deviceInfos.length - 1; i >= 0; --i) {
//     var deviceInfo = deviceInfos[i];
//     var option = document.createElement('option');
//     option.value = deviceInfo.deviceId;
//     if (deviceInfo.kind === 'videoinput') {
//       option.text = deviceInfo.label || 'camera ' +
//         (videoSelect.length + 1);
//       videoSelect.appendChild(option);
//     } else {455
//       console.log('Found one other kind of source/device: ', deviceInfo);
//     }
//   }
// }

// function getStream() {
//   buttonGo.disabled = false;
//   if (window.stream) {
//     window.stream.getTracks().forEach(function(track) {
//       track.stop();
//     });
//   }

//   var constraints = {
//     video: {
//       deviceId: {exact: videoSelect.value}
//     }
//   };

//   navigator.mediaDevices.getUserMedia(constraints).
//     then(gotStream).catch(handleError);
// }

// function gotStream(stream) {
//   window.stream = stream; // make stream available to console
//   videoElement.srcObject = stream;
// }

// function handleError(error) {
//   console.log('Error: ', error);
// }
// //access to camera ends
// //#############################################################

//script camera access
const constraints = {
    video: true
};

const video = document.querySelector('video');

navigator.mediaDevices.getUserMedia(constraints).
    then((stream) => {video.srcObject = stream});

// draw image into canvas
//#################################################
var barcodeCanvas = document.createElement("canvas");
barcodeCanvas.width = video.clientWidth;
barcodeCanvas.height = video.clientHeight;
var barcodeContext = barcodeCanvas.getContext('2d');
var imageWidth = video.videoWidth, imageHeight = video.videoHeight;
barcodeContext.drawImage(video, 0, 0, imageWidth, imageHeight);
//###################################################

//get images data from canvas
//####################################################
var imageData = barcodeContext.getImageData(0, 0, imageWidth, imageHeight);
var idd = imageData.data;
//#########################################################

//copy pixels to buffer
//#########################################################
var image = ZXing._resize(imageWidth, imageHeight);
  for (var i = 0, j = 0; i < idd.length; i += 4, j++) {
    ZXing.HEAPU8[image + j] = idd[i];
  }
//##########################################################

//decode the barcode
//######################################################
var err = ZXing._decode_any(decodePtr);
//#####################################################