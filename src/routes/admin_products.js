const express = require('express');
const { check, validationResult } = require('express-validator');
const mkdirp = require('mkdirp');
const fs = require('fs-extra');
const resizeImg = require('resize-img');

const router = express.Router();

// Product model
const Product = require('../models/product');
// Category model
const Category = require('../models/category');

// GET product index
router.get('/', async (req, res) => { // */* =>  */admin/products
    try {
        // let count = 0;
        const count = await Product.countDocuments({});

        const products = await Product.find({});

        res.render('admin/products', {
            products,
            count
        });

    } catch (e) {
        res.send('Products not found!');
    }
});

// GET add page
router.get('/add-category', (req, res) => { // */* =>  */admin/categories*
    const title = '';
    res.render('admin/add_category', {
        title
    });
});

// POST add page
router.post('/add-category', [
    check('title', 'Title value is empty')
        .not().isEmpty()
], async (req, res) => {
    const title = req.body.title;
    const slug = title.replace(/\s+/g, '-').toLowerCase();
    
    const errors = validationResult(req);
    
    if(!errors.isEmpty()) {
        // return res.status(422).json({ errors: errors.array() });    
        return res.render('admin/add_category', {
            errors: errors.array(),
            title
        });
    }

    try {
        const slugExist = await Category.findOne({slug});

        if(slugExist) {
            return res.render('admin/add_category', {
                errors: [{msg: 'Category already exists!'}],
                title
            });
        }
        const category = new Category({
            title,
            slug
        });
        
        await category.save();
        res.redirect('/admin/categories');
    } catch (e) {
        // return res.status(400).send(e);
        return res.send('Categories could not be saved!');
    }
});

// GET edit page
router.get('/edit-category/:id', async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);

        const id = category._id;
        
        res.render('admin/edit_category', {
            title: category.title,
            id 
        });
        
    } catch (e) {
        res.send('Error: Couldn\'t edit category');    
    }    
});

// POST edit page
router.post('/edit-category/:id', [
    check('title', 'Title value is empty')
        .not().isEmpty()
], async (req, res) => {
    const title = req.body.title;
    const slug = title.replace(/\s+/g, '-').toLowerCase();
    const id = req.params.id;

    const errors = validationResult(req);
    
    if(!errors.isEmpty()) {
        // return res.status(422).json({ errors: errors.array() });    
        return res.render('admin/edit_category', {
            errors: errors.array(),
            title,
            id
        });
    }

    try {
        const slugExist = await Category.findOne({slug, _id:{'$ne': id}});

        if(slugExist) {
            return res.render('admin/edit_category', {
                errors: [{msg: 'Category already exists!'}],
                title,
                id
            });
        }
        
        const category = await Category.findById(id);
        // const user = await User.findByIdAndUpdate(id, req.body, { new: true, runValidators: true })
        category.title = title;
        category.slug = slug;
        await category.save();
        res.redirect('/admin/categories/edit-category/'+ id);
    } catch (e) {
        // return res.status(400).send(e);
        return res.send('Category could not be edited!');
    }
});

router.get('/delete-category/:id', async (req, res) => {
    try {
        const category = await Category.findByIdAndDelete(req.params.id);
    
        if (!category) {
            return res.status(404).send('Error');
        }

        res.redirect('/admin/categories/');
    } catch (e) {
        res.status(500).send()
    }
});

module.exports = router;