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
This is a wrapper for command line Git so, you must have git installed in your linux / mac machine (it has not been tested in windows yet).

* Common sintax is:
```javascript
var { Git, GitSync } = require('git-command-line');

var git = new Git('/tmp/gitTemp');
var gitSync = new GitSync('/tmp/gitTemp');

//You can also create it only with Git() and set the working path later
git.[git command]([string parameters], [options])
   .then(function(res){
     // Then
   }).
   fail(function(err){
     // Fail
   });

// or calling it synchronously 
try {
   const res = gitSync.[git command]([string parameters], [options]);
}
catch(err) {
  // Fail
}
```

=======

## Some examples

* To Git init /tmp/git folder, add all files on it, commit, add a new remote and push master to it

```javascript
var { Git } = require('git-command-line');

//Variables
var gitFolder = '/tmp/gitTemp';
var remoteName = 'origin';
var remoteUrl = 'https://example.remote.repo';

//Create a new Git object
var git = new Git(gitFolder);

//Execute the chain
git
  .init()

  .then(function (res) {
    return git.add("*", { cwd: "/tmp/git" });
  })
  .then(function (res) {
    return git.commit('-m "My commit"');
  })
  .then(function (res) {
    return git.remote("add " + remoteName + " " + remoteUrl);
  })
  .then(function (res) {
    return git.push("-u " + remoteName + " master");
  })
  .then(function (res) {
    console.log("Success: ", res);
  })
  .fail(function (err) {
    console.error(err);
  });

```

* To commit staged files with message "My commit" on the last working folder if any or current one
```javascript
git.commit('-m "My commit"')
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
* [**init**](#init)                                     Create an empty git repository or reinitialize an existing one
* [**log**](#log)                                       Show commit logs
* [**merge**](#merge)                                   Join two or more development histories together
* [**mv**](#mv)                                         Move or rename a file, a directory, or a symlink
* [**pull**](#pull)                                     Fetch from and integrate with another repository or a local branch
* [**pullRequest**](#pullRequest)                       Creates a Pull Request
* [**push**](#push)                                     Update remote refs along with associated objects
* [**rebase**](#rebase)                                 Forward-port local commits to the updated upstream head
* [**remote**](#remote)                                 Manage set of tracked repositories
* [**reset**](#reset)                                   Reset current HEAD to the specified state
* [**rm**](#rm)                                         Remove files from the working tree and from the index
* [**show**](#show)                                     Show various types of objects
* [**status**](#status)                                  Show the working tree status
* [**tag**](#tag)                                       Create, list, delete or verify a tag object signed with GPG

Options parameter is to tweak the 'exec' command as described in:
https://nodejs.org/api/child_process.html#child_process_child_process_exec_command_options_callback

There is a special situation. Once you stablish cwd in the options param, it will be maintained through the rest of the commands

### Direct

#### git.direct(command,options);
Git direct allows the direct execution of a git command that is not available in the API yet

* Examples
```javascript
    var myGitRepo = '/tmp/gitTemp';     //This is where the command will be executed
    var git = new Git(myGitRepo);
    
    git.direct('init')
      .then(function(res){      //Equivalent to 'git init'
        git.direct('add *');                      //Equivalent to 'git add *'
    }).then(function(err){
        console.error(err)
    });
```
### Add

#### git.add(command, options)
Same as 'git add [command]'

* To add all files in /tmp/git and the commit them
```javascript
git.add('*', {cwd:'/tmp/git'}).then(function(msg){
    return git.commit('-m "My commit"');
}).then(function(res){
    console.log(res);
}.fail(function(err){
    console.error(err);
});
```
### Bisect

#### git.bisect(command, options);
Same as 'git bisect [command]'

### Branch

#### git.branch(command, options);
Same as 'git branch [command]'

* To get current branch

```javascript
    git.branch().then(function(res){
        console.log(res)            // master
    }).catch(function(err){
        console.log(err();
    });
```

### Checkout

#### git.checkout(command, options);
Same as 'git checkout [command]'

* To change to branch test

```javascript
    git.checkout('test').then(function(res){
        console.log(res);
    }).catch(function(err){
        console.error(err);
    });
```
### Clone

#### git.clone(command, options);
Same as 'git clone [command]'

* To clone a git repo on current folder

```javascript
    git.clone('https://github.com/sayden/git-command-line.git').then(function(res){
        console.log(res);
    }).catch(function(err){
        console.error(err);
    });
```

* To clone a git repo on /tmp

```javascript
    git.clone('https://github.com/sayden/git-command-line.git /tmp').then(function(res){
        console.log(res);
    }).catch(function(err){
        console.error(err);
    });
```
### Commit

#### git.commit(command, options);
Same as 'git commit [command]'

* Examples
```javascript
    var myGitRepo = '/tmp/gitTemp';     //This is where the command will be executed
    var git = new Git(myGitRepo);
    
    git.commit('-m "My commit"', {cwd:myGitRepo})       //Equivalent to 'git commit -m "My commit"'
      .then(function(msg){
        console.log(msg)
      }).fail(function(err){
        console.log(err);
      });
```

### Diff

#### git.diff(command, options);
Same as 'git diff [command]'


### Fetch

#### git.fetch(command, options);
Same as 'git fetch [command]'

### Grep

#### git.grep(command, options);
Same as 'git grep [command]'

### Init

#### git.init(command, options);
Same as 'git init [command]'


### Log

#### git.log(command, options);
Same as 'git log [command]'

### Merge

#### git.merge(command, options);
Same as 'git merge [command]'


### MV

#### git.mv(command, options);
Same as 'git mv [command]'


### Pull

#### git.pull(command, options);
Same as 'git pull [command]'


### Push

#### git.push(command, options);
Same as 'git push [command]'



### Rebase

#### git.rebase(command, options);
Same as 'git rebase [command]'



### Remote

#### git.remote(command, options);
Same as 'git remote [command]'



### Reset

#### git.reset(command, options);
Same as 'git reset [command]'



### RM

#### git.rm(command, options);
Same as 'git rm [command]'



### Show

#### git.show(command, options);
Same as 'git show [command]' or simple 'git show' if no param specified



### Status

#### git.status(command, options);
Same as 'git status [command]' or simply 'git status' if no param specified

* Examples
```javascript
    git.status()
    .then(function(res){
      console.log(res);
    }).fail(function(err){
      console.log(err);
    });

    //Or...

    git.status('-h')
    .then(function(res){
      console.log(res);
    }).fail(function(err){
      console.log(err);
    });
```


### Tag

#### git.tag(command, options);
Same as 'git tag [command]'

* Examples
```javascript
git.tag('0.1.0').then(function(res){
    console.log(res);

```

#### git.workingDirectory = newPath
Sets the working path for the following git commands

#### git.logging = boolean
Sets the logging of the git command line responses


