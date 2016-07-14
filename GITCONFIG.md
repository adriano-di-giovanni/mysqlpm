# .gitconfig

## Introduction

`.gitconfig` is meant to be an easy way to share remote settings between cloned repos.

## How to use

Add text below to your `.git/config`

```
[include]
        path = ../.gitconfig
```

Add remotes to `.gitconfig`

```
[remote "mysql-master"]
  url = ssh://root@95.110.215.59/srv/git-bare-repos/si-mysql-admin.git
  fetch = +refs/heads/*:refs/remotes/mysql-master/*
```