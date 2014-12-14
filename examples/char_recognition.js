var neural = require('../lib/network');

var network = new neural.Network();

network.addLayer(10, 20); // Hidden layer
network.addLayer(4);     // Output layer

// Training data :

var zero =
[
  1, 1, 1, 1,
  1, 0, 0, 1,
  1, 0, 0, 1,
  1, 0, 0, 1,
  1, 1, 1, 1  ];

var one =
  [
  0, 0, 1, 0,
  0, 1, 1, 0,
  0, 0, 1, 0,
  0, 0, 1, 0,
  0, 1, 1, 1  ];

var two =
  [
  1, 1, 1, 1,
  1, 0, 0, 1,
  0, 0, 1, 0,
  0, 1, 0, 0,
  1, 1, 1, 1  ];

var three =
  [
  1, 1, 1, 1,
  0, 0, 0, 1,
  0, 1, 1, 1,
  0, 0, 0, 1,
  1, 1, 1, 1  ];

// Training the network
network.train([
  [ zero,   [0,0,0,0] ],
  [ one,    [0,0,0,1] ],
  [ two,    [0,0,1,0] ],
  [ three,  [0,0,1,1] ]
]);


var outputs = network.process(zero)
var binary  = outputs.map(function(v) { return Math.round(v) }).join("")
var decimal = parseInt(binary, 2)
console.log("Recognized", decimal, outputs)

var outputs = network.process(one)
var binary  = outputs.map(function(v) { return Math.round(v) }).join("")
var decimal = parseInt(binary, 2)
console.log("Recognized", decimal, outputs)

var outputs = network.process(three)
var binary  = outputs.map(function(v) { return Math.round(v) }).join("")
var decimal = parseInt(binary, 2)
console.log("Recognized", decimal, outputs)


console.log("DONE");
