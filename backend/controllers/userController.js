const User = require('../models/userModel');
const Role = require('../models/roleModel');
const bcrypt = require('bcryptjs');
const {validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');
const {secret} = require("../configuration/config");

const generateAccessToken = (id, roles) => {
    const payload =  {
      id,
      roles
    }
    return jwt.sign(payload, secret, {expiresIn: "24h"})
}

class userController {

  async registration (req, res) {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
          return req.status(400).json({message: "Error while registration", errors})
        }

        const {username, name, surname, age, email, nationality, password} = req.body
        const candidate = await User.findOne({username})
        if (candidate) {
          return res.status(400).json({message: "User with this name has already been registered!"})
        }
        const hashPassword = bcrypt.hashSync(password, 7);
        const userRole = await Role.findOne({value: "USER"})
        const user = new User({username, name, surname, age, email, nationality, password: hashPassword, roles: [userRole.value]})
        await user.save()
        return res.json({message: "Succesfully registered!"})
    } catch (e) {
      console.log(e)
      res.status(400).json({message: 'Registration error'})
    }
  }

  async login (req, res) {
    try {
      const {username, password} = req.body
      const user = await User.findOne({username})
      if (!user) {
        return res.status(400).json({message: `User ${username} not found!`})
      }
      const validPassword = bcrypt.compareSync(password, user.password)
      if (!validPassword) {
        return res.status(400).json({message: "Wrong password"})
      }
      const token = generateAccessToken(user._id, user.roles)
      return res.json({token}) 

    } catch (e) {
      
      console.log(e)
      res.status(400).json({message: 'Login error'})
    }
  }

  async getUsers (req, res) {
    try {
      const users = await User.find()
      res.json(users)
    } catch (e) {
      res.status(400).json({message: 'Registration error'})
    }
  }

}

module.exports = new userController()