#!/bin/bash

previousBranchName = git branch | grep \* | cut -d ' ' -f2

git checkout gh-pages
git pull
cp talk/resouces resouces
cp talk/slides.html index.html
git add resources/* index.html
git commit -m "deploy new version of slides"
git push -u origin gh-pages
rm -rf resouces
rm index.html

# back to previous branch
git checkout $previousBranchName