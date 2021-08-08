const bodyparser = require('body-parser');
const express=require('express')
const feedroutes=require('./routes/feed')
const app=express();

//app.use(bodyParser.urlencoded())   //r-www-form-encoded  <form>

app.use(express.urlencoded());
app.use(express.json())
//GET /feed/posts
app.use('/feed',feedroutes)


const port=3001;
module.exports=app.listen(port,function(){
    //concole messages to avoid confusions
    console.log('App working on Port '+port); 
});