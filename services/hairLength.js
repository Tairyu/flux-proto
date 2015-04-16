'use strict';
const formatUrl = require('url').format;
const request = require('request');

const URL = {
  protocol: 'http',
  hostname: 'webservice.recruit.co.jp',
  pathname: '/beauty/hair_length/v1',
  query: {
    key: '4e7a2c4ee6a43fac',
    format: 'json',
    count: 100
  }
};

module.exports = {
  name: 'hairLength',

  read: function(req, resource, params, config, cb) {
    console.log('read from hair-length service');
    request(formatUrl(URL), function(err, res, body) {
      if (err) {
        return cb(err);
      }
      if (res.statusCode !== 200) {
        return cb(new Error(`HTTP request failed. status=${res.statusCode}`));
      }
      if (!body || typeof body !== 'string') {
        return cb(new Error(`Unknown result. body: ${body}`));
      }
      const json = JSON.parse(body);
      console.log(json);
      if (!json || !json.results) {
        return cb(new Error(`Illegal result. json: ${json}`));
      }
      const results = json.results;
      if (results.error) {
        return cb(new Error(`${results.error.code}: ${results.error.message}`));
      }
      cb(null, results);
    });
  },

  create: function(req, resource, params, body, config, cb) {
  }
};
