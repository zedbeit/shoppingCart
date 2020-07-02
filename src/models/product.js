const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        lowercase: true
    },
    slug: {
        type: String,
        unique: true
    },
    desc: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        default: 0
    },
    image: {
        type: String
    }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;