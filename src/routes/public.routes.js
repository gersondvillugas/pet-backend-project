const express=require('express')
const Public=require('../models/public')
//const {verificaToken,verificaAdmin_Role}=require('../middlewares/authenticacion')
const app=express()
const _=require('underscore')
const bcrypt=require('bcrypt');
app.get('/public', (req, res) =>{

  //  let desde=req.query.desde || 0;
  //  desde=Number(desde)
   // let limite= req.query.limite || 5;
   // limite = Number(limite);

    Public.find()
            // .skip(desde)
            // .limit(limite)
            .exec((err,publics)=>{
                if (err) {
                    return res.status(400).json({
                        ok : false ,
                        err
                    })
                }
                Public.count({estado :true},(err)=>{
                    res.json({
                      
                        publics
                    }) 
                })
            
            })

});
//crear
app.post('/public/add',  function(req, res) {

    let body = req.body;
//     try {
//     var salt =  await bcrypt.genSalt(10);
//     }
//    catch (err) {
//     next(err);
//     }
    let public= new Public({
        title:body.title,
        type:body.type,
        description :body.description,
        hour:body.hour,
        user:body.user,
        latitude:body.latitude,
        longitude:body.longitude
})
   ///insert into sql
    public.save((err,publicDB)=>{
        if (err) {
            return res.status(400).json({
                ok : false ,
                err
            })
        }
        //usuarioDB.password=null;
        res.json({
            ok:true,
            public : publicDB

        })
    })
   

});
module.exports=app;