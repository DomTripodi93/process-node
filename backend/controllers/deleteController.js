function deleteController(Models) {
    function deleteOne(req, res) {
        let query = {
            userId: req.userId
        }
        Object.keys(req.params).forEach(key => {
            query[key] = req.params[key];
        })
        Models[0].deleteOne(query).then(
            result => {
                if (result.n > 0) {
                    return res.status(200).json({ message: "Deletion successful!" });
                } else {
                    return res.status(500).json({ message: "Cannot Delete" });
                }
            }
        );
    }

    function deleteCascade(req, res) {
        let query = {
            userId: req.userId
        }
        Object.keys(req.params).forEach(key => {
            query[key] = req.params[key];
        })
        for (let i = 1; i < Models.length; i++) {
            Models[i].deleteMany(query).then(()=>{});
        }
        Models[0].deleteOne(query).then(
            result => {
                if (result.n > 0) {
                    return res.status(200).json({ message: "Deletion successful!" });
                } else {
                    return res.status(500).json({ message: "Cannot Delete" });
                }
            }
        );
    }

    return { deleteOne, deleteCascade }
}

module.exports = deleteController;