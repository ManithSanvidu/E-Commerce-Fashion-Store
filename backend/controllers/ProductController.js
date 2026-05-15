import Product from "../models/Product.js"

export const getProducts=async(req,res)=>{
    const products=await Product.find();
    res.json(products);
};

export const getProductById=async(req,res)=>{
    const product=await Product.findById(req.params.id);
    res.json(product);
};

export const createProduct = async (req, res) => {
  try {
    const { name, price, category, description, sizes, section } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : "";

    const product = await Product.create({
      name,
      price,
      category,
      description,
      sizes: sizes ? sizes.split(",") : [],
      image,
      section: section || "none",
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { name, price, category, description, sizes, section } = req.body;
    const product = await Product.findById(req.params.id);

    if (product) {
      product.name = name || product.name;
      product.price = price || product.price;
      product.category = category || product.category;
      product.description = description || product.description;
      product.sizes = sizes ? sizes.split(",") : product.sizes;
      product.section = section || product.section;

      if (req.file) {
        product.image = `/uploads/${req.file.filename}`;
      }

      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      await product.deleteOne();
      res.json({ message: "Product removed" });
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};