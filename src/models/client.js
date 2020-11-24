const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ClientSchema = new Schema({
        name: String
})

module.exports = mongoose.model('Client', ClientSchema)
