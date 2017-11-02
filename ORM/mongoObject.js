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
                db.collection(collectionName).insertOne(dataObject, (err, res) =>
                {
                    if (err) reject(err);
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

    this.Delete = (collectionName, query) =>
    {
        return new Promise((res, rej) =>
        {
            MongoClient.connect(this.url, (err, db) =>
            {
                if (err)  reject(err);
                db.collection(collectionName).deleteOne(query, (err, obj) =>
                {
                  if (err) reject(err);
                  console.log("1 document deleted");
                });
            });
        })
    }

    this.Update = (collection, query, newValues) =>
    {
        return new Promise(res,rej)
        {
            MongoClient.connect(this.url, (err, db) =>
            {
                if (err) reject(err);
                db.collection(collection).updateOne(query, newvalues, (err, res) =>
                {
                    if (err) reject(err);
                    console.log("1 document updated");
                });
              });
        }
    }

    // this.Find = (collection) =>
    // {
    //     return new Promise((res,rej) => 
    //     {
    //         MongoClient.connect(url, (err,db) => 
    //         {
    //             if(err) rej(err);
    //             res(db.collection(collection).find({"Devoured": false}).toArray())
    //         })
            
    //     })
    // }
    
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