const mongoose = require('mongoose');

const applicationSchema = mongoose.Schema({
    userId: mongoose.ObjectId,
    post: Object,
    resume: Object,
    q1: String,
    ans1: String,
    q2: String,
    ans2: String,
    q3: String,
    ans3: String,
    status: String
}, {
    timestamps: true
});

module.exports = new mongoose.model('Application', applicationSchema);