const mongoose =require('mongoose')
const URI='mongodb://localhost/pet'
mongoose.connect(URI)
    .then(db=>console.log('DB IS CONEECNTED'))
    .catch(err=>console.log(err) );
module.exports=mongoose