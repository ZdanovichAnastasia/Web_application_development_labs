define([],
    function() {
        var myModule = {
            del: function(err, client, mess) {
                const db = client.db("orderdb");
                db.collection("orders").deleteOne( {id: mess}, function(err, result){
                    //console.log("mess"+mess);
                    client.close();
                });
            }
        }
        return myModule;
    }
);