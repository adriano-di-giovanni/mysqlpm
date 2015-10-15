# mysqlpm

A command line utility to backup and restore MySQL partitions.

It is meant to be run on the same machine running the MySQL instance.

## Alpha

This utility is in alpha. It works but **it hasn't been tested extensively**. Successful tests run on Mac OSX, Ubuntu/Debian using MySQL 5.6.x.

## Installation

```
$ npm install -g mysqlpm
```

## Usage

```
  Usage: mysqlpm [options] [command]


  Commands:

    backup|b <database> <table> <partitions...>   backup partitions
    restore|r <database> <table> <partitions...>  restore partitions

  Options:

    -h, --help             output usage information
    -V, --version          output the version number
    -u, --user <name>      user for login if not current user
    -p, --password [name]  password to use when connecting to server
    -d, --dir <name>       directory for partitions
    -v, --verbose          write more
```

### Example

Command below restores partitions `p1`, `p2` and `p3` of table `mytable` of database `my_database`.

Command runs on the same machine running the MySQL instance; local access to MySQL has no password.

Files `p?.{ibd,cfg}` are located in `/srv/mysql/backup` on the above machine's file system.

```
$ mysqlpm -u root -d /srv/mysql/backup restore my_database my_table p1 p2 p3
```
