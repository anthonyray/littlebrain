# LittleBrain

A simple implementation of a multi-layer neural network using backpropagation algorithm in javascript.

## API

To instantiate a new neural network, just require the network class in the library.

```javascript
var neural = require('../lib/network')
var network = new neural.Network()
```

Next, you can add layers to your neural network thanks to the ```addLayer``` method.
This method takes two parameters :
- numNeurons : number of neurons to create for the given layer
- numInputs : optional, determines the number of input for each given neurons in the layer. If this argument is not specified, the number of input will be the number of neurons from the previous layer.  

For instance :
```javascript
network.addLayer(10, 20) // Hidden layer, 10 neurons, 20 inputs
network.addLayer(2)      // Output layer, 2 neurons
```

It is now time to train the neural network with training data. The training method uses the backpropagation algorithm. Careful ! this method can take time ... 

Two stop conditions are implemented :

- The mean square error is below a threshold (errThreshold)
- We iterated over 100 000 times

```javascript
network.train([
  // inputs   outputs
  [  zero,    [0, 0]  ],
  [  one,     [0, 1]  ],
  [  two,     [1, 0]  ],
  [  three,   [1, 1]  ]
  ]);
```

Once the neural network is trained, you can pass it input data and get the output with the process method :

```javascript
var outputs = network.process(zero);
```

## Example
I made a website that uses this neural network to predict a drawn digit between 0 and 3. You can check it out [here](http://reinette.io/littlebrain) !
