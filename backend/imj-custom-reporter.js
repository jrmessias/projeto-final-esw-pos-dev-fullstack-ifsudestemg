const path = require("node:path");
const fs = require('node:fs');

class IMJCustomReporter {
    constructor(globalConfig, options) {
        this._globalConfig = globalConfig;
        this._options = options;
    }

    onRunStart(results, options) {
        // console.log("\x1b[30m\x1b[42mTest run started!.\x1b[0m");
        const report = "test-report.html";
        fs.unlink(report, (err) => {
            if (err) {
                // console.error(`Erro ao remover o arquivo: ${err}`);
                return;
            }
            // console.log(`Arquivo ${report} foi removido com sucesso.`);
        });
    }

    onTestResult(test, testResult, aggregatedResults) {
        // if (testResult.numFailingTests > 0) {
        //     console.log("\x1b[30m\x1b[41mFAIL "+ path.basename(path.dirname(testResult.testFilePath))+"/"+path.basename(testResult.testFilePath)+ "\x1b[0m");
        // }
    }

    onRunComplete(contexts, results) {
        // console.log("\x1b[30m\x1b[43mTest run complete!\x1b[0m");
        // You can access aggregated results here to generate your custom report
    }
}

module.exports = IMJCustomReporter;
