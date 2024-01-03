const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const foodSchema = new Schema({
    title:{
        type:String,
    },
    image:{
        type:String,
    },
    description:{
        type:String,
    },
    price:{
        type:Number,
    }

});

const Food = mongoose.model("Food",foodSchema);

module.exports = Food; 