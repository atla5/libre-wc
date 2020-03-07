#!/bin/bash
CSS_BUNDLE_FILEPATH="dist/bundle.css";

# bundle css into single 'shared' css file
mkdir dist || true;
touch $CSS_BUNDLE_FILEPATH;
cat assets/css/*.css >> $CSS_BUNDLE_FILEPATH;

# copy site-specific css into dist/
cp ./sites/libanswers/libanswers.css ./dist/libanswers.css

# move icons into dist/
mkdir ./dist/icons || true;
cp ./assets/icons/* ./dist/icons/