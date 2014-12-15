var fs = require('fs');
var parse = require('csv-parse');
var transform = require('stream-transform');

var neural = require('../lib/network');
var network = new neural.Network();


network.addLayer(10, 784); // Hidden layer
network.addLayer(4);     // Output layer


// Parsing the data :

var trainingData = [];
var input = fs.createReadStream(__dirname+'/../data/dataskip.csv');

var transformer = transform(function(record,callback){

  var label = padzeros(parseInt(record[0]).toString(2)).split('').map(function(n){ return parseInt(n)});
  record.shift();
  var input = record.map(function(n){
    if (parseInt(n) > 50){
      return 1;
    }
    else{
      return 0;
    }
  });
  trainingData.push([input,label]);
  callback(null,padzeros(parseInt(record[0]).toString(2)) + "\n");
},{parallel : 10});

var parser = parse({delimiter: ','});

input.pipe(parser).pipe(transformer);

transformer.on("finish", function(){
  network.train(trainingData);

  var nine = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,52,79,160,215,238,114,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,85,218,251,253,253,253,253,218,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,22,89,185,248,253,235,167,53,114,244,218,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,43,221,248,253,181,53,18,0,0,0,98,68,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,10,213,253,224,86,10,0,0,0,63,192,109,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,53,253,224,72,0,0,13,63,177,250,253,245,36,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,48,249,216,114,114,177,219,254,253,253,253,233,24,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,182,253,253,253,253,253,254,253,253,231,62,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,36,112,156,91,70,168,254,253,229,94,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,40,253,254,253,131,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,70,230,254,255,156,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,159,253,253,153,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,107,249,253,232,6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,8,203,253,251,101,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,81,253,253,168,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,123,253,232,51,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,29,211,253,79,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,137,253,196,15,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,219,236,56,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,219,101,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]

  five.map(function(n){
    if (parseInt(n) > 50){
      return 1;
    }
    else{
      return 0;
    }
  });

  var outputs = network.process(five)
  var binary  = outputs.map(function(v) { return Math.round(v) }).join("")
  var decimal = parseInt(binary, 2)
  console.log("Recognized", decimal, outputs)


  console.log("DONE");
})

function padzeros(s){
  var output = s;
  while(output.length < 4){
    output = "0".concat(output);
  }
  return output
}

// Training data :


// Training the network
