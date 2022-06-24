const { User } = require('../models');

const userController = {
    // -> /api/users
    // get all users
    getAllUsers(req, res) {
        User.find({})
        .populate({ path: 'thoughts', select: '-__v' })
        .populate({ path: 'friends', select: '-__v' })
        .select('-__v')
        .then(dbUsersData => res.json(dbUsersData))
        .catch(err => {
            res.status(404).json(err);
        })
    },
    // get a single user by it's id and populated thought and friend data
    getUserById( {params} , res) {
        User.findOne({ _id: params.id })
        .populate({ path: 'thoughts', select: '-__v' })
        .populate({ path: 'friends', select: '-__v' })
        .select('-__v')
        .then(dbUsersData => {
            if(!dbUsersData) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
            res.json(dbUsersData);
        })
        .catch(err => res.status(500).json(err));
    },

    // post a new user
    createUser({ body }, res) {
        User.create(body)
        .then(dbUsersData => res.json(dbUsersData))
        .catch(err => res.status(400).json(err))
    },

    // put to update a user by its id
    updateUser({ params, body }, res) {
        User.findOneAndUpdate( { _id: params.id }, body, { new: true, runValidators: true })
            .then(dbUsersData => {
                if(!dbUsersData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(dbUsersData)
            })
            .catch(err => res.status(400).json(err))
    },

    // delete to remove a user by its id
    deleteUser( {params }, res) {
        User.findOneAndDelete({ _id: params.id })
        .then(dbUsersData => {
            if(!dbUsersData) {
                res.status(404).json({ message: 'No user found with this id!' })
                return;
            }
            res.json(dbUsersData)
        })
        .catch(err => res.status(400).json(err))
    }

    // -> /api/users/:userId/friends/:friendId
    // post to add a new friend to a users friend list

    // delete to remove a friend from users friend list
    
}

module.exports = userController;