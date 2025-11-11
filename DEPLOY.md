# 🚀 DEPLOY.md – Guide de déploiement sur Vercel

> **Lynvia Connect** est déployé sur **Vercel** avec un processus automatisé via CI/CD.  
Ce document couvre l'infrastructure, les procédures de déploiement, le monitoring et les responsabilités.

---

## 📋 Table des matières

1. [Objectif du document](#1️⃣-objectif-du-document)
2. [Pré-requis](#2️⃣-pré-requis-pour-déployer-sur-vercel)
3. [Variables & Secrets](#3️⃣-variables-denvironnement-et-secrets)
4. [Déploiement automatisé](#4️⃣-déploiement-automatisé--cicd)
5. [Rollback & Recovery](#5️⃣-rollback-et-recovery)
6. [Monitoring & Alerting](#6️⃣-monitoring-et-alerting)
7. [Sécurité & Conformité](#7️⃣-sécurité-et-conformité)
8. [Sauvegardes & Migration](#8️⃣-sauvegardes-et-migration-de-données)
9. [Troubleshooting](#9️⃣-troubleshooting-courant)
10. [Contacts & Responsabilités](#🔟-contacts-et-responsabilités)
11. [Infrastructure n8n](#1️⃣1️⃣-infrastructure-n8n)

---

## 1️⃣ Objectif du document

Ce document fournit des **instructions claires et reproductibles** pour :
- ✅ Configurer l'environnement de déploiement
- ✅ Valider les builds localement
- ✅ Déployer automatiquement via Vercel
- ✅ Monitorer et alerter les équipes
- ✅ Effectuer des rollbacks en cas de problème
- ✅ Gérer la sécurité et les secrets

---

## 2️⃣ Pré-requis pour déployer sur Vercel

### 🔧 Versions requises (environnement local)

| Composant | Version | Notes |
|-----------|---------|-------|
| **OS** | Windows 10+ / macOS 11+ / Ubuntu 20.04+ | - |
| **Git** | ≥ 2.20 | Configuration SSH ou credential helper |
| **Node.js** | 18.x (LTS) – 20.x supporté | Recommandé : 18.x |
| **npm** | ≥ 8 | Ou Yarn ≥ 1.22 / pnpm ≥ 8 |

---

### 🛠️ Outils & CLI

```bash
# Installer Vercel CLI globalement
npm i -g vercel

# Authentifier Vercel
vercel login

# Commandes essentielles
vercel dev          # Environnement local
vercel --prod       # Déploiement production
npm ci               # Installation déterministe
npm run build        # Build de production
npm run dev          # Dev server local
```

---

### 📦 Configuration du dépôt & du projet Vercel

✅ **Repo connecté** via l'intégration Vercel (auto-deploy on push)  
✅ **Branch de production** : `main`  
✅ **Build Command** : `npm run build`  
✅ **Output Directory** : `dist`  
✅ **Variables d'environnement** configurées par environnement (Production / Preview / Development)  

---

### 🌐 DNS, domaines & certificats

- ✅ Accès administrateur au domaine ou DNS
- ✅ Enregistrements A/CNAME pour `lynvia-connect.vercel.app`
- ✅ SSL géré automatiquement par Vercel (Let's Encrypt)
- ✅ Vérification SSL pour les domaines personnalisés

---

### ⚡ Limites Vercel à respecter

| Limite | Valeur | Impact |
|--------|--------|--------|
| **Durée fonction serverless** | 60s (Pro : 300s) | Timeout des API calls |
| **Mémoire fonction** | 512 MB – 3 GB | Limitation des tâches lourdes |
| **Taille déploiement** | 250 MB max | Optimiser les assets |
| **Quotas** | Selon plan | Vérifier dashboard Vercel |

---

### ✔️ Validation locale avant push

```bash
# 1. Lancer le serveur local
npm run dev
# Accéder à http://localhost:5173

# 2. Valider les routes, API serverless et env vars
# - Tester les connexions n8n webhook
# - Vérifier les variables d'environnement

# 3. Exécuter les tests
npm test

# 4. Build production local
npm run build

# 5. Tester le build
vercel dev
```

---

## 3️⃣ Variables d'environnement et secrets

### 🔐 Règles de sécurité

| Type | Stockage | Accès |
|------|----------|-------|
| **Secrets (API keys, tokens)** | Vercel Dashboard seulement | Admin uniquement |
| **URLs publiques** | `.env.local` OK | Commitable |
| **URLs sensibles** | Vercel Secrets | Non-commitable |

---

### 📝 Exemple de configuration Vercel

```
VITE_N8N_WEBHOOK=https://iadventure.app.n8n.cloud/webhook/strategie-ai
VITE_ELEVENLABS_API_KEY=***SECRET***
VITE_APP_URL=https://lynvia-connect.vercel.app
```

**Accès** : Settings → Environment Variables dans le dashboard Vercel

---

## 4️⃣ Déploiement automatisé / CI-CD

### 🔄 Processus automatique

```mermaid
Push sur main
    ↓
GitHub Webhook → Vercel
    ↓
Vercel détecte changement
    ↓
npm ci && npm run build
    ↓
Tests & validation
    ↓
Deploy sur Production
    ↓
✅ Live sur https://lynvia-connect.vercel.app
```

---

### 🚀 Déploiement manuel (si nécessaire)

```bash
# Depuis le repo local
vercel --prod

# Ou via CLI depuis n'importe où
vercel deploy --prod
```

---

### 📊 Status du déploiement

- Vérifier sur : [Vercel Dashboard](https://vercel.com/dashboard)
- Logs disponibles : Deployments → Cliquer sur le déploiement récent
- Notifications : Email/Slack si intégration configurée

---

## 5️⃣ Rollback et recovery

### 🔙 Cas d'une défaillance post-déploiement

#### **Option 1 : Rollback automatique**
```bash
# Depuis Vercel Dashboard
Deployments → Sélectionner version précédente → "Promote to Production"
```

#### **Option 2 : Rollback via Git**
```bash
# Récupérer le dernier commit bon
git log --oneline
git revert <commit-hash-problématique>
git push origin main

# Vercel redéploie automatiquement
```

---

### 📢 Procédure d'alerte équipe

1. ⚠️ **Détection du problème** (monitoring ou utilisateur)
2. 📧 **Notification immédiate** : Ouverture d'une issue GitHub (tag @sanaeayda, @cyril-ts, @mathieu-audo)
3. 🔙 **Rollback** : Execution de la procédure ci-dessus
4. ✅ **Validation** : Vérifier que Production est stable
5. 📋 **Post-mortem** : Analyser la root cause et documenter la leçon apprise

---

## 6️⃣ Monitoring et alerting

### 📊 Outils & dashboards

| Outil | Usage | URL |
|------|-------|-----|
| **Vercel Dashboard** | Logs déploiement, perf | https://vercel.com/dashboard |
| **Sentry** (optionnel) | Erreurs frontend/backend | À configurer |
| **Prometheus** (optionnel) | Métriques infrastructure | À configurer |

---

### 🎯 Indicateurs clés à surveiller

✅ **Erreurs 5xx** → Vérifier logs Vercel  
✅ **Latency** → Optimiser assets & API calls  
✅ **CPU/Mémoire** → Limiter tâches background  
✅ **Webhook n8n** → Vérifier statut de la connexion  

---

### 🚨 Procédure en cas d'alerte critique

```bash
1. Vérifier les logs Vercel
   → Deployments → Logs récents

2. Identifier l'erreur
   → Check console erreurs (VITE_*)

3. Rollback si nécessaire
   → Vercel Dashboard → Promote previous deployment

4. Notifier l'équipe
   → Issue GitHub avec contexte & solution

5. Fix & redéploiement
   → Correction en local + git push
```

---

## 7️⃣ Sécurité et conformité

### 🔒 Vérifications pré-déploiement

- ✅ Pas de secrets en hardcoding (grep `.env`, `password`, `token`)
- ✅ Dépendances à jour (`npm audit fix`)
- ✅ HTTPS forcé sur toutes les routes
- ✅ Headers de sécurité configurés (CSP, X-Frame-Options, etc.)

---

### 🛡️ Configuration sécurité (vercel.json)

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Content-Security-Policy",
          "value": "default-src 'self'; script-src 'self' 'unsafe-inline'"
        },
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        }
      ]
    }
  ]
}
```

---

### 🔐 Gestion des secrets

- Jamais commiter `.env` ou secrets
- Utiliser `vercel env` pour gérer les variables
- Rotation des API keys toutes les 90 jours
- Audit des accès : qui a accès à quels secrets

---

## 8️⃣ Sauvegardes et migration de données

### 💾 Stratégie de backup

| Données | Backup | Fréquence |
|---------|--------|-----------|
| **Code source** | Git (GitHub) | À chaque push |
| **Agents IA** | localStorage navigateur | Utilisateur responsable |
| **Secrets Vercel** | Dashboard Vercel exportable | Mensuel |

---

### 📜 Migration de schéma

En cas de changement majeur :

```bash
# 1. Créer branche feature
git checkout -b feature/schema-migration

# 2. Tester localement
npm run dev
# Vérifier compatibilité ascendante

# 3. Merger vers main
git push origin feature/schema-migration
# → Vercel déploie en Preview d'abord

# 4. Validation en Preview
# → Puis merge et promotion Production
```

---

## 9️⃣ Troubleshooting courant

> Section à remplir au fur et à mesure des retours utilisateurs.  
> **Statut actuellement : v0 – Pas de retours en production**

### 📝 Template problème

```
**Problème** : [Description]
**Erreur** : [Message exact]
**Solution** : [Steps to fix]
**Prévention** : [How to avoid]
```

---

## 🔟 Contacts et responsabilités

### 👥 Équipe

| Rôle | Responsable | Contact |
|------|-------------|---------|
| **Domaine & DNS** | Sanae AYDA | sanaeayda@yahoo.fr |
| **Lead Dev / Infra** | Sanae AYDA | sanaeayda@yahoo.fr |
| **Dev Frontend** | Cyril TEISSEIRE | À confirmer |
| **Dev Backend** | Mathieu AUDO | À confirmer |

---

### 📞 Méthode de contact

- 🐛 **Bugs & Issues** → [Ouvrir une issue GitHub](https://github.com/Sanaeay/lynvia-connect/issues)
- 🚨 **Urgence production** → Email direct (cc: @équipe)
- 💬 **Questions** → Discussion GitHub Discussions

---

## 1️⃣1️⃣ Infrastructure n8n

### 🔗 Workflows n8n

Les flux d'automatisation sont **hébergés en cloud** sur :  
**[n8n Cloud – iAdventure](https://iadventure.app.n8n.cloud/)**

⚠️ **Accès** : Non public (authentification requise)

---

### 📦 Backup & Imports

Les fichiers JSON des workflows sont disponibles dans le dossier **`/n8n`** du repo :

```bash
lynvia-connect/
├── n8n/
│   ├── dependend_tables/
│   │   └── README.md          # Documentation tables n8n
│   ├── workflow-1.json
│   ├── workflow-2.json
│   └── ...
```

**Pour importer un workflow :**
1. Aller sur https://iadventure.app.n8n.cloud
2. Créer un nouveau workflow
3. Menu → **Import from file**
4. Sélectionner le JSON depuis `/n8n`
5. Configurer les credentials (API keys, webhooks)
6. **Déployer** le workflow

---

### 🔗 Webhook Vercel → n8n

```
POST https://iadventure.app.n8n.cloud/webhook/strategie-ai
Content-Type: application/json

{
  "name": "Agent Solar",
  "sector": "immobilier",
  "context": "Prospection de leads via WhatsApp",
  "goal": "Générer des leads qualifiés",
  "delay": { "hr": 0, "min": 0, "sec": 30 },
  "sliders": { "objection": 50, "qualification": 33 },
  "prompt": "Instructions IA..."
}
```

---

### 📚 Ressources complémentaires

- 📊 [Tech Spec](./TECH_SPEC.md)
- 💰 [Costs & Pricing](./COSTS.md)
- 🛠️ [n8n Tables](./n8n/dependend_tables/README.md)

---

**© 2025 Lynvia Connect – Tous droits réservés.**