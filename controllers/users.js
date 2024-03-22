const User = require('../models/userdata');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const generateToken = (user) => {
    return jwt.sign({
        id: user.id,
        email: user.email,
        role: user.role
    }, process.env.ACCESS_TOKEN_KEY, { expiresIn: '1h' });
};

const authenticateUser = async (phone, password) => {
    try {
        const user = await User.findOne({ phone: phone });
        if (!user) {
            throw new Error('User not found');
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            throw new Error('Invalid password');
        }
        const token = generateToken(user);
        return {
            datauser: {
                token: token,
                name: user.name,
                email: user.email,
                phone: user.phone,
                role: user.role,
                status: user.status,
                photo: user.photo,
                registered_on: user.registered_on,
                id: user.id
            }
        };
    } catch (error) {
        throw error;
    }
};

const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const getUser = async (req, res) => {
    const phone = req.params.phone;
    try {
        const user = await User.findOne({ phone: phone });
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const getUserByPhone = async (req, res) => {
    const phone = req.params.phone;
    const password = req.params.password;
    const user = await User.findOne({ phone: phone });

    if (user) {
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (isPasswordMatch) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: 'error' });
        }
    } else {
        res.status(404).json({ message: 'error' });
    }
}

const getUserByEmail = async (req, res) => {
    const email = req.params.email;
    const password = req.params.password;
    const user = await User.findOne({ email: email });

    if (user) {
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (isPasswordMatch) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: 'error' });
        }
    } else {
        res.status(404).json({ message: 'error' });
    }
}

const createUser = async (req, res) => {
    const saltRounds = 10;

    const { name, email, phone, password, role, status, photo } = req.body;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    try {
        const newUser = new User({
            name,
            email,
            phone,
            password: hashedPassword,
            role,
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
    const { name, email, password, role, status, photo } = req.body;
    
    try {
        const existingUser = await User.findOne({ phone: phone });
        if (!existingUser) {
            return res.status(404).json({ message: "User not found" });
        }
        
        let hashedPassword = existingUser.password;
        if (password && password !== existingUser.password) {
            const saltRounds = 10;
            hashedPassword = await bcrypt.hash(password, saltRounds);
        }

        const updatedUser = await User.findOneAndUpdate({ phone: phone }, {
            name,
            email,
            password: hashedPassword,
            role,
            status,
            photo,
        }, { new: true });

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
    authenticateUser,
    getUser,
    getUserByPhone,
    getUserByEmail,
    createUser,
    updateUser,
    deleteUser,
};