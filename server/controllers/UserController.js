const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {getStudentById, getStudentByEmail} = require('../model/StudentModel');
const {getSPSOById, getSPSOByName} = require('../model/SPSOModel');

async function loginStudent(req, res, next) {
    try {
        const { student_email, student_password } = req.body;
        const result = await getStudentByEmail(student_email);

        if (result.length === 0) {
            return res.status(401).json({ message: "Invalid student email or password" });
        }

        const user = result[0];
        //const isMatch = await bcrypt.compare(student_password, user.student_password);
        const isMatch = student_password === user.student_password;
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid student email or password" });
        }

        const token = jwt.sign(
            {
                student_id: user.student_id,
                SPSO: false,
            },
            'the-strong-secret',
            {
                expiresIn: "1h"
            }
        );

        delete user.student_password;
        res.cookie("token", token, { maxAge: 3600000, path: "/" });
        res.json({
            message: "Login successful!",
            userInfo: user,
            token: token
        });
    } catch (err) {
        next(err);
    }
}


async function loginSPSO(req, res, next) {
    try {
        const { spso_name, spso_password } = req.body;
        const result = await getSPSOByName(spso_name);
        if (result.length === 0) {
            return res.status(401).json({ message: "Invalid spso name or password" });
        }
        const user = result[0];
        //const isMatch = await bcrypt.compare(student_password, user.student_password);
        const isMatch = spso_password === user.spso_password;
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid spso email or password" });
        }

        const token = jwt.sign(
            {
                spso_id: user.spso_id,
                SPSO: true,
            },
            'the-strong-secret',
            {
                expiresIn: "1h"
            }
        );

        delete user.spso_password;
        res.cookie("token", token, { maxAge: 3600000, path: "/" });
        res.json({
            message: "Login successful!",
            userInfo: user,
            token: token
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