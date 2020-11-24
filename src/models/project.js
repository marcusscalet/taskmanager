const mongoose = require('mongoose')

const ProjectSchema = new mongoose.Schema({
        name: String,
        description: String,
        goal: String,
        manager: String
})  

module.exports = mongoose.model('Project', ProjectSchema)