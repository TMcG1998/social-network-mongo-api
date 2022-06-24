const { Thought, User } = require('../models');

const thoughtController = {
    // -> /api/thoughts
    // GET to get all thoughts
    getAllThoughts(req, res) {
        Thought.find({})
        .select('-__v')
        .then(dbUsersData => res.json(dbUsersData))
        .catch(err => {
            console.log(err)
            res.status(400).json(err)
        })
    },

    // GET to get a single thought by its _id
    getThoughtById( { params }, res) {
        Thought.findOne( {_id: params.id} )
        .select('-__v')
        .then(dbUsersData => {
            if(!dbUsersData) {
                res.status(404).json({ message: 'No user found with this id!' })
                return;
            }
            res.json(dbUsersData);
        })
        .catch(err => {
            console.log(err)
            res.status(400).json(err)
        })
    },

    // POST to create a new thought (don't forget to push the created thought's _id to the associated user's thoughts array field)
    createThought({ body }, res) {
        Thought.create(body)
        .then(({ _id }) => {
            return User.findOneAndUpdate(
                { _id: body.userId },
                { $push: { thoughts: _id } },
                { new: true }
            )
        })
        .then(dbUsersData => {
            if(!dbUsersData) {
                res.status(404).json({ message: 'No user found with this id!' })
                return;
            }
            res.json(dbUsersData);
        })
        .catch(err => {
            console.log(err)
            res.status(400).json(err)
        })
    },

    // PUT to update a thought by its _id
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate( { _id: params.id }, body, { new: true, runValidators: true })
        .then(dbUsersData => {
            if(!dbUsersData) {
                res.status(404).json({ message: 'No thought found with this id!' })
                return;
            }
            res.json(dbUsersData)
        })
        .catch(err => {
            console.log(err)
            res.status(400).json(err)
        })
    },

    // DELETE to remove a thought by its _id
    deleteThought( { params }, res) {
        Thought.findOneAndDelete({ _id: params.id })
        .then(dbUsersData => {
            if(!dbUsersData) {
                res.status(404).json({ message: 'No thought found with this id!' })
                return;
            }
        res.json(dbUsersData)
        })
        .catch(err => {
            console.log(err)
            res.status(400).json(err)
        })
    }

    // -> /api/thoughts/:thoughtId/reactions
    // POST to create a reaction stored in a single thought's reactions array field

    // DELETE to pull and remove a reaction by the reaction's reactionId value

}

module.exports = thoughtController;