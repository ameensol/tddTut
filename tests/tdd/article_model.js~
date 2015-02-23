module.exports = function (sequelize, models) {
  'use strict';

  var Q = require('q')
  var should = require('chai').should();

  describe('Article Model', function () {

    describe('Validation', function () {

      it('should create a model with valid properties', function (done) {
        var article = {
          title: 'thing',
          summary: 'thing',
          body: 'thing'
        }

        models.Article.create(article).should.not.be.rejected.notify(done)
      });

      it('should not be valid without a title', function (done) {
        var article = {
          summary: 'thing',
          body: 'thing'
        }

        models.Article.create(article).should.be.rejected.notify(done);
      });

      it('should not be valid without a summary', function (done) {
        var article = {
          title: 'thing',
          body: 'thing'
        }

        models.Article.create(article).should.be.rejected.notify(done);
      });

      it('should not be valid without a body', function (done) {
        var article = {
          title: 'thing',
          summary: 'thing'
        }

        models.Article.create(article).should.be.rejected.notify(done);
      });
    })

    describe('articlesForIndex', function () {
      function addArticleFixture(offsetSeconds) {
        return models.Article.create({
          title: 'Fixture Article',
          summary: 'This is the summary of an article from a fixture',
          body: 'This is the body of an article ...',
          createdAt: new Date(new Date().getTime() - (offsetSeconds * 1000))
        });
      }

      beforeEach(function (done) {
        Q.all([
          addArticleFixture(40),
          addArticleFixture(30),
          addArticleFixture(20),
          addArticleFixture(10),
        ]).then(function () {
          done()
        })
      });

      it('should define a function "articlesForIndex"', function () {
        should.exist(models.Article.articlesForIndex);
      });

      it('returns all the articles from the database', function (done) {
        models.Article.articlesForIndex()
        .should.eventually.have.length(4).notify(done);
      });

      it('should return all the article models in created order', function (done) {
        models.Article.articlesForIndex().then(function (articles) {
          articles.forEach(function (article) {
            console.log(article.createdAt)
          })
          var t = new Date().getTime();
          return Q(articles.every(function (a) {
            if (t >= a.createdAt.getTime()) {
              t = a.createdAt.getTime();
              return true;
            }
            return false
          }))
        }).should.eventually.be.true.notify(done);
      })
    });
  });
}
