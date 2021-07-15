const{Schema, model} = require('mongoose')
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const uniqueValidator = require('mongoose-unique-validator')

const UserSchema = new Schema({
    name: {
      type: String,
      required: [true, "Please Include your name"]
    },
    email: {
      type: String,
      required: [true, "Please Include your email"],
      unique: true
    },
    password: {
      type: String,
      required: [true, "Please Include your password"]
    },
    tokens: [
      {
        token: {
          type: String,
          required: true
        }
      }
    ]
  })

try{
  UserSchema.plugin(uniqueValidator)
} catch (error) {
  throw new Error({ error: "Email have been registered" });
}


//this method will hash the password before saving the user model
UserSchema.pre("save", async function(next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

//this method generates an auth token for the user
UserSchema.methods.generateAuthToken = async function() {
  const user = this;
  const token = jwt.sign({ _id: user._id, name: user.name, email: user.email,},
  "secret");
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

//this method search for a user by email and password.
UserSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error({ error: "Invalid login details" });
  }
  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    throw new Error({ error: "Invalid login details" });
  }
  return user;
};

UserSchema.statics.findByToken = async (token) => {
  const user = await User.find({ token });
  if (!user) {
    throw new Error({ error: "Invalid token " });
  }
  return user;
};




const User = model("User", UserSchema);

module.exports = User;