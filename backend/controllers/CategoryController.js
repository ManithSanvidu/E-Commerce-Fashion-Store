import Category from "../models/Category.js";

const normalizeSlug = (value) =>
  value
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9\-]/g, "");

export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createCategory = async (req, res) => {
  try {
    const { name, slug, description } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ message: "Category name is required." });
    }

    const normalizedSlug = normalizeSlug(slug || name);
    if (!normalizedSlug) {
      return res.status(400).json({ message: "Category slug is required." });
    }

    const category = await Category.create({
      name: name.trim(),
      slug: normalizedSlug,
      description,
    });

    res.status(201).json(category);
  } catch (error) {
    if (error.code === 11000) {
      return res
        .status(409)
        .json({ message: "Category slug already exists. Please choose another slug." });
    }

    res.status(400).json({ message: error.message });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, slug, description } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ message: "Category name is required." });
    }

    const normalizedSlug = normalizeSlug(slug || name);
    if (!normalizedSlug) {
      return res.status(400).json({ message: "Category slug is required." });
    }

    const existingCategory = await Category.findOne({
      slug: normalizedSlug,
      _id: { $ne: id },
    });

    if (existingCategory) {
      return res
        .status(409)
        .json({ message: "Category slug already exists. Please choose another slug." });
    }

    const category = await Category.findByIdAndUpdate(
      id,
      { name: name.trim(), slug: normalizedSlug, description },
      { new: true, runValidators: true }
    );

    if (!category) {
      return res.status(404).json({ message: "Category not found." });
    }

    res.json(category);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findByIdAndDelete(id);

    if (!category) {
      return res.status(404).json({ message: "Category not found." });
    }

    res.json({ message: "Category deleted successfully." });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
