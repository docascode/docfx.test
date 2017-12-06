var docfx = require('./docfx')();
var compare = require('./compare')();

var underMono = process.argv.length > 2 ?
process.argv.length[2] === 'mono' : false;

docfx.run(underMono, function(){
    compare.compareFolder('expectedOutput', 'obj');
});