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
        exec('mkdir -p ' + gitRepo + '; touch ' + gitRepo + '/' + file1 + '; touch ' + gitRepo + '/' + file2 +
            '; mkdir -p ' + extRepo, function(err, stdout, stderr){
            done();
        });

        Git.logging = false;
    });

    describe('Main Functions: ', function(){
        it('should create a local repo', function(done){
            exec('mkdir -p ' + localRepo, function(err, stdout, stderr){
                if(err || stderr) done(err);
                else {
                    Git.init('--bare ' + localRepo, {cwd: localRepo}).then(function(msg){
                        msg.res.should.contain('Initialized');
                        fs.existsSync(localRepo + '/HEAD').should.be.true;
                        done();
                    }).fail(done);
                }
            });
        });

        it('should initialize a git repository', function(done){
            Git.init(gitRepo, {cwd: gitRepo}).then(function(mesg){
                fs.exists(gitRepo + '/.git', function(exists){
                    exists.should.be.true;
                    mesg.res.should.contain('Initialized');
                    done();
                });
            }).fail(done);
        });

        it('should add files from a folder', function(done){
            Git.add('*', {cwd: gitRepo }).then(function(msg){
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
    });

    after(function(done){
        //Deletes the tmp folder for testing
        exec('rm -rf ' + root, function(err, stdout, stderr){
            done();
        });
    });
});