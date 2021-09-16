/**
 * Created by Fabio Costa on 9/15/2021.
 */
var process = require('child_process');

/**
 * Main function to use the commandOptions line tools to execute git commands
 * @param {string} command - Command to execute. Do not include 'git ' prefix
 * @param {object} execOptions - Options available in exec commandOptions https://nodejs.org/api/child_process.html#child_process_child_process_exec_command_options_callback
 * @param {object} options 
 * @param {string} options.workingDirectory - Working path to set git to work in
 * @param {string} options.dryRun - Do not run command, only logs them
 * @param {string} options.logging - Logs all commands
 * @param {string} options.forceExit - Forces the app to exit when an error occurs
 * @returns {promise<object>}
 */
 module.exports = function execPromise(command, execOptions, options) {

    command = command || '';

    options = options || {};
    options.dryRun = options.dryRun || false;
    options.logging = options.logging || false;
    options.forceExit = options.forceExit || false;
    
    execOptions = execOptions || {};
    execOptions.cwd = execOptions.cwd || options.workingDirectory;

    if (options.dryRun) {
        console.log(command, execOptions);

        return Promise.resolve({});
    }

    if (options.logging) {
        console.log(command, execOptions);
    }
    
    return new Promise(function (resolve, reject) {

        process.exec(command, execOptions, function (error, stdout, stderr) {
            var resp = {
                stdout: stdout,
                stderr: stderr,
                error: error
            };

            if (options.logging) {
                console.log(resp);
            }

            if (error) {
                if (options.forceExit) {
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