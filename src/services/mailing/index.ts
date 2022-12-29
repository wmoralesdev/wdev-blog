import './config';
import fs from 'fs';
import aws from 'aws-sdk';

export const buildEmail = (to: string[], html: string, text: string, subject: string) => {
    const Charset = 'UTF-8';

    return {
        Destination: { ToAddresses: to },
        Message: {
            Body: {
                Html: {
                    Charset,
                    Data: html,
                },
                Text: {
                    Charset,
                    Data: text,
                },
                Subject: {
                    Charset,
                    Data: subject,
                },
            },
        },
        Source: process.env.EMAIL_BOT_IDENTITY,
    };
};

export const sendCommentResponseNotification = async (to: string, who: string, url: string) => {
    await fs.readFile(`${__dirname}/template/comment.html`, 'utf8', async (err, html) => {
        const parsedHtml = html.replaceAll('_TO_', to).replaceAll('_WHO_', who).replaceAll('_URL_', url);

        const sendPromise = await new aws.SES({
            params: buildEmail([to], parsedHtml, 'Comment replied', `${who} has replied to your comment`),
        }).sendEmail().promise();

        console.log(sendPromise);
    });
};
