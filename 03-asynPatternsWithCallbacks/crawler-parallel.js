"use strict";
// Parallel Execution
const request = require('request');
const fs = require('fs');
const mkdirp = require('mkdirp');
const path = require('path');
const utilities = require('./utilities');

function saveFile(filename, contents, callback) {
  mkdirp(path.dirname(filename), err => {
    if(err) {
        return callback(err);
    } else {
      fs.writeFile(filename, contents, callback);
    }
  });
};

function download(url, filename, callback) {
  console.log(`Downloading ${url}`);
  request(url, (err, response, body) => {
    if (err) {
      return callback(err);
    }
    saveFile(filename, body, err => {
      if (err) {
        return callback(err);
      }
      console.log(`Downloaded and saved: ${url}`);
      callback(null, body);
    });
  });
};

function spiderLinks(currentUrl, body, nesting, callback) {
  if (nesting === 0) {
    return process.nextTick(callback);
  }
  const links = utilities.getPageLinks(currentUrl, body);
  if (links.length === 0) {
    return process.nextTick(callback);
  }

  let completed = 0, hasErrors = false;

  function done(err) {
    if (err) {
      hasErrors = true;
      return callback(err);
    }
    if (++completed === links.length && !hasErrors) {
      return callback();
    }
  }

  links.forEach(link => {
    // done function increases the counter and once all have processed, the final callback is invoked
    spider(link, nesting - 1, done);
  });
};

const spidering = new Map();
// Iterates over a collection while applying an asynchronous operation
function spider(url, nesting, callback) {
  // Prevents race condition of the creation of duplicate files.
  if (spidering.has(url)) {
    return process.nextTick(callback);
  }
  spidering.set(url, true);

  const filename = utilities.urlToFilename(url);
  // Read instead of checking if exists in order to resume interrupted downloads.
  fs.readFile(filename, 'utf8', (err, body) => {
    if (err) {
      if (err.code !== 'ENOENT') {
        return callback(err);
      }

      return download(url, filename, (err, body) => {
        if (err) {
          return callback(err);
        }
        spiderLinks(url, body, nesting, callback);
      });
    }
    spiderLinks(url, body, nesting, callback);
  });
};

spider(process.argv[2], 1, (err, filename, downloaded) => {
  if (err) {
    console.log(err);
  } else if (downloaded){
    console.log(`Completed the download of "${filename}"`);
  } else {
    console.log(`"${filename}" was already downloaded`);
  }
});
