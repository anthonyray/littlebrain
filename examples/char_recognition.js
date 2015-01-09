var neural = require('../lib/network')
var network = new neural.Network()

network.addLayer(10, 20) // Hidden layer, 10 neurons, 20 inputs
network.addLayer(2)      // Output layer, 2 neurons

// Our character "images". Imagine `1`s as black pixels.
var zero = [
0, 1, 1, 0,
1, 0, 0, 1,
1, 0, 0, 1,
1, 0, 0, 1,
0, 1, 1, 0
]

var one = [
0, 0, 1, 0,
0, 0, 1, 0,
0, 0, 1, 0,
0, 0, 1, 0,
0, 0, 1, 0
]

var two = [
0, 1, 1, 0,
1, 0, 0, 1,
0, 0, 1, 0,
0, 1, 0, 0,
1, 1, 1, 1
]

var three = [
1, 1, 1, 1,
0, 0, 0, 1,
0, 1, 1, 1,
0, 0, 0, 1,
1, 1, 1, 1
]

var three_one = [1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1];
var three_two = [0, 1, 1, 1, 0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 1, 0, 1, 1, 1];
var three_three = [1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1];

var two_one = [1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1];
var two_two = [1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 1, 0, 0, 0, 1, 1, 1, 1];
var two_three = [1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 1, 1, 0, 1, 0, 0, 1, 1, 1, 1];

var one_one = [0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 1, 1, 1];
var one_two = [0, 0, 1, 0, 0, 1, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0];
var one_three = [0, 0, 1, 0, 0, 1, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 1, 1, 1];

var zero_one = [0, 1, 1, 0, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 0, 1, 1, 0];
var zero_two = [0, 1, 1, 0, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1];
var zero_three  = [1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 0, 1, 1, 0];

network.train([
  // Training examples
  // inputs   outputs
  [  zero,    [0, 0]  ],
  [  one,     [0, 1]  ],
  [  two,     [1, 0]  ],
  [  three,   [1, 1]  ],
  [ one_one , [0,1] ],
  [ one_two , [0,1] ],
  [ one_three , [0,1] ],
  [ two_one , [1,0] ],
  [ two_two , [1,0] ],
  [ two_three , [1,0] ],
  [ three_one , [1,1] ],
  [ three_two , [1,1] ],
  [ three_three , [1,1] ],
  [ zero_one, [0,0]     ],
  [zero_two, [0,0]],
  [zero_three,[0,0]]
  ])


// Convert the output to binary (base 2) and then to decimal (base 10).
var outputs = network.process(zero)
var binary  = outputs.map(function(v) { return Math.round(v) }).join("")
var decimal = parseInt(binary, 2)
console.log("Digit recognized : ", decimal, outputs)

var outputs = network.process(one)
var binary  = outputs.map(function(v) { return Math.round(v) }).join("")
var decimal = parseInt(binary, 2)
console.log("Digit recognized :", decimal, outputs)

var outputs = network.process(three)
var binary  = outputs.map(function(v) { return Math.round(v) }).join("")
var decimal = parseInt(binary, 2)
console.log("Digit recognized :", decimal, outputs)

console.log(network.serialize());
