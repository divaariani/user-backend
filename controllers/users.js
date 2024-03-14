const User = require('../models/userdata');

const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const getUserByPhone = async (req, res) => {
    const phone = req.params.phone;
    const password = req.params.password;
    try {
        const user = await User.findOne({ phone: phone, password: password});
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const getUserByEmail = async (req, res) => {
    const email = req.params.email;
    const password = req.params.password;
    try {
        const user = await User.findOne({ email: email, password: password });
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const createUser = async (req, res) => {
    const { name, email, phone, password, status, photo } = req.body;

    try {
        const newUser = new User({
            name,
            email,
            phone,
            password,
            status,
            photo,
            registered_on: new Date(),
        });

        const createdUser = await newUser.save();
        res.status(201).json(createdUser);
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(400).json({ message: error.message });
    }
};

const updateUser = async (req, res) => {
    const phone = req.params.phone;
    try {
        const updatedUser = await User.findOneAndUpdate({ phone: phone }, req.body, { new: true });
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const deleteUser = async (req, res) => {
    const phone = req.params.phone;
    try {
        await User.findOneAndDelete({ phone: phone });
        res.status(204).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

module.exports = {
    getUsers,
    getUserByPhone,
    getUserByEmail,
    createUser,
    updateUser,
    deleteUser,
};