'use strict';

/**
 * Expose
 */

module.exports = {
  db: process.env.MONGODB_URL || 'mongodb://127.0.0.1:27017/dynamicMessages',
};
