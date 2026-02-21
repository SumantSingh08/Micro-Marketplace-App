const Product = require("../models/product");

exports.getProducts = async (req, res) => {
  const { search = "", page = 1, limit = 5 } = req.query;

  const query = {
    title: { $regex: search, $options: "i" }
  };

  const total = await Product.countDocuments(query);

  const products = await Product.find(query)
    .skip((page - 1) * limit)
    .limit(Number(limit));

  res.json({
    total,
    page: Number(page),
    pages: Math.ceil(total / limit),
    products
  });
};

exports.createProduct = async (req, res) => {
  const product = await Product.create(req.body);
  res.status(201).json(product);
};

exports.getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: "Not found" });
  res.json(product);
};

exports.updateProduct = async (req, res) => {
  const {id} = req.params;
  const products = req.body;

  const updatedProduct = await Product.findByIdAndUpdate(
      id,
      {
        title: req.body.title,
        price: req.body.price,
        description: req.body.description,
        image: req.body.image,
      },
      { new: true, runValidators: true }
    );
  if (!updatedProduct) return res.status(404).json({ message: "Not found" });
  res.json(updatedProduct);
}

exports.deleteProduct = async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) return res.status(404).json({ message: "Not found" });
  res.json({ message: "Deleted successfully" });
}