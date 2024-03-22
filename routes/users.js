const express = require("express");
const user_Act = require("../controllers/users");
const authMiddleware = require("../controllers/auth");
const router = express.Router();

router.get('/All', authMiddleware.verifyToken, user_Act.getUsers);
router.post('/login', async (req, res) => {
    const { phone, password } = req.body;
    try {
        const tokenData = await user_Act.authenticateUser(phone, password);
        res.status(200).json(tokenData);
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
});

router.get('/getUser/:phone', authMiddleware.verifyToken, user_Act.getUser);
router.get('/getUserByPhone/:phone/:password', authMiddleware.verifyToken, user_Act.getUserByPhone);
router.get('/getUserByEmail/:email/:password', authMiddleware.verifyToken, user_Act.getUserByEmail);
router.post('/create', authMiddleware.verifyToken, user_Act.createUser);
router.patch('/update/:phone', authMiddleware.verifyToken, user_Act.updateUser);
router.delete('/delete/:phone', authMiddleware.verifyToken, user_Act.deleteUser);

module.exports = router;