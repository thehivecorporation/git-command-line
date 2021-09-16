/**
 * Prepares the commandOptions string to be valid in case that is not included in the params
 * @param {string} commandOptions
 * @returns {*}
 */
 module.exports = function prepareCommandOptions(commandOptions) {
    commandOptions = commandOptions || '';

    if (typeof commandOptions !== 'string') {
        commandOptions = '';
    }

    return commandOptions;
};