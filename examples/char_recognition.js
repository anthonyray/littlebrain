var neural = require('../lib/network');

var net = new neural.Network();

network.addLayer(10, 20); // Hidden layer
network.addLayer(2);     // Output layer

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
net.train([
  [ zero,   [0,0] ],
  [ one,    [0,1] ],
  [ two,    [1,0] ],
  [ three,  [1,1] ]
]);
