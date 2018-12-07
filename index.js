if (!navigator.bluetooth) {
  alert('Sorry, your browser doesn\'t support Bluetooth API');
}

//const MY_BLUETOOTH_NAME = 'CC41-A';
const MY_BLUETOOTH_NAME = 'BBC micro:bit [vopiz]';
//const SEND_SERVICE = 0xFFE0;
const SEND_SERVICE = '6e400001-b5a3-f393-e0a9-e50e24dcca9e';
//const SEND_SERVICE_CHARACTERISTIC = 0xFFE1;
const SEND_SERVICE_CHARACTERISTIC = '6e400003-b5a3-f393-e0a9-e50e24dcca9e';

const controlButtonsListElements = document.querySelectorAll('.control-buttons > li');
const connectButton = document.getElementById('connectButton');
const disconnectButton = document.getElementById('disconnectButton');
const lightOffButton = document.getElementById('lightOff');
const show1 = document.getElementById('LED_1');
const toggleBlueLightButton = document.getElementById('toggleBlueLight');
const toggleGreenLightButton = document.getElementById('toggleGreenLight');
const runBlinkLightButton = document.getElementById('runBlinkLight');

let toggleLigthCharacteristic;
let myDevice;

connectButton.addEventListener('pointerup', connectButtonPointerUpHandler);

function connectButtonPointerUpHandler() {
  navigator.bluetooth.requestDevice({
      filters: [{
        name: MY_BLUETOOTH_NAME
      }, {
        services: [SEND_SERVICE]
      }, ]
    })
    .then(device => {
      myDevice = device;

      return device.gatt.connect();
    })
    .then(server => server.getPrimaryService(SEND_SERVICE))
    .then(service => service.getCharacteristic(SEND_SERVICE_CHARACTERISTIC))
    .then(characteristic => {
      toggleLigthCharacteristic = characteristic;

      toggleButtonsVisible();
      toggleItemsEventListeners('addEventListener');
    })
    .catch(error => {
      console.error(error);
    });
}

function lightOffButtonClickHandler() {
  return toggleLigthCharacteristic.writeValue(Uint8Array.of(48, 35));
}

function show2_ButtonClickHandler(event) {

  toggleLigthCharacteristic.writeValue(Uint8Array.of(49, 35));
}

function toggleButtonsVisible() {
  Array.prototype.forEach.call(controlButtonsListElements, listElement => {
    listElement.classList.toggle('visible');
  });
}

function disconnectButtonClickHandler() {
  lightOffButtonClickHandler()
    .then(() => {
      myDevice.gatt.disconnect();

      toggleItemsEventListeners('removeEventListener');
      toggleButtonsVisible();

      toggleLigthCharacteristic = undefined;
      myDevice = undefined;
    });
}


function toggleItemsEventListeners(action) {
  disconnectButton[action]('click', disconnectButtonClickHandler);
  lightOffButton[action]('click', lightOffButtonClickHandler);
  //runBlinkLightButton[action]('click', toggleLightButtonClickHandler);
  //toggleGreenLightButton[action]('click', toggleLightButtonClickHandler);
  
  //show1Button[action]('click', show1_ButtonClickHandler);
  //toggleBlueLightButton[action]('click', toggleLightButtonClickHandler);
}


function show1_ButtonClickHandler(event) {

  toggleLigthCharacteristic.writeValue(Uint8Array.of(49, 35));
}

function show2_ButtonClickHandler(event) {

  toggleLigthCharacteristic.writeValue(Uint8Array.of(50, 35));
}

function show3_ButtonClickHandler(event) {

  toggleLigthCharacteristic.writeValue(Uint8Array.of(51, 35));
}

function show4_ButtonClickHandler(event) {

  toggleLigthCharacteristic.writeValue(Uint8Array.of(52, 35));
}

document.getElementById('show1Button').addEventListener('click', show1_ButtonClickHandler);
document.getElementById('show2Button').addEventListener('click', show2_ButtonClickHandler);
document.getElementById('show3Button').addEventListener('click', show3_ButtonClickHandler);
document.getElementById('show4Button').addEventListener('click', show4_ButtonClickHandler);