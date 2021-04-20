const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Create and Save a Record of a Model:

router.post("/", async (req, res) => {
    try {
        const { name, age, favoriteFoods } = req.body;
        const user = new User({ name, age, favoriteFoods });
        await user.save();
        res.status(200).send({ msg: "user added", user });
    } catch (error) {
        res.status(500).send("fail to add user");
    }
});

// Create Many Records with model.create()

router.post("/added", async (req, res) => {
    try {
        await User.insertMany([
            { name: "Ahmed", age: 25, favoriteFoods: ["egg", "fruits"] },
            { name: "yosra", age: 23, favoriteFoods: ["egg", "fruits"] },
        ]);
        res.status(200).send("user is added");
    } catch (error) {
        res.status(500).send("fail to add user");
    }
});

// Use model.find() to Search in the Database

router.get("/", async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).send(users);
    } catch (error) {
        res.status(500).send("fail to get user");
    }
});

// Use model.findOne() to Return a Single Matching Document from the Database

router.get("/", async (req, res) => {
    try {
        const user = await User.findOne();
        res.status(200).send({ msg: "user found", user });
    } catch (error) {
        res.status(500).send("fail to get user");
    }
});

// Use model.findById() to Search in the Database By _id

router.get("/:UserId", async (req, res) => {
    try {
        const id = req.params.UserId;
        const user = await User.findById({ _id: id });
        res.status(200).send({ msg: "user found", user });
    } catch (error) {
        res.status(500).send("fail to get user");
    }
});

// Perform Classic Updates by Running Find, Edit, then Save

router.put("/:UserId", async (req, res) => {
    try {
        const id = req.params.UserId;
        const user = await User.find({ _id: id }, (result, err) => {
            if (err) {
                console.log(err);
            } else {
                result.favoriteFoods.push("hamburger");
            }
        }).save();
        res.status(200).send({ msg: "user updated", user });
    } catch (error) {
        res.status(500).send("fail to update user");
    }
});

// Perform New Updates on a Document Using model.findOneAndUpdate()

router.put("/:UserId", async (req, res) => {
    try {
        const id = req.params.UserId;
        const user = await User.findOnedAndUpdate(
            { _id: id },
            { $set: { favoriteFoods: favoriteFoods.push("hamburger") } }
        );

        res.status(200).send({ msg: "user updated", user });
    } catch (error) {
        res.status(500).send("fail to update user");
    }
});

// Delete One Document Using model.findByIdAndRemove

router.delete("/:UserId", async (req, res) => {
    try {
        const id = req.params.UserId;
        const user = await User.findOnedAndRemove({ _id: id });

        res.status(200).send({ msg: "user deleted", user });
    } catch (error) {
        res.status(500).send("fail to delete user");
    }
});

//  Delete Many Documents with model.remove()

router.delete("/", async (req, res) => {
    try {
        const res = await User.remove({ name: "Mary" });
        res.status(200).send({ msg: "users deleted" });
    } catch (error) {
        res.status(500).send("fail to delete users");
    }
});

module.exports = router;
