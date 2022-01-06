const express = require("express");
const products = require("./data/products");

const app = express();

app.get("/", (req, res) => {
	res.send("api is running");
});

app.get("/api/products", (req, res) => {
	res.json(products);
});

app.get("/api/products/:id", (req, res) => {
	const product = products.find((p) => p._id === req.params.id);
	res.json(product);
});

const portNum = 5000;
app.listen(portNum, console.log(`Server running at port ${portNum}`));
