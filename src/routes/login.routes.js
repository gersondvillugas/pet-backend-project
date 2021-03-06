const express=require('express')
const bcrypt=require('bcrypt');
const User=require('../models/user')
const app=express()
const jwt=require('jsonwebtoken')
//const {OAuth2Client} = require('google-auth-library');
//const client = new OAuth2Client(process.env.CLIENT_ID);
app.post('/user/login',(req,res)=>{

    let body= req.body
User.findOne({email : body.email} , (err,usuarioDB)=>{
    if (err) {
        return res.status(500).json ({
            ok : false ,
            err
        });
    
    }
    if (!usuarioDB) {
      return res.status(400).json ({
          ok :false ,
          err :{
              message: '(usuario) o contraseña incorrectos'
          }
      })
    }
   if ( !bcrypt.compareSync(body.password,usuarioDB.password) ){
    return res.status(400).json ({
        ok :false ,
        err :{
            message: 'usuario o (contraseña) incorrectos'
        }
    })
   }
   let token = jwt.sign({
       usuario  : usuarioDB 
   }, 'este es el seed desarrollo ',{expiresIn: '48h'})
 
   res.status(200).json({
    message: {
        user: {
            userId: usuarioDB._id,
            fullname: usuarioDB.fullname,
            country: usuarioDB.country,
            email: usuarioDB.email
        },
        token: token
    }
})
});
  
   
});
///configuraciones de google
async function verify(token) {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });
    const payload = ticket.getPayload();
    
    return {
        nombre : payload.name,
        email : payload.email,
        img : payload.picture,
        google : true
    }
  }

// app.post('/google',async(req,res)=>{
//     let token = req.body.idtoken;
//    let googleUser= await verify(token)
//                         .catch(e=>{
//                             return res.status(403).json({
//                                 ok : false,
//                                 err : e
//                             });
//                         });

//     Usuario.findOne ({email :googleUser.email},(err,usuarioDB)=>{
//         if (err) {
//             return res.status(500).json({
//                 ok : false,
//                 err
//             })
//         };
//         if (usuarioDB) {
//             if (usuarioDB.google ===false){
//                 return res.status(400).json({
//                     ok : false,
//                     err: {
//                         message :'debe de usar su autenticaion normal'
//                     }
//                 });
//             } else {
//                 let token=jwt.sign({
//                     usuario  : usuarioDB 
//                 }, process.env.SEED,{expiresIn: process.env.CADUCIDAD_TOKEN})
//                 return res.json({
//                     ok:true ,
//                     usuario:usuarioDB,
//                     token
//                 });
//             }
//         } else {
//             //si el usuario no existe ne la basde de datos
//             let usuario = new Usuario();
//             usuario.nombre=googleUser.nombre;
//             usuario.email=googleUser.email;
//             usuario.img=googleUser.img;
//             usuario.google=true;
//             usuario.password= ':)'
//             usuario.save((err,usuarioDB)=>{
//                 if (err) {
//                     return res.status(500).json({
//                         ok : false,
//                         err
//                     })
//                 };
//                 let token=jwt.sign({
//                     usuario  : usuarioDB 
//                 }, process.env.SEED,{expiresIn: process.env.CADUCIDAD_TOKEN})
//                 return res.json({
//                     ok:true ,
//                     usuario:usuarioDB,
//                     token
//                 });
//             })

//         }
//     })
//   //  res.json({
//   //      usuario : googleUser
//   //  }); 
// })
module.exports =app;