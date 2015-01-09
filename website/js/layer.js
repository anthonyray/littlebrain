var Neuron = require('./neuron');

function Layer(numNeurons,numInputs){
  this.neurons = new Array(numNeurons);

  for (var i = 0 ; i < this.neurons.length ; i++){
    this.neurons[i] = new Neuron(numInputs);
  }
}

Layer.prototype.process = function(inputs){
  return this.neurons.map(function(neuron){
    return neuron.process(inputs)
  });
}

module.exports = Layer;
