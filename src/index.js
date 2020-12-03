const express = require('express');
const morgan = require('morgan');
const path = require('path');
const cors=require('cors')
const app = express();
//app.use(cors())
app.use(cors())

// Db connection
const { mongoose } = require('./database');
// Settings 
app.set('port', process.env.PORT || 4000);

// Middlewares
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.use('/api', require('./routes/user.routes'));
app.use('/api', require('./routes/login.routes'));
app.use('/api', require('./routes/public.routes'));
//app.use('/api', require('./routes/categoria.routes'));
//app.use('/api', require('./routes/producto.routes'));


// app.use('/api/tienda', require('./routes/carrito.routes'));


// app.use('/api/tienda',require('./routes/imagenes.routes'));

// app.use('/api/tienda',require('./routes/upload.routes'));

 
// app.use('/api/tienda', require('./routes/carditem.routes'));
//app.use('/api', require('./routes/user.routes'));
//app.use('/api', require('./routes/project.routes'));
//app.use('/api', require('./routes/proposal.routes'));

// Static Files
app.use(express.static(path.join(__dirname, 'public')));;

// Starting the server
app.listen(app.get('port'), () => {
  console.log(`Server on port ${app.get('port')}`);
}); 
