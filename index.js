const express = require("express");
const app = express();
const ejs = require("ejs");
const session = require("express-session");
const connectDB = require("./config/database");
const Products = require("./models/products");
const { SchemaTypeOptions } = require("mongoose");
const Users = require("./models/user");
const router = require("./router/router")
const cookieParser=require('cookie-parser')
const cors = require('cors');

app.use(cors());

const PORT = 2003;

connectDB();
app.use(cookieParser())
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.static("uploads"));
app.use(express.urlencoded());

app.use(router)


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


























































// app.get("/", (req, res) => {
// 	res.render("login", { error: "" });
// });

// app.get("/sign", (req, res) => {
// 	res.render("signup");
// });
// app.post("/newsignup", async (req, res) => {
// 	try {
// 		console.log("signup body =", req.body);
// 		const { username, phonenumber, email, password } = req.body;
// 		const newUser = new Users({ username, phonenumber, email, password });
// 		newUser.save();
// 		console.log({ newUser });
// 		req.session.user = { id: newUser._id, username: newUser.username };
// 		res.redirect("/homepage");
// 	} catch (error) {}
// });
// app.post("/login", async (req, res) => {
// 	console.log("login");

// 	// Extract username and password from the request body
// 	const { username, password } = req.body;

// 	try {
// 		// Find the user with the provided username and password in the database
// 		const foundUser = await Users.findOne({ username, password });
// 		console.log(foundUser);

// 		// If no user found or passwords don't match, render the login page with an error message
// 		if (!foundUser) {
// 			res.render("login", { error: "Invalid username or password" });
// 		}

// 		// If user found and passwords match, set session user and redirect to homepage
// 		else {
// 			if (foundUser.active == true) {
// 				req.session.user = { id: foundUser._id, username: foundUser.username };
// 				// const products = await Products.find();

// 				// res.render("homepage", { username: req.session.user.username, products });
// 				res.redirect('/homepage')
// 			} else {
// 				res.render("login", { error: "User not active" });
// 			}
// 		}
// 	} catch (error) {
// 		console.error("Error during login:", error);
// 		res.status(500).send("Internal Server Error");
// 	}
// });

// app.get("/profile", (req, res) => {
// 	// Access user data stored in session
// 	const user = req.session.user;
// 	if (user) {
// 		res.send(`Welcome ${user.username}!`);
// 	} else {
// 		res.status(401).send("Unauthorized");
// 	}
// });




// app.get("/homepage", isLoggedIn, async (req, res) => {
//     try {
//         const username = req.session.user.username;

//         // Fetch all products
//         const products = await Products.find({active:true});
// 		console.log({products});
//         // Filter out inactive products
//         // const activeProducts = products.filter(product => product.active);

//         res.render("homepage", { products,username	 });
//     } catch (error) {
//         console.error("Error fetching products:", error);
//         res.status(500).send("Internal Server Error");
//     }
// });



// app.get("/productdetails/:id", async (req, res) => {
// 	const id = req.params.id;
// 	console.log({ id });
// 	const item = await Products.findById(id);
// 	console.log({ item });
// 	console.log("its details");
// 	res.render("productdetails", { item });
// });

// app.post("/logout", (req, res) => {
// 	console.log("logout");
// 	req.session.destroy((err) => {
// 		if (err) {
// 			console.error("Error destroying session:", err);
// 		} else {
// 			res.redirect("/"); // Redirect to login page after logout
// 		}
// 	});
// });









// app.get("/homepage", isLoggedIn, async (req, res) => {
// 	// Assuming you retrieve the username from the session
// 	const username = req.session.user.username; // Adjust this according to your session structure
// 	if(Products.active==true){


	
// 		const products = await Products.find();
// 		res.render("homepage", { username: username, products });

// 	}
// 	else{
// 	console.log();
// 		res.render("homepage", { error: "User not active" });


// 	}

// });