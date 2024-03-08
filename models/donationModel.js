const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema(
    {
        status: {
            type: String,
            required: true,
        },
        requestType: {
            type: String,
            required: true,
        },
        donorName: {
            type: String,
            required: true,
        },
        donorEmail: {
            type: String,
            required: true,
        },
        donorPhone: {
            type: String,
            required: true,
        },
        bloodGroup: {
            type: String,
            required: true,
        },
        // bloodGroup: {
        //     type: String,
        //     required: [true, "blood group is require"],
        //     enum: ["O+", "O-", "AB+", "AB-", "A+", "A-", "B+", "B-"],
        // },
        // Add more fields as needed

        // organisation: {
        //     type: String,
        //     required: [true, "organisation is require"],
        // },

        recipient: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
            required: [true, "recipient is require"],
        },

        organisation: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
            required: [true, "organisation is require"],
        },

        createdAt: {
            type: Date,
            default: Date.now,
        },
    });

module.exports = mongoose.model("Donation", donationSchema);
