'use strict';

module.exports = function loadPage(context, payload, done) {
  context.dispatch('RECEIVE_HAIR_LENGTHS_START', payload);
  context.dispatch('UPDATE_PAGE_TITLE', {
    pageTitle: payload.config.title
  });

  context.service.read('hairLength', {}, {}, function(err, data) {
    if (err) {
      context.dispatch('RECEIVE_HAIR_LENGTHS_FAILURE', payload);
      return done();
    }
    context.dispatch('RECEIVE_HAIR_LENGTHS_SUCCESS', data);
    done();
  });
};
