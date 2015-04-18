![Build Status](https://travis-ci.org/sayden/git-cli.svg?branch=master)

# (WIP) git-cli
A wrapper for command line git with promises

## How to use it
Git-cli is a wrapper for command line Git so, you must have git installed in your linux / mac machine (it has not been tested in windows yet).

* Common sintax is: Git.[git command]([string parameters], [options]);

### Some examples

* To add all files in /tmp/git
    Git.add('*', {cwd:'/tmp/git'}).then(function(msg){
        console.log(msg)
    });

* To commit staged files with message "My commit" on the last working folder if any or current one
    Git.commit('-m "My commit"').then(function(msg){
        console.log(msg)
    });