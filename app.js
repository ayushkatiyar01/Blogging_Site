const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const lodash = require('lodash');          // this package to required to compare the url names 
const mongoose = require('mongoose');
const res = require("express/lib/response");

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/blogDB", { useNewUrlParser: true });

const blogSchema = {
    title: String,
    content: String
}

const blogPost = mongoose.model('blogPost', blogSchema);
// let posts = [];

const it1 = new blogPost({
    title: 'Day 1',
    content: "Hello worl my name is ayush"
})
const it2 = new blogPost({
    title: 'Day 1',
    content: "Hello worl my name is ayush"
})
const it3 = new blogPost({
    title: 'Day 1',
    content: "Hello worl my name is ayush"
})

app.get("/", function (request, response) {
    blogPost.find({},function(err,posts){
        console.log(posts)
        response.render("home", { posts: posts });
    })
});

app.get("/about", function (request, response) {
    response.render("about");
});

app.get("/contact", function (request, response) {
    response.render("contact");
});

app.get("/compose", function (request, response) {
    response.render("compose");
});

app.get("/posts/:PostId", function (req, res) {
    let requestTitle = lodash.lowerCase(req.params.PostId);
    // console.log(requestTitle);
    const requestPostId = request.params.PostId ; 

    // posts.forEach(element => {
    //     let storedtitle = lodash.lowerCase(element.PostTitle);

    //     if (storedtitle === requestTitle) {
    //         res.render("post", {
    //             title: element.PostTitle,
    //             content: element.PostBody,
    //         });
    //     }
    // });

    blogPost.findOne({_id: requestPostId},function(err,post){
        res.render("post" ,{
            title:post.title , 
            content:post.content
        });
    });
});

app.post("/compose", function (request, response) {
    console.log(request.body.PostTitle);
    
    // console.log(request.body.PostBody);

    const item = new blogPost({
        title: request.body.PostTitle,
        content: request.body.PostBody
    });
    item.save();

    // let content = {
    //     PostTitle: request.body.PostTitle,
    //     PostBody: request.body.PostBody,
    // }
    // posts.push(content);


    // console.log(posts);

    response.redirect("/");
});

app.post("/home", function (request, response) {
    response.redirect("/compose");
});

// listens on port 3000 or any other port 
app.listen(process.env.PORT || 3000, function (request, response) {
    console.log("Server started at port 3000 .")
});