import express from "express"
import nodemailer from "nodemailer"
import { prisma } from "./prisma ";

const app = express();

app.use(express.json());

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "124c6c1b885dd4",
      pass: "624ee831189869"
    }
  });

app.post('/feedbacks', async (req, res) => {
    const { type, comment, screenshot } = req.body;

    const feedback = await prisma.feedback.create({
        data: {
            type,
            comment,
            screenshot,
        }
    })

    transport.sendMail({
        from: 'Equipe Feedget <oi@feedget.com>',
        to: 'Daniel Medrado <danielocarahotmail.com@gmail.com>',
        subject: 'Novo feedback',
        html: [
            `<div style="font-family: sans-serif; font-size: 16px; color: #111;">`,
            `<p>Tipo de feedback: ${type}</p>`,
            `<p>Comentário: ${comment} <p>`,
            `</div>`
        ].join('\n')
   });

    return res.status(201).json( {data: feedback} );
})

app.listen(3333, () => {
    console.log("Server is Running!")
})