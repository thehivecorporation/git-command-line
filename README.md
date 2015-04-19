![Build Status](https://travis-ci.org/sayden/git-cli.svg?branch=master)
[![Code Climate](https://codeclimate.com/github/sayden/git-cli/badges/gpa.svg)](https://codeclimate.com/github/sayden/git-cli)
[![Test Coverage](https://codeclimate.com/github/sayden/git-cli/badges/coverage.svg)](https://codeclimate.com/github/sayden/git-cli)

# (WIP) git-cli
A wrapper for command line git with promises

## How to use it
Git-cli is a wrapper for command line Git so, you must have git installed in your linux / mac machine (it has not been tested in windows yet).

* Common sintax is:
```javascript
Git.[git command]([string parameters], [options]);
```

### Some examples

* To add all files in /tmp/git
    ```javascript
    Git.add('*', {cwd:'/tmp/git'}).then(function(msg){
        console.log(msg)
    });
    ```

* To commit staged files with message "My commit" on the last working folder if any or current one
    ```javascript
    Git.commit('-m "My commit"').then(function(msg){
        console.log(msg)
    });
    ```