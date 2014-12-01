var Layer = require('./layer');

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

Network.addLayer = function (numNeurons,numInputs){
  if (numInputs == null){
    var previousLayer = this.layers[this.layers.length - 1];
    numInputs = previousLayer.neurons.length;
  }
  var layer = new Layer(numNeurons,numInputs);
  this.layers.push(layer);
}

Network.prototype.train = function(examples) {
  var outputLayer = this.layers[this.layers.length - 1]; // We make the difference between the output layer and the hidden layer

  for (var i = 0; i < examples.length; i++) {
    var targets = examples[i][1];
    var input = examples[i][0];

    var output = this.process(input);

    for (var i = 0; i < outputLayer.neurons.length; i++) {
      var neuron = outputLayer.neurons[i];
      neuron.error = targets[i] - output[i];
      neuron.delta = neuron.lastOutput* (1 - neuron.lastOutput ) * neuron.error;
    }


    // Done for the output layer, moving on to the hidden layers ...



  }
}


/*Network.prototype.train = function(examples) {
  var outputLayer = this.layers[this.layers.length - 1 ];

  for (var i = 0; i < examples.length; i++) {
    var inputs = examples[i][0];
    var targets = examples[i][1];

    var outputs = this.process(inputs);

    for (var i = 0; i < outputLayer.neurons.length; i++) {
      var neuron = outputLayer[i].neurons[i];

      neuron.error = targets[i] - outputs[i];
      neuron.delta = neuron.lastOutput * (1 - neuron.lastOutput) * neuron.error;
    }

    for (var l = this.layers.length; l >= 0; l--) {
      for (var j = 0; j < this.layers[l].neurons.length; j++) {
        var neuron = this.layers[l + 1].neurons[j];

        for (var w = 0 ; w < neuron.weights.length; w++){
          neuron.weights[w] += learningRate * neurons.lastInputs[w] * neuron.delta;
        }



        neuron.bias += learningRate * neuron.delta;
      }
    }
  }
}

$/

exports.Network = Network;
