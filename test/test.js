/**
 * Created by Mario Castro on 4/18/15.
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

        Git = new Git(gitRepo);
    });

    describe('Main Functions: ', function(){
        it('should create a local repo', function(done){
            Git.init('--bare ' + localRepo, {cwd: localRepo}).then(function(msg){
                msg.res.should.contain('Initialized');
                fs.existsSync(localRepo + '/HEAD').should.be.true;
                done();
            }).fail(done);
        });

        it('should initialize a git repository', function(done){
            Git.init(gitRepo).then(function(mesg){
                fs.exists(gitRepo + '/.git', function(exists){
                    exists.should.be.true;
                    mesg.res.should.contain('Initialized');
                    done();
                });
            }).fail(done);
        });

        it('should add files from a folder', function(done){
            Git.setWorkingDirectory(gitRepo);
            Git.add('*').then(function(msg){
                msg.res.should.be.empty;
                done();
            }).fail(done);
        });

        it('should add the credentials of user to commit', function(done){
            Git.config('--local user.name "Mario Castro"').then(function(msg){
                done();
            }).fail(done);
        });

        it('should add the credentials of email to commit', function(done){
            Git.config('--local user.email "mariocaster@gmail.com"').then(function(msg){
                done();
            }).fail(done);
        });

        it('should add credentials', function(done){
            Git.config('--local user.name "Mario Castro"').then(function(msg){
                return Git.config('--local user.email "mariocaster@gmail.com"');
            }).then(function(msg){
                done();
            }).fail(done);
        });

        it('should commit files', function(done){
            Git.commit('-m "' + commitMessage + '"', {cwd: gitRepo })
                .then(function(mesg){
                    fs.existsSync(gitRepo + '/.git/COMMIT_EDITMSG').should.be.true;
                    done();
                }).fail(done);
        });

        it('should show/log info of the commit', function(done){
            Git.show().then(function(msg){
                msg.res.should.contain('Author: Mario Castro').and.to.contain(commitMessage);
                return Git.log().then(function(msg){
                    msg.res.should.contain('Author: Mario Castro').and.to.contain(commitMessage);
                    done();
                });
            }).fail(done);
        });

        it('should add the local "remote"', function(done){
            Git.remote('add origin ' + localRepo).then(function(msg){
                msg.res.should.be.empty;
                done();
            }).fail(done);
        });

        it('should push to local remote', function(done){
            Git.push('-u origin master').then(function(msg){
                msg.res.should.contain('Branch');
                msg.out.should.contain('To ' + localRepo);
                done();
            }).fail(done);
        });

        it('should clone a git repo', function(done){
            Git.clone(localRepo + ' ' + extRepo).then(function(msg){
                fs.existsSync(extRepo + "/.git").should.be.true;
                done();
            }).fail(done);
        });

        it('should show the status', function(done){
            Git.status().then(function(res){
                res.res.should.contain('On branch ').and.to.contain('nothing to commit');
                done();
            }).fail(done);
        });

        it('should pull from the local repo', function(done){
            Git.pull().then(function(res){
                res.out.should.be.empty;
                res.res.should.contain('Already up-to-date');
                done();
            });
        });

        it('should add a new branch called test', function(done){
            var newBranch = 'test';
            Git.branch(newBranch, {cwd: gitRepo })
                .then(function(msg){
                    msg.res.should.be.empty;
                    done();
                }).fail(done);
        });

        it('should checkout to the newly created test branch', function(done){
            var newBranch = 'test';
            Git.checkout(newBranch).then(function(msg){
                msg.res.should.be.empty;
                done();
            }).fail(done);
        });

        it('should delete the file1', function(done){
            Git.rm(file1).then(function(res){
                res.res.should.contain('rm \'' + file1);
                done();
            }).fail(done);
        });

        it('should reset the repo', function(done){
            Git.reset().then(function(res){
                res.out.should.be.empty;
                res.res.should.contain('Unstaged changes');
                done();
            }).fail(done);
        });

        it('should allow the use of the bisect command', function(done){
            Git.bisect('start').then(function(res){
                res.res.should.be.empty;
                res.out.should.be.empty;
                done();
            }).fail(done);
        });

        it('should allow the use of the rebase command', function(done){
            Git.rebase('master').then(function(res){
                done()
            }).fail(function(err){
                err.stderr.should.contain('Cannot rebase');
                done();
            });
        });

        it('should allow the direct execution of a command', function(done){
            Git.direct('status').then(function(res){
                res.res.should.contain('On branch');
                done();
            }).fail(done);
        });

        it('should allow the use of the diff command', function(done){
            Git.diff(file2).then(function(res){
                res.res.should.be.empty;
                done();
            }).fail(done);
        });

        it('should allow to fetch content', function(done){
            Git.fetch().then(function(res){
                res.res.should.be.empty;
                done()
            }).fail(done);
        });

        it('should allow to use of command grep', function(done){
            //Add some text into the file2
            var exampleCode = 'example code';
            exec('echo "example code" >> ' + file2, {cwd:gitRepo}, function(err, stdout, stderr){
                Git.grep('example', {cwd:gitRepo}).then(function(res){
                    res.out.should.be.empty;
                    res.res.should.contain(exampleCode);
                    done()
                }).fail(done);
            });
        });

        it('should rename the file2 to zxcvb and the back to original name', function(done){
            var newName = 'zxcvb';
            Git.mv(file2 + ' ' + newName).then(function(res){
                res.res.should.be.empty;
                res.out.should.be.empty;
                fs.existsSync(gitRepo + '/' + newName).should.be.true;
                fs.existsSync(gitRepo + '/' + file2).should.be.false;
                return Git.mv(newName + ' ' + file2);
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
            Git.add('*').then(function(res){
                res.res.should.be.empty;
                return Git.commit('-m "new commit"');
            }).then(function(res){
                return Git.checkout('master');
            }).then(function(res){
                //Now we're in master so merge the branch test
                return Git.merge('test');
            }).then(function(res){
                res.out.should.be.empty;
                res.res.should.contain('Updating').and.contain(file2);
                done();
            }).fail(done);
        });

        it('should set on and off logging', function(){
            Git.setLog(true);
            Git.getLog().should.be.true;
            Git.setLog(false);
            Git.getLog().should.be.false;
        });

        it('should set and get the working directory', function(){
            Git.setWorkingDirectory(gitRepo);
            Git.getWorkingDirectory().should.be.equals(gitRepo);
        });

        it('should allow the execution of tag command', function(done){
            Git.tag("-a 'asdf' -m 'asdf'").then(function(res){
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