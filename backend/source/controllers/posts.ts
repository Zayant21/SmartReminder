/** source/controllers/posts.ts */
import { Request, Response, NextFunction, application } from 'express';
import axios, { AxiosResponse } from 'axios';

const mongoose = require('mongoose');

const kittySchema = new mongoose.Schema({
    name: String
});

const Kitten = mongoose.model('Kitten', kittySchema);

// adding a post
const addPost = async (req: Request, res: Response, next: NextFunction) => {
    await mongoose.connect('mongodb://localhost:27017/test');
    // add the post
    const kitty = new Kitten({ name: req.body.name });
    await kitty.save();
    let response: String = "Added a post to the db" + ": " + req.body.name;
    // return response
    return res.status(200).json({
        message: response 
    });
};

// getting all posts
const getPosts = async (req: Request, res: Response, next: NextFunction) => {
    await mongoose.connect('mongodb://localhost:27017/test');
    const kittens = await Kitten.find();
    console.log(kittens);
    
    return res.status(200).json({
        message: kittens 
    });
};

// getting a single post
const getPost = async (req: Request, res: Response, next: NextFunction) => {
    // get the post id from the req
    let id: string = req.params.id;
    // get the post
    // let result: AxiosResponse = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`);
    // let post: Post = result.data;
    return res.status(200).json({
        message: id
    });
};

// updating a post
const updatePost = async (req: Request, res: Response, next: NextFunction) => {
    // get the post id from the req.params
    let id: string = req.params.id;
    // get the data from req.body
    let title: string = req.body.title ?? null;
    let body: string = req.body.body ?? null;
    // update the post
    let response: AxiosResponse = await axios.put(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        ...(title && { title }),
        ...(body && { body })
    });
    // return response
    return res.status(200).json({
        message: response.data
    });
};

// deleting a post
const deletePost = async (req: Request, res: Response, next: NextFunction) => {
    // get the post id from req.params
    let id: string = req.params.id;
    // delete the post

    // return response
    return res.status(200).json({
        message: 'post deleted successfully'
    });
};

export default { getPosts, getPost, updatePost, deletePost, addPost };