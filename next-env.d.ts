/// <reference types="next" />
/// <reference types="next/types/global" />

interface IEmailData {
    to: string;
    subject: string;
    text: string;
    html?: string;
}

interface IEmailDataSimplified {
    subject: string;
    text: string;
    html?: string;
}

interface ISendReceipt {
    date: string | number;
    messageId: string | undefined;
    previewUrl: string | false;
    to: string;
    subject: string;
    digest: string;
};
