const express = require('express');
const { check, validationResult } = require('express-validator');

const router = express.Router();

// get all pages
router.get('/', (req, res) => { // */* =>  */admin/pages*
    res.send('Admin Area');
});

// add page
router.get('/add-page', (req, res) => { // */* =>  */admin/pages*
    
    const title = '';
    const slug = '';
    const content = '';

    res.render('admin/add_page', {
        title,
        slug,
        content
    });
});

router.post('/add-page', [
    check('title', 'Title value is empty')
        .not().isEmpty(),
    check('content', 'Content must not be empty')
        .not().isEmpty()
], (req, res) => {

    const title = req.body.title;
    const slug = req.body.slug === '' ? title.replace(/\s+/g, '-').toLowerCase(): req.body.slug.replace(/\s+/g, '-').toLowerCase();
    const content = req.body.content;
    
    const errors = validationResult(req);
    
    if(!errors.isEmpty()) {
        // return res.status(422).json({ errors: errors.array() });    
        res.render('admin/add_page', {
            errors: errors.array(),
            title,
            slug,
            content
        });
    }
    console.log(slug);
    // res.send('Success!');

});

module.exports = router;