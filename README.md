![Build Status](https://travis-ci.org/sayden/git-command-line.svg?branch=master)
[![Code Climate](https://codeclimate.com/github/sayden/git-cli/badges/gpa.svg)](https://codeclimate.com/github/sayden/git-cli)
[![Test Coverage](https://codeclimate.com/github/sayden/git-cli/badges/coverage.svg)](https://codeclimate.com/github/sayden/git-cli)
[![Dependency Status](https://gemnasium.com/sayden/git-cli.svg)](https://gemnasium.com/sayden/git-cli)
[![Codacy Badge](https://www.codacy.com/project/badge/7bb54a42e9144690a2d07719edfe5249)](https://www.codacy.com/app/mariocaster/git-cli)
![Codeship](https://codeship.com/projects/6965bf40-c8e1-0132-9fd7-5e07eb4da99e/status?branch=master)
[![NPM Version](https://img.shields.io/npm/v/git-command-line.svg?style=flat)](https://www.npmjs.com/package/git-command-line)
![Downloads](https://img.shields.io/npm/dm/git-command-line.svg?style=flat)
![Tests](https://img.shields.io/badge/tests-28%2F28-green.svg)
![Statements](https://img.shields.io/badge/Statements-97.78%25%20(%2088%2F90%20)-green.svg)
![Branches](https://img.shields.io/badge/Branches-81.25%25%20(%2013%2F16%20)-green.svg)
![Functions](https://img.shields.io/badge/Functions-100%25%20(%2035%2F35%20)-green.svg)
![Lines](https://img.shields.io/badge/Lines-97.78%25%20(%2088%2F90%20)-green.svg)


=======

# git-command-line
A wrapper for command line git with promises

## How to use it
Git-command-line is a wrapper for command line Git so, you must have git installed in your linux / mac machine (it has not been tested in windows yet).

* Common sintax is:
```javascript
var GitCommandLine = require('git-command-line');
var Git = new GitCommandLine('/tmp/gitTemp');
//You can also create it only with GitCommandLine() and set the working path later
Git.[git command]([string parameters], [options])
  .then(function(res){
    //Then
  }).
  fail(function(err){
    //Fail
  });
```

=======

## Some examples

* To Git init /tmp/git folder, add all files on it, commit, add a new remote and push master to it

```javascript
    var GitCommandLine = require('git-command-line');
    
    //Variables
    var gitFolder = '/tmp/gitTemp';
    var remoteName = 'origin';
    var remoteUrl = 'https://example.remote.repo';
    
    //Create a new Git object
    var Git = new GitCommandLine(gitFolder);
    
    //Execute the chain
    Git.init()
    
    .then(function(res){
        return Git.add('*', {cwd:'/tmp/git'})
        
    }).then(function(res){
        return Git.commit('-m "My commit"');
        
    }).then(function(res){
        return Git.remote('add ' + remoteName + ' ' + remoteUrl);
    
    }).then(function(res){
        return Git.push('-u ' + remoteName + ' master');
        
    }).then(function(res){
        console.log('Success: ', res);
    
    }).fail(function(err){
        console.error(err);
    });
```

* To commit staged files with message "My commit" on the last working folder if any or current one
```javascript
Git.commit('-m "My commit"')
  .then(function(msg){
    console.log(msg)
}).fail(function(err){
    console.log(err);
});
```

=======

## API

Initially, following commands are available:

* [**add**](#add)                                       Add file contents to the index
* [**bisect**](#bisect)                                 Find by binary search the change that introduced a bug
* [**branch**](#branch)                                 List, create, or delete branches
* [**checkout**](#checkout)                             Checkout a branch or paths to the working tree
* [**clone**](#clone)                                   Clone a repository into a new directory
* [**commit**](#commit)                                 Record changes to the repository
* [**diff**](#diff)                                     Show changes between commits, commit and working tree, etc
* [**direct**](#direct)                                 Allows the direct execution of a git command that is not available in the API yet
* [**fetch**](#fetch)                                   Download objects and refs from another repository
* [**grep**](#grep)                                     Print lines matching a pattern
* [**init**](#init)                                     Create an empty Git repository or reinitialize an existing one
* [**log**](#log)                                       Show commit logs
* [**merge**](#merge)                                   Join two or more development histories together
* [**mv**](#mv)                                         Move or rename a file, a directory, or a symlink
* [**pull**](#pull)                                     Fetch from and integrate with another repository or a local branch
* [**push**](#push)                                     Update remote refs along with associated objects
* [**rebase**](#rebase)                                 Forward-port local commits to the updated upstream head
* [**remote**](#remote)                                 Manage set of tracked repositories
* [**reset**](#reset)                                   Reset current HEAD to the specified state
* [**rm**](#rm)                                         Remove files from the working tree and from the index
* [**show**](#show)                                     Show various types of objects
* [**status**](#status)                                  Show the working tree status
* [**tag**](#tag)                                       Create, list, delete or verify a tag object signed with GPG
* [**setWorkingDirectory**](#set-working-directory)     Sets the working path for the following git commands
* [**getWorkingDirectory**](#get-working-directory)     Returns the current working path
* [**setLog**](#set-log)                                Sets the logging of the Git command line responses
* [**getLog**](#get-log)                                Returns the state of the logging

Options parameter is to tweak the 'exec' command as described in:
https://nodejs.org/api/child_process.html#child_process_child_process_exec_command_options_callback

There is a special situation. Once you stablish cwd in the options param, it will be maintained through the rest of the commands

### Direct

#### Git.direct(command,options);
Git direct allows the direct execution of a Git command that is not available in the API yet

* Examples
```javascript
    var myGitRepo = '/tmp/gitTemp';     //This is where the command will be executed
    var Git = new Git(myGitRepo);
    
    Git.direct('init')
      .then(function(res){      //Equivalent to 'git init'
        Git.direct('add *');                      //Equivalent to 'git add *'
    }).then(function(err){
        console.error(err)
    });
```
### Add

#### Git.add(command, options)
Same as 'git add [command]'

* To add all files in /tmp/git and the commit them
```javascript
Git.add('*', {cwd:'/tmp/git'}).then(function(msg){
    return Git.commit('-m "My commit"');
}).then(function(res){
    console.log(res);
}.fail(function(err){
    console.error(err);
});
```
### Bisect

#### Git.bisect(command, options);
Same as 'git bisect [command]'

### Branch

#### Git.branch(command, options);
Same as 'git branch [command]'

* To get current branch

```javascript
    Git.branch().then(function(res){
        console.log(res)            // master
    }).catch(function(err){
        console.log(err();
    });
```

### Checkout

#### Git.checkout(command, options);
Same as 'git checkout [command]'

* To change to branch test

```javascript
    Git.checkout('test').then(function(res){
        console.log(res);
    }).catch(function(err){
        console.error(err);
    });
```
### Clone

#### Git.clone(command, options);
Same as 'git clone [command]'

* To clone a git repo on current folder

```javascript
    Git.clone('https://github.com/sayden/git-command-line.git').then(function(res){
        console.log(res);
    }).catch(function(err){
        console.error(err);
    });
```

* To clone a git repo on /tmp

```javascript
    Git.clone('https://github.com/sayden/git-command-line.git /tmp').then(function(res){
        console.log(res);
    }).catch(function(err){
        console.error(err);
    });
```
### Commit

#### Git.commit(command, options);
Same as 'git commit [command]'

* Examples
```javascript
    var myGitRepo = '/tmp/gitTemp';     //This is where the command will be executed
    var Git = new Git(myGitRepo);
    
    Git.commit('-m "My commit"', {cwd:myGitRepo})       //Equivalent to 'git commit -m "My commit"'
      .then(function(msg){
        console.log(msg)
      }).fail(function(err){
        console.log(err);
      });
```

### Diff

#### Git.diff(command, options);
Same as 'git diff [command]'


### Fetch

#### Git.fetch(command, options);
Same as 'git fetch [command]'

### Grep

#### Git.grep(command, options);
Same as 'git grep [command]'

### Init

#### Git.init(command, options);
Same as 'git init [command]'


### Log

#### Git.log(command, options);
Same as 'git log [command]'

### Merge

#### Git.merge(command, options);
Same as 'git merge [command]'


### MV

#### Git.mv(command, options);
Same as 'git mv [command]'


### Pull

#### Git.pull(command, options);
Same as 'git pull [command]'


### Push

#### Git.push(command, options);
Same as 'git push [command]'



### Rebase

#### Git.rebase(command, options);
Same as 'git rebase [command]'



### Remote

#### Git.remote(command, options);
Same as 'git remote [command]'



### Reset

#### Git.reset(command, options);
Same as 'git reset [command]'



### RM

#### Git.rm(command, options);
Same as 'git rm [command]'



### Show

#### Git.show(command, options);
Same as 'git show [command]' or simple 'git show' if no param specified



### Status

#### Git.status(command, options);
Same as 'git status [command]' or simply 'git status' if no param specified

* Examples
```javascript
    Git.status()
    .then(function(res){
      console.log(res);
    }).fail(function(err){
      console.log(err);
    });

    //Or...

    Git.status('-h')
    .then(function(res){
      console.log(res);
    }).fail(function(err){
      console.log(err);
    });
```


### Tag

#### Git.tag(command, options);
Same as 'git tag [command]'

* Examples
```javascript
Git.tag('0.1.0').then(function(res){
    console.log(res);



### Set Working directory

#### Git.setWorkingDirectory(newPath)
Sets the working path for the following git commands



### Get working directory

#### Git.getWorkingpath()
Returns the current working path



### Set Log

#### Git.setLog(boolean)
Sets the logging of the Git command line responses



### Get Log
#### Git.getLog()
Returns the state of the logging