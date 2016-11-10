// var should=require("should");
// var request=require("request");
var chai = require('chai');
var chaiHttp = require('chai-http');
var should = chai.should();

chai.use(chaiHttp);

var expect = require("chai").expect;

var baseUrl = "http://localhost:1337/v1";
let promise;
let token;

describe('Bunker api validate with liftray', function() {
    // need to renew timestamp from this token
    it('validate Authentication', function(done) {
        chai.request(baseUrl)
            .get('/auth')
            .set({
                token: 'OGQ2NDM5ZTEtMDdjZC00MWMxLWFmZDAtNGYyODQ4ZTlhMDlka5f3d'
            })
            .end(function(err, res) {
                res.should.have.status(200);
                res.body.code.should.equal(200);
                res.should.be.json;
                res.body.success.should.equal(true);
                res.body.should.have.property('result');
                res.body.should.be.a('object');
                res.body.result.should.have.property('email');
                res.body.result.role.should.be.a('object');
                res.body.result.session_token.should.be.a('object');

                done();
            });
    });

    it("get users' favorites", function(done) {
        chai.request(baseUrl)
            .get('/favorites')
            .set("token", 'OGQ2NDM5ZTEtMDdjZC00MWMxLWFmZDAtNGYyODQ4ZTlhMDlka5f3d')
            .end(function(err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.success.should.equal(true);

                done();
            });
    });

    it('create favorite', function(done) {
        chai.request(baseUrl)
            .post('/favorite')
            .set({ // header
                "token": 'OGQ2NDM5ZTEtMDdjZC00MWMxLWFmZDAtNGYyODQ4ZTlhMDlka5f3d'
            })
            .send({ // body
                "document": "581b0e6c9cc8dc7c2403bede",
                "type": "product"
            })
            .end(function(err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.success.should.equal(true);

                done();
            });
    });
});

describe('Bunker api user action history', function() {
    it('get user action histories', function(done) {
        chai.request(baseUrl)
            .get('/histories')
            .set({ // header
                "token": 'OGQ2NDM5ZTEtMDdjZC00MWMxLWFmZDAtNGYyODQ4ZTlhMDlka5f3d'
            })
            .end(function(err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.success.should.equal(true);

                done();
            });
    });

    it('get user action history | back ', function(done) {
        chai.request(baseUrl)
            .get('/history/back')
            .set({ // header
                "token": 'OGQ2NDM5ZTEtMDdjZC00MWMxLWFmZDAtNGYyODQ4ZTlhMDlka5f3d'
            })
            .end(function(err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.success.should.equal(true);

                done();
            });
    });

    it('get user action history | mostViewedByUser ', function(done) {
        chai.request(baseUrl)
            .get('/history/mostViewedByUser')
            .set({ // header
                "token": 'OGQ2NDM5ZTEtMDdjZC00MWMxLWFmZDAtNGYyODQ4ZTlhMDlka5f3d'
            })
            .end(function(err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.success.should.equal(true);

                done();
            });
    });

    it('get user action history | mostViewed ', function(done) {
        chai.request(baseUrl)
            .get('/history/mostViewedByUser')
            .set({ // header
                "token": 'OGQ2NDM5ZTEtMDdjZC00MWMxLWFmZDAtNGYyODQ4ZTlhMDlka5f3d'
            })
            .end(function(err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.success.should.equal(true);

                done();
            });
    });


});
/*
describe('Bunker Login Sails Test', function() {
    it('login', function(done) {
        chai.request(baseUrl)
            .post('/login')
            .send({
                "email": "khmer",
                "password": "123"
            })
            .end(function(err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.success.should.equal(true);
                res.body.should.have.property('result');
                res.body.should.be.a('object');
                res.body.result.should.have.property('email');
                res.body.result.role.should.be.a('object');

                token = res.body.result.token;

                done();
            });
    });

    it('validate Authentication', function(done) {
        this.timeout(5500);
        setTimeout(function() {
            chai.request(baseUrl)
                .get('/auth')
                .set({
                    'token': token
                })
                .end(function(err, res) {
                    // console.log(res);
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.success.should.equal(true);
                    done();
                });
        }, 2500);
    });

    it('request list of role', function(done) {
        this.timeout(5500);
        setTimeout(function() {
            chai.request(baseUrl)
                .get('/roles')
                .set("token", token)
                .end(function(err, res) {
                    // console.log(res);
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.success.should.equal(true);
                    // res.body.should.have.property('result');
                    // res.body.should.be.a('object');
                    // res.body.result.should.have.property('email');
                    // res.body.result.role.should.be.a('object');
                    done();
                });
        });
    });

    it('create role', function(done) {
        this.timeout(5500);
        setTimeout(function() {
            chai.request(baseUrl)
                .post('/role')
                .set({ // header
                    "token": token
                })
                .send({ // body
                    "role": "test"
                })
                .end(function(err, res) {
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.success.should.equal(true);
                    // res.body.should.have.property('result');
                    // res.body.should.be.a('object');
                    // res.body.result.should.have.property('email');
                    // res.body.result.role.should.be.a('object');
                    done();
                });
        });
    });



});

*/