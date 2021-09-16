/**
 * Created by Fabio Costa on 9/16/2021.
 */

var execSync = require('./execSync');
var prepareCommandOptions = require('./prepareCommandOptions');

/**
 * @module GitSync
 * @param {object} options
 * @param {string} options.workingDirectory - Working path to set git to work in
 * @param {string} options.dryRun - Do not run command, only logs them
 * @param {string} options.logging - Logs all commands
 * @param {string} options.forceExit - Forces the app to exit when an error occurs
 */
function GitSync(options) {
    options = options || {};

    this.workingDirectory = options.workingDirectory || '.';
    this.dryRun = options.dryRun || false;
    this.logging = options.logging || false;
    this.forceExit = options.forceExit || false;
    
    this.options = {
        workingDirectory: this.workingDirectory,
        dryRun: this.dryRun,
        logging: this.logging,
        forceExit: this.forceExit
    };

    this.stdout = null; // store the latest stdout
}

/**
 * Executes 'git add '
 * @method add
 * @param {string} [commandOptions]
 * @param {object} [execOptions]
 * @returns {GitSync}
 */
GitSync.prototype.add = function (commandOptions, execOptions, options) {
    this.stdout = execSync('git add ' + prepareCommandOptions(commandOptions), execOptions, options || this.options);

    return this;
};

/**
 * Executes 'git bisect '
 * @method bisect
 * @param {string} [commandOptions]
 * @param {object} [execOptions]
 * @returns {GitSync}
 */
GitSync.prototype.bisect = function (commandOptions, execOptions, options) {
    this.stdout = execSync('git bisect ' + prepareCommandOptions(commandOptions), execOptions, options || this.options);

    return this;
};

/**
 * Executes 'git branch '
 * @method branch
 * @param {string} [commandOptions]
 * @param {object} [execOptions]
 * @returns {GitSync}
 */
GitSync.prototype.branch = function (commandOptions, execOptions, options) {
    this.stdout = execSync('git branch ' + prepareCommandOptions(commandOptions), execOptions, options || this.options);

    return this;
};

/**
 * Executes 'git checkout '
 * @method checkout
 * @param {string} [commandOptions]
 * @param {object} [execOptions]
 * @returns {GitSync}
 */
GitSync.prototype.checkout = function (commandOptions, execOptions, options) {
    this.stdout = execSync('git checkout ' + prepareCommandOptions(commandOptions), execOptions, options || this.options);

    return this;
};

/**
 * Executes 'git clean '
 * @method clean
 * @param {string} [commandOptions]
 * @param {object} [execOptions]
 * @returns {GitSync}
 */
GitSync.prototype.clean = function (commandOptions, execOptions, options) {
    this.stdout = execSync('git clean ' + prepareCommandOptions(commandOptions), execOptions, options || this.options);

    return this;
};

/**
 * Executes 'git clone '
 * @method clone
 * @param {string} [commandOptions]
 * @param {object} [execOptions]
 * @returns {GitSync}
 */
GitSync.prototype.clone = function (commandOptions, execOptions, options) {
    this.stdout = execSync('git clone ' + prepareCommandOptions(commandOptions), execOptions, options || this.options);

    return this;
};

/**
 * Executes 'git commit '
 * @method commit
 * @param {string} [commandOptions]
 * @param {object} [execOptions]
 * @returns {GitSync}
 */
GitSync.prototype.commit = function (commandOptions, execOptions, options) {
    this.stdout = execSync('git commit ' + prepareCommandOptions(commandOptions), execOptions, options || this.options);

    return this;
};

/**
 * Executes 'git config '
 * @method config
 * @param {string} [commandOptions]
 * @param {object} [execOptions]
 * @returns {GitSync}
 */
GitSync.prototype.config = function (commandOptions, execOptions, options) {
    this.stdout = execSync('git config ' + prepareCommandOptions(commandOptions), execOptions, options || this.options);

    return this;
};

/**
 * Executes 'git diff '
 * @method diff
 * @param {string} [commandOptions]
 * @param {object} [execOptions]
 * @returns {GitSync}
 */
GitSync.prototype.diff = function (commandOptions, execOptions, options) {
    this.stdout = execSync('git diff ' + prepareCommandOptions(commandOptions), execOptions, options || this.options);

    return this;
};

/**
 * Executes 'git fetch '
 * @method fetch
 * @param {string} [commandOptions]
 * @param {object} [execOptions]
 * @returns {GitSync}
 */
GitSync.prototype.fetch = function (commandOptions, execOptions, options) {
    this.stdout = execSync('git fetch ' + prepareCommandOptions(commandOptions), execOptions, options || this.options);

    return this;
};

/**
 * Executes 'git grep '
 * @method grep
 * @param {string} [commandOptions]
 * @param {object} [execOptions]
 * @returns {GitSync}
 */
GitSync.prototype.grep = function (commandOptions, execOptions, options) {
    this.stdout = execSync('git grep ' + prepareCommandOptions(commandOptions), execOptions, options || this.options);

    return this;
};

/**
 * Executes 'git init '
 * @method init
 * @param {string} [commandOptions]
 * @param {object} [execOptions]
 * @returns {GitSync}
 */
GitSync.prototype.init = function (commandOptions, execOptions, options) {
    this.stdout = execSync('git init ' + prepareCommandOptions(commandOptions), execOptions, options || this.options);

    return this;
};

/**
 * Executes 'git log '
 * @param {string} [commandOptions]
 * @param {object} [execOptions]
 * @returns {GitSync}
 */
GitSync.prototype.log = function (commandOptions, execOptions, options) {
    this.stdout = execSync('git log ' + prepareCommandOptions(commandOptions), execOptions, options || this.options);

    return this;
};

/**
 * Executes 'git merge '
 * @method merge
 * @param {string} [commandOptions]
 * @param {object} [execOptions]
 * @returns {GitSync}
 */
GitSync.prototype.merge = function (commandOptions, execOptions, options) {
    this.stdout = execSync('git merge ' + prepareCommandOptions(commandOptions), execOptions, options || this.options);

    return this;
};

/**
 * Executes 'git mv '
 * @method mv
 * @param {string} [commandOptions]
 * @param {object} [execOptions]
 * @returns {GitSync}
 */
GitSync.prototype.mv = function (commandOptions, execOptions, options) {
    this.stdout = execSync('git mv ' + prepareCommandOptions(commandOptions), execOptions, options || this.options);

    return this;
};

/**
 * Executes 'git pull'
 * @method pull
 * @param {string} [commandOptions]
 * @param {object} [execOptions]
 * @returns {GitSync}
 */
GitSync.prototype.pull = function (commandOptions, execOptions, options) {
    this.stdout = execSync('git pull ' + prepareCommandOptions(commandOptions), execOptions, options || this.options);

    return this;
};

/**
 * Executes 'hub pull-request '
 * @method pullRequest
 * @param {string} [commandOptions]
 * @param {object} [execOptions]
 * @returns {GitSync}
 */
GitSync.prototype.pullRequest = function (commandOptions, execOptions, options) {
    this.stdout = execSync('hub pull-request ' + prepareCommandOptions(commandOptions), execOptions, options || this.options);

    return this;
};

/**
 * Executes 'git push '
 * @method push
 * @param {string} [commandOptions]
 * @param {object} [execOptions]
 * @returns {GitSync}
 */
GitSync.prototype.push = function (commandOptions, execOptions, options) {
    this.stdout = execSync('git push ' + prepareCommandOptions(commandOptions), execOptions, options || this.options);

    return this;
};

/**
 * Executes 'git rebase '
 * @method rebase
 * @param {string} [commandOptions]
 * @param {object} [execOptions]
 * @returns {GitSync}
 */
GitSync.prototype.rebase = function (commandOptions, execOptions, options) {
    this.stdout = execSync('git rebase ' + prepareCommandOptions(commandOptions), execOptions, options || this.options);

    return this;
};

/**
 * Executes 'git remote '
 * @method remote
 * @param {string} [commandOptions]
 * @param {object} [execOptions]
 * @returns {GitSync}
 */
GitSync.prototype.remote = function (commandOptions, execOptions, options) {
    this.stdout = execSync('git remote ' + prepareCommandOptions(commandOptions), execOptions, options || this.options);

    return this;
};

/**
 * Executes 'git reset '
 * @method reset
 * @param {string} [commandOptions]
 * @param {object} [execOptions]
 * @returns {GitSync}
 */
GitSync.prototype.reset = function (commandOptions, execOptions, options) {
    this.stdout = execSync('git reset ' + prepareCommandOptions(commandOptions), execOptions, options || this.options);

    return this;
};

/**
 * Executes 'git rm '
 * @method rm
 * @param {string} [commandOptions]
 * @param {object} [execOptions]
 * @returns {GitSync}
 */
GitSync.prototype.rm = function (commandOptions, execOptions, options) {
    this.stdout = execSync('git rm ' + prepareCommandOptions(commandOptions), execOptions, options || this.options);

    return this;
};

/**
 * Executes 'git show '
 * @method show
 * @param {string} [commandOptions]
 * @param {object} [execOptions]
 * @returns {GitSync}
 */
GitSync.prototype.show = function (commandOptions, execOptions, options) {
    this.stdout = execSync('git show ' + prepareCommandOptions(commandOptions), execOptions, options || this.options);

    return this;
};

/**
 * Executes 'git status '
 * @method status
 * @param {string} [commandOptions]
 * @param {object} [execOptions]
 * @returns {GitSync}
 */
GitSync.prototype.status = function (commandOptions, execOptions, options) {
    this.stdout = execSync('git status ' + prepareCommandOptions(commandOptions), execOptions, options || this.options);

    return this;
};

/**
 * Executes 'git tag '
 * @method tag
 * @param {string} [commandOptions]
 * @param {object} [execOptions]
 * @returns {GitSync}
 */
GitSync.prototype.tag = function (commandOptions, execOptions, options) {
    this.stdout = execSync('git tag ' + prepareCommandOptions(commandOptions), execOptions, options || this.options);

    return this;
};

/**
 * Executes a method over git directly. Like 'git [commandOptions]'
 * @method git
 * @param {string} [commandOptions]
 * @param {object} [execOptions]
 * @returns {GitSync}
 */
GitSync.prototype.git = function(commandOptions, execOptions, options) {
    this.stdout = execSync('git ' + prepareCommandOptions(commandOptions), execOptions, options || this.options);

    return this;
};

module.exports = GitSync;