import { Router } from 'express';
import pool from '../db.js';
import nodemailer from 'nodemailer';
import 'dotenv/config';

const transporter = nodemailer.createTransport({
    service: 'gmail', // ou 'outlook', ou un SMTP custom
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
    }
});

const router = Router();

router.get('/', async (req, res) => {
    try {
        const [rows] = await pool.promise().query(
            'SELECT id, name, email, content FROM messages ORDER BY id'
        );
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: 'Erreur base de données' });
    }
});

router.post('/post', async (req, res) => {
    const { name, email, content } = req.body;

    try {
        await pool.promise().query(
            'INSERT INTO messages (name, email, content) VALUES (?, ?, ?)',
            [name, email, content]
        );
        res.status(201).json({ message : 'Message envoyé'});
    } catch (error) {
        res.status(500).json({ message: 'Errur base de données '});
    }
    
    // await transporter.sendMail({
    //     from: process.env.MAIL_USER,
    //     to: process.env.MAIL_USER,
    //     replyTo: email,
    //     subject: `Nouveau message de ${name}`,
    //     text: `De : ${name} <${email}>\n\n${content}`
    // });
});

router.delete('/delete', async (req, res) => {
    const { ids } = req.body;
    try {
        await pool.promise().query(
            'DELETE FROM messages WHERE id IN (?)',
            [ids]
        );
        res.status(200).json({ message: 'Message supprimé' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur base de données' });
    }
});

export default router;