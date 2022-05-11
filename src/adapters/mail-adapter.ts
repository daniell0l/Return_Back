export interface SendMailData {
    subject: string;
    body: string;
}

export interface mailAdapter {
    sendMail:(data: SendMailData) => void;
}