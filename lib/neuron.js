var math = require('./math');

function Neuron(numberInputs){
  this.weights = new Array(numberInputs);
  this.bias = math.rand();

  for (var i = 0 ; i < this.weights.length ; i++){
    this.weights[i] = math.rand();
  }
}

Neuron.prototype.process = function(inputs){
  this.lastInputs = inputs;

  var sum = 0;

  for (var i = 0 ; i < inputs.length ; i++){
    sum += inputs[i]*this.weights[i];
  }

  sum += this.bias;
  return this.lastOutput = math.sigmoid(sum);
}

module.exports = Neuron;
