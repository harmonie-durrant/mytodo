const {get_users, get_user_todos, get_info_from_id_or_mail, delete_user_by_id, update_user_by_id} = require('./user.query');
const auth = require('../../middleware/auth');
const {checkUser} = require('../../middleware/notFound');

module.exports = (app, bcrypt) => {
    app.get('/user', auth, (req, res) => {
        get_users((num, results) => {
            res.status(num).json(results);
        });
    });
    app.get('/user/todos', auth, (req, res) => {
        get_user_todos(req.user, (num, results) => {
            res.status(num).json(results);
        });
    });
    app.get('/users/:data', auth, (req, res) => {
        get_info_from_id_or_mail(req.params.data, (num, results) => {
            res.status(num).json(results);
        });
    });
    app.delete('/users/:id', auth, checkUser, (req, res) => {
        delete_user_by_id(req.params.id, (num, results) => {
            res.status(num).json(results);
        });
    });
    app.put('/users/:id', auth, checkUser, (req, res) => {
        var id = req.params["id"];
        var mail = req.body["email"];
        var mname = req.body["name"];
        var fname = req.body["firstname"];
        var pwd = req.body["password"];

        if (id === undefined || mail === undefined || mname === undefined  ||
        fname === undefined || pwd === undefined) {
            res.status(400).json({"msg":"Bad parameter"});
            return;
        }
        pwd = bcrypt.hashSync(pwd, 10);
        update_user_by_id(id, mail, pwd, mname, fname, (num, results) => {
            res.status(num).json(results);
        });
    });
}
