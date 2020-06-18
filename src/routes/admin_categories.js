const express = require('express');
const { check, validationResult } = require('express-validator');
const Category = require('../models/category');

const router = express.Router();

// GET pages index
router.get('/', async (req, res) => { // */* =>  */admin/pages
    try {
        const categories = await    Category.find({});

        res.render('admin/categories', {
            categories
        });

    } catch (e) {
        res.send('Categories not found!');
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
router.get('/edit-page/:slug', async (req, res) => {
    try {
        const page = await Page.findOne({slug: req.params.slug});

        res.render('admin/edit_page', {
            title: page.title,
            slug: page.slug,
            content: page.content,
            id: page._id 
        });
        
    } catch (e) {
        res.send('Error: Couldn\'t edit page');    
    }    
});

// POST edit page
router.post('/edit-page/:slug', [
    check('title', 'Title value is empty')
        .not().isEmpty(),
    check('content', 'Content must not be empty')
        .not().isEmpty()
], async (req, res) => {

    const title = req.body.title;
    const slug = req.body.slug === '' ? title.replace(/\s+/g, '-').toLowerCase(): req.body.slug.replace(/\s+/g, '-').toLowerCase();
    const content = req.body.content;
    const id = req.body.id;

    const errors = validationResult(req);
    
    if(!errors.isEmpty()) {
        // return res.status(422).json({ errors: errors.array() });    
        return res.render('admin/edit_page', {
            errors: errors.array(),
            title,
            slug,
            content,
            id
        });
    }

    try {
        const slugExist = await Page.findOne({slug, _id:{'$ne': id}});

        if(slugExist) {
            return res.render('admin/edit_page', {
                errors: [{msg: 'Page or Slug already exists!'}],
                title,
                slug,
                content,
                id
            });
        }
        
        const page = await Page.findById(id);
        // const user = await User.findByIdAndUpdate(id, req.body, { new: true, runValidators: true })

        page.title = title;
        page.slug = slug;
        page.content = content;

        await page.save();

        res.redirect('/admin/pages/edit-page/'+ page.slug);
    } catch (e) {
        // return res.status(400).send(e);
        return res.send('Page could not be edited!');
    }
});

router.get('/delete-page/:id', async (req, res) => {
    try {
        const page = await Page.findByIdAndDelete(req.params.id);
    
        if (!page) {
            return res.status(404).send('Error')
        }

        res.redirect('/admin/pages/');
    } catch (e) {
        res.status(500).send()
    }
});

module.exports = router;