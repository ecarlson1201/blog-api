const chai = require('chai');
const chaiHttp = require('chai-http');

const {app, runServer, closeServer} = require('../app');

const expect = chai.expect;

chai.use(chaiHttp);

describe('Users', function() {

 /* before(function() {
    return runServer();
  });


  after(function() {
    return closeServer();
  });*/

  it('should list users on GET', function() {
    return chai.request(app)
      .get('/blog-posts')
      .then(function(res) {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.a('array');
        expect(res.body.length).to.be.above(0);
        res.body.forEach(function(item) {
          expect(item).to.be.a('object');
          expect(item).to.have.all.keys(
            'id', 'title', 'content', 'author', 'publishDate');
        });
      });
  });

  it("should add an item on POST", function() {
    const newItem = {title: 'my third blog', content: 'hello world again', author: "Alden", publishDate: '11/13/18'};
    return chai
      .request(app)
      .post("/blog-posts")
      .send(newItem)
      .then(function(res) {
        expect(res).to.have.status(201);
        expect(res).to.be.json;
        expect(res.body).to.be.a("object");
        expect(res.body).to.include.keys('id', 'title', 'content', 'author', 'publishDate');
        expect(res.body.id).to.not.equal(null);
        expect(res.body).to.deep.equal(
          Object.assign(newItem, { id: res.body.id })
        );
      });
  });

  it("should update items on PUT", function() {

    const updateData = {
      title: "foo",
      content: "bar",
      author: "fizz",
      publishDate: "buzz"
    };

    return (
      chai
        .request(app)
        .get("/blog-posts")
        .then(function(res) {
          updateData.id = res.body[0].id;
          return chai
            .request(app)
            .put(`/blog-posts/${updateData.id}`)
            .send(updateData);
        })
        .then(function(res) {
          expect(res).to.have.status(204);
        })
    );
  });


  it("should delete items on DELETE", function() {
    return (
      chai
        .request(app)
        .get("/blog-posts")
        .then(function(res) {
          return chai.request(app).delete(`/blog-posts/${res.body[0].id}`);
        })
        .then(function(res) {
          expect(res).to.have.status(204);
        })
    );
  });
});

