const User = require('../models/user');

// Create user
exports.createUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const userdata = new User({
            username,
            email,
            password,
            photo: req.file ? req.file.path : null,
        });

        await userdata.save();
        res.status(201).json(userdata);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get user
exports.getUser = async (req, res) => {
    try {
        const userdata = await User.findById(req.params.id);
        if (!userdata) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(userdata);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Update user
exports.updateUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const updatedData = {
            username,
            email,
            password,
            updatedAt: Date.now(),
        };

        if (req.file) {
            updatedData.photo = req.file.path;
        }

        const userdata = await User.findByIdAndUpdate(req.params.id, updatedData, { new: true });
        if (!userdata) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(userdata);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete user
exports.deleteUser = async (req, res) => {
    try {
        const userdata = await User.findByIdAndDelete(req.params.id);
        if (!userdata) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json({ message: 'User deleted' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
