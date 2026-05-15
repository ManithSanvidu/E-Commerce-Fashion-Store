import User from "../models/User.js";

export const syncUser = async (req, res) => {
  const { userId, email, name } = req.body;

  let user = await User.findOne({ clerkId: userId });

  if (!user) {
    user = await User.create({
      clerkId: userId,
      email,
      name,
    });
  }

  res.json(user);
};