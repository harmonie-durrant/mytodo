const {register_user, check_mail_exist, get_account_token} = require('./../user/user.query');

module.exports = (app, bcrypt) => {
    app.post('/register', (req, res) => {
        var mail = req.body.email;
        var mname = req.body.name || "";
        var fname = req.body.firstname || "";
        var pwd = req.body.password;

        if (mail === undefined || mname === undefined  ||
            fname === undefined || pwd === undefined) {
            res.status(500).json({"msg":"Internal server error"});
            return;
        }
        pwd = bcrypt.hashSync(pwd, 10);
        check_mail_exist(res, mail, (nbr) => {
            if (nbr === 84) {
                res.status(409).json({"msg":"Account already exists"});
                return;
            }
            register_user(res, mail, pwd, mname, fname);
        })
		get_account_token(res, mail, pwd, bcrypt, (nbr) => {
            if (nbr === 84) {
                res.status(401).json({"msg":"Invalid Credentials"});
                return;
            }
        })
    });
    app.post('/login', (req, res) => {
        var mail = req.body["email"];
        var pwd = req.body["password"];

        if (mail === undefined || pwd === undefined) {
            res.status(400).json({"msg":"Bad parameter"});
            return;
        }
        get_account_token(res, mail, pwd, bcrypt, (nbr) => {
            if (nbr === 84) {
                res.status(401).json({"msg":"Invalid Credentials"});
                return;
            }
        })
    });
}
