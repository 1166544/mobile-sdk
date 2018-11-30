'use strict';

exports.io = {
  namespace: {
    '/': {
      connectionMiddleware: [ 'auth' ],
      packetMiddleware: [ 'filter' ],
    },
    '/chat': {
      connectionMiddleware: [ 'auth' ],
      packetMiddleware: ['filter'],
    },
  },
};

exports.socketConfig = {
  signatureApp : {
    key: '757ebc06869a4833b3337734555e9af5'
  }
};

exports.security = {
    csrf: false,
}

exports.keys = '123';
