import { Router } from 'express';
import pool from '../db.js';

const router = Router();

router.get('/', async (req, res) => {
    try {
        const [rows] = await pool.promise().query(
            'SELECT id, name, logo FROM stacks'  // FROM stacks manquait
        );
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: 'Erreur base de données' });
    }
});

router.post('/', async (req, res) => {
    const { name, logo } = req.body;
    try {
        const [result] = await pool.promise().query(
            'INSERT INTO stacks (name, logo) VALUES (?, ?)',
            [name, logo]
        );
        res.status(201).json({ id: result.insertId, name, logo });
    } catch (error) {
        res.status(500).json({ message: 'Erreur base de données' });
    }
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { name, logo } = req.body;
    try {
        await pool.promise().query(
            'UPDATE stacks SET name = ?, logo = ? WHERE id = ?',
            [name, logo, id]
        );
        res.status(200).json({ message: 'Stack mise à jour' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur base de données' });
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await pool.promise().query(
            'DELETE FROM stacks WHERE id = ?',
            [id]
        );
        res.status(200).json({ message: 'Stack supprimée' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur base de données' });
    }
});

export default router;