var fs = require("fs");
module.exports = function () {
    return {
        compareFolder: compareFolder,
        getFiles: getFiles
    };

    function compareFolder(expected, actual) {
        console.log("comparing " + expected + " to the actual output under " + actual);
        var expectedContent = getFiles(expected);
        var actualContent = getFiles(actual);
        if (expectedContent.length != actualContent.length){
            throw "Expected " + expectedContent.length + " files while actual " + actualContent.length + " files";
        }
        
        for (var index = 0; index < expectedContent.length; index++) {
            var element = expectedContent[index];
            var actual = actualContent[index];
            if (element.name !== actual.name) {
                throw "Expected " + element.name + " while actual " + actual.name;
            }
            
            var hash_expected = getHash(element.path);
            var hash_actual = getHash(actual.path);
            if (hash_expected !== hash_actual){
                throw "Actual content for " + actual.path + " is differ from expected: " + fs.readFileSync(actual.Path, { encoding: 'utf8'});
            }
        }
    }

    function getHash(file) {
        var data = fs.readFileSync(file);
        var crypto = require('crypto');
        crypto.createHash('sha256').update(data).digest("hex");
    }

    function getFiles(dir) {
        var results = [];

        fs.readdirSync(dir).forEach(function (file) {
            var fn = dir + '/' + file;
            var stat = fs.statSync(fn);
            if (stat && stat.isDirectory()) {
                results = results.concat(getFiles(fn))
            } else {
                results.push({
                    name: file,
                    path: fn
                });
            }
        });
        return results.sort(s => s.name);
    };
}
