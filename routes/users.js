const mongoose = require("mongoose");
const plm = require("passport-local-mongoose");

// Connect to DB
mongoose.connect("mongodb://127.0.0.1:27017/authentication");

// Define schema
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  secret: String   // optional extra field
});

// Add passport-local-mongoose plugin
userSchema.plugin(plm);

// Export model
module.exports = mongoose.model("User", userSchema);
