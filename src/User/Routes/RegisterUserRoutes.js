const express = require('express');
const router = express.Router();
const {
    SaveUpdateUserRouter,
    GetAllUserRouter,
    GetSingleUserRouter,
    DeleteUserRouter
} = require('../Controller/RegisterUser'); // Adjust the path as needed

// Route definitions
router.post('/', SaveUpdateUserRouter); // Handle POST requests to create or update user
router.get('/', GetAllUserRouter); // Handle GET requests to fetch all users
router.get('/SingleUser/', GetSingleUserRouter); // Handle GET requests to fetch a single user
router.delete('/:id', DeleteUserRouter); // Handle DELETE requests to delete a user

module.exports = router;
