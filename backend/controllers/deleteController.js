function deleteController(Model) {
    function deleteOne(req, res) {
        let query = {
            userId: req.userId
        }
        Object.keys(req.params).forEach(key => {
            query[key] = req.params[key]
        })
        Model.deleteOne(query).then(
            result => {
                if (result.n > 0) {
                    return res.status(200).json({ message: "Deletion successful!" });
                } else {
                    return res.status(500).json({ message: "Cannot Delete" });
                }
            }
        );
    }

    return { deleteOne }
}

module.exports = deleteController;