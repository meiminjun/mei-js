/**
 * 手动eslint语法检查
 *
 *
 */
const path = require("path"),
    eslint = require("eslint");

const checkme = [
    path.resolve('./src/utils/**/*'),
    path.resolve('./src/filters/**/*'),
    path.resolve('./src/config/**/*'),
    path.resolve('./src/router/**/*'),
    path.resolve('./src/components/**/*'),
    path.resolve('./src/api/**/*'),
    path.resolve('./src/containers/**/*')
];
function getErrorLevel(number) {
       switch (number) {
          case 2:
            return 'error'
          case 1:
            return 'warn'
         default:
       }
       return 'undefined'
}

const cli = new eslint.CLIEngine(),
    files = cli.resolveFileGlobPatterns(checkme),
    reporter = cli.executeOnFiles(files);
    const results = reporter.results
    let errorCount = 0
    let warningCount = 0

module.exports = function() {
    results.forEach((result) => {
        errorCount += result.errorCount
        warningCount += result.warningCount
        if (result.messages.length > 0) {
            console.log('\n')
            console.log(result.filePath)
            result.messages.forEach((obj) => {
                const level = getErrorLevel(obj.severity)
                console.log(`   ${obj.line}:${obj.column}  ${level}  ${obj.message}  ${obj.ruleId}`)
            })
        }
    })
    if(reporter.errorCount > 0 || reporter.warningCount > 0){
        console.error('[Eslint] Find '+ reporter.errorCount +' errors and '+ reporter.warningCount +' warnings, please check your codes or check the result that webpack built.');
        return reporter.errorCount > 0 ? 1 : 0;
    }

    return 0;
};
