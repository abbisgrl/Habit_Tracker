const express = require('express');


const app = express();



//Routes
app.use('/',require('./routes/index'));
app.use('/users',require('./routes/users'))


app.listen(3000,console.log(`Server is working fine on ${3000}`));