const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
const { mongoose } = require('mongoose');
const productRoute = require('./routes/productRoutes')
const productTypeRoutes = require('./routes/productTypeRoutes');

mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('Database Coonected'))
    .catch((err) => console.log('Database not connected', err))

const app = express();
const port = 4000;

app.use(express.json())

app.use('/api/product',productRoute);
app.use('/api/productType', productTypeRoutes);



app.listen(port, () => {
    console.log(`server started on ${port}`)
})