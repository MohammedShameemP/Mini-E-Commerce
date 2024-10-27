const express = require("express");
const upload = require("../controllers/multer");
const Products = require("../models/products");
const { createAdminToken, requireAdminAuth, requireUserAuth, createUserToken } = require("../middleware/middleware");
const Users = require("../models/user");
const maxAge = 1 * 24 * 60 * 60;
const route = express.Router();






route.get("/", (req, res) => {
	res.render("login", { error: "" });
});


route.post("/login", async (req, res) => {
	console.log("login");


	try {
		const username = req.body.username;
		const password = req.body.password;

		console.log(req.body, "req.body");
		const foundUser = await Users.findOne({ username, password,active:true });
		console.log("foundUser =", foundUser);
		if (foundUser) {
			const token = createUserToken(foundUser._id);
			console.log({ token });
			res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
			res.redirect("/homepage");
		} else {
			res.render("login", { error: "User not found" });
		}
	} catch (error) {
		console.log("user not exist ", error);
	}
});


// 	// Extract username and password from the request body
// 	const { username, password } = req.body;

// 	try {
// 		// Find the user with the provided username and password in the database
// 		const foundUser = await Users.findOne({ username, password });

// 		// If no user found or passwords don't match, render the login page with an error message
// 		if (!foundUser) {
// 			return res.render("login", { error: "Invalid username or password" });
// 		}

// 		// If user found and passwords match, set session user and redirect to homepage
// 		req.session.user = { id: foundUser._id, username: foundUser.username };
// 		const products = await Products.find();
// 		return res.render("homepage", { username: req.session.user.username, products });
// 	} catch (error) {
// 		console.error("Error during login:", error);
// 		res.status(500).send("Internal Server Error");
// 	}
// });







route.get('/sign',(req,res)=>{
	res.render('signup')
})
route.post('/newsignup',async (req,res)=>{
	try {
		console.log('signup body =',req.body);
		const {username,phonenumber,email,password} =req.body
		const newUser = new Users({username,phonenumber,email,password});
		newUser.save()
		console.log({newUser});
		req.session.user = { id: newUser._id, username: newUser.username };
		res.redirect('/homepage')

		
	} catch (error) {
		
	}
})

route.get("/profile", (req, res) => {
	// Access user data stored in session
	const user = req.session.user;
	if (user) {
		res.send(`Welcome ${user.username}!`);
	} else {
		res.status(401).send("Unauthorized");
	}
});

route.get("/homepage",requireUserAuth,async (req, res) => {
	// Assuming you retrieve the username from the session
	const products = await Products.find();
	res.render("homepage", { products });
});


route.get("/productdetails/:id",async(req,res)=>{
	const id = req.params.id
	console.log({id});
	const item = await Products.findById(id)
	console.log({item});
	console.log("its details");
	res.render("productdetails",{item});
})




route.post("/logout", (req, res) => {
	console.log("logout");
	req.session.destroy((err) => {
		if (err) {
			console.error("Error destroying session:", err);
		} else {		
			res.redirect("/"); // Redirect to login page after logout
		}
	});
});



module.exports=route;