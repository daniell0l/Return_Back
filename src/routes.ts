import express from 'express';
import nodemailer from 'nodemailer';
import { NodemailerMailAdapter } from './adapters/nodemailer/nodemailer-mail-adapter';
import { PrimasFeedbacksRepository } from './repositories/prisma/prisma-feedbacks-repository';
import { SubmitFeedbackUseCase } from './use-case/submit-feedbacks-use-case';

export const router = express.Router();

router.post('/feedbacks', async (req, res) => {
    const { type, comment, screenshot } = req.body;

    const primasFeedbacksRepository = new PrimasFeedbacksRepository()
    const nodemailerMailAdapter = new NodemailerMailAdapter

    const submitFeedbackUseCase = new SubmitFeedbackUseCase(
        primasFeedbacksRepository,
        nodemailerMailAdapter
    )
    
    await submitFeedbackUseCase.execute({
        type,
        comment,
        screenshot
    })

    return res.status(201).send()
})