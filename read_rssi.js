var noble = require('noble');

// console.log('noble');

var onoff = false;
var time = 1000*2;
var rssi = new Array();

noble.on('stateChange', function(state) {
//  console.log('on -> stateChange: ' + state);

  if (state === 'poweredOn') {
    noble.startScanning();
  } else {
    noble.stopScanning();
  }
});

noble.on('scanStart', function() {
//  console.log('on -> scanStart');
});

noble.on('scanStop', function() {
//  console.log('on -> scanStop');
});

noble.on('discover', function(peripheral) {
//  console.log('on -> discover: ' + peripheral);

//  noble.stopScanning();
  var len = rssi.length;
  var b = false;
  var uuid = peripheral.uuid
  if (rssi.hasOwnProperty(uuid)) {
    b = true;
  }
  if (b) {
    rssi[uuid] = parseInt((rssi[uuid]*8 + peripheral.rssi*2) / 10);
  } else {
    rssi[uuid] = peripheral.rssi;
  }

  var raw_rssi = -rssi[uuid]; // (-rssi[uuid]) * 2;
  // raw_rssi = parseInt(((474*raw_rssi)/1000) - 112.4);
  console.log('uuid=' + uuid + ' rssi=' + peripheral.rssi + ' range=' + raw_rssi);

  // process.exit();
});

setInterval(function() {
//  console.log("a");
  if (onoff) {
    noble.startScanning();
    time = 2000;
    onoff = false;
  } else {
    noble.stopScanning();
    onoff = true;
    time = 1000;
  }
}, time);
