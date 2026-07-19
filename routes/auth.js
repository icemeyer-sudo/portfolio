import { Router } from 'express';
import bcrypt from 'bcrypt';
import pool from '../db.js';

const router = Router();

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // 1. Chercher l'utilisateur en BDD
        const [rows] = await pool.promise().query(
            'SELECT * FROM users WHERE email = ?', [email]
        );

        if (rows.length === 0) {
            return res.status(401).json({ message: 'Identifiants incorrects' });
        }

        const user = rows[0];

        // 2. Comparer le mot de passe avec le hash en BDD
        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            return res.status(401).json({ message: 'Identifiants incorrects' });
        }

        // 3. Créer la session
        req.session.user = { id: user.id, email: user.email };

        res.status(200).json({ message: 'Connecté' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
});

export default router;