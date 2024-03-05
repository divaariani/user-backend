const express = require("express");
const user_Act = require("../controllers/users");
const router = express.Router();

router.get('/', user_Act.getUsers);
router.get('/:roll', user_Act.getSpecUser);
router.post('/', user_Act.createUser);
router.patch('/:roll', user_Act.updateUser);
router.delete('/:roll', user_Act.deleteUser);

module.exports = router;