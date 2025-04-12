import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  Name: { type: String, required: true },
  Email: { type: String, required: true },
  Password: { type: String, required: true },
});

export const User = mongoose.model("User", UserSchema);

export const addUser = async (name, email, password) => {
  try {
    // Check if a user with the given email already exists
    const existingUser = await User.findOne({ Email: email });
    if (existingUser) {
      throw new Error("Email already exists");
    }

    // Create new user
    const user = new User({ Name: name, Email: email, Password: password });
    await user.save();
  } catch (err) {
    throw err;
  }
};
