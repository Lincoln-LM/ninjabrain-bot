#!/usr/bin/env sh

npx @rose-pine/build@latest -t ./template.json -o ./themes
for file in ./themes/*.json; do
  node serialize-theme.js "$file"
done