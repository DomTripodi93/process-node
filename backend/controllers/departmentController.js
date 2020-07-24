function departmentController(Department) {

    function post(req, res) {
        const dept = new Department(req.body);
        dept.userId = req.userId;
        dept.save((err) => {
            if (err) {
                return res.send(err);
            }
            res.status(201);
            return res.json(dept);
            });
    };

    function getByUser(req, res) {
        const query = {
            userId: req.userId
        }
        Department.find(query, (err, depts) => {
            if (err) {
                return res.send(err);
            }
            return res.json(depts);
        })
    };

    function getByName(req, res) {
        const query = {
            userId: req.userId,
            deptName: req.params.name
        }
        Department.find(query, (err, dept) => {
            if (err) {
                return res.send(err);
            }
            return res.json(dept[0]);
        })
    }


    return { post, getByUser, getByName };
  }
  
  module.exports = departmentController;


//   res.status(401).json({ message: "Auth failed!" });