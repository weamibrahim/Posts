// // userController.js
const bcrypt = require('bcrypt');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const auth = require('../controllers/authController');
const userController = {
  getUsers: async () => {
    try {
      const users = await User.find();
      return users;
    } catch (error) {
      console.error('Error fetching users:', error);
      return [];
    }
  },
  getUserById: async (id) => {
    try {
      const user = await User.findById(id);
      return user;
    } catch (error) {
      console.error('Error fetching user by ID:', error);
      return null;
    }
  },
  createUser: async ({ name, email, password }) => {
    try {
      // const newUser = new User({ name, email });
      // await newUser.save();
      console.log(name, email, password);
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        console.error('User already exists:', existingUser);
        return "User already exists";
      }
      let hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await User.create({ name, email, password: hashedPassword });
      console.log('User created successfully:', newUser);
      return "User created successfully";
    } catch (error) {
      console.error('Error creating user:', error);
      return "Error creating user";
    }
  },
  loginUser: async ({ email, password }) => {
    try {
      const user = await User.findOne({ email });
      if (!user) {
        console.error('User not found:', email);
        return { token: null, user: null, message: 'User not found' };
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        console.error('Incorrect password for user:', email);
        return { token: null, user: null, message: 'Incorrect password' };
      }

      console.log('Login successful:', user.email);
      const token = jwt.sign({ id: user._id }, process.env.SECRET);
      return { token, user, message: 'Login successful' };
    } catch (error) {
      console.error('Error logging in:', error);
      return { token: null, user: null, message: 'Error logging in' };
    }
  }
,
  updateUser: async ({token ,id, name, email }) => {
    try {
      console.log("user",{token, id, name, email})
      const user = await auth(token);

      if (!user) {
          console.error('Unauthorized update attempt');
          return "Unauthorized update attempt";}

      const updatedUser = await User.findByIdAndUpdate(id, { name, email }, { new: true });
      console.log('User updated successfully:', updatedUser);
      return "User updated successfully";
    } catch (error) {
      console.error('Error updating user:', error);
      return "Error updating user";
    }
  }
  
};

module.exports = userController;
