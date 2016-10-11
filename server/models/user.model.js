const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    verifyId: {
        type: String
    },
    isValidEmail: {
        type: Boolean
    }
});


UserSchema.statics.findUser = function ({ email, password }) {
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
