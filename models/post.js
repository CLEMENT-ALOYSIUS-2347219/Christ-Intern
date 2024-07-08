const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: String,
    isWFH: Boolean,
    location: String,
    startD: String,
    duration: String,
    stipend: String,
    applyBy: Date,
    about: String,
    skills: [String],
    eligibility: String,
    perks:String,
    noOpen: Number,
    q1_q: String,
    q1_s: String,
    q1_p: String,
    q2_q: String,
    q2_s: String,
    q2_p: String,
    q3_q: String,
    q3_s: String,
    q3_p: String
}, {
    timestamps: true
});

module.exports = new mongoose.model('Post', postSchema);