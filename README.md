# mysqlpm

A command line utility to backup and restore MySQL partitions.

## Alpha

This utility is in alpha.

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
