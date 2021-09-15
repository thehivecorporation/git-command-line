/**
 * Created by Mario Castro (mariocaster@gmail.com) on 4/18/15.
 */

var Q = require('q');

/**
 * @module GitCommandLine
 * @param {string} workingPath working path to set git to work in
 */
module.exports = function(options){
    options = options || {};

    var workingDirectory = options.workingPath || '.';
    var testMode = options.testMode || false;
    var logging = options.logging || false;

    /**
     * Sets the current working directory of git
     * @param {string} newPath New path to execute git commands on
     */
    this.setWorkingDirectory = function(newPath){
        workingDirectory = newPath || '.';
    };

    /**
     * Returns the current working directory where git is executing the commands
     * @method getWorkingDirectory
     * @returns {string} The current working directory
     */
    this.getWorkingDirectory = function(){
        return workingDirectory;
    };

    /**
     * Activates/Deactivates logging
     * @method setLog
     * @param {boolean} isLogging
     */
    this.setLog = function(isLogging){
        logging = isLogging || false;
    };

    /**
     * Returns current state of logging
     * @method getLog
     * @returns {boolean}
     */
    this.getLog = function(){
        return logging;
    };

    /**
     * Sets the test mode
     * @param {string} testMode Test mode
     */
    this.setTestMode = function(testMode){
        testMode = testMode || false;
    };

    /**
     * Returns the test mode
     * @method getTestMode
     * @returns {boolean} The test mode
     */
    this.getTestMode = function(){
        return testMode;
    };

    /**
     * Executes 'git add '
     * @method add
     * @param command
     * @param options
     * @returns {promise|*|Q.promise}
     */
    this.add = function (command, options) {
        return execPromise('git add ' + prepareCommand(command), options);
    };

    /**
     * Executes 'git bisect '
     * @method bisect
     * @param command
     * @param options
     * @returns {promise|*|Q.promise}
     */
    this.bisect = function (command, options) {
        return execPromise('git bisect ' + prepareCommand(command), options);
    };

    /**
     * Executes 'git branch '
     * @method
     * @param command
     * @param options
     * @returns {promise|*|Q.promise}
     */
    this.branch = function (command, options) {
        return execPromise('git branch ' + prepareCommand(command), options);
    };

    /**
     * Executes 'git checkout '
     * @method checkout
     * @param command
     * @param options
     * @returns {promise|*|Q.promise}
     */
    this.checkout = function (command, options) {
        return execPromise('git checkout ' + prepareCommand(command), options);
    };

    /**
     * Executes 'git clean '
     * @method clean
     * @param command
     * @param options
     * @returns {promise|*|Q.promise}
     */
    this.clean = function (command, options) {
        return execPromise('git clean ' + prepareCommand(command), options);
    };

    /**
     * Executes 'git clone '
     * @method clone
     * @param command
     * @param options
     * @returns {promise|*|Q.promise}
     */
    this.clone = function (command, options) {
        return execPromise('git clone ' + prepareCommand(command), options);
    };

    /**
     * Executes 'git commit '
     * @method commit
     * @param command
     * @param options
     * @returns {promise|*|Q.promise}
     */
    this.commit = function (command, options) {
        return execPromise('git commit ' + prepareCommand(command), options);
    };

    /**
     * Executes 'git config '
     * @method config
     * @param command
     * @param options
     * @returns {promise|*|Q.promise}
     */
    this.config = function (command, options) {
        return execPromise('git config ' + prepareCommand(command), options);
    };

    /**
     * Executes 'git diff '
     * @method diff
     * @param command
     * @param options
     * @returns {promise|*|Q.promise}
     */
    this.diff = function (command, options) {
        return execPromise('git diff ' + prepareCommand(command), options);
    };

    /**
     * Executes 'git fetch '
     * @method fetch
     * @param command
     * @param options
     * @returns {promise|*|Q.promise}
     */
    this.fetch = function (command, options) {
        return execPromise('git fetch ' + prepareCommand(command), options);
    };

    /**
     * Executes 'git grep '
     * @method grep
     * @param command
     * @param options
     * @returns {promise|*|Q.promise}
     */
    this.grep = function (command, options) {
        return execPromise('git grep ' + prepareCommand(command), options);
    };

    /**
     * Executes 'git init '
     * @method init
     * @param command
     * @param options
     * @returns {promise|*|Q.promise}
     */
    this.init = function (command, options) {
        return execPromise('git init ' + prepareCommand(command), options);
    };

    /**
     * Executes 'git log '
     * @param command
     * @param options
     * @returns {promise|*|Q.promise}
     */
    this.log = function (command, options) {
        return execPromise('git log ' + prepareCommand(command), options);
    };

    /**
     * Executes 'git merge '
     * @method merge
     * @param command
     * @param options
     * @returns {promise|*|Q.promise}
     */
    this.merge = function (command, options) {
        return execPromise('git merge ' + prepareCommand(command), options);
    };

    /**
     * Executes 'git mv '
     * @method mv
     * @param command
     * @param options
     * @returns {promise|*|Q.promise}
     */
    this.mv = function (command, options) {
        return execPromise('git mv ' + prepareCommand(command), options);
    };

    /**
     * Executes 'git pull'
     * @method pull
     * @param command
     * @param options
     * @returns {promise|*|Q.promise}
     */
    this.pull = function (command, options) {
        return execPromise('git pull ' + prepareCommand(command), options);
    };

    /**
     * Executes 'hub pull-request '
     * @method pullRequest
     * @param command
     * @param options
     * @returns {promise|*|Q.promise}
     */
    this.pullRequest = function (command, options) {
        return execPromise('hub pull-request ' + prepareCommand(command), options);
    };

    /**
     * Executes 'git push '
     * @method push
     * @param command
     * @param options
     * @returns {promise|*|Q.promise}
     */
    this.push = function (command, options) {
        return execPromise('git push ' + prepareCommand(command), options);
    };

    /**
     * Executes 'git rebase '
     * @method rebase
     * @param command
     * @param options
     * @returns {promise|*|Q.promise}
     */
    this.rebase = function (command, options) {
        return execPromise('git rebase ' + prepareCommand(command), options);
    };

    /**
     * Executes 'git remote '
     * @method remote
     * @param command
     * @param options
     * @returns {promise|*|Q.promise}
     */
    this.remote = function (command, options) {
        return execPromise('git remote ' + prepareCommand(command), options);
    };

    /**
     * Executes 'git reset '
     * @method reset
     * @param command
     * @param options
     * @returns {promise|*|Q.promise}
     */
    this.reset = function (command, options) {
        return execPromise('git reset ' + prepareCommand(command), options);
    };

    /**
     * Executes 'git rm '
     * @method rm
     * @param command
     * @param options
     * @returns {promise|*|Q.promise}
     */
    this.rm = function (command, options) {
        return execPromise('git rm ' + prepareCommand(command), options);
    };

    /**
     * Executes 'git show '
     * @method show
     * @param command
     * @param options
     * @returns {promise|*|Q.promise}
     */
    this.show = function (command, options) {
        return execPromise('git show ' + prepareCommand(command), options);
    };

    /**
     * Executes 'git status '
     * @method status
     * @param command
     * @param options
     * @returns {promise|*|Q.promise}
     */
    this.status = function (command, options) {
        return execPromise('git status ' + prepareCommand(command), options);
    };

    /**
     * Executes 'git tag '
     * @method tag
     * @param command
     * @param options
     * @returns {promise|*|Q.promise}
     */
    this.tag = function (command, options) {
        return execPromise('git tag ' + prepareCommand(command), options);
    };

    /**
     * Executes a method over git directly. Like 'git [command]'
     * @method git
     * @param command
     * @param options
     * @returns {promise|*|Q.promise}
     */
    this.git = function(command, options){
        return execPromise('git ' + prepareCommand(command), options);
    };


    /**
     * Prepares the command string to be valid in case that is not included in the params
     * @param command
     * @returns {*}
     */
    var prepareCommand = function(command){
        if(command === undefined){
            return '';
        } else {
            return command;
        }
    };

    /**
     * Prepare options to use the set working directory in the following commands
     * @param options
     * @returns {*}
     */
    var prepareOptions = function(options){
        if (!options) {
            options = {
                cwd: workingDirectory
            };

            return options;
        } else {
            workingDirectory = options.cwd;
            return options;
        }
    };

    /**
     * Prints logs of command excution if activated
     * @param command   The command that will be executed
     */
    var printCommandExecution = function(command, options){
        if(logging || false){
            console.log('Executing: ' + 'git ' + command + ' with options ', options);
        }
    };

    /**
     * Prints the response of an exec execution
     * @param res
     */
    var printCommandResponse = function(res){
        if(logging || false){
            console.log('Logging ---> ', res);
        }
    };

    /**
     * Main function to use the command line tools to execute git commands
     * @param command   Command to execute. Do not include 'git ' prefix
     * @param options   Options available in exec command https://nodejs.org/api/child_process.html#child_process_child_process_exec_command_options_callback
     * @returns {promise|*|Q.promise}
     */
    var execPromise = function (application, command, options) {
        var exec = require('child_process').exec;
        var defer = Q.defer();

        //Prepare the options object to be valid
        options = prepareOptions(options);

        //Activate-Deactivate command logging execution
        printCommandExecution(command, options);

        if (testMode) {
            return defer.resolve({});
        }

        exec(prepareCommand(command), options, function (err, stdout, stderr) {
            //Activate-deactivate err and out logging
            printCommandResponse({err:err, stdout:stdout, stderr:stderr});

            if (err) {
                defer.reject({err: err, stderr: stderr});
            } else {
                defer.resolve({res:stdout, out:stderr});
            }
        });

        return defer.promise;
    };
};