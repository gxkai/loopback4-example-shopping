#!/bin/bash
tar=$1
project=$2
root=$3
cd "${root}"
tar -xzf "${tar}"
cd "${project}"
npm config set user root
npm i
