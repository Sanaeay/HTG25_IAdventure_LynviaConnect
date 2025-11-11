## 🧠 TECH_SPEC.md — Lynvia Connect
Lynvia Connect est une plateforme SaaS no-code permettant de créer, configurer et gérer des agents IA connectés à des workflows d’automatisation n8n.
Ces agents peuvent converser avec des leads, qualifier les réponses, planifier des rendez-vous et générer des résumés vocaux via ElevenLabs.

---
### 🏗️ 1. Architecture Générale
Frontend (React + Vite + Tailwind)
        ↓ (HTTP / Webhook)
n8n Workflows (Cloud / Self-hosted)
        ↓ (API)
ElevenLabs + OpenAI APIs
        ↓
Vercel (hébergement et CDN)

🔸 Composants principaux :
Frontend React (Vercel) → interface utilisateur, gestion des agents, dashboard Analytics.
n8n (Automatisation backend) → orchestration des flux (qualification, réponses IA, génération audio).
ElevenLabs → génération de voix à partir des résumés texte.
OpenAI API → génération de texte intelligent (résumés, réponses, analyses).
localStorage / Webhooks → persistance légère des données côté client.
Vercel → hébergement, build & CDN du front-end.

### ⚙️ 2. Stack technique
| Domaine                     | Technologie                            | Rôle                                         |
| --------------------------- | -------------------------------------- | -------------------------------------------- |
| **Frontend**                | React + Vite + TypeScript              | Application principale                       |
| **UI / Design**             | TailwindCSS + shadcn/ui + Lucide Icons | Design System & composants réutilisables     |
| **Graphiques**              | Recharts                               | Visualisation d’analytics                    |
| **État / Data**             | useState / localStorage                | Gestion légère côté client                   |
| **Routing**                 | React Router                           | Navigation interne                           |
| **Audio**                   | HTML5 Audio API + ElevenLabs           | Lecture & génération audio                   |
| **Backend logic**           | n8n                                    | Automatisation & orchestration des workflows |
| **IA / NLP**                | OpenAI GPT Models                      | Résumés, analyse de leads, classification    |
| **Synthèse vocale**         | ElevenLabs API                         | Conversion du texte en audio MP3             |
| **Déploiement**             | Vercel                                 | Hébergement front-end + CI/CD                |
| **Langage**                 | TypeScript                             | Sécurité et typage fort                      |
| **Linting / Formatage**     | ESLint + Prettier                      | Qualité du code                              |
| **Gestion des dépendances** | npm / bun                              | Installation & builds rapides                |

### 🧩 3. Modules clés
🧠 Dashboard.tsx
Affiche les statistiques globales et la liste des agents IA.
Lecture depuis localStorage pour afficher les agents récents.
#### 🧩 Analytics.tsx
Page d’analyse et de reporting.
Graphiques Recharts pour suivre conversations, leads et rendez-vous.
Bouton “🎧 Écouter le résumé” qui lit un fichier /public/audios/resume.mp3.
#### ⚙️ EditStrategy.tsx
Interface pour personnaliser les stratégies de conversation d’un agent IA.
Communication bidirectionnelle avec n8n via webhook.
#### 🤖 AiAgents.tsx
Page de création et gestion d’agents IA.
Enregistrement automatique des nouveaux agents dans le localStorage.
Synchronisation des agents avec les workflows n8n correspondants.

Chaque agent IA créé dans le front correspond à un workflow n8n :
Pour la V2, le MCP (Master Control Point) de n8n redirige automatiquement vers le bon flux selon l’agent et le contexte.
Chaque agent a son ID unique (stocké dans localStorage et transmis via webhook).
n8n gère :
L’envoi des messages à l’API IA (OpenAI / GPT)
La génération du résumé texte
La conversion audio via ElevenLabs
Le retour du lien MP3 au frontend

---

### 📚 Références & Liens utiles
🔗 Frontend : https://vercel.com
🔗 Automatisation : https://n8n.io
🔗 Voix IA : https://elevenlabs.io
🔗 IA Texte (GPT) : https://platform.openai.com
🧩 Documentation Tailwind : https://tailwindcss.com/docs
⚙️ Recharts : https://recharts.org/
