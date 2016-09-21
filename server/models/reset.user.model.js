const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const ResetUserSchema = new Schema({
    userId: {type: String },
    token: {type: String, required: true},
    date: {type: Number, required: true}
});


module.exports = mongoose.model('resetUser', ResetUserSchema);
