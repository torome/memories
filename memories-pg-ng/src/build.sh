#!/bin/sh
rm -rf ../www && mkdir ../www && grunt build && cp -r ./dist/* ../www