/**
 * Created by Mario Castro (mariocaster@gmail.com) on 4/18/15.
 */

var Q = require('q');

var Git = {

    workingDirectory: '.',
    logging: true,

    add: function (command, options) {
        return execPromise('add ' + command, options);
    },

    bisect: function (command, options) {
        return execPromise('bisect ' + command, options);
    },

    branch: function (command, options) {
        return execPromise('branch ' + command, options);
    },

    checkout: function (command, options) {
        return execPromise('checkout ' + command, options);
    },

    clone: function (command, options) {
        return execPromise('clone ' + command, options);
    },

    commit: function (command, options) {
        return execPromise('commit ' + command, options);
    },

    config: function (command, options) {
        return execPromise('config ' + command, options);
    },

    diff: function (command, options) {
        return execPromise('diff ' + command, options);
    },

    fetch: function (command, options) {
        return execPromise('fetch ' + command, options);
    },

    grep: function (command, options) {
        return execPromise('grep ' + command, options);
    },

    init: function (command, options) {
        return execPromise('init ' + command, options);
    },

    log: function (command, options) {
        if(command === undefined){
            command = '';
        }
        return execPromise('log ' + command, options);
    },

    merge: function (command, options) {
        return execPromise('merge ' + command, options);
    },

    mv: function (command, options) {
        return execPromise('mv ' + command, options);
    },

    pull: function (command, options) {
        if(command === undefined){
            command = '';
        }
        return execPromise('pull ' + command, options);
    },

    push: function (command, options) {
        return execPromise('push ' + command, options);
    },

    rebase: function (command, options) {
        return execPromise('rebase ' + command, options);
    },

    remote: function (command, options) {
        return execPromise('remote ' + command, options);
    },

    reset: function (command, options) {
        return execPromise('reset ' + command, options);
    },

    rm: function (command, options) {
        return execPromise('rm ' + command, options);
    },

    show: function (command, options) {
        if(command === undefined){
            command = '';
        }
        return execPromise('show ' + command, options);
    },

    status: function (command, options) {
        if(command === undefined){
            command = '';
        }
        return execPromise('status ' + command, options);
    },

    tag: function (command, options) {
        return execPromise('tag ' + command, options);
    }
};

function execPromise (command, options) {
    if (!options) {
        options = {
            cwd: Git.workingDirectory
        };
    } else {
        options.cwd = options.cwd || Git.workingDirectory;
        Git.workingDirectory = options.cwd;
    }

    var exec = require('child_process').exec;
    var defer = Q.defer();

    //Activate-Deactivate command logging execution
    if(Git.logging) { console.log('Executing: ' + 'git ' + command); }

    exec('git ' + command, options, function (err, stdout, stderr) {
        //Activate-deactivate err and out logging
        if(Git.logging) { console.log('Logging ---> ', {err:err, stdout:stdout, stderr:stderr}); }

        if (err) {
            defer.reject({err: err, stderr: stderr});
        } else {
            defer.resolve({res:stdout, out:stderr});
        }
    });

    return defer.promise;
}

module.exports = Git;