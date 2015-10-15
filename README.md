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

    backup|b <table> <partitions...>   backup partitions
    restore|r <table> <partitions...>  restore partitions

  Options:

    -h, --help             output usage information
    -V, --version          output the version number
    -h, --host [name]      connect to host
    -u, --user <name>      user for login
    -p, --password [name]  password to use when connecting to server
    -D, --database <name>  database to use
    -d, --dir <name>       directory for partitions
```
