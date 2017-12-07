const compare = require('./compare')();
var env = 'vs';

if (process.argv.length > 2) {
    if (process.argv[2] === 'mono') {
        env = 'mono';
    } else if (process.argv[2] == 'netcore') {
        env = 'netcore';
    }
}

var nugetPath = '';
if (process.argv.length > 3) {
    nugetPath = process.argv[3];
}

const docfx = require('./docfx')(nugetPath);

docfx.run(env, function(){
    var expected = env === 'netcore' ? 'expectedOutput/netcore' : 'expectedOutput/vs';
    compare.compareFolder(expected, 'obj/api');
});