const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const Schema = mongoose.Schema

const customerSchema = new Schema({
  username: {},
  password: {},
  activate: {}, // true or falses
  role: {} // C: customer, A: admin
})

customerSchema.methods.isValidPassword = async function (password) {
  const customer = this
  // Hashes the password sent by the user for login and checks if the hashed password stored in the
  // database matches the one sent. Returns true if it does else false.
  const compare = await bcrypt.compare(password, customer.password)
  return compare
}

// customerSchema.pre('save', async function (next) {
//   // 'this' refers to the current document about to be saved
//   if (!this.password || this.password === undefined) {
//     return next()
//   }
//   // Hash the password with a salt round of 10, the higher the rounds the more secure, but the slower
//   // your application becomes.
//   const hash = await bcrypt.hashSync(this.password, bcrypt.genSaltSync(8), null)
//   // Replace the plain text password with the hash and then store it
//   this.password = hash
//   // Indicates we're done and moves on to the next middlewares
//   next()
// })
module.exports = mongoose.model('customer', customerSchema, 'Customer')
