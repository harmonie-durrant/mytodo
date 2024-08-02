// Environment vars
require("dotenv").config();
const {delete_todos_by_user_id} = require('../todos/todos.query');
var jwt = require('jsonwebtoken');
var db = require('../../config/db');

exports.get_users = (callback) => {
    db.query('SELECT * FROM `user`',
    (err, results, fields) => {
        if (err) {
            callback(500, {"msg":"Internal server error"});
            return;
        }
        callback(200, results);
    });
}

exports.get_user_todos = (id, callback) => {
    db.query('SELECT * FROM todo WHERE user_id = ?',
    [id],
    (err, results, fields) => {
        if (err) {
            callback(500, {"msg":"Internal server error"});
            return;
        }
        callback(200, results);
    })
}

exports.get_info_from_id_or_mail = (data, callback) => {
    db.query('SELECT * FROM user WHERE email = ?',
    [data],
    (err, results, fields) => {
        if (err) {
            callback(500, {"msg":"Internal server error"});
            return;
        }
        if (results.length > 0) {
            callback(200, results);
            return;
        }
        db.query('SELECT * FROM user WHERE id = ?',
        [data],
        (err, results, fields) => {
            if (results.length == 0) {
                callback(404, {"msg": "User not found"});
            } else {
                callback(200, results[0]);
            }
        });
    });
}

exports.delete_user_by_id = (id, callback) => {
    var res = 0;

    delete_todos_by_user_id(id, (ret) => {
        res = ret;
    });
    if (res == 84) {
        callback(500, {"msg":"Internal server error"});
        return;
    }
    db.query('DELETE FROM user WHERE id = ?',
    [id],
    (err, results, fields) => {
        if (err) {
            callback(500, {"msg":err});
            return;
        }
        callback(200, {"msg":`Succesfully deleted record number: ${id}`});
    });
}

exports.update_user_by_id = (id, email, pwd, mname, fname, callback) => {
    db.query('UPDATE `user` SET email = ?, password = ?, name = ?, firstname = ? WHERE id = ?',
    [email, pwd, mname, fname, id],
    (err, results, fields) => {
        if (err) {
            callback(500, {"msg":"Internal server error"});
        }
        db.query('SELECT id, email, password, created_at, firstname, name FROM user WHERE id = ?',
        [id],
        (err, results, fields) => {
            if (err) {
                callback(500, {"msg":"Internal server error"});
                return;
            }
            callback(200, results[0]);
        });
    });
}

exports.check_mail_exist = (res, mail, callback) => {
    db.query('SELECT * FROM `user` WHERE email = ?',
    [mail],
    (err, results, fields) => {
        if (err) {
            res.status(403).json({error: err});
            return;
        }
        if (results.length > 0) {
            callback(84);
        } else {
            callback(0);
        }
    })
}

exports.register_user = (res, mail, pwd, lname, fname) => {
    db.query("INSERT INTO user (email, password, name, firstname) VALUES (?, ?, ?, ?)",
    [mail, pwd, lname, fname],
    (err, results, fields) => {
        if (err) {
            callback(500, {"msg":"Internal server error"});
            return;
        }
        const token = jwt.sign({email:mail, password:pwd}, process.env.SECRET);
        res.status(200).json({token});
    })
}

exports.get_account_token = (res, mail, pwd, bcrypt, callback) => {
    db.query('SELECT password, id FROM `user` WHERE email = ?',
    [mail],
    (err, results, fields) => {
        if (err) {
            callback(500, {"msg":"Internal server error"});
            return;
        }
        if (results.length > 0) {
            var pwd2 = results[0].password;
            var id2 = results[0].id;
            if (bcrypt.compareSync(pwd, pwd2)) {
                const token = jwt.sign({email:mail, id:id2}, process.env.SECRET);
                res.json({token});
                callback(0);
            } else {
                callback(84);
            }
        } else {
            callback(84);
        }
    })
}
