function sendVerificationCode(username, to, name, code, resend = false) {
    if (process.env.NODE_ENV == "test" || !process.env.SMTP_HOST)
        return;

    const nodemailer = require("nodemailer");

    let config = {
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        secure: process.env.SMTP_SECURE_MODE == "true" ? true : false,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASSWORD
        }
    }

    let verificationCodeLink = process.env.HOST + "/verify-email/" + to + "/" + code;

    let html = `<p>Hi, ${name}.</p>
    <p>Thank you for signing up.</p>
    <p>Your username is ${username}</p>
    <p>Please click the following link to verify your email address.</p>
    <p><a href="${verificationCodeLink}">${verificationCodeLink}</a></p>`

    let html2 = `<p>Hi, ${name}.</p>
    <p>Your username is ${username}</p>
    <p>Please click the following link to verify your email address.</p>
    <p><a href="${verificationCodeLink}">${verificationCodeLink}</a></p>`

    let email = {
        from: "no-reply@jalapeno.app",
        to: to,
        subject: resend ? "Verify your email address" : "Thank you for signing up at Jalapeno!",
        "html": resend ? html2 : html,
        "text": resend ? html2 : html
    }

    let transporter = nodemailer.createTransport(config);

    transporter.sendMail(email, function (err, info) {
        if (err)
    });
}

module.exports = sendVerificationCode