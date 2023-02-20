const User = require('../models/users');

exports.getUsers = async (req, res, next) => {
    try {
        const users = await User.findAll();
        res.status(200).json({users});
    } catch (error) {
        res.status(500).json({error: error.message})
    } 
}

exports.getUser = (req, res, next) => {
    const userId = req.params.userId;
    User.findByPk(userId)
        .then(user => {
            if (!user) {
                return res.status(404).json({message: 'user not found'})
            }
            res.status(200).json({user: user});
        })
        .catch(err => console.log(err));
}

exports.createUser = (req, res, next) => {
    const name = req.body.name;
    const email = req.body.email;

    User.create({
        name: name,
        email: email
    })
        .then(result => {
            console.log('User create');
            res.status(201).json({message: 'user create succesfully!', user: result})
        })
        .catch(err => {
            console.log(err);
        })
}

exports.updateUser = (req, res, next) => {
    const userId = req.params.userId;
    const updatedName = req.body.name;
    const updatedEmail = req.body.email;

    User.findByPk(userId)
        .then(user => {
            if(!user) {
                return res.status(404).json({ message: 'user not found'});
            }

            user.name = updatedName
            user.email = updatedEmail

            return user.save()
        })
        .then(result => {
            res.status(200).json({message: 'user updated', user: result})
        })
        .catch(err => console.log(err));

}

exports.deleteUser = (req, res, next) => {
    const userId = req.params.userId;

    User.findByPk(userId)
        .then(user => {
            if(!user) {
                return res.status(404).json({message: 'user not found'})
            }
            return User.destroy({
                where: {
                    id: userId
                }
            });
        })
        .then(result => {
            res.status(200).json({message: 'user deleted'});
        })
        .catch(err => console.log(err))

}