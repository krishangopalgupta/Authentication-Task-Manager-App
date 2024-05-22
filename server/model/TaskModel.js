import mongoose from 'mongoose'


const TaskSchema = new mongoose.Schema({
    title:{type:String, required:true, unique:true},
    description: {type:String, required:true}
})

const TaskModel = mongoose.model("Task", TaskSchema);

export {TaskModel};