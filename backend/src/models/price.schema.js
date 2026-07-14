import mongoose from "mongoose"

const priceSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true,
      },
      currency: {
        type: String,
        enum: ["INR", "EUR", "GBP", "USD", "JPY"],
        default: "INR",
      }
}, {
    _id: false,
    _v: false
})

export default priceSchema