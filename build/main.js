const docfx = require('./docfx')();
const compare = require('./compare')();
var env = 'vs';

if (process.argv.length > 2) {
    if (process.argv[2] === 'mono') {
        env = 'mono';
    } else if (process.argv[2] == 'netcore') {
        env = 'netcore';
    }
}

docfx.run(env, function(){
    var expected = env === 'netcore' ? 'expectedOutput/netcore' : 'expectedOutput/vs';
    compare.compareFolder(expected, 'obj/api');
});