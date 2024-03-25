/**
 * This function uploads PDF's to the server.
 * @param {*} req 
 * @param {*} res 
 */
function upload(req, res) {
    if (req.file.filename) {
        res.status(201).json({
            message: 'PDF upload successfull!',
            url: req.file.filename
        });
    } else {
        res.status(500).json({
            message: 'Something went wrong!'
        });
    }
}

module.exports = {
    upload: upload
}