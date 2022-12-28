const express  = require('express');
const { Item, ItemId, syncTables, Snippet } = require('./dao/dbConnection');
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json());

// syncTables();

app.get('/products', (req, res) => {
  Item.findAll().then(data => {
    res.status(200).json(data);
  }).catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

app.post('/product', async (req, res) => {
  try {
    const { items } = req.body;
    const result = new Array(0);

    for(let item of items) {
      const { etag, kind } = item;
      
      const newItemId = await ItemId.create(item.id);
      ItemId.sync();
      const newSnippet = await Snippet.create(item.snippet);
      Snippet.sync();
      // console.log({newItemId: newItemId.dataValues.id, newSnippet: newSnippet.dataValues.id});
      const newItem = await Item.create({
        etag,
        kind,
        ItemId: newItemId.dataValues.id,
        SnippetId: newSnippet.dataValues.id
      });
      result.push(newItem);
    }
    res.status(200).json(result);  
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
  
});

app.listen(8080, _ => {
  console.log('app started');
});