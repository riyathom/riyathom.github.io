#!/usr/bin/env sh

# abort on errors
set -e

npm run build

cd dist

# deploying to a custom domain
echo 'riyathom.com' > CNAME

# KEEP THIS LIST IN SYNC with the paths in src/router/index.js.
for route in cv publications presentations resources; do
  mkdir -p "$route"
  cp index.html "$route/index.html"
done

git init
git add -A
git commit -m 'deploy'

git -c http.postBuffer=524288000 push -f https://github.com/riyathom/riyathom.github.io.git HEAD:gh-pages

cd -