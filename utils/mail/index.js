var api_key = 'key-6b19238623cbac803a7f703f84fbe650';
var domain = 'sandbox61619bfdf80b4ab489b7e427078108ac.mailgun.org';
import Mailgun from 'mailgun-js';
import Email from 'email-templates';
import path from 'path';
import BadRequestError from '../errors/BadRequestError';

const renderTemplate = (templateName, args) => {
    const email = new Email({
         views: {
            options: {
                extension: 'hbs',
            },
        },
      });

    const templateDir = path.join('../views/', '/register');
    return new Promise ((resolve, reject) => {
        email.render(templateDir, { args })
        .then(html => {
            resolve({
                html
            })
        })
        .catch(console.log(reject));
    });
}

const sendMail = ({from, to, subject, context: { templateName, args }}) => {
    var mailgun = new Mailgun({apiKey: api_key, domain: domain});
    renderTemplate(templateName, args).then((result) => {
        const data = {
            to,
            from,
            subject,
            html: result.html
        };
        mailgun.messages().send(data, (error, body) => {
            if (error) {
                console.log('error', error);
            } else {
                console.log('body', body);
            }
        });
    }).catch((e) => {
        throw new BadRequestError({
            message: 'Something goes wrong',
        });
    });
}

export default sendMail;
