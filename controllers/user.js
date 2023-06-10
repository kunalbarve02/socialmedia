const User = require("../models/user");

exports.getUserProfile = async(req, res) => {
    let userId = req.query.otherUserId

    if(!userId) {
        return res.status(400).json({
            error: "User not found"
        });
    }

    if(userId == req.profile._id) {
        return res.json(req.profile);
    }

    try{
        var user = await User.findById(userId)
        .select("-password")
        .populate("opento", "_id name username")
    }catch(err) {
        return res.status(400).json({
            error: "User not found"
        });
    }

    var opentoIds = user.opento.map(obj => obj._id)

    if(!user) {
        return res.status(400).json({
            error: "User not found"
        });
    }

    if(!user.isOpen && opentoIds.includes(req.profile._id)) {
        return res.json(user);
    }

    if(!user.isOpen) {
        return res.status(400).json({
            error: "User profile is private"
        });
    }

    return res.json(user);
}

exports.changeProfileMode = (req, res) => {
    User.findByIdAndUpdate(req.profile._id, { isOpen: !req.profile.isOpen }, { new: true, useFindAndModify: false })
    .then(user => {
        res.json("Profile mode changed successfully");
    })
    .catch(err => {
        console.log(err);
        return res.status(400).json({
            error: "Could not change profile mode"
        });
    })
}

exports.addInOpento = async(req, res) => {
    let userId = req.profile._id;
    let otherUserId = req.body.otherUserId;

    var user = await User.findById(userId);
    var otherUser = await User.findById(otherUserId);

    if(!user || !otherUser) {
        return res.status(400).json({
            error: "User not found"
        });
    }

    if(user.opento.includes(otherUserId)) {
        return res.status(400).json({
            error: "User already added"
        });
    }

    user.opento.push(otherUserId);

    user.save()
    .then(user => {
        res.json("User added successfully");
    })
    .catch(err => {
        console.log(err);
        return res.status(400).json({
            error: "Could not add user"
        });
    })
}

exports.removeFromOpento = async(req, res) => {
    let userId = req.profile._id;
    let otherUserId = req.body.otherUserId;

    var user = await User.findById(userId);
    var otherUser = await User.findById(otherUserId);

    if(!user || !otherUser) {
        return res.status(400).json({
            error: "User not found"
        });
    }

    if(!user.opento.includes(otherUserId)) {
        return res.status(400).json({
            error: "User not found"
        });
    }

    user.opento.pull(otherUserId);
    otherUser.opento.pull(userId);

    user.save()
    .then(user => {
        otherUser.save()
        .then(otherUser => {
            res.json("User removed successfully");
        })
        .catch(err => {
            return res.status(400).json({
                error: "Could not remove user"
            });
        })
    })
    .catch(err => {
        return res.status(400).json({
            error: "Could not remove user"
        });
    })
}

exports.getSelfProfile = (req, res) => {
    return res.json(req.profile);
}