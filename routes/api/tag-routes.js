const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll({
    attributes: [
      'id',
      'tag_name'
    ],
    include: [
      {
        model: Product, 
        // as: 'product'
      }
    ]
  })
    .then(dbTagID => res.json(dbTagID))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findOne({
    where: {
      id: req.params.id
    },
    include: [
      {
        model: Product, 
        // as: 'product'
      }
    ]
  })
    .then(dbTagID => {
      if (!dbTagID) {
        // in case a user that doesn't exist is searched for, error will state so
        res.status(404).json({ message: 'No tag found with this id' });
        return;
      }
      res.json(dbTagID);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create({
    id: req.body.id,
    tag_name: req.body.tag_name
  })
  .then(dbTagID => res.json(dbTagID))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(req.body, {
    where: {
      id: req.params.id
    }
  })
  .then(dbTagID => {
    if (!dbTagID[0]) {
      res.status(200).json({ message: 'No tag found with this id' });
      return;
    }
    res.json(dbTagID);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(dbTagID => {
    if (!dbTagID[0]) {
      res.status(200).json({ message: 'Tag successfully deleted' });
      return;
    }
    res.json(dbTagID);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;
