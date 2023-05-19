var db = require('../config/db');

exports.checkTodo = (req, res, next) => {
    const id = req.params.id;
    var ret = 0;

    db.query('SELECT * FROM todo where id = ?',
    [id],
    (err, results, fields) => {
        if (results.length == 0) {
            res.status(404).json({"msg": "Not found"});
        } else {
            next();
        }
    });
}

exports.checkUser = (req, res, next) => {
    const id = req.params.id;
    var ret = 0;

    db.query('SELECT * FROM user where id = ?',
    [id],
    (err, results, fields) => {
        if (err) {
            callback(500, {"msg":"Internal server error"});
        }
        if (results.length == 0) {
            res.status(404).json({"msg": "Not found"});
        } else {
            next();
        }
    });
}

exports.checkUserId = (req, res, next) => {
    const id = req.params.user_id;
    var ret = 0;

    db.query('SELECT * FROM user where id = ?',
    [id],
    (err, results, fields) => {
        if (err) {
            callback(500, {"msg":"Internal server error"});
        }
        if (results.length == 0) {
            res.status(404).json({"msg": "Not found"});
        } else {
            next();
        }
    });
}
