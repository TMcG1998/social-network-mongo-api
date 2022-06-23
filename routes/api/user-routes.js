const router = require('express').Router();
// import all functions from user-controller
const {
    getAllUsers,
    getUserById,
    createUser
} = require('../../controllers/user-controller');

router.route('/')
    .get(getAllUsers)
    .post(createUser)

router.route('/:id')
    .get(getUserById)

module.exports = router;