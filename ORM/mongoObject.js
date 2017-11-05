var Mongo = function(url)
{
    var MongoClient = require('mongodb').MongoClient;
    var http = require("http");
    this.url = url;
    
    //Debating on whether or not to scrap this method
    // this.CreateDb = function()
    // {
    //     return new Promise(function(res, rej)
    //     {
    //         MongoClient.connect(this.url, function(err, db) 
    //         {
    //             if (err) throw err;
    //             console.log("Database created!");
    //         });
    //     })
    // }

    //This method works
    this.Insert = (collectionName, dataObject) =>
    {
        return new Promise((res, rej) =>
        {
            MongoClient.connect(url, (err, db) =>
            {
                if (err) throw err;
                db.collection(collectionName).insertOne(dataObject, (err, result) =>
                {
                    if (err) rej(err);
                    console.log("1 document inserted");
                });
            })
        })      
    } 
    
    this.ReturnAll = (collectionName) =>
    {
        return new Promise((res, rej) =>
        {
            MongoClient.connect(this.url, (err, db) =>
            {
                if (err) reject(err);
                db.collection(collectionName).findOne({}, (err, result) =>
                {
                    if (err) reject(err);
                    resolve.result()    //(result);
                });
            })
        })  
    }

    //This method works
    this.Query = (collectionName, query) =>
    {
        return new Promise((res, rej) =>
        {
            MongoClient.connect(url, (err, db) =>
            {
                if (err) rej(err);
                res(db.collection(collectionName).find(query).toArray());
            })
        
        })
    }

    this.DeleteMany = (collectionName, query) =>
    {
        return new Promise((res, rej) =>
        {
            MongoClient.connect(this.url, (err, db) =>
            {
                if (err)  rej(err);
                db.collection(collectionName).deleteMany(query, (err, obj) =>
                {
                  if (err) rej(err);
                  console.log("Documents deleted");
                });
            });
        })
    }

    this.DropCollection = (collectionName) =>
    {
        return new Promise((res, rej) =>
        {
            MongoClient.connect(this.url, (error,db) =>
            {
                if(error) rej(err)

                db.collection(collectionName).drop((err, delOk) =>
                {
                    if(err) rej(err)
                    
                    console.log("Collection Deleted")
                })
            })
        })
    }

    this.Update = (collection, query, newValues) =>
    {
        const VALUE = {"$set": newValues}

        return new Promise((res,rej) =>
        {
            MongoClient.connect(this.url, (err, db) =>
            {
                if (err) rej(err)
                db.collection(collection).updateOne(query, VALUE, (err, res) =>
                {
                    if (err) rej(err)
                    console.log("1 document updated")
                })
              })
        })
            
    }

    this.FindOne = (collectionName, query) =>
    {
        return new Promise((res,rej) => 
        {
            MongoClient.connect(this.url, function(err, db) 
            {
                  if (err) rej(err) 
                  db.collection(collectionName).findOne(query, function(err, result) 
                  {
                    if (err) rej(err)
                    res(result)
                  })
            })
            
        })
    }
    
    //Join needs some work, very confusing for me 

    // this.Join = function(collection, fromObject, toObject)
    // {
    //     return new Promise(res, rej)
    //     {
    //         MongoClient.connect(this.url, function(err, db) 
    //         {
    //             if (err) reject(err);
    //             db.collection('orders').aggregate([
    //               { $lookup:
    //                  {
    //                    from: 'products',
    //                    localField: 'product_id',
    //                    foreignField: 'id',
    //                    as: 'orderdetails'
    //                  }
    //                }
    //               ], function(err, res) {
    //               if (err) throw err;
    //               resolve(res);
    //             });
    //           });
    //     }
    // }

    // this.Close = function()
    // {
    //     db.close();
    // }

} 

module.exports = Mongo;