import type { NextApiRequest, NextApiResponse } from 'next';
import { sendmail, sendToMySelf } from '../../helpers/sendmail';

async function requestHandler(req: NextApiRequest, res: NextApiResponse) {

    const { to, subject, text, html } = req.body;
    console.log(req.body);
    const secretInHeader = req.headers['x-auth-secret'];
    const secretConfigured = process.env?.SECRET || "noSecret";
    if (secretInHeader !== secretConfigured) {
        res.status(403).json({
            ok: false,
            msg: "Incorrect credential."
        });
        return;
    }

    const receipt = await sendmail({
        to,
        subject,
        text,
        html
    });

    const receipt2 = await sendToMySelf({
        subject: "发送回执",
        text: JSON.stringify(receipt)
    });

    res.status(200).json({
        receipt, receipt2
    });
}

export default requestHandler;
