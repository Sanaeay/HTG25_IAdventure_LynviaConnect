# Welcome to LYNVIA Connect project

# 🤖 Lynvia Connect – Build Smart AI Agents, Automate Every Flow

> **Lynvia Connect** est une plateforme hébergée sur **Vercel** permettant de **créer, configurer et gérer des agents IA spécialisés** connectés à des workflows standards **n8n**.  
Pour le cas des sales: Chaque agent peut converser avec des leads, qualifier automatiquement les réponses, prendre des rendez-vous et générer des résumés vocaux via **ElevenLabs**.

---

## 🧭 Table des matières

0. [Quick-start](#0️⃣-quick-start)
1. [Vue d’ensemble](#1️⃣-vue-densemble)
2. [Architecture](#2️⃣-architecture)
3. [Installation & lancement](#3️⃣-installation--lancement)
4. [Gestion des routes](#4️⃣-gestion-des-routes)
5. [Composant Dashboard](#5️⃣-composant-dashboard)
6. [Composant EditStrategy](#6️⃣-composant-editstrategy)
7. [Connexion avec n8n](#7️⃣-connexion-avec-n8n)
8. [Persistance des données](#8️⃣-persistance-des-données)
9. [Encodage et sécurité des URLs](#9️⃣-encodage-et-sécurité-des-urls)
10. [Événements & synchronisation](#🔟-événements--synchronisation)
11. [Roadmap & prochaines évolutions](#11-roadmap--prochaines-évolutions)
12. [Crédits & contact](#📬-contact--maintenance)

--- 

## 0️⃣ Quick start
The bot is already deployed with a working wired cloud solution. Let's try it 🚀.
- Use the bot in telegram (web) : [@AIdventure_message_bot](https://web.telegram.org/k/#@AIdventure_message_bot)
- Use the bot in telegram (mobile app) : [@AIdventure_message_bot](https://t.me/AIdventure_message_bot)

---

## 1️⃣ Vue d’ensemble

**Lynvia Connect** permet aux utilisateurs (TPE/PME, agences, etc.) de :

- Créer un **agent IA** adapté à leur secteur d'activité ;
- Orchestrer ses tâches avec **n8n** (prospection, qualification, éducation, relances, etc.) ;
- Converser automatiquement via WhatsApp ou Telegram, prendre des rendez-vous, et résumer les actions réalisées ;
- Piloter plusieurs agents IA depuis un **tableau de bord unifié**.

What technologies are used for this project?
![React](https://img.shields.io/badge/React-18.2.0-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38BDF8?logo=tailwind-css)
![n8n](https://img.shields.io/badge/Automation-n8n-orange?logo=n8n)
![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?logo=vercel)
![License](https://img.shields.io/badge/license-MIT-green)
**n8n tables**: [README](https://github.com/Sanaeay/lynvia-connect/blob/main/n8n/dependend_tables/README.md)
**costs**: [README](https://github.com/Sanaeay/lynvia-connect/blob/main/COSTS.md)
**tech spec**: [README](https://github.com/Sanaeay/lynvia-connect/blob/main/TECH_SPEC.md)

---
## How can I edit this code?

There are several ways of editing your application.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

---

## 2️⃣ Architecture

### ⚙️ Stack technique

| Composant | Technologie |
|------------|--------------|
| **Frontend** | React + TypeScript |
| **UI** | shadcn/ui + TailwindCSS + Lucide Icons |
| **Routing** | React Router DOM |
| **Backend logique** | n8n Cloud (webhook REST) |
| **Hébergement** | Vercel |
| **Persistance locale** | localStorage |
| **Audio résumé** | ElevenLabs (API TTS) |

---

### 📁 Structure du projet

## 📁 Structure du projet

```bash
lynvia-connect/
├── api/
│   └── strategy.ts
│
├── public/
│   ├── audios/
│   ├── favicon.ico
│   ├── logo.png
│   ├── placeholder.svg
│   └── robots.txt
│
├── src/
│   ├── assets/              # 🖼️ Images, icônes, ressources statiques
│   ├── components/          # 🧩 Composants UI réutilisables (Button, TopBar, Cards, etc.)
│   ├── hooks/               # 🪝 Hooks personnalisés (useAgent, useLocalStorage, etc.)
│   ├── lib/                 # ⚙️ Fonctions utilitaires, API clients, helpers
│   ├── pages/               # 📄 Pages principales de l'application
│   │   ├── Analytics.tsx        # 📊 Page d’analyse (inclut le bouton “Écouter le résumé”)
│   │   ├── Dashboard.tsx        # 🧭 Tableau de bord principal
│   │   ├── AiAgents.tsx         # 🤖 Liste et création d’agents IA
│   │   ├── EditStrategy.tsx     # ⚙️ Éditeur de stratégie d’agent
│   │   └── ...                  # Autres pages React
│   │
│   ├── App.css
│   ├── App.tsx
│   ├── index.css
│   ├── main.tsx
│   └── vite-env.d.ts
│
├── .gitignore
├── README.md
├── bun.lockb
├── components.json
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── postcss.config.js
├── tailwind.config.ts
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
├── vercel.json           # ⚙️ Configuration du déploiement Vercel
└── vite.config.ts        # ⚙️ Configuration du bundler Vite

```

## 3️⃣ Installation & lancement

### 🧩 Prérequis

- Node.js ≥ 18  
- npm ou pnpm  
- Un compte [Vercel](https://vercel.com) *(optionnel)*  
- Un webhook **n8n** fonctionnel  

---

### 🚀 Lancer le projet en local

# Cloner le projet
git clone https://github.com/<votre-utilisateur>/lynvia-connect.git
cd lynvia-connect

# Installer les dépendances
npm install

# Lancer le serveur local
npm run dev


### 🌐 Déploiement sur Vercel

Le déploiement de **Lynvia Connect** se fait facilement via **[Vercel](https://vercel.com)**.

#### 🚀 Étapes de déploiement

1. **Connecter votre dépôt GitHub à Vercel**  
   - Rendez-vous sur [https://vercel.com/import](https://vercel.com/import)  
   - Cliquez sur *“Add New Project”*  
   - Sélectionnez le dépôt **lynvia-connect**

2. **Choisir la branche de déploiement**  
   - Sélectionnez la branche `main`  
   - (ou créez une branche `gh-pages` si vous souhaitez déployer une version spécifique)

3. **Détection automatique du framework**  
   - Vercel détecte automatiquement le framework **Vite + React**  
   - Aucun fichier de configuration supplémentaire n’est nécessaire  

4. **Configurer la commande de build**  
   Dans la section “Build & Output Settings” :
   ```bash
   Build Command: npm run build
   Output Directory: dist


## 4️⃣ Gestion des routes

La navigation dans **Lynvia Connect** est gérée avec **React Router DOM**.  
Chaque page correspond à un composant principal du dossier `src/pages/`.

---

### 🗺️ Structure des routes

| **Route** | **Composant** | **Description** |
|------------|----------------|------------------|
| `/` | `Dashboard` | Affiche la liste des agents IA et permet d’en créer de nouveaux. |
| `/agents/edit/:id` | `EditStrategy` | Formulaire de création ou de modification d’un agent IA. |
| `/analytics` | `Analytics` | Affiche les statistiques (conversations, taux de booking, etc.). |
| `/integrations` | `Integrations` | Gère les connexions avec **n8n**, **GoHighLevel**, **WhatsApp**, etc. |
| `/billing` | `Billing` | Gère les abonnements et la facturation. |
| `/help` | `HelpCenter` | Centre d’aide et documentation utilisateur. |

---

### ⚙️ Exemple de configuration (extrait de `App.tsx`)

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "@/pages/Dashboard";
import EditStrategy from "@/pages/EditStrategy";
import Analytics from "@/pages/Analytics";
import Integrations from "@/pages/Integrations";
import Billing from "@/pages/Billing";
import HelpCenter from "@/pages/HelpCenter";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/agents/edit/:id" element={<EditStrategy />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/integrations" element={<Integrations />} />
        <Route path="/billing" element={<Billing />} />
        <Route path="/help" element={<HelpCenter />} />
      </Routes>
    </Router>
  );
}

export default App;

## 5️⃣ Composant `Dashboard`

Le composant **Dashboard** est le point d’entrée principal de **Lynvia Connect**.  
Il affiche tous les agents IA enregistrés localement, permet d’en créer de nouveaux et de visualiser des statistiques globales.

---

### 🎯 Rôle

Le `Dashboard` a pour objectif de :
- Lister tous les **agents IA** enregistrés dans le navigateur ;
- Offrir un bouton “➕ Create new agent” pour créer un nouvel agent ;
- Afficher les **indicateurs clés** : nombre de conversations, taux de booking, statut, etc. ;
- Fournir une navigation fluide vers la page d’édition `/agents/edit/:id`.

---

### ⚙️ Fonctionnalités principales

✅ **Lecture et affichage dynamique des agents**

### ✅ Création d’un nouvel agent

Un clic sur le bouton **“Create new agent”** ouvre le formulaire d’édition.  
L’agent est ensuite sauvegardé dans le **localStorage** via le composant `EditStrategy`.

---

### ✅ Statistiques globales

Le `Dashboard` affiche un aperçu global des performances :

- **Conversations récentes** 📩  
- **Taux de conversion / réservations** 📊  
- **Agents actifs** 🟢 vs **inactifs** 🔴  

Ces statistiques permettent d’avoir une vue rapide sur l’activité et l’efficacité des agents IA. (V2)

---

### ✅ Navigation dynamique

navigate(`/agents/edit/${encodeURIComponent(agent.name.toLowerCase())}`);

---

###  🎯 Rôle du formulaire création d'agent
Permet de créer ou d’éditer un agent IA :
Nom, secteur, contexte
Niveau de gestion d’objections & qualification
Instructions IA personnalisées

---

###  🚀 Envoi à n8n
const res = await fetch("https://iadventure.app.n8n.cloud/webhook/strategie-ai", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(payload),
});

###  💾 Persistance locale
const existing = JSON.parse(localStorage.getItem("agents") || "[]");
localStorage.setItem("agents", JSON.stringify([...existing, newAgent]));
window.dispatchEvent(new Event("agentsUpdated"));

---

###  7️⃣ Connexion avec n8n

### 🔗 Webhook utilisé
https://iadventure.app.n8n.cloud/webhook/strategie-ai

### 📦 Exemple de payload
{
  "name": "Agent Solar",
  "sector": "immobilier",
  "context": "Prospection de leads via WhatsApp",
  "goal": "Générer des leads qualifiés avec un ton amical",
  "delay": { "hr": 0, "min": 0, "sec": 30 },
  "sliders": { "objection": 50, "qualification": 33 },
  "prompt": "Instructions IA personnalisées..."
}
n8n peut ensuite déclencher un workflow :
envoi WhatsApp,
ajout CRM (GoHighLevel),
relance automatique, etc.

---

### 8️⃣ Persistance des données
Les agents sont sauvegardés localement dans le localStorage :
[
  {
    "id": "uuid-v4",
    "name": "Formations UX/UI",
    "sector": "coaching",
    "context": "Formation en design et IA",
    "status": "Active",
    "conversations": 12,
    "bookings": 4
  }
]
Aucune base de données externe n’est utilisée pour l’instant.

---

### 9️⃣ Encodage et sécurité des URLs

✅ Encodage
navigate(`/agents/edit/${encodeURIComponent(agent.name.toLowerCase())}`);
✅ Décodage
const decodedId = decodeURIComponent(agentId || "");
Cela permet de gérer correctement les agents comme :
/agents/edit/formations%20ux%2Fui

---

### 🔟 Événements & synchronisation
Événement custom : agentsUpdated
Émission :
window.dispatchEvent(new Event("agentsUpdated"));
Écoute :
window.addEventListener("agentsUpdated", loadAgents);
➡️ Assure la synchronisation temps réel entre création et affichage du Dashboard.

---

### 1️⃣1️⃣ Roadmap & prochaines évolutions

**roadmap**: [README](https://github.com/Sanaeay/lynvia-connect/blob/main/documentation/ROADMAP.md)

 Connexion directe au CRM GoHighLevel
 Authentification utilisateurs
 Synchronisation cloud des agents
 Intégration d’un générateur vocal ElevenLabs natif
 UI “drag-and-drop” pour les stratégies IA
 Monitoring des workflows n8n depuis le front
 
 ---
 
### 📬 Contact & maintenance
Projet : Lynvia Connect
Auteurs : Sanae Ayda, Cyril Teisseire, Mathieu Audo
Hébergement : https://lynvia-connect.vercel.app
Support : sanaeayda@yahoo.fr
© 2025 Lynvia Connect – Tous droits réservés. En collaboration avec l'entreprise qui a exprimé le besoin. 
