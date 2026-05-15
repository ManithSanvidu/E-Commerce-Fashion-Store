import Order from "../models/Order.js";

export const createOrder = async (req, res) => {
  const order = await Order.create(req.body);
  res.json(order);
};

export const getOrders = async (req, res) => {
  const orders = await Order.find({ userId: req.params.userId });
  res.json(orders);
};

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};