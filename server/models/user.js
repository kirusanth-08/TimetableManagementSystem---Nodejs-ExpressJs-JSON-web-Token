const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    enum: [1, 2, 3, 4],
    required: () => {
      return this.role === "student";
    },
  },
  semester: {
    type: Number,
    enum: [1, 2],
    required: () => {
      return this.role === "student";
    },
  },
  role: {
    type: String,
    enum: ["admin", "faculty", "student", "staff"],
    default: "student",
  },
  faculty: {
    type: String,
    enum: ["IT", "Eng", "Science", "Business"],
    required: () => {
      return (
        this.role === "faculty" ||
        this.role === "staff" ||
        this.role === "student"
      );
    },
  },
});

// Hash the password before saving it to the database
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 8);
  }
  next();
});

module.exports = mongoose.model("User", userSchema);
