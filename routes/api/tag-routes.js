const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try{
    let tagData = await Tag.findAll({
      include: {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock']
      }
    })
        if(!tagData) {
          res.status(404).json({message: 'no tags found'});
          return;
        }
        res.json(tagData);
  }
  catch(err){
    console.log(err);
      res.status(500).json(err)
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try{
    let oneTag = await Tag.findOne({
      where: {
        id: req.params.id
      },
      include: {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock']
      }
    })
    if(!oneTag) {
      res.status(404).json({message: 'No tags found'});
      return;
    }
    res.json(oneTag);
  }
  catch (err){
    res.status(500).json(err)
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try{
    let newTag = await Tag.create({
      tag_name: req.body.tag_name
    })
    res.json(newTag);
  }
  catch(err){
    res.status(500).json(err)
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try{
    let updatedTag= await Tag.update(req.body, {
      where: {
        id: req.params.id
      }
    })
    if(!updatedTag) {
      res.status(404).json({message: 'No Tags found'});
      return;
    }
    res.json(updatedTag);
  }
  catch (err){
    res.status(500).json(err)
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try{
    let deletedTag = await Tag.destroy({
      where: {
        id: req.params.id
      }
    })
    if(!deletedTag) {
      res.status(404).json({message: 'No tags found'});
      return;
    }
    res.json(deletedTag);
  }
  catch (err){
    res.status(500).json(err)
  }
});

module.exports = router;
