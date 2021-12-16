const bunyan = require('bunyan');

var log = bunyan.createLogger({name: 's3Restore'});

/**
 * bunyan info
 */
 function info(msg) {
    log.info(msg);
  }
  
  /**
   * bunyan error
   */
  function error(msg) {
    log.error(msg);
  }
  
  module.exports = {
    error,
    info
  };
  