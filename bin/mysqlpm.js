#!/usr/bin/env node

'use strict';

// core deps
var
    path = require('path'),
    fs = require('fs');

// module deps
var
    program = require('commander'),
    MySQLPartitionManager = require('node-mysqlpm'),
    async = require('async'),
    username = require('username');

// file deps
var
    pkg = require('../package.json');

var
    resolveDir = function (dir) {
        return dir ? path.resolve(process.cwd(), dir) : void 0;
    },
    validate = function (done) {
        var
            dir = program.dir;

        if ( ! dir) {
            done(new Error('Missing dir'));
            return;
        }

        fs.stat(dir, function (error, stats) {
            if (error) {
                done(error);
                return;
            }
            if ( ! stats.isDirectory()) {
                done(new Error('No such directory'));
                return;
            }
        });
    },
    getInstance = function () {
        var
            options = {
                connection: {
                    host: program.host,
                    user: program.user,
                    password: program.password
                },
                backupDir: program.dir
            },
            pm = MySQLPartitionManager.forge(options);

        return pm;
    },
    backup = function (database, table, partitions) {

        async.series(
            [
                validate,
                function (done) {
                    var
                        pm = getInstance();

                    async.eachSeries(partitions, function (partition, callback) {
                        pm.backup({
                            schema: database,
                            table: table,
                            partition: partition
                        }, function (error) {
                            callback(error);
                        });
                    }, done);
                }
            ],
            function (error) {
                if (error) {
                    throw error;
                }
            }
        );
    },
    restore = function (database, table, partitions) {

        async.series(
            [
                validate,
                function (done) {
                    var
                        pm = getInstance();

                    async.eachSeries(partitions, function (partition, callback) {
                        pm.restore({
                            schema: database,
                            table: table,
                            partition: partition
                        }, function (error) {
                            callback(error);
                        });
                    }, done);
                }
            ],
            function (error) {
                if (error) {
                    throw error;
                }
            }
        );
    };


program
    .version(pkg.version)
    .option('-h, --host [name]', 'connect to host', 'localhost')
    .option('-u, --user <name>', 'user for login if not current user', username.sync())
    .option('-p, --password [name]', 'password to use when connecting to server')
    .option('-d, --dir <name>', 'directory for partitions', resolveDir);

program
    .command('backup <database> <table> <partitions...>')
    .alias('b')
    .description('backup partitions')
    .action(backup);

program
    .command('restore <database> <table> <partitions...>')
    .alias('r')
    .description('restore partitions')
    .action(restore);

program
    .parse(process.argv);
