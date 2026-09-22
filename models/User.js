const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    role: {
        type: String,
        required: true,
        enum: ['admin', 'advisor', 'student']
    },
    studentId: {
        type: String,
        required: function() { return this.role === 'student'; }
    },
    advisorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: function() { return this.role === 'student'; }
    },
    active: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);