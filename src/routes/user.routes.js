const express=require('express')
const User=require('../models/user')
//const {verificaToken,verificaAdmin_Role}=require('../middlewares/authenticacion')
const app=express()
const _=require('underscore')
const bcrypt=require('bcrypt');
app.get('/user', (req, res) =>{

  //  let desde=req.query.desde || 0;
  //  desde=Number(desde)
   // let limite= req.query.limite || 5;
   // limite = Number(limite);

    User.find()
            // .skip(desde)
            // .limit(limite)
            .exec((err,users)=>{
                if (err) {
                    return res.status(400).json({
                        ok : false ,
                        err
                    })
                }
                User.count({estado :true},(err)=>{
                    res.json({
                      
                        users
                    }) 
                })
            
            })

});
//crear
app.post('/user/add',  function(req, res) {

    let body = req.body;
//     try {
//     var salt =  await bcrypt.genSalt(10);
//     }
//    catch (err) {
//     next(err);
//     }
    let user= new User({
        fullname:body.fullname,
        email: body.email,
       
        //var bcryptPassword =  bcrypt.hashSync(password, salt);
        password : bcrypt.hashSync(body.password,10),
        //password:body.password,
       // role : body.role 
        
        

    })
   ///insert into sql
    user.save((err,usuarioDB)=>{
        if (err) {
            return res.status(400).json({
                ok : false ,
                err
            })
        }
        //usuarioDB.password=null;
        res.json({
            ok:true,
            usuario : usuarioDB

        })
    })
   

});
//actualizar
app.put('/user/:id', function(req, res) {

    let id = req.params.id;
    let body = _.pick(req.body,['longitude','latitude','precio']);
    User.findByIdAndUpdate(id ,body,{new : true ,runValidators:true} , (err,usuarioDB)=>{
        if (err) {
            return res.status(400).json({
                ok : false ,
                err
            })
        }
        res.json({
            ok:true, 
            usuario:usuarioDB
        });

    })
    
});
app.get('/user/:id',async (req,res)=>{
  const {id} =req.params;
  const user= await User.findById(id)
  res.json({
     user});
});
//app.delete('/usuario/:id',[verificaToken,verificaAdmin_Role], function(req, res) {

app.delete('/usuario/:id', function(req, res) {
    let id =req.params.id;
//    Usuario.findByIdAndRemove(id,(err,usuarioBorrado)=>{
    let cambioEstado = {
        estado : false
    };
    Usuario.findByIdAndUpdate(id,cambioEstado,{new:true},(err,usuarioBorrado)=>{
        if (err) {
            return res.status(400).json({
                ok:false,
                err
            })
        };
        if (!usuarioBorrado){
            return res.status(400).json({
                ok:false,
                error : {
                    message: 'usuario no encontrado'
                }
                
            })
        }
        res.json({
            ok:true,
            usuario:usuarioBorrado
        })
    })
});
module.exports=app;