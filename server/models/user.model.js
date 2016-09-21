import mongoose from 'mongoose';
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
    },
    name: {
        type: String
    },
    surname: {
        type: String
    },
    address: {
        type: String
    },
    dateOfBirth: {
        type: String
    }
});


UserSchema.statics.findUser = function (options) {
    return new Promise((resolve, reject) => {
        this.findOne({
                $and: [
                    {email: options.email},
                    {password: options.password},
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
