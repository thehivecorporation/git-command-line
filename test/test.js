/**
 * Created by Mario Castro on 4/18/15.
 * Updated by Fabio Costa on 9/15/2021.
 */

var Git = require('../index');
var chai = require('chai');
var mocha = require('mocha');
var exec = require('child_process').exec;
var fs = require('fs');
var should = chai.should();

/** GLOBALS */
var root = '/tmp/gitTemp';
var gitRepo = root + '/gitRepo';
var localRepo = root + '/localRepo';
var extRepo = root + '/extRepo';
var file1 = 'asdf';
var file2 = 'qwert';
var commitMessage = 'My commit';

var git;

describe('GIT-CLI', function(){
    before(function(done){
        //Create a testing repository with two files
        exec('mkdir -p ' + gitRepo +
             '; touch ' + gitRepo + '/' + file1 +
             '; touch ' + gitRepo + '/' + file2 +
             '; mkdir -p ' + extRepo +
             '; mkdir -p ' + localRepo, function(err, stdout, stderr){
            done();
        });

        git = new Git(gitRepo);
    });

    describe('Main Functions: ', function(){
        it('should create a local repo', function(done){
            git.init('--bare ' + localRepo, {cwd: localRepo}).then(function(msg){
                msg.res.should.contain('Initialized');
                fs.existsSync(localRepo + '/HEAD').should.be.true;
                done();
            }).fail(done);
        });

        it('should initialize a git repository', function(done){
            git.init(gitRepo).then(function(mesg){
                fs.exists(gitRepo + '/.git', function(exists){
                    exists.should.be.true;
                    mesg.res.should.contain('Initialized');
                    done();
                });
            }).fail(done);
        });

        it('should add files from a folder', function(done){
            git.setWorkingDirectory(gitRepo);
            git.add('*').then(function(msg){
                msg.res.should.be.empty;
                done();
            }).fail(done);
        });

        it('should add the credentials of user to commit', function(done){
            git.config('--local user.name "Mario Castro"').then(function(msg){
                done();
            }).fail(done);
        });

        it('should add the credentials of email to commit', function(done){
            git.config('--local user.email "mariocaster@gmail.com"').then(function(msg){
                done();
            }).fail(done);
        });

        it('should add credentials', function(done){
            git.config('--local user.name "Mario Castro"').then(function(msg){
                return git.config('--local user.email "mariocaster@gmail.com"');
            }).then(function(msg){
                done();
            }).fail(done);
        });

        it('should commit files', function(done){
            git.commit('-m "' + commitMessage + '"', {cwd: gitRepo })
                .then(function(mesg){
                    fs.existsSync(gitRepo + '/.git/COMMIT_EDITMSG').should.be.true;
                    done();
                }).fail(done);
        });

        it('should show/log info of the commit', function(done){
            git.show().then(function(msg){
                msg.res.should.contain('Author: Mario Castro').and.to.contain(commitMessage);
                return git.log().then(function(msg){
                    msg.res.should.contain('Author: Mario Castro').and.to.contain(commitMessage);
                    done();
                });
            }).fail(done);
        });

        it('should add the local "remote"', function(done){
            git.remote('add origin ' + localRepo).then(function(msg){
                msg.res.should.be.empty;
                done();
            }).fail(done);
        });

        it('should push to local remote', function(done){
            git.push('-u origin master').then(function(msg){
                msg.res.should.contain('Branch');
                msg.out.should.contain('To ' + localRepo);
                done();
            }).fail(done);
        });

        it('should clone a git repo', function(done){
            git.clone(localRepo + ' ' + extRepo).then(function(msg){
                fs.existsSync(extRepo + "/.git").should.be.true;
                done();
            }).fail(done);
        });

        it('should show the status', function(done){
            git.status().then(function(res){
                res.res.should.contain('On branch ').and.to.contain('nothing to commit');
                done();
            }).fail(done);
        });

        it('should pull from the local repo', function(done){
            git.pull().then(function(res){
                res.out.should.be.empty;
                res.res.should.contain('Already up-to-date');
                done();
            });
        });

        it('should add a new branch called test', function(done){
            var newBranch = 'test';
            git.branch(newBranch, {cwd: gitRepo })
                .then(function(msg){
                    msg.res.should.be.empty;
                    done();
                }).fail(done);
        });

        it('should checkout to the newly created test branch', function(done){
            var newBranch = 'test';
            git.checkout(newBranch).then(function(msg){
                msg.res.should.be.empty;
                done();
            }).fail(done);
        });

        it('should delete the file1', function(done){
            git.rm(file1).then(function(res){
                res.res.should.contain('rm \'' + file1);
                done();
            }).fail(done);
        });

        it('should reset the repo', function(done){
            git.reset().then(function(res){
                res.out.should.be.empty;
                res.res.should.contain('Unstaged changes');
                done();
            }).fail(done);
        });

        it('should allow the use of the bisect command', function(done){
            git.bisect('start').then(function(res){
                res.res.should.be.empty;
                res.out.should.be.empty;
                done();
            }).fail(done);
        });

        it('should allow the use of the rebase command', function(done){
            git.rebase('master').then(function(res){
                done()
            }).fail(function(err){
                err.stderr.should.contain('Cannot rebase');
                done();
            });
        });

        it('should allow the direct execution of a command', function(done){
            git.git('status').then(function(res){
                res.res.should.contain('On branch');
                done();
            }).fail(done);
        });

        it('should allow the use of the diff command', function(done){
            git.diff(file2).then(function(res){
                res.res.should.be.empty;
                done();
            }).fail(done);
        });

        it('should allow to fetch content', function(done){
            git.fetch().then(function(res){
                res.res.should.be.empty;
                done()
            }).fail(done);
        });

        it('should allow to use of command grep', function(done){
            //Add some text into the file2
            var exampleCode = 'example code';
            exec('echo "example code" >> ' + file2, {cwd:gitRepo}, function(err, stdout, stderr){
                git.grep('example', {cwd:gitRepo}).then(function(res){
                    res.out.should.be.empty;
                    res.res.should.contain(exampleCode);
                    done()
                }).fail(done);
            });
        });

        it('should rename the file2 to zxcvb and the back to original name', function(done){
            var newName = 'zxcvb';
            git.mv(file2 + ' ' + newName).then(function(res){
                res.res.should.be.empty;
                res.out.should.be.empty;
                fs.existsSync(gitRepo + '/' + newName).should.be.true;
                fs.existsSync(gitRepo + '/' + file2).should.be.false;
                return git.mv(newName + ' ' + file2);
            }).then(function(res){
                res.res.should.be.empty;
                res.out.should.be.empty;
                fs.existsSync(gitRepo + '/' + file2).should.be.true;
                fs.existsSync(gitRepo + '/' + newName).should.be.false;
                done();
            }).fail(done);
        });

        it('should merge the test branch on master',function(done){
            //First, we're in test so lets add all changes and commit them
            git.add('*').then(function(res){
                res.res.should.be.empty;
                return git.commit('-m "new commit"');
            }).then(function(res){
                return git.checkout('master');
            }).then(function(res){
                //Now we're in master so merge the branch test
                return git.merge('test');
            }).then(function(res){
                res.out.should.be.empty;
                res.res.should.contain('Updating').and.contain(file2);
                done();
            }).fail(done);
        });

        it('should set and get the working directory', function(){
            git.setWorkingDirectory(gitRepo);
            should(git.workingDirectory).be.equals(gitRepo);
        });

        it('should allow the execution of tag command', function(done){
            git.tag("-a 'asdf' -m 'asdf'").then(function(res){
                res.res.should.be.empty;
                res.out.should.be.empty;
                done();
            });
        })
    });

    after(function(done){
        //Deletes the tmp folder for testing
        exec('rm -rf ' + root, function(err, stdout, stderr){
            done();
        });
    });
});