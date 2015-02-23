var express = require('express');


var blog = function (models) {
  var router = express.Router();

  /* GET blog page. */
  router.index = function (req, res, next) {
    models.Article.articlesForIndex().then(function (articles) {
      res.render('blog', {articles: articles});
    }, function (err) {
      res.send(500);
    });
  }

  router.get('/', router.index);

  return router
}

module.exports = blog;
