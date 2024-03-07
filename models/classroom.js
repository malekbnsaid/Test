const mongo=require("mongoose")
const Schema=mongo.Schema
const Classroom=new Schema({
  class:String,
  capacity:Number  
})
module.exports=mongo.model("classroom",Classroom)