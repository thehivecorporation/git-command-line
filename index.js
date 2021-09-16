/**
 * Created by Mario Castro (mariocaster@gmail.com) on 4/18/15.
 */

var process = require('child_process');

/**
 * Prepares the commandOptions string to be valid in case that is not included in the params
 * @param commandOptions
 * @returns {*}
 */
var prepareCommandOptions = function(commandOptions) {
    if (commandOptions == null) {
        return '';
    }

    return commandOptions;
};

/**
 * @module GitCommandLine
 * @param {string} workingPath working path to set git to work in
 */
function Git(options) {
    options = options || {};

    this.workingDirectory = options.workingPath || '.';
    this.dryRun = options.dryRun || false;
    this.logging = options.logging || false;
    this.forceExit = options.forceExit || false;
}

/**
 * Sets the current working directory of git
 * @param {string} newPath New path to execute git commands on
 */
Git.prototype.setWorkingDirectory = function(newPath) {
    this.workingDirectory = newPath || '.';
};

/**
 * Executes 'git add '
 * @method add
 * @param commandOptions
 * @param execOptions
 * @returns {promise<object>}
 */
Git.prototype.add = function (commandOptions, execOptions) {
    return this._execPromise('git add ' + prepareCommandOptions(commandOptions), execOptions);
};

/**
 * Executes 'git bisect '
 * @method bisect
 * @param commandOptions
 * @param execOptions
 * @returns {promise<object>}
 */
Git.prototype.bisect = function (commandOptions, execOptions) {
    return this._execPromise('git bisect ' + prepareCommandOptions(commandOptions), execOptions);
};

/**
 * Executes 'git branch '
 * @method
 * @param commandOptions
 * @param execOptions
 * @returns {promise<object>}
 */
Git.prototype.branch = function (commandOptions, execOptions) {
    return this._execPromise('git branch ' + prepareCommandOptions(commandOptions), execOptions);
};

/**
 * Executes 'git checkout '
 * @method checkout
 * @param commandOptions
 * @param execOptions
 * @returns {promise<object>}
 */
Git.prototype.checkout = function (commandOptions, execOptions) {
    return this._execPromise('git checkout ' + prepareCommandOptions(commandOptions), execOptions);
};

/**
 * Executes 'git clean '
 * @method clean
 * @param commandOptions
 * @param execOptions
 * @returns {promise<object>}
 */
Git.prototype.clean = function (commandOptions, execOptions) {
    return this._execPromise('git clean ' + prepareCommandOptions(commandOptions), execOptions);
};

/**
 * Executes 'git clone '
 * @method clone
 * @param commandOptions
 * @param execOptions
 * @returns {promise<object>}
 */
Git.prototype.clone = function (commandOptions, execOptions) {
    return this._execPromise('git clone ' + prepareCommandOptions(commandOptions), execOptions);
};

/**
 * Executes 'git commit '
 * @method commit
 * @param commandOptions
 * @param execOptions
 * @returns {promise<object>}
 */
Git.prototype.commit = function (commandOptions, execOptions) {
    return this._execPromise('git commit ' + prepareCommandOptions(commandOptions), execOptions);
};

/**
 * Executes 'git config '
 * @method config
 * @param commandOptions
 * @param execOptions
 * @returns {promise<object>}
 */
Git.prototype.config = function (commandOptions, execOptions) {
    return this._execPromise('git config ' + prepareCommandOptions(commandOptions), execOptions);
};

/**
 * Executes 'git diff '
 * @method diff
 * @param commandOptions
 * @param execOptions
 * @returns {promise<object>}
 */
Git.prototype.diff = function (commandOptions, execOptions) {
    return this._execPromise('git diff ' + prepareCommandOptions(commandOptions), execOptions);
};

/**
 * Executes 'git fetch '
 * @method fetch
 * @param commandOptions
 * @param execOptions
 * @returns {promise<object>}
 */
Git.prototype.fetch = function (commandOptions, execOptions) {
    return this._execPromise('git fetch ' + prepareCommandOptions(commandOptions), execOptions);
};

/**
 * Executes 'git grep '
 * @method grep
 * @param commandOptions
 * @param execOptions
 * @returns {promise<object>}
 */
Git.prototype.grep = function (commandOptions, execOptions) {
    return this._execPromise('git grep ' + prepareCommandOptions(commandOptions), execOptions);
};

/**
 * Executes 'git init '
 * @method init
 * @param commandOptions
 * @param execOptions
 * @returns {promise<object>}
 */
Git.prototype.init = function (commandOptions, execOptions) {
    return this._execPromise('git init ' + prepareCommandOptions(commandOptions), execOptions);
};

/**
 * Executes 'git log '
 * @param commandOptions
 * @param execOptions
 * @returns {promise<object>}
 */
Git.prototype.log = function (commandOptions, execOptions) {
    return this._execPromise('git log ' + prepareCommandOptions(commandOptions), execOptions);
};

/**
 * Executes 'git merge '
 * @method merge
 * @param commandOptions
 * @param execOptions
 * @returns {promise<object>}
 */
Git.prototype.merge = function (commandOptions, execOptions) {
    return this._execPromise('git merge ' + prepareCommandOptions(commandOptions), execOptions);
};

/**
 * Executes 'git mv '
 * @method mv
 * @param commandOptions
 * @param execOptions
 * @returns {promise<object>}
 */
Git.prototype.mv = function (commandOptions, execOptions) {
    return this._execPromise('git mv ' + prepareCommandOptions(commandOptions), execOptions);
};

/**
 * Executes 'git pull'
 * @method pull
 * @param commandOptions
 * @param execOptions
 * @returns {promise<object>}
 */
Git.prototype.pull = function (commandOptions, execOptions) {
    return this._execPromise('git pull ' + prepareCommandOptions(commandOptions), execOptions);
};

/**
 * Executes 'hub pull-request '
 * @method pullRequest
 * @param commandOptions
 * @param execOptions
 * @returns {promise<object>}
 */
Git.prototype.pullRequest = function (commandOptions, execOptions) {
    return this._execPromise('hub pull-request ' + prepareCommandOptions(commandOptions), execOptions);
};

/**
 * Executes 'git push '
 * @method push
 * @param commandOptions
 * @param execOptions
 * @returns {promise<object>}
 */
Git.prototype.push = function (commandOptions, execOptions) {
    return this._execPromise('git push ' + prepareCommandOptions(commandOptions), execOptions);
};

/**
 * Executes 'git rebase '
 * @method rebase
 * @param commandOptions
 * @param execOptions
 * @returns {promise<object>}
 */
Git.prototype.rebase = function (commandOptions, execOptions) {
    return this._execPromise('git rebase ' + prepareCommandOptions(commandOptions), execOptions);
};

/**
 * Executes 'git remote '
 * @method remote
 * @param commandOptions
 * @param execOptions
 * @returns {promise<object>}
 */
Git.prototype.remote = function (commandOptions, execOptions) {
    return this._execPromise('git remote ' + prepareCommandOptions(commandOptions), execOptions);
};

/**
 * Executes 'git reset '
 * @method reset
 * @param commandOptions
 * @param execOptions
 * @returns {promise<object>}
 */
Git.prototype.reset = function (commandOptions, execOptions) {
    return this._execPromise('git reset ' + prepareCommandOptions(commandOptions), execOptions);
};

/**
 * Executes 'git rm '
 * @method rm
 * @param commandOptions
 * @param execOptions
 * @returns {promise<object>}
 */
Git.prototype.rm = function (commandOptions, execOptions) {
    return this._execPromise('git rm ' + prepareCommandOptions(commandOptions), execOptions);
};

/**
 * Executes 'git show '
 * @method show
 * @param commandOptions
 * @param execOptions
 * @returns {promise<object>}
 */
Git.prototype.show = function (commandOptions, execOptions) {
    return this._execPromise('git show ' + prepareCommandOptions(commandOptions), execOptions);
};

/**
 * Executes 'git status '
 * @method status
 * @param commandOptions
 * @param execOptions
 * @returns {promise<object>}
 */
Git.prototype.status = function (commandOptions, execOptions) {
    return this._execPromise('git status ' + prepareCommandOptions(commandOptions), execOptions);
};

/**
 * Executes 'git tag '
 * @method tag
 * @param commandOptions
 * @param execOptions
 * @returns {promise<object>}
 */
Git.prototype.tag = function (commandOptions, execOptions) {
    return this._execPromise('git tag ' + prepareCommandOptions(commandOptions), execOptions);
};

/**
 * Executes a method over git directly. Like 'git [commandOptions]'
 * @method git
 * @param commandOptions
 * @param execOptions
 * @returns {promise<object>}
 */
Git.prototype.git = function(commandOptions, execOptions) {
    return this._execPromise('git ' + prepareCommandOptions(commandOptions), execOptions);
};

/**
 * Prepare execOptions to use the set working directory in the following commands
 * @param execOptions
 * @returns {*}
 */
Git.prototype._prepareOptions = function (execOptions) {
    if (!execOptions) {
        execOptions = {
            cwd: this.workingDirectory
        };
    } else if (!execOptions.cwd) {
        execOptions.cwd = this.workingDirectory;
    }

    return execOptions;
}

/**
 * Main function to use the commandOptions line tools to execute git commands
 * @param command - Command to execute. Do not include 'git ' prefix
 * @param execOptions - Options available in exec commandOptions https://nodejs.org/api/child_process.html#child_process_child_process_exec_command_options_callback
 * @returns {promise<object>}
 */
 Git.prototype._execPromise = function(command, execOptions) {

    execOptions = this._prepareOptions(execOptions);

    var logging = this.logging;
    var forceExit = this.forceExit;

    if (this.dryRun) {
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

module.exports = Git;