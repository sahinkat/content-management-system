'use strict';

/**
 * Expose
 */

module.exports = {
  db: process.env.MONGODB_URL || 'mongodb://127.0.0.1:27017/dynamicMessages',
  port: process.env.PORT || 3000,
  ldap: {
    dn: 'dc=example,dc=com',
    url: 'ldap://ldap.forumsys.com'
  }
};
