const {get_todos, delete_todos_by_id, get_todo_by_id, post_todo, update_todo_by_id} = require('./todos.query');
const {checkTodo} = require('../../middleware/notFound');
const auth = require('../../middleware/auth');

module.exports = (app, bcrypt) => {
    app.get('/todos', auth, (req, res) => {
        get_todos((num, results) =>  {
            res.status(num).json(results);
        });
    });
    app.delete('/todos/:id', auth, checkTodo, (req, res) => {
        delete_todos_by_id(req.params.id, (num, results) => {
            res.status(num).json(results);
        });
    });
    app.get('/todos/:id', auth, checkTodo, (req, res) => {
        get_todo_by_id(req.params.id, (num, results) => {
            res.status(num).json(results);
        });
    });
    app.post('/todos', auth, (req, res) => {
        var title = req.body["title"];
        var description = req.body["description"];
        var due_time = req.body["due_time"];
        var user_id = req.body["user_id"];
        var status = req.body["status"];

        if (title === undefined || description === undefined  ||
            due_time === undefined || user_id === undefined || status === undefined) {
            res.status(400).json({"msg":"Bad parameter"});
            return;
        }
        post_todo({title, description, due_time, user_id, status}, (num, results) => {
            res.status(num).json(results);
        })
    });
    app.put('/todos/:id', auth, checkTodo, (req, res) => {
        var id = req.params["id"];
        var title = req.body["title"];
        var desc = req.body["description"];
        var due_time = req.body["due_time"];
        var user_id = req.body["user_id"];
        var status = req.body["status"];

        if (id === undefined || title === undefined || desc === undefined  ||
        due_time === undefined || user_id === undefined ||
        status === undefined) {
            res.status(400).json({"msg":"Bad parameter"});
            return;
        }
        update_todo_by_id({id, title, desc, due_time, user_id, status}, (num, results) => {
            res.status(num).json(results);
        });
    });
}
