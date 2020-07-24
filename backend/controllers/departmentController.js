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

    function get(req, res) {
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


    return { post, get };
  }
  
  module.exports = departmentController;