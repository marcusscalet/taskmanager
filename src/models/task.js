const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema({
        description: String,
        dateStart: {type: Date, default: Date.now},
        dateFinish: {type: Date, default: Date.now},
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User', required : true
        },
        taskDate: {type: Date, default: Date.now},
        projectId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Project', required : true
        } ,
}) 

module.exports = mongoose.model('Task', TaskSchema)