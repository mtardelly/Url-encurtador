const mongoose = require('mongoose');
const shortid = require('shortid');

const DataSchema = new mongoose.Schema({
    url_full: {
        type: String,
        required: true
    },
    url_short: {
        type: String,
        require: true,
        default: shortid.generate
    },
    email_user: {
        type: String
    },

}, {
    timestamps: true
});

const urls = mongoose.model('Urls', DataSchema);
module.exports = urls;