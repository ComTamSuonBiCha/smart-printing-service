const crypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {getStudentById, getStudentByEmail} = require('../model/StudentModel');
const {getSPSOById, getSPSOByName} = require('../model/SPSOModel');

async function loginStudent(req, res, next) {
    try {
        const result = await getStudentByEmail(req.body.student_email);

        // Check if the email exists
        if (result.length === 0) {
            res.status(401).send("Invalid email! Please try again.");
            return;
        }
        crypt.compare(req.body.student_password, result[0].student_password, (err, same) => {
            if (err) {
                throw new Error(err);
            }
            if (!same) {
                res.status(401).send("Invalid password! Please try again.");
                return;
            }
            const token = jwt.sign(
                {
                student_id: result[0].student_id,
                SPSO: false,
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: "1h"
                }
            );
            delete result[0].student_password;
            res.cookie("token", token, {maxAge: 3600000, path: "/"});
            res.json({
                message: "Login successful!",
                userInfo: result[0],
                token: token
            });
        });
    }
    catch (err) {
        next(err);
    }
}


async function loginSPSO(req, res, next) {
    try {
        const result = await getSPSOByName(req.body.spso_name);

        // Check if the email exists
        if (result.length === 0) {
            res.status(401).send("Invalid name! Please try again.");
            return;
        }
        crypt.compare(req.body.spso_password, result[0].spso_password, (err, same) => {
            if (err) {
                throw new Error(err);
            }
            if (!same) {
                res.status(401).send("Invalid password! Please try again.");
                return;
            }
            const token = jwt.sign(
                {
                spso: result[0].spso_id,
                SPSO: true,
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: "1h"
                }
            );
            delete result[0].student_password;
            res.cookie("token", token, {maxAge: 3600000, path: "/"});
            res.json({
                message: "Login successful!",
                userInfo: result[0],
                token: token
            });
        });
    }
    catch (err) {
        next(err);
    }
}

async function getUserById(req, res, next) {
    try {
        const id = req.user.id, SPSO = req.user.SPSO;

        if (id == null) {
            res.status(401).send("Invalid token! Please login again.");
            return;
        }
        let result;
        if (SPSO) {
            result = await getSPSOById(id);
        } 
        else {
            result = await getStudentById(id);
        }

        if (result.length === 0) {
            res.status(401).send("Invalid token! Please login again.");
            return;
        }

        delete result[0].student_password;
        res.json(result[0]);
    }
    catch (err) {
        next(err);
    }
}

module.exports = {
    loginStudent,
    loginSPSO,
    getUserById
};