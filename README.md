![Build Status](https://travis-ci.org/sayden/git-command-line.svg?branch=master)
[![Code Climate](https://codeclimate.com/github/sayden/git-cli/badges/gpa.svg)](https://codeclimate.com/github/sayden/git-cli)
[![Test Coverage](https://codeclimate.com/github/sayden/git-cli/badges/coverage.svg)](https://codeclimate.com/github/sayden/git-cli)
[![Dependency Status](https://gemnasium.com/sayden/git-cli.svg)](https://gemnasium.com/sayden/git-cli)
[![Codacy Badge](https://www.codacy.com/project/badge/7bb54a42e9144690a2d07719edfe5249)](https://www.codacy.com/app/mariocaster/git-cli)

# git-command-line
A wrapper for command line git with promises

## How to use it
Git-command-line is a wrapper for command line Git so, you must have git installed in your linux / mac machine (it has not been tested in windows yet).

* Common sintax is:
```javascript
Git.[git command]([string parameters], [options]).then(function(res){}).fail(function(err){});
```

### Some examples

* To add all files in /tmp/git and the commit them
    ```javascript
    Git.add('*', {cwd:'/tmp/git'}).then(function(msg){
        return Git.commit('-m "My commit");
    }).then(function(res){
        console.log(res);
    }.fail(function(err){
        console.error(err);
    });
    ```

* To commit staged files with message "My commit" on the last working folder if any or current one
    ```javascript
    Git.commit('-m "My commit"').then(function(msg){
        console.log(msg)
    });
    ```

### API

Options parameter is to tweak the 'exec' command as described in:
https://nodejs.org/api/child_process.html#child_process_child_process_exec_command_options_callback

There is a special situation. Once you stablish cwd in the options param, it will be maintained through the rest of thecommands

#### Git.add(command, options);
Same as 'git add [command]'

#### Git.bisect(command, options);
Same as 'git bisect [command]'

#### Git.branch(command, options);
Same as 'git branch [command]'

#### Git.checkout(command, options);
Same as 'git checkout [command]'

#### Git.clone(command, options);
Same as 'git clone [command]'

#### Git.commit(command, options);
Same as 'git commit [command]'

* Examples
```javascript
    var myGitRepo = '/tmp/gitTemp';     //This is where the command will be executed
    Git.commit('-m "My commit"', {cwd:myGitRepo}).then(function(msg){
        console.log(msg)
    });
```

#### Git.diff(command, options);
Same as 'git diff [command]'

#### Git.fetch(command, options);
Same as 'git fetch [command]'

#### Git.grep(command, options);
Same as 'git grep [command]'

#### Git.init(command, options);
Same as 'git init [command]'

#### Git.log(command, options);
Same as 'git log [command]'

#### Git.merge(command, options);
Same as 'git merge [command]'

#### Git.mv(command, options);
Same as 'git mv [command]'

#### Git.pull(command, options);
Same as 'git pull [command]'

#### Git.push(command, options);
Same as 'git push [command]'

#### Git.rebase(command, options);
Same as 'git rebase [command]'

#### Git.remote(command, options);
Same as 'git remote [command]'

#### Git.reset(command, options);
Same as 'git reset [command]'

#### Git.rm(command, options);
Same as 'git rm [command]'

#### Git.show(command, options);
Same as 'git show [command]' or simple 'git show' if no param specified

#### Git.status(command, options);
Same as 'git status [command]' or simply 'git status' if no param specified

* Examples
```javascript
git status
git status -h
```

#### Git.tag(command, options);
Same as 'git tag [command]'

* Examples
```javascript
Git.tag('0.1.0').then(function(res){
    console.log(res)';