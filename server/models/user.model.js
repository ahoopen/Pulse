const mongoose = require('mongoose');
const Schema = mongoose.Schema;
import bcrypt from 'bcrypt-nodejs';

const UserSchema = new Schema({
    email: {
        type: String,
        unique: true,
        lowercase: true,
        required: true,
        validate: function(email) {
            return /^[a-zA-Z0-9.!#$%&’*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)
        }
    },
    password: {
        type: String,
        required: true
    },
    username: {
        type: String,
    },
    verifyId: {
        type: String
    },
    isValidEmail: {
        type: Boolean
    }
});


// on save, encrypt password
UserSchema.pre('save', function (next) {
    const user = this;

    bcrypt.genSalt(10, function (err, salt) {
        if (err) {
            return next(err);
        }

        bcrypt.hash(user.password, salt, null, function (err, hash) {
            if (err) {
                return next(err);
            }
            user.password = hash;
            next();
        })
    })
});

UserSchema.methods.comparePassword = function (candidatePassword, callback) {
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
        if (err) {
            return callback(err);
        }

        callback(null, isMatch);
    });
};

UserSchema.statics.findUser = function ({email, password}) {
    return new Promise((resolve, reject) => {
        this.findOne({
                $and: [
                    {email},
                    {password},
                    {isValidEmail: true}]
            },
            '-password -verifyId -v -_id -isValidEmail')
            .lean()
            .exec((err, users) => {
                if (err) {
                    reject(err);
                }
                resolve(users);
            });
    });
};

module.exports = mongoose.model('user', UserSchema);
