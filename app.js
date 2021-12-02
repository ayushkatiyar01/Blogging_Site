const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const lodash = require('lodash');          // this package to required to compare the url names 
const { lowerCase } = require("lodash");
const { response } = require("express");


const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let posts = [];

app.get("/", function (request, response) {
    response.render("home", { posts: posts });
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

app.get("/posts/:postName", function (req, res) {
    let requestTitle = lodash.lowerCase(req.params.postName);

    posts.forEach(element => {
        let storedtitle = lodash.lowerCase(element.PostTitle);

        if (storedtitle === requestTitle) {
            res.render("post", {
                title: element.PostTitle,
                content: element.PostBody,
            });
        }
    })
})

app.post("/compose", function (request, response) {
    let content = {
        PostTitle: request.body.PostTitle,
        PostBody: request.body.PostBody,
    }
    posts.push(content);
    // console.log(posts);

    response.redirect("/");
});

app.post("/home" ,function(request,response){
    response.redirect("/compose") ;
})
// listens on port 3000 or any other port 
app.listen(process.env.PORT || 3000, function (request, response) {
    console.log("Server started at port 3000 .")
})