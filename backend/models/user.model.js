import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  Name: { type: String, required: true },
  Email: { type: String, required: true },
  Password: { type: String, required: true },
});

export const User = mongoose.model("User", UserSchema);

export const addUser = async (name, email, password) => {
  try {
    const user = new User({ Name: name, Email: email, Password: password });
    await user.save();
  } catch (err) {
    throw err;
  }
};
