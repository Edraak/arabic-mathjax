#!/usr/bin/env bash
DIR=$(cd -P -- "$(dirname -- "$0")" && pwd -P)

#docker build -t mathjax .

docker run -p "80:80"  \
           -v "/Users/omar/mathjax:/code/"   \
           -it mathjax
