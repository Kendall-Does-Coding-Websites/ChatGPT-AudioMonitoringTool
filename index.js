const startButton = document.getElementById("start-button");
const stopButton = document.getElementById("stop-button");
const volumeInput = document.getElementById("volume");

startButton.addEventListener("click", function () {
  startMicrophone();
});

stopButton.addEventListener("click", function () {
  stopMicrophone();
});

volumeInput.addEventListener("input", function () {
  setVolume(this.value);
});

let audioContext;
let microphone;
let destination;
let gainNode;

function startMicrophone() {
  navigator.mediaDevices
    .getUserMedia({ audio: true })
    .then(function (stream) {
      audioContext = new AudioContext();
      microphone = audioContext.createMediaStreamSource(stream);
      destination = audioContext.destination;

      // create a gain node to control the volume
      gainNode = audioContext.createGain();
      gainNode.gain.value = volumeInput.value;

      microphone.connect(gainNode).connect(destination);
    })
    .catch(function (err) {
      console.error("Error accessing microphone:", err);
    });
}

function stopMicrophone() {
  if (microphone) {
    microphone.disconnect();
    microphone = null;
  }
  if (audioContext) {
    audioContext.close();
    audioContext = null;
  }
}

function setVolume(volume) {
  if (gainNode) {
    gainNode.gain.value = volume;
  }
}
