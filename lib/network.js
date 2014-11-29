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

exports.Network = Network;
