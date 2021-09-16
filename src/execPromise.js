var process = require('child_process');

/**
 * Main function to use the commandOptions line tools to execute git commands
 * @param command - Command to execute. Do not include 'git ' prefix
 * @param execOptions - Options available in exec commandOptions https://nodejs.org/api/child_process.html#child_process_child_process_exec_command_options_callback
 * @returns {promise<object>}
 */
 module.exports = function execPromise(command, execOptions, dryRun, logging, forceExit) {

    if (dryRun) {
        console.log(command, execOptions);
        return Promise.resolve({});
    }

    if (logging) {
        console.log(command, execOptions);
    }
    
    return new Promise(function (resolve, reject) {

        process.exec(command, execOptions, function (error, stdout, stderr) {
            var resp = {stdout: stdout, stderr: stderr, error: error};

            if (logging) {
                console.log(res);
            }

            if (error) {
                if (forceExit) {
                    if (logging) {
                        console.log('Something went wrong with command', command);
                    }
                    process.exit(1);
                }

                reject(resp);
            } else {
                resolve(resp);
            }
        });

    });
};