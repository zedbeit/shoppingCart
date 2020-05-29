const mongoose = require('mongoose');

const pageSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        lowercase: true
    },
    slug: {
        type: String,
        unique: true
    },
    content: {
        type: String,
        required: true,
        trim: true
    },
    sorting: {
        type: Number,
        default: 0
    }
});

const Page = mongoose.model('Page', pageSchema);

module.exports = Page;