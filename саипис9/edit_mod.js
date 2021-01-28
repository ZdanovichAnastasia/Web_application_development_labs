define([],
    function() {
        var myModule = {
            edit: function(err, client, mess) {
                const db = client.db("orderdb");
                const collection = db.collection("orders");
                var arr = mess.split(",");
                //for(var i = 0; i< arr.length; i++){
                    //console.log("arr["+i+"] = "+ arr[i]);
               // }
                //let order = {id: arr[0], name: arr[1], num: arr[2], price: arr[3]};
                collection.updateOne({id: arr[4]}, {$set: {id: arr[0], name: arr[1], num: arr[2], price: arr[3]}}, function(err, result){
                    if(err){ 
                        return console.log(err);
                    }
                    //console.log(result.ops);
                    client.close();
                });
            }
        }
        return myModule;
    }
);