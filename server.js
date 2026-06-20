import 'dotenv/config';
import express from 'express';
import mysql from 'mysql2';
import { fileURLToPath } from 'url';
import path from 'path';
import { Router } from 'express';
import session from 'express-session';
import authRouter from './routes/auth.js';
import isAuthenticated from './middleware/auth.js';
import messagesRouter from './routes/messages.js';
import aboutRouter from './routes/about.js';
import projectsRouter from './routes/projects.js';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const router = Router();

app.use(express.json()); // pour lire le body JSON

app.use(session({
    secret: '$2b$10$ZIGsANUE/sJQCeb65Teh8MRkeEeaJ6JPXUXNFilhnD2BEC',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } // true en production avec HTTPS
}));

// Sert les fichiers statiques du dossier public
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/auth', authRouter);
app.use('/api/projects', projectsRouter);

app.use('/api/about', aboutRouter);

app.use('/api/messages', messagesRouter);

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.get('/parallax', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'parallax.html'));
});

// Route protégée (à compléter plus tard avec le middleware auth)
// app.get('/dashboard', isAuthenticated, (req, res) => {
app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'private', 'admin.html'));
});

app.listen(3000, () => {
    console.log('Serveur démarré sur le port 3000');
});

export default router;