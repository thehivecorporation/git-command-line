/**
 * Created by Mario Castro (mariocaster@gmail.com) on 4/18/15.
 */

var Q = require('q');

module.exports = function(){

    var workingDirectory = '.';
    var logging = false;

    this.setLog = function(isLogging){
        logging = isLogging;
    };

    this.getLog = function(){
        return logging;
    };

    this.add = function (command, options) {
        return execPromise('add ' + prepareCommand(command), options);
    };

    this.bisect = function (command, options) {
        return execPromise('bisect ' + prepareCommand(command), options);
    };

    this.branch = function (command, options) {
        return execPromise('branch ' + prepareCommand(command), options);
    };

    this.checkout = function (command, options) {
        return execPromise('checkout ' + prepareCommand(command), options);
    };

    this.clone = function (command, options) {
        return execPromise('clone ' + prepareCommand(command), options);
    };

    this.commit = function (command, options) {
        return execPromise('commit ' + prepareCommand(command), options);
    };

    this.config = function (command, options) {
        return execPromise('config ' + prepareCommand(command), options);
    };

    this.diff = function (command, options) {
        return execPromise('diff ' + prepareCommand(command), options);
    };

    this.fetch = function (command, options) {
        return execPromise('fetch ' + prepareCommand(command), options);
    };

    this.grep = function (command, options) {
        return execPromise('grep ' + prepareCommand(command), options);
    };

    this.init = function (command, options) {
        return execPromise('init ' + prepareCommand(command), options);
    };

    this.log = function (command, options) {
        return execPromise('log ' + prepareCommand(command), options);
    };

    this.merge = function (command, options) {
        return execPromise('merge ' + prepareCommand(command), options);
    };

    this.mv = function (command, options) {
        return execPromise('mv ' + prepareCommand(command), options);
    };

    this.pull = function (command, options) {
        return execPromise('pull ' + prepareCommand(command), options);
    };

    this.push = function (command, options) {
        return execPromise('push ' + prepareCommand(command), options);
    };

    this.rebase = function (command, options) {
        return execPromise('rebase ' + prepareCommand(command), options);
    };

    this.remote = function (command, options) {
        return execPromise('remote ' + prepareCommand(command), options);
    };

    this.reset = function (command, options) {
        return execPromise('reset ' + prepareCommand(command), options);
    };

    this.rm = function (command, options) {
        return execPromise('rm ' + prepareCommand(command), options);
    };

    this.show = function (command, options) {
        return execPromise('show ' + prepareCommand(command), options);
    };

    this.status = function (command, options) {
        return execPromise('status ' + prepareCommand(command), options);
    };

    this.tag = function (command, options) {
        return execPromise('tag ' + prepareCommand(command), options);
    };

    this.direct = function(command, options){
        return execPromise(prepareCommand(command), options);
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
            var options = {
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
    var printCommandExecution = function(command){
        if(logging || false)
            console.log('Executing: ' + 'git ' + command);
    };

    /**
     * Prints the response of an exec execution
     * @param res
     */
    var printCommandResponse = function(res){
        if(logging || false)
            console.log('Logging ---> ', res);
    };

    /**
     * Main function to use the command line tools to execute git commands
     * @param command   Command to execute. Do not include 'git ' prefix
     * @param options   Options available in exec command https://nodejs.org/api/child_process.html#child_process_child_process_exec_command_options_callback
     * @returns {promise|*|Q.promise}
     */
    var execPromise = function (command, options) {
        var exec = require('child_process').exec;
        var defer = Q.defer();

        //Prepare the options object to be valid
        options = prepareOptions(options);

        //Activate-Deactivate command logging execution
        printCommandExecution(command);

        exec('git ' + prepareCommand(command), options, function (err, stdout, stderr) {
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