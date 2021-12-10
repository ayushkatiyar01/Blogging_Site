const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const lodash = require('lodash');        
const mongoose = require('mongoose');
const res = require("express/lib/response");

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// connection with database 
mongoose.connect("mongodb+srv://<username>:<password>@cluster0.ztydm.mongodb.net/blogDB", { useNewUrlParser: true });

//making structure for blog
const blogSchema = {
    title: String,
    content: String
}

// making collections 
const blogPost = mongoose.model('blogPost', blogSchema);

// displays all the posts on the home page
app.get("/", function (request, response) {
    blogPost.find({}, function (err, posts) {
        response.render("home", { posts: posts });
    });
});

// about page route 
app.get("/about", function (request, response) {
    response.render("about");
});

//contact page route 
app.get("/contact", function (request, response) {
    response.render("contact");
});

//compose page route 
app.get("/compose", function (request, response) {
    response.render("compose");
});

// for unique post , content having length greater than 100 . 
app.get("/posts/:PostId", function (req, res) {

    const requestPostId = req.params.PostId;

    blogPost.findOne({ _id: requestPostId }, function (err, post) {
        res.render("post", {
            id: requestPostId , 
            title: post.title,
            content: post.content
        });
    });
});

//updates the database
app.post("/compose", function (request, response) {

    const item = new blogPost({
        title: request.body.PostTitle,
        content: request.body.PostBody
    });
    item.save();
    response.redirect("/");
});

//for home page   
app.post("/home", function (request, response) {
    response.redirect("/compose");
});

// listens on port 3000 or any other port 
app.listen(process.env.PORT || 3000, function (request, response) {
    console.log("Server started successfully .")
});