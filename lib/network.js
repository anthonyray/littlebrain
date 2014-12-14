var Layer = require('./layer');
var math = require('./math');


function Network(){
  this.layers = [];
}

Network.prototype.process = function (inputs){
  var outputs;

  this.layers.forEach(function(layer){
    outputs = layer.process(inputs);
    inputs = outputs;
  });

  return outputs;
}

Network.prototype.addLayer = function (numNeurons,numInputs){
  if (numInputs == null){
    var previousLayer = this.layers[this.layers.length - 1];
    numInputs = previousLayer.neurons.length;
  }
  var layer = new Layer(numNeurons,numInputs);
  this.layers.push(layer);
}

Network.prototype.train = function(examples) { // Training with Back propagation algorithm

  var outputLayer = this.layers[this.layers.length - 1]; // We make the difference between the output layer and the hidden layer
  var learningRate = 0.3;
  var iterations = 100000;
  var errThreshold = 0.0001;

  for (var itr = 0 ; itr < iterations ; itr++){
    for (var ex = 0 ; ex < examples.length ; ex++){ // Train the neural network for every example.
      var targets = examples[ex][1];
      var inputs = examples[ex][0];

      var outputs = this.process(inputs);

      // Let's start training the output layer
      for (var i = 0 ; i < outputLayer.neurons.length ; i++){
        // Let's calculate the error for every neurons of the output layer.
        var neuron = outputLayer.neurons[i];
        neuron.error = targets[i] - outputs[i];

        // Let's calculate the delta for every neurons of the output layer.
        neuron.delta = neuron.lastOutput * (1 - neuron.lastOutput) * neuron.error;

        // Done for the output layer.

      }

      // Moving on the hidden layers !
      for (var l = this.layers.length - 2 ; l >= 0 ; l--){
        var layer = this.layers[l];
        var nextLayer = this.layers[l+1];

        for (var i = 0 ; i < this.layers[l].neurons.length ; i++){ // For every neurons in that layer

          var neuron = this.layers[l].neurons[i];

          // Let's calculate the error for the neuron
          // To do so, we need the next layer of the network
          neuron.error = math.sum(this.layers[l + 1].neurons.
            map(function(n) { return n.weights[i] * n.delta }))

          // We have computed the error, let's calculate the delta

          neuron.delta = neuron.lastOutput * (1 - neuron.lastOutput) * neuron.error;

          for (var m = 0 ; m < nextLayer.neurons.length; m++){ // For the neurons of the following layer
            var nextNeur = this.layers[l+1].neurons[m];

            for (var w = 0 ; w < nextNeur.weights.length ; w ++){ // Update the weights
              nextNeur.weights[w] += learningRate * nextNeur.lastInputs[w] * nextNeur.delta;
            }

            nextNeur.bias += learningRate * nextNeur.delta;

          }

          // Done !
        }

      }

      var error = math.mse(outputLayer.neurons.map(function(n) { return n.error }));

      if (itr % 10000 == 0){
        console.log("We don't hater :) !, error : ", error)
      }
    }
  }
}

exports.Network = Network;
