const {Schema, model} = require('mongoose')
const schema = new Schema({
    title: {type: String, required: true}, //Тип строка, обязательное поле
    author: {type: String, required: true},
    myopinion:{type: String}
})
module.exports = model('Book', schema)