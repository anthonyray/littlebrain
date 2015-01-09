var neural = require('./network');
var Layer = require('./layer');

net = new neural.Network();

net.layers.push(new Layer(3,50));
net.layers.push(new Layer(3,50));
net.layers.push(new Layer(3,50));
