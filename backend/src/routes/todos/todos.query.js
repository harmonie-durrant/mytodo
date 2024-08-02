var db = require('../../config/db');

exports.get_todos = (callback) => {
    db.query('SELECT * FROM todo',
    (err, results, fields) => {
        if (err) {
            callback(500, {"msg":"Internal server error"});
            return;
        }
        callback(200, results);
    });
}

exports.get_todo_by_id = (id, callback) => {
    db.query('SELECT * FROM todo where id = ?',
    [id],
    (err, results, fields) => {
        if (err) {
            callback(500, {"msg":"Internal server error"});
            return;
        }
        callback(200, results[0]);
    });
}

exports.delete_todos_by_id = (user_id, callback) => {
    db.query('DELETE FROM todo WHERE user_id = ?',
    [user_id],
    (err, results, fields) => {
        if (err) {
            callback(500, {"msg":"Internal server error"});
            return;
        }
    });
}

exports.delete_todos_by_user_id = (id, callback) => {
    db.query('DELETE FROM todo WHERE user_id = ?',
    [id],
    (err, results, fields) => {
        if (err) {
            callback(84);
            return;
        }
        callback(0);
    });
}

exports.post_todo = (data, callback) => {
    db.query('INSERT INTO todo (title, description, due_time, user_id, status) VALUES (?, ?, ?, ?, ?)',
    [data.title, data.description, data.due_time, data.user_id, data.status],
    (err, results, fields) => {
        if (err) {
            callback(500, {"msg":"Internal server error"});
            return;
        }
        const id = results.insertId;
        db.query('SELECT * from todo WHERE id = ?',
        [id],
        (err, results, fields) => {
            if (err) {
                callback(500, {"msg":"Internal server error"});
            }
            callback(200, {results})
        });
    });
}

exports.update_todo_by_id = (data, callback) => {
    db.query('UPDATE `todo` SET title = ?, description = ?, due_time = ?, user_id = ?, status = ? WHERE id = ?',
    [data.title, data.desc, data.due_time, data.user_id, data.status, data.id],
    (err, results, fields) => {
        if (err) {
            callback(500, {"msg":"Internal server error"});
            return;
        }
        db.query('SELECT title, description, due_time, user_id, status FROM todo WHERE id = ?',
        [data.id],
        (err, results, fields) => {
            if (err) {
                callback(500, {"msg":"Internal server error"});
            }
            callback(200, results[0]);
        });
    });
}
