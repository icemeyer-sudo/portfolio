# Didier Meyer Portfolio

Portfolio personnel avec back-office d'administration, développé en Node.js/Express avec une base de données MySQL.

## Fonctionnalités

- Page d'accueil avec effet parallax
- Section À propos éditable depuis le back-office
- Section Projets avec contenu dynamique
- Formulaire de contact (envoi par email via Nodemailer)
- Back-office d'administration protégé par authentification (session + bcrypt)
- Interface responsive avec menu hamburger sur mobile

## Stack technique

- **Backend** : Node.js, Express 5
- **Base de données** : MySQL (mysql2)
- **Authentification** : express-session + bcrypt
- **Email** : Nodemailer
- **Frontend** : HTML/CSS/JS vanilla (modules ES)
- **Déploiement** : Docker, Nginx (reverse proxy)

## Prérequis

- Node.js 22+
- MySQL
- (optionnel) Docker

## Installation

```bash
npm install
```

Créer un fichier `.env` à la racine :

```env
SESSION_SECRET=votre_secret
MYSQL_HOST=localhost
MYSQL_USER=root
MYSQL_PASS=votre_mot_de_passe
MYSQL_DB=nom_de_la_base
MAIL_USER=votre@email.com
MAIL_PASS=votre_mot_de_passe_app
```

## Lancement en développement

```bash
npm run dev
```

Le serveur démarre sur [http://localhost:3000]

## Routes principales

| Méthode | Route | Description |
|---------|-------|-------------|
| GET  | `/` | Page d'accueil |
| GET  | `/login` | Page de connexion |
| GET  | `/admin` | Back-office (protégé) |
| POST | `/api/auth/login` | Authentification |
| GET  | `/api/projects` | Liste des projets |
| GET  | `/api/about` | Contenu À propos |
| POST | `/api/messages` | Envoi d'un message |
