const mongoose = require("mongoose");
const Schema = mongoose.Schema;
  
// подключение
mongoose.connect("mongodb://localhost:27017/usersdb", { useNewUrlParser: true });

const userScheme = new Schema({name: String, age: Number}, {versionKey: false});
const User = mongoose.model("User", userScheme);
 
User.userScheme.find({}).pretty();
// установка схемы
/*const userScheme = new Schema({
    name: {
        type: String,
        required: true,
        minlength:3,
        maxlength:20
    },
    age: {
        type: Number,
        required: true,
        min: 1,
        max:100
    }
});
const User = mongoose.model("User", userScheme);
User.create({name: "Tom", age: 34}, function(err, doc){
    mongoose.disconnect();
      
    if(err) return console.log(err);
      
    console.log("Сохранен объект user", doc);
});*/