/**
 * Copyright reelyActive 2015
 * We believe in an open Internet of Things
 */

var express = require('express');
var path = require('path');
var responseHandler = require('../responsehandler');


var router = express.Router();

router.route('/transmitter/:id')
  .get(function(req, res) {
    retrieveWhatNearTransmitter(req, res);
  });


/**
 * Retrieve everything that is decoded by the strongest receiver of a specific
 * transmitter device.
 * @param {Object} req The HTTP request.
 * @param {Object} res The HTTP result.
 */
function retrieveWhatNearTransmitter(req, res) {
  switch(req.accepts(['json', 'html'])) {
    case 'html':
      res.sendFile(path.resolve(__dirname + '/../../web/response.html'));
      break;
    default:
      var options = { query: 'receivedBySame',
                      ids: [ req.param('id') ] };
      var rootUrl = req.protocol + '://' + req.get('host');
      var queryPath = req.originalUrl;
      req.instance.getDevicesState(options, rootUrl, queryPath,
                                   function(response, status) {
        res.status(status).json(response);
      });
      break;
  }
}


module.exports = router;