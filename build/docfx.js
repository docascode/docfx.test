const { exec } = require('child_process');
module.exports = function () {
    return {
        run: function (underMono, callback) {
            exec('"nuget" install docfx.console', function (err, data) {
                if (err) {
                    console.error(err);
                    return;
                }
                var output = data.toString();
                console.log(output);
                var matched = /['"](docfx\.console\.[0-9.]+)['"]/g.exec(output);
                if (!matched) {
                    throw "Unable to find version for docfx.console";
                }
                var version = matched[1];
                var path = '"' + version + '/tools/docfx.exe"';
                // always run under mono?
                var executeString =(underMono? "mono ": "") + path + " metadata";
                runDocfx(executeString, callback);
            })
        }
    }
    
    function runDocfx(executeString, callback){
        console.log ("executing " + executeString);
        exec(executeString, function (err, data) {
            var output = data.toString();
            console.log(output);
            var warningsStr = /[0-9]+ Warning\(s\)/g.exec(output);
            if (!warningsStr) {
                throw "Unable to find matching warning string";
            }
            var warningCount = parseInt(warningsStr[0]);
            if (warningCount > 0) {
                throw warningCount + " warnings found.";
            }
            var errorsStr = /[0-9]+ Error\(s\)/g.exec(output);
            if (!errorsStr) {
                throw "Unable to find matching error string";
            }
            var errorsCount = parseInt(errorsStr[0]);
            if (errorsCount > 0) {
                throw errorsCount + " errors found.";
            }
            callback();
        })
    }
}