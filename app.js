//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require('lodash');

const app = express();

let posts = [];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static("public"));

app.get("/home", (req, res) => {
  const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";

  res.render("home", {
    homeText: homeStartingContent,
    pushedTitle: posts


  });

})

app.get("/about", (req, res) => {
  const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";

  res.render("about", {
    aboutText: aboutContent
  });
})

app.get("/contact", (req, res) => {
  const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

  res.render("contact", {
    contactText: contactContent
  });
})

app.get("/compose", (req, res) => {
  const composeContent = "Compose"
  res.render("compose", {
    composeText: composeContent
  });
})

app.get("/posts/:postName", (req, res) => {
  const requestedTitle = (req.params.postName);

  posts.forEach(function(post) {
    const storedTitle = post.title;
    let lowerCasedStoredTitle = _.lowerCase(storedTitle);
    let lowerCaseRequestedTitle = _.lowerCase(requestedTitle);
    if (lowerCasedStoredTitle === lowerCaseRequestedTitle) {
        res.render("post", {
          title: post.title,
          content: post.post
        })
      console.log("Match found!");
    } else {
      console.log("Not a Match!");
    }
    // lowercased = _.lowerCase( requestedTitle);
    // console.log(lowercased + " this is the lower case.");
    // console.log(requestedTitle + " logged!");
  })
})
// compose
app.post("/compose", (req, res) => {
  var titlePost = {
    title: req.body.postTitle,
    post: req.body.postBody
  };
  posts.push(titlePost)
  res.redirect('/home');
  let title = req.body.postTitle;
  let post = req.body.postBody;
  // console.log(titlePost);
})

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
