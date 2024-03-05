const User = require('../models/userdata');

const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const getSpecUser = async (req, res) => {
    const roll = req.params.roll;
    try {
        const user = await User.findOne({ roll: roll });
        res.status(200).json(user);
    } catch (error) {
        res.status  (404).json({ message: error.message });
    }
}

const updateUser = async (req, res) => {
    const roll = req.params.roll;
    try {
        const updatedUser = await User.findOneAndUpdate({ roll: roll }, req.body, { new: true });
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const deleteUser = async (req, res) => {
    const roll = req.params.roll;
    try {
        await User.findOneAndDelete({ roll: roll });
        res.status(204).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const createUser = async (req, res) => {
    const { name, roll, registration, subjects } = req.body;

    try {
        const newUser = new User({
            name,
            roll,
            registration,
            subjects,
            registered_on: new Date(),
        });

        const createdUser = await newUser.save();
        res.status(201).json(createdUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getSpecUserByName = async (req, res) => {
    const name = req.params.name;
    try {
        const user = await User.findOne({ name: name });
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

module.exports = {
    getUsers,
    getSpecUser,
    updateUser,
    deleteUser,
    createUser,
    getSpecUserByName,
};