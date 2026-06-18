import { Router } from 'express';
import pool from '../db.js';

const router = Router();

router.get('/', async (req, res) => {
    try {
        const [rows] = await pool.promise().query(
            'SELECT * FROM projects ORDER BY position'
        );
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: 'Erreur base de données' });
    }
});

router.put('/update', async (req, res) => {
    const { content } = req.body;

    try {
        await pool.promise().query(
            'UPDATE settings SET about = ? LIMIT 1',
            [content]
        );
        res.status(200).json({ message : 'À propos mis à jour'});
    } catch (error) {
        res.status(500).json({ message: 'Erreur base de données '});
    }
});

router.put('/positions', async (req, res) => {
    const { swaps } = req.body;
    // swaps = [{ id: 1, position: 2 }, { id: 2, position: 1 }]

    try {
        const updates = swaps.map(({ id, position }) =>
            pool.promise().query(
                'UPDATE projects SET position = ? WHERE id = ?',
                [position, id]
            )
        );
        await Promise.all(updates);
        res.status(200).json({ message: 'Positions mises à jour' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur base de données' });
    }
});

export default router;