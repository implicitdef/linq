#!/bin/sh
npm run build
git add build
git commit -m 'deploy'
git push
git subtree push --prefix build origin gh-pages