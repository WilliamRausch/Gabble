const express = require("express");
const User = require("../models/index").User;
const Post = require("../models/index").Post;
const router = express.Router();
const bcrypt = require("bcrypt");
let username;
let password;
let name;
let gabbles;

const passport = require('passport');
const isAuthenticated = function (req, res, next) {
  console.log(req.isAuthenticated());
    if (req.isAuthenticated()) {
      return next()
    }
    req.flash('error', 'You have to be logged in to access the page.')
    res.redirect('/')
  }

router.get("/", function(req, res) {
  res.render("login", {
      messages: res.locals.getMessages()
  });
});

router.post('/', passport.authenticate('local', {
    successRedirect: '/user',
    failureRedirect: '/',
    failureFlash: true
}));

router.get("/signup", function(req, res) {
  res.render("signup");
});

router.post("/signup", function(req, res) {
   username = req.body.username
  password = req.body.password
  name = req.body.name

  if (!username || !password) {
    req.flash('error', "Please, fill in all the fields.")
    res.redirect('signup')
  }

  let salt = bcrypt.genSaltSync(10)
  let hashedPassword = bcrypt.hashSync(password, salt)

  let newUser = {
    username: username,
    salt: salt,
    name: name,
    password: hashedPassword
  }

  User.create(newUser).then(function() {
    res.redirect('/')
  }).catch(function(error) {
    req.flash('error', "Please, choose a different username.")
    res.redirect('/signup')
  });
});

router.get("/user", isAuthenticated, function(req, res) {
	console.log(req.user.username);
	Post.findAll().then(function (posts){
		gabbles = posts;
		//console.log(gabbles[1].body);
	}).then(function(){
		//console.log(gabbles[1].body);
	
	
	
  res.render("index", {username: req.user.username, gabbles});
})
});

router.get("/logout", function(req, res) {
  req.logout();
  res.redirect("/");
});
router.get("/user/newPost",isAuthenticated, function(req,res){
	res.render("newPost", {username: req.user.username});
});
router.post("/user/newPost", isAuthenticated, function(req,res){
	console.log("GENERATING NEW POST");
 gab = req.body.post
 
 console.log("THE GAB IS" + gab);
 
 let newPost = {
 	body: gab,
 	user: req.user.username
 }
 Post.create(newPost).then(function() {
    res.redirect('/user')
  }).catch(function(error) {
    req.flash('error', "Please, choose a different username.")
    res.redirect('/user/newPost');
  });
});
router.get("/user/destroy/:id",isAuthenticated,function(req, res) {
	Post.findOne({
		where: {
			id: req.params.id
		}
	}).then(function(post){
	
		console.log(post.user);
		console.log(req.user);
		if(post.user == req.user.username){
			console.log("deletion allowed!");
  Post.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(function(data) {
      res.redirect("/user");
    });
}
else{
	console.log("deletion not allowed!");
	res.redirect("/user");
}
})
});
module.exports = router;