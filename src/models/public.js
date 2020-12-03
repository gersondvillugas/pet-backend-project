var mongoose = require('mongoose');
var Schema = mongoose.Schema;
let tipoValidos = {
    values: ['veteranio','adopcion'],
    message: '{VALUE} no es un rol valido'
};

var publicSchema = new Schema({
    title: { type: String, required: [true, 'El nombre es necesario'] },
    type: { type: String, required: true },
    description: { type: String, required: true },
    
    hour: { type: String, required: true },
 //   categoria: { type: Schema.Types.ObjectId, ref: 'Categoria', required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    orderDate: { type: Date, default: Date.now() },
    latitude:{
        type:Number,
        require:false
    },
    longitude:{
      type:Number,
      required :false
        
    },
    img:{
        type:String ,
        require :false}
});
module.exports = mongoose.model('Public', publicSchema);
