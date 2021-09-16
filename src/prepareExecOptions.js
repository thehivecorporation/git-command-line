/**
 * Prepare execOptions to use the set working directory in the following commands
 * @param {object} execOptions
 * @param {string} workingDirectory
 * @returns {*}
 */
 module.exports = function prepareExecOptions(execOptions, workingDirectory) {
    execOptions = execOptions || {};
    execOptions.cwd = execOptions.cwd || workingDirectory;

    return execOptions;
}