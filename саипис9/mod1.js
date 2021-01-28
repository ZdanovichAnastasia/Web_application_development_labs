define([],
    function() {
        var myModule = {
            write: function(err, client, mess) {
                const db = client.db("orderdb");
                const collection = db.collection("orders");
                var arr = mess.split(",");
                let order = {id: arr[0], name: arr[1], num: arr[2], price: arr[3]};
                collection.insertOne(order, function(err, result){
                    if(err){ 
                        return console.log(err);
                    }
                    client.close();
                });
            }
        }
        return myModule;
    }
);