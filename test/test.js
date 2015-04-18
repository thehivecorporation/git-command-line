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
var folder = '/tmp/gitTemp';
var localRepo = '/tmp/localRepo';

describe('GIT-CLI', function(){
    before(function(done){
        //Create a testing repository with two files
        exec('mkdir -p ' + folder + '; touch ' + folder + '/asdf; touch ' + folder + '/qwerq',
            function(err, stdout, stderr){
            done();
        });

        Git.logging = true;
    });

    describe('Main Functions: ', function(){
        it('should create a local repo', function(done){
            exec('mkdir -p ' + localRepo, function(err, stdout, stderr){
                if(err || stderr) done(err);
                else {
                    Git.init('--bare ' + localRepo, {cwd: localRepo}).then(function(msg){
                        msg.should.contain('Initialized');
                        fs.existsSync(localRepo + '/HEAD').should.be.true;
                        done();
                    }).fail(done);
                }
            });
        });

        it('should initialize a git repository', function(done){
            Git.init(folder, {cwd: folder}).then(function(mesg){
                fs.exists(folder + '/.git', function(exists){
                    exists.should.be.true;
                    mesg.should.contain('Initialized');
                    done();
                });
            }).fail(done);
        });

        it('should add files from a folder', function(done){
            Git.add('*', {cwd: folder }).then(function(msg){
                msg.should.be.empty;
                done();
            }).fail(done);
        });

        it('should commit files', function(done){
            Git.commit('-m "My commit"', {cwd: folder })
                .then(function(mesg){
                    done();
                }).fail(done);
        });

        it('should add a new branch called test', function(done){
            var newBranch = 'test';
            Git.branch(newBranch, {cwd: folder })
                .then(function(msg){
                    msg.should.be.empty;
                    done();
                }).fail(done);
        });

        it('should add the local "remote"', function(done){
            Git.remote('add origin ' + localRepo).then(function(msg){
                msg.should.be.empty;
                done();
            }).fail(done);
        });

        it('should push to local remote', function(done){
            Git.push('-u origin master').then(function(msg){
                console.log(msg);
                msg.should.contain('To /tmp/localRepo');
                done();
            }).fail(function(err, stderr){
                console.log(err);
                done();
            });
        });
    });

    after(function(done){
        //Deletes the tmp folder for testing
        exec('rm -rf ' + folder + '; rm -rf ' + localRepo, function(err, stdout, stderr){
            done();
        });
    });
});