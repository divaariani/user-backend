const express = require("express");
const user_Act = require("../controllers/users");
const router = express.Router();

router.get('/All', user_Act.getUsers);
router.get('/getUserByPhone/:phone/:password', user_Act.getUserByPhone);
router.get('/getUserByEmail/:email/:password', user_Act.getUserByEmail);
router.post('/create', user_Act.createUser);
router.patch('/update/:phone', user_Act.updateUser);
router.delete('/delete/:phone', user_Act.deleteUser);

module.exports = router;