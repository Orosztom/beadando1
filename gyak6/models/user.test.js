var expect = require("chai").expect;

var Waterline = require('waterline');
var waterlineConfig = require('../config/waterline');
var userCollection = require('./user');
var todoCollection = require('./todo');

var bcrypt = require('bcryptjs');

var User;

before(function (done) {
    // ORM indítása
    var orm = new Waterline();

    orm.loadCollection(Waterline.Collection.extend(userCollection));
    orm.loadCollection(Waterline.Collection.extend(todoCollection));
    waterlineConfig.connections.default.adapter = 'memory';

    orm.initialize(waterlineConfig, function(err, models) {
        if(err) throw err;
        User = models.collections.user;
        done();
    });
});

describe('UserModel', function () {

    beforeEach(function (done) {
        User.destroy({}, function (err) {
            done();
        });
    });
    
    function getUserData() {
    return {
        password: 'password',
        surname: 'surname',
        forename: 'forename',
        username: 'username',
    };
}
    
   describe('#validPassword', function() {
    it('should return true with right password', function() {
         return User.create(getUserData()).then(function(user) {
             expect(user.validPassword('password')).to.be.true;
         })
    });
    it('should return false with wrong password', function() {
         return User.create(getUserData()).then(function(user) {
             expect(user.validPassword('titkos')).to.be.false;
         })
    });
});
    
    describe('#validCreation', function() {
        it('should be able to create a user', function () {
    return User.create({
        password: 'password',
        surname: 'surname',
        forename: 'forename',
        username: 'username',
    })
    .then(function (user) {
        
        expect(bcrypt.compareSync('password', user.password)).to.be.true;
        expect(user.surname).to.equal('surname');
        expect(user.forename).to.equal('forename');
        expect(user.forename).to.equal('username');
    });
});
        
    });


});