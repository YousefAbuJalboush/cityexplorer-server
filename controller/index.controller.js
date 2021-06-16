const indexController = (req, res) => {
    res.send('Your API Server is running');
}

// we are exporting the model, making it visible to the other files
module.exports = indexController;
