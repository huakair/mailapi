import nodemailer from "nodemailer";

const username = process.env?.EMAIL_USERNAME || "unknowUser";
const password = process.env?.EMAIL_PASSWORD || "unknowPass";
const host = process.env?.EMAIL_HOST || "unknowHost";
const nickName = process.env?.NICK_NAME || "John";

export async function sendmail({ to, subject, text, html }: IEmailData): Promise<ISendReceipt> {

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host,
        port: 587,
        secure: false, // upgrade later with STARTTLS
        auth: {
            user: username,
            pass: password
        }
    });

    let info = await transporter.sendMail({
        from: `"${nickName}" <${username}>`,
        to,
        subject,
        text,
        html
    });

    const receipt = {
        date: (new Date()).toISOString(),
        messageId: info.messageId,
        previewUrl: nodemailer.getTestMessageUrl(info),
        to,
        subject,
        digest: (text || html || "").substr(0, 120)
    };

    console.log(receipt);

    return receipt;
}

export async function sendToMySelf({ subject, text, html }: IEmailDataSimplified): Promise<ISendReceipt> {

    const receipt = await sendmail({
        to: username,
        subject, text, html
    });
    
    console.log(receipt);

    return receipt;
}
