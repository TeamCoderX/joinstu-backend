const { client } = require('/Users/siang/Documents/joinstu_tpe/joinstu-backend/lib/dbutils.js');

client.db(('main')).collection('accounts').find().toArray((err, result) => {
    if (err) throw err;
    for (let [index, item] of result.entries()) {
        console.log(index, item.name, item.id)
        client.db('main').collection('accounts').updateOne(
            { id: item.id },
            {$set: { name: `使用者${index}` } }, { $unset: { path: "" } }
        )
    }
})
