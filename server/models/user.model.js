const mongoose = require('mongoose');
const Schema = mongoose.Schema;
import bcrypt from 'bcrypt-nodejs';

const UserSchema = new Schema({
    email: {
        type: String,
        unique: true,
        lowercase: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
    },
    lastname: {
        type: String
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

    encryptPassword(user.password)
        .then((hashedPassword) => {
            user.password = hashedPassword;
            next();
        });
});

UserSchema.pre('update', function (next) {
    let update = this.getUpdate();
    if (update.$set) {
        update = update.$set;
    }

    if (update.password) {
        encryptPassword(update.password)
            .then((hashedPassword) => {
                this.update({}, {
                    $set: {
                        password: hashedPassword
                    }
                });
            })
            .then(() => next());
    } else {
        next();
    }
});

UserSchema.methods.comparePassword = function (candidatePassword, callback) {
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
        if (err) {
            return callback(err);
        }

        callback(null, isMatch);
    });
};

const encryptPassword = function (field) {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return reject(err);
            }

            bcrypt.hash(field, salt, null, function (err, hash) {
                if (err) {
                    return reject(err);
                }
                resolve(hash);
            });
        });
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
