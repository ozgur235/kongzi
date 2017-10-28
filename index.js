const express = require("express");
const bodyParser = require("body-parser");
const compression = require("compression");
const session = require("express-session");
const MongoClient = require("mongodb").MongoClient;
const MongoStore = require("connect-mongo")(session);
const md5 = require("md5");

MongoClient.connect("mongodb://127.0.0.1:27017", (err, db) => {
    if(err) throw err;
    const app = express();
    app.use(express.static(__dirname + "/build"));
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(bodyParser.json());
    app.use(compression());
    app.use(session({
        store: new MongoStore({db}),
        secret: ";[,jO{k][27-!J9<^33[7(Nx}|rDMJ",
        resave: false,
        saveUninitialized: false
    }));
    app.use((req, res, next) => {
        if(req.path.substr(1, 3) === "api") {
            next();
        } else {
            res.sendFile(__dirname + "/index.html");
        }
    });
    app.post("/api/login", (req, res) => {
        db.collection("users").findOne({username: req.body.username}, {username: 1, hash: 1}, (err, r) => {
            if(err) throw err;
            if(r && r.hash === md5(req.body.password)) {
                req.session.auth = r.username;
                res.end(r.username);
            } else {
                res.end();
            }
        });
    });
    app.use((req, res, next) => {
        if(req.session.auth) {
            next();
        } else {
            res.end();
        }
    });
    app.post("/api/logout", (req, res) => {
        req.session.destroy(err => {
            if(err) throw err;
        });
        res.end();
    });
    app.get("/api/auth", (req, res) => {
        res.end(req.session.auth);
    });
    app.listen(3000);
});