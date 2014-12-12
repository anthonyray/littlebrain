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

  console.log("Starting to train the network");

  for (var itr = 0; itr < iterations; itr++) { // Repeat the process #iterations
    for (var i = 0; i < examples.length; i++) {

      var targets = examples[i][1];
      var input = examples[i][0];
      var output = this.process(input);

      for (var j = 0; j < outputLayer.neurons.length; j++){
        var neuron = outputLayer.neurons[j];
        neuron.error = targets[j] - output[j];
        neuron.delta = neuron.lastOutput* (1 - neuron.lastOutput ) * neuron.error;
      }

      // Done for the output layer, moving on to the hidden layers ...

      for (var l = this.layers.length - 2 ; l >= 0 ; l--) {

        for (var j = 0; j < this.layers[l].neurons.length; j++) {

          var neur = this.layers[l].neurons[j];

          // For each neuron, we look at the neurons of the next layer
          neur.error = math.sum(this.layers[l+1].neurons.map(function(n){ return n.weights[j]*n.delta })) // (Delta of neuron #1 in next layer * weight of the branch to that neuron + delta of neuron #2 ...)
          neur.delta = neur.lastOutput * (1 - neur.lastOutput) * neur.error;

          // For the neurons of the next layer, we need to update the weights and the bias!
          for (var k = 0 ; k < this.layers[l+1].neurons.length; k++){
            var nextNeur = this.layers[l+1].neurons[k];

            for (var w = 0 ; w < neur.weights ; w++){
              nextNeur.weights[w] += learningRate * nextNeur.lastInputs[w] * nextNeur.delta;
            }

            nextNeur.bias += learningRate * nextNeur.delta;

          }
        }
      }
    }

    var err = math.mse(outputLayer.neurons.map(function(n){ return n.error }));


    if (itr % 1000 == 0){
      console.log({iteration : itr , mse : err});
    }

    if (err <= errThreshold){
      console.log("Condition met");
      return
    }

  }

}

exports.Network = Network;
