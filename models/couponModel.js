const mongoose = require('mongoose')

const couponSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please enter an offer name"]
        },
        code: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        },
        validityDate: {
            type: Date,
            required: true,
        },
        TermCondition: {
            type: String,
            required: false,
        },
        Title: {
            type: String,
            required: false,
        },
        Description: {
            type: String,
            required: false,
        },
        Category: {
            type: String,
            required: true,
        },
        Active: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true
    }
)


const Coupon = mongoose.model('Coupon', couponSchema);

module.exports = Coupon;