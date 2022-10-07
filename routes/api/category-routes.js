const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try{
    let categoryData = await Category.findAll({
      include: {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock']
      }
    })
        if(!categoryData) {
          res.status(404).json({message: 'No categories found'});
          return;
        }
        res.json(categoryData);
  }
  catch(err){
    console.log(err);
      res.status(500).json(err)
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try{
    let oneCategory = await Category.findOne({
      where: {
        id: req.params.id
      },
      include: {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock']
      }
    })
    if(!oneCategory) {
      res.status(404).json({message: 'No categories found'});
      return;
    }
    res.json(oneCategory);
  }
  catch (err){
    res.status(500).json(err)
  }
  
    
});


router.post('/', async (req, res) => {
  // create a new category
  try{
    let newCategory = await Category.create({
      category_name: req.body.category_name
    })
    res.json(newCategory);
  }
  catch(err){
    res.status(500).json(err)
  }
  

});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
