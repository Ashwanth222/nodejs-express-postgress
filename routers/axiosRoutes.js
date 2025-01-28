"use-strict"
var axiosList = require('../controllers/axiosController');

module.exports = function(app) {
  app.route('/axios/getAll')
    .get(axiosList.getReviews);

  app.route('/axios/create')
    .post(axiosList.createReviews);

    app.route('/axios/:id')
    .get(axiosList.getReviewById);

    app.route('/axios/:id')
    .delete(axiosList.deletereviewById);

    app.route('/axios/update/:id')
    .put(axiosList.updateReview);

};