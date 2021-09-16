/**
 * Created by Mario Castro on 4/18/15.
 * Updated by Fabio Costa on 9/15/2021.
 */
var Git = require('../index');
var should = require('should');
var exec = require('child_process').exec;
var fs = require('fs');

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

        git = new Git({
            workingDirectory: gitRepo
        });
    });

    describe('Main Functions: ', function(){
        it('should create a local repo', function(done){
            git.init('--bare ' + localRepo, {cwd: localRepo}).then(function(res){
                should(res.stdout).containEql('Initialized');
                should(fs.existsSync(localRepo + '/HEAD')).be.true;
                done();
            }).catch(done);
        });

        it('should initialize a git repository', function(done){
            git.init(gitRepo).then(function(res){
                fs.exists(gitRepo + '/.git', function(exists){
                    should(exists).be.true;
                    should(res.stdout).containEql('Initialized');
                    done();
                });
            }).catch(done);
        });

        it('should add files from a folder', function(done){
            git.add('*').then(function(res){
                should(res.stdout).be.empty;
                done();
            }).catch(function() {});
        });

        it('should add the credentials of user to commit', function(done){
            git.config('--local user.name "Mario Castro"').then(function(res){
                done();
            }).catch(function() {});
        });

        it('should add the credentials of email to commit', function(done){
            git.config('--local user.email "mariocaster@gmail.com"').then(function(res){
                done();
            }).catch(function() {});
        });

        it('should add credentials', function(done){
            git.config('--local user.name "Mario Castro"').then(function(res){
                return git.config('--local user.email "mariocaster@gmail.com"');
            }).then(function(res){
                done();
            }).catch(function() {});
        });

        it('should commit files', function(done){
            git.commit('-m "' + commitMessage + '"', {cwd: gitRepo })
                .then(function(mesg){
                    should(fs.existsSync(gitRepo + '/.git/COMMIT_EDITres')).be.true;
                    done();
                }).catch(function() {});
        });

        it('should show/log info of the commit', function(done){
            git.show().then(function(res){
                should(res.stdout).containEql('Author: Mario Castro').and.to.containEql(commitMessage);
                return git.log().then(function(res){
                    should(res.stdout).containEql('Author: Mario Castro').and.to.containEql(commitMessage);
                    done();
                });
            }).catch(function() {}).finally(done);
        });

        it('should add the local "remote"', function(done){
            git.remote('add origin ' + localRepo).then(function(res){
                should(res.stdout).be.empty;
                done();
            }).catch(function() {});
        });

        it('should push to local remote', function(done){
            git.push('-u origin master').then(function(res){
                should(res.stdout).containEql('Branch');
                should(res.stdout).containEql('To ' + localRepo);
                done();
            }).catch(function() {}).finally(done);
        });

        it('should clone a git repo', function(done){
            git.clone(localRepo + ' ' + extRepo).then(function(res){
                should(fs.existsSync(extRepo + "/.git")).be.true;
                done();
            });
            // this one does not have a ;
        });

        it('should show the status', function(done){
            git.status().then(function(res){
                should(res.stdout).containEql('On branch ').and.containEql('nothing to commit');
                done();
            }).catch(function() {});
        });

        it('should pull from the local repo', function(done){
            git.pull().then(function(res){
                should(res.stdout).containEql('Already up-to-date');
                done();
            }).catch(function() {}).finally(done);
        });

        it('should add a new branch called test', function(done){
            var newBranch = 'test';
            git.branch(newBranch, {cwd: gitRepo })
                .then(function(res){
                    should(res.stdout).be.empty;
                    done();
                }).catch(function() {});
        });

        it('should checkout to the newly created test branch', function(done){
            var newBranch = 'test';
            git.checkout(newBranch).then(function(res){
                should(res.stdout).be.empty;
                done();
            }).catch(function() {});
        });

        it('should delete the file1', function(done){
            git.rm(file1).then(function(res){
                should(res.stdout).containEql('rm \'' + file1);
                done();
            }).catch(function() {});
        });

        it('should reset the repo', function(done){
            git.reset().then(function(res){
                should(res.stdout).containEql('Unstaged changes');
                done();
            }).catch(function() {});
        });

        it('should allow the use of the bisect command', function(done){
            git.bisect('start').then(function(res){
                should(res.stdout).be.empty;
                done();
            }).catch(function() {});
        });

        it('should allow the use of the rebase command', function(done){
            git.rebase('master').then(function(){
                done()
            }).catch(function(err){
                should(err.stderr).containEql('Cannot rebase');
                done();
            }).catch(function() {}).finally(done);
        });

        it('should allow the direct execution of a command', function(done){
            git.git('status').then(function(res){
                should(res.stdout).containEql('On branch');
                done();
            }).catch(function() {});
        });

        it('should allow the use of the diff command', function(done){
            git.diff(file2).then(function(res){
                should(res.stdout).be.empty;
                done();
            }).catch(function() {});
        });

        it('should allow to fetch content', function(done){
            git.fetch().then(function(res){
                should(res.stdout).be.empty;
                done()
            }).catch(function() {});
        });

        it('should allow to use of command grep', function(done){
            //Add some text into the file2
            var exampleCode = 'example code';
            exec('echo "example code" >> ' + file2, {cwd:gitRepo}, function(err, stdout, stderr){
                git.grep('example', {cwd:gitRepo}).then(function(res){
                    should(res.stdout).containEql(exampleCode);
                    done()
                }).catch(function() {});
            });
        });

        it('should rename the file2 to zxcvb and the back to original name', function(done){
            var newName = 'zxcvb';
            git.mv(file2 + ' ' + newName).then(function(res){
                should(res.stdout).be.empty;
                should(fs.existsSync(gitRepo + '/' + newName)).be.true;
                should(fs.existsSync(gitRepo + '/' + file2)).be.false;

                return git.mv(newName + ' ' + file2);
            }).then(function(res){
                should(res.stdout).be.empty;
                should(fs.existsSync(gitRepo + '/' + file2)).be.true;
                should(fs.existsSync(gitRepo + '/' + newName)).be.false;
                done();
            }).catch(function() {});
        });

        it('should merge the test branch on master',function(done){
            //First, we're in test so lets add all changes and commit them
            git.add('*').then(function(res){
                should(res.stdout).be.empty;

                return git.commit('-m "new commit"');
            }).then(function(res){
                should(res.stdout).be.empty;

                return git.checkout('master');
            }).then(function(res){
                //Now we're in master so merge the branch test
                should(res.stdout).be.empty;

                return git.merge('test');
            }).then(function(res){
                should(res.stdout).containEql('Updating').and.containEql(file2);
                done();
            }).catch(function() {});
        });

        it('should allow the execution of tag command', function(done){
            git.tag("-a 'asdf' -m 'asdf'").then(function(res){
                should(res.stdout).be.empty;
                done();
            }).catch(function() {});
        })
    });

    after(function(done){
        //Deletes the tmp folder for testing
        exec('rm -rf ' + root, function(err, stdout, stderr){
            done();
        });
    });
});
