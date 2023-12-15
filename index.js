const express=require("express");

const env=require('dotenv').config();

const app=express();
const port=8000;
const expressLayouts=require('express-ejs-layouts');
const db=require('./config/mongoose');
const path=require('path');


app.use(express.urlencoded());
 


app.use('/assets',express.static(process.env.ASSET_PATH));
app.use(expressLayouts);
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

app.set('view engine','ejs');
app.set('views','./views');


app.use('/',require('./routes/index'));


app.listen(port,()=>{
    console.log("succesfull in firing the server");
})