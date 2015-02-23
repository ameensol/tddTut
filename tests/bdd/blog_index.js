'use strict';

// Instantiate the app module to start the web server
require('../../server');

// Use chai and chai-as-promised for assertions
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
chai.should();

var Q = require('q');
var sequelize = require('../../db').sequelize;
var models = require('../../models')(sequelize);
sequelize.sync({force: true});

// Use the wd library for webdriver
var wd = require('wd');

// Link chai-as-promised and wd promise chaining
chaiAsPromised.transferPromiseness = wd.transferPromiseness

var articleFixtureDocs = [
  {
    title: 'title',
    summary: 'summary',
    body: 'body'
  },
  {
    title: 'title2',
    summary: 'summary2',
    body: 'body2'
  }
]

function createArticleFixtures() {
  return Q.all(articleFixtureDocs.map(function (doc) {
    return models.Article.create(doc);
  }));
}

// browser driver
var browser = wd.promiseChainRemote();

// Blog Index Suite
describe('Blog Index', function () {

  // Mocha's 2 second timeout is slow when webdriver is starting up
  this.timeout(6000);

  before(function (done) {
    // Open browser using webdriver remote
    browser.init({browserName:'firefox'})
    .then(function () {
      done();
    });
  });

  beforeEach(function (done) {
    createArticleFixtures().then(function () {
      return browser.get('http://localhost:3000/blog/')
    }).then(function () {
      done();
    });
  });

  after(function (done) {
    // Quit browser
    browser.quit()
    .then(function () {
      done();
    });
  });

  // Tests here

  /** As a visitor,
   * I would like to see summaries of the last few blog posts on the blog
   * index
   */
  it('displays a number of article summaries on the blog index', function (done) {
    browser.elementsByCssSelector('.article-summary')
    .should.eventually.have.length.above(0).notify(done)
  });
});
