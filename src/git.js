/**
 * Created by Mario Castro (mariocaster@gmail.com) on 4/18/15.
 */

var execPromise = require('./execPromise');
var prepareCommandOptions = require('./prepareCommandOptions');

/**
 * @module Git
 * @param {object} options
 * @param {string} options.workingDirectory - Working path to set git to work in
 * @param {string} options.dryRun - Do not run command, only logs them
 * @param {string} options.logging - Logs all commands
 * @param {string} options.forceExit - Forces the app to exit when an error occurs
 */
function Git(options) {
    this.options = options || {};

    this.workingDirectory = options.workingDirectory || '.';
    this.dryRun = options.dryRun || false;
    this.logging = options.logging || false;
    this.forceExit = options.forceExit || false;
}

/**
 * Executes 'git add '
 * @method add
 * @param {string} commandOptions
 * @param {object} execOptions
 * @returns {promise<object>}
 */
Git.prototype.add = function (commandOptions, execOptions) {
    return execPromise('git add ' + prepareCommandOptions(commandOptions), execOptions, this.options);
};

/**
 * Executes 'git bisect '
 * @method bisect
 * @param {string} commandOptions
 * @param {object} execOptions
 * @returns {promise<object>}
 */
Git.prototype.bisect = function (commandOptions, execOptions) {
    return execPromise('git bisect ' + prepareCommandOptions(commandOptions), execOptions, this.options);
};

/**
 * Executes 'git branch '
 * @method branch
 * @param {string} commandOptions
 * @param {object} execOptions
 * @returns {promise<object>}
 */
Git.prototype.branch = function (commandOptions, execOptions) {
    return execPromise('git branch ' + prepareCommandOptions(commandOptions), execOptions, this.options);
};

/**
 * Executes 'git checkout '
 * @method checkout
 * @param {string} commandOptions
 * @param {object} execOptions
 * @returns {promise<object>}
 */
Git.prototype.checkout = function (commandOptions, execOptions) {
    return execPromise('git checkout ' + prepareCommandOptions(commandOptions), execOptions, this.options);
};

/**
 * Executes 'git clean '
 * @method clean
 * @param {string} commandOptions
 * @param {object} execOptions
 * @returns {promise<object>}
 */
Git.prototype.clean = function (commandOptions, execOptions) {
    return execPromise('git clean ' + prepareCommandOptions(commandOptions), execOptions, this.options);
};

/**
 * Executes 'git clone '
 * @method clone
 * @param {string} commandOptions
 * @param {object} execOptions
 * @returns {promise<object>}
 */
Git.prototype.clone = function (commandOptions, execOptions) {
    return execPromise('git clone ' + prepareCommandOptions(commandOptions), execOptions, this.options);
};

/**
 * Executes 'git commit '
 * @method commit
 * @param {string} commandOptions
 * @param {object} execOptions
 * @returns {promise<object>}
 */
Git.prototype.commit = function (commandOptions, execOptions) {
    return execPromise('git commit ' + prepareCommandOptions(commandOptions), execOptions, this.options);
};

/**
 * Executes 'git config '
 * @method config
 * @param {string} commandOptions
 * @param {object} execOptions
 * @returns {promise<object>}
 */
Git.prototype.config = function (commandOptions, execOptions) {
    return execPromise('git config ' + prepareCommandOptions(commandOptions), execOptions, this.options);
};

/**
 * Executes 'git diff '
 * @method diff
 * @param {string} commandOptions
 * @param {object} execOptions
 * @returns {promise<object>}
 */
Git.prototype.diff = function (commandOptions, execOptions) {
    return execPromise('git diff ' + prepareCommandOptions(commandOptions), execOptions, this.options);
};

/**
 * Executes 'git fetch '
 * @method fetch
 * @param {string} commandOptions
 * @param {object} execOptions
 * @returns {promise<object>}
 */
Git.prototype.fetch = function (commandOptions, execOptions) {
    return execPromise('git fetch ' + prepareCommandOptions(commandOptions), execOptions, this.options);
};

/**
 * Executes 'git grep '
 * @method grep
 * @param {string} commandOptions
 * @param {object} execOptions
 * @returns {promise<object>}
 */
Git.prototype.grep = function (commandOptions, execOptions) {
    return execPromise('git grep ' + prepareCommandOptions(commandOptions), execOptions, this.options);
};

/**
 * Executes 'git init '
 * @method init
 * @param {string} commandOptions
 * @param {object} execOptions
 * @returns {promise<object>}
 */
Git.prototype.init = function (commandOptions, execOptions) {
    return execPromise('git init ' + prepareCommandOptions(commandOptions), execOptions, this.options);
};

/**
 * Executes 'git log '
 * @param {string} commandOptions
 * @param {object} execOptions
 * @returns {promise<object>}
 */
Git.prototype.log = function (commandOptions, execOptions) {
    return execPromise('git log ' + prepareCommandOptions(commandOptions), execOptions, this.options);
};

/**
 * Executes 'git merge '
 * @method merge
 * @param {string} commandOptions
 * @param {object} execOptions
 * @returns {promise<object>}
 */
Git.prototype.merge = function (commandOptions, execOptions) {
    return execPromise('git merge ' + prepareCommandOptions(commandOptions), execOptions, this.options);
};

/**
 * Executes 'git mv '
 * @method mv
 * @param {string} commandOptions
 * @param {object} execOptions
 * @returns {promise<object>}
 */
Git.prototype.mv = function (commandOptions, execOptions) {
    return execPromise('git mv ' + prepareCommandOptions(commandOptions), execOptions, this.options);
};

/**
 * Executes 'git pull'
 * @method pull
 * @param {string} commandOptions
 * @param {object} execOptions
 * @returns {promise<object>}
 */
Git.prototype.pull = function (commandOptions, execOptions) {
    return execPromise('git pull ' + prepareCommandOptions(commandOptions), execOptions, this.options);
};

/**
 * Executes 'hub pull-request '
 * @method pullRequest
 * @param {string} commandOptions
 * @param {object} execOptions
 * @returns {promise<object>}
 */
Git.prototype.pullRequest = function (commandOptions, execOptions) {
    return execPromise('hub pull-request ' + prepareCommandOptions(commandOptions), execOptions, this.options);
};

/**
 * Executes 'git push '
 * @method push
 * @param {string} commandOptions
 * @param {object} execOptions
 * @returns {promise<object>}
 */
Git.prototype.push = function (commandOptions, execOptions) {
    return execPromise('git push ' + prepareCommandOptions(commandOptions), execOptions, this.options);
};

/**
 * Executes 'git rebase '
 * @method rebase
 * @param {string} commandOptions
 * @param {object} execOptions
 * @returns {promise<object>}
 */
Git.prototype.rebase = function (commandOptions, execOptions) {
    return execPromise('git rebase ' + prepareCommandOptions(commandOptions), execOptions, this.options);
};

/**
 * Executes 'git remote '
 * @method remote
 * @param {string} commandOptions
 * @param {object} execOptions
 * @returns {promise<object>}
 */
Git.prototype.remote = function (commandOptions, execOptions) {
    return execPromise('git remote ' + prepareCommandOptions(commandOptions), execOptions, this.options);
};

/**
 * Executes 'git reset '
 * @method reset
 * @param {string} commandOptions
 * @param {object} execOptions
 * @returns {promise<object>}
 */
Git.prototype.reset = function (commandOptions, execOptions) {
    return execPromise('git reset ' + prepareCommandOptions(commandOptions), execOptions, this.options);
};

/**
 * Executes 'git rm '
 * @method rm
 * @param {string} commandOptions
 * @param {object} execOptions
 * @returns {promise<object>}
 */
Git.prototype.rm = function (commandOptions, execOptions) {
    return execPromise('git rm ' + prepareCommandOptions(commandOptions), execOptions, this.options);
};

/**
 * Executes 'git show '
 * @method show
 * @param {string} commandOptions
 * @param {object} execOptions
 * @returns {promise<object>}
 */
Git.prototype.show = function (commandOptions, execOptions) {
    return execPromise('git show ' + prepareCommandOptions(commandOptions), execOptions, this.options);
};

/**
 * Executes 'git status '
 * @method status
 * @param {string} commandOptions
 * @param {object} execOptions
 * @returns {promise<object>}
 */
Git.prototype.status = function (commandOptions, execOptions) {
    return execPromise('git status ' + prepareCommandOptions(commandOptions), execOptions, this.options);
};

/**
 * Executes 'git tag '
 * @method tag
 * @param {string} commandOptions
 * @param {object} execOptions
 * @returns {promise<object>}
 */
Git.prototype.tag = function (commandOptions, execOptions) {
    return execPromise('git tag ' + prepareCommandOptions(commandOptions), execOptions, this.options);
};

/**
 * Executes a method over git directly. Like 'git [commandOptions]'
 * @method git
 * @param {string} commandOptions
 * @param {object} execOptions
 * @returns {promise<object>}
 */
Git.prototype.git = function(commandOptions, execOptions) {
    return execPromise('git ' + prepareCommandOptions(commandOptions), execOptions, this.options);
};

module.exports = Git;