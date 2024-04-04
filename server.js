const express = require('express')
const mongoose = require('mongoose')
const Product = require('./models/productModel')
const Coupon  = require('./models/couponModel')
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))

//routes

app.get('/', (req, res) => {
    res.send('Hello NODE API')
})

app.get('/blog', (req, res) => {
    res.send('Hello Blog, My name is Ashutosh')
})

app.get('/products', async(req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

app.get('/products/:id', async(req, res) =>{
    try {
        const {id} = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})


app.post('/products', async(req, res) => {
    try {
        const product = await Product.create(req.body)
        res.status(200).json(product);
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})

// update a product
app.put('/products/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);
        // we cannot find any product in database
        if(!product){
            return res.status(404).json({message: `cannot find any product with ID ${id}`})
        }
        const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct);
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

// delete a product

app.delete('/products/:id', async(req, res) =>{
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id);
        if(!product){
            return res.status(404).json({message: `cannot find any product with ID ${id}`})
        }
        res.status(200).json(product);
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})



//COUPON


//coupon create
app.post('/coupon', async(req, res) => {
    try {
        const coupon = await Coupon.create(req.body)
        res.status(200).json(coupon);
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})
//coupon update
app.put('/coupons/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const coupon = await Coupon.findByIdAndUpdate(id, req.body);
        // we cannot find any coupon in database
        if(!coupon){
            return res.status(404).json({message: `cannot find any product with ID ${id}`})
        }
        const updatedCoupon = await Coupon.findById(id);
        res.status(200).json(updatedCoupon);
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

//coupon fetch
app.get('/coupons', async(req, res) => {
    try {
        const coupons = await Coupon.find({});
        res.status(200).json(coupons);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

//coupons fecth by ID
app.get('/coupons/:id', async(req, res) =>{
    try {
        const {id} = req.params;
        const coupon = await Coupon.findById(id);
        res.status(200).json(coupon);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})


mongoose.set("strictQuery", false)
mongoose.
connect('mongodb+srv://ashutoshmishra89679:TK1KXbt3eNJJOZq1@couponcluster.0uthexb.mongodb.net/?retryWrites=true&w=majority&appName=couponCluster')
.then(() => {
    console.log('connected to MongoDB')
    app.listen(3000, ()=> {
        console.log(`Node API app is running on port 3000`)
    });
}).catch((error) => {
    console.log(error)
})