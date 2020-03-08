#!/bin/bash
CSS_BUNDLE_FILEPATH="dist/bundle.css";

# bundle css into single 'shared' css file
mkdir dist || true;
touch $CSS_BUNDLE_FILEPATH;
cat assets/css/*.css >> $CSS_BUNDLE_FILEPATH;

# copy site-specific css into dist/
cp ./sites/*.css ./dist/

# move icons into dist/
mkdir ./dist/img || true;
cp ./assets/img/* ./dist/img/