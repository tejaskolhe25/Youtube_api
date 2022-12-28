
// const {Client} = require ('pg')

// const client = new Client({
//     host: "localhost",
//     user: "app_usr",
//     port: 5432, 
//     password: "test@123", 
//     database: "postgres"
// });


// function executeQuery(query) {
//   return new Promise((resolve, reject) => {

//     client.connect();
//     client.query(query, (err, data)=>{

//       if(err) {
//         reject(err);
//         return;
//       }
//       resolve(data);
//       client.end();
//     });

//   });
  
// } 



// module.exports = {
//   executeQuery
// }


// /*
// //import { Datastore } from 'nedb';
// const express = require('express');
// const  Datastore  = require('pg');


// const app = express();

// app.listen(3000, () => console.log('listening at 3000')); 
// app.use(express.static('public'));
// app.use(express.json({ limit: '1mb' }));

// const database = new Datastore('database.db'); 
// database.loadDatabase();


// app.post('/api', (request, response) => {

// console.log('I got a request!');

// console.log(request.body);

// const data = request.body;

// database.insert(data);
// console.log(database)
// response.json({
//   status:'sucess',
//   items:data
// });
// });*/

const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('postgres', 'app_usr', 'test@123', {
  host: 'localhost',
  dialect: 'postgres'
});

const ItemId = sequelize.define('Item_Id', {
  videoId: {
      type: DataTypes.STRING,
  },
  id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true
  },
  kind: {
      type: DataTypes.STRING
  },
});

const Snippet = sequelize.define('Snippet', {
  channelId: {
      type: DataTypes.STRING,
  },
  id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true
  },
  channelTitle: {
      type: DataTypes.STRING
  },
  description: {
      type: DataTypes.STRING
  },
  liveBrodcastContent: {
      type: DataTypes.STRING
  },
  publishTime: {
      type: DataTypes.DATE
  },
  publishAt: {
      type: DataTypes.DATE
  }
});

const Item = sequelize.define('Item', {
  etag: {
      type: DataTypes.STRING,
  },
  id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true
  },
  kind: {
      type: DataTypes.STRING
  },
  ItemId: {
      type: DataTypes.BIGINT,
      references: {
          model: 'Item_Ids',
          key: 'id'
      },  
  },
  SnippetId: {
    type: DataTypes.BIGINT,
    references: {
      model: 'Snippets',
      key: 'id'
    }
  }
});

async function syncTables() {
  await sequelize.sync({ force: true });
  return true;
}


module.exports = {
  sequelize,
  syncTables,
  Item,
  ItemId,
  Snippet
}