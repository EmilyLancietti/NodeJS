var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var user = new Schema({
    admin:   {
        type: Boolean,
        default: false
    }
});

user.plugin(passportLocalMongoose);

var Users = mongoose.model('User', user);

module.exports = Users;