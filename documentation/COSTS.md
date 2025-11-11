# 💸 COSTS.md — Lynvia Connect

Suivi des coûts d'exploitation, d'hébergement et d'intégration du projet Lynvia Connect, incluant le front-end, les workflows d'automatisation (n8n), les services vocaux (ElevenLabs), et les services annexes.

---

## 🧱 1️⃣ Architecture du projet

Actuellement comme ceci, mais dans une V2, nous allons ajouter une DB.

- **Frontend (React + Vite)** → hébergé sur Vercel
- **Backend logique** → géré via n8n (hébergé séparément)
- **Voix & Audio** → généré par ElevenLabs
- **IA Agents** → Google Gemini 2.0 Flash Lite (gratuit jusqu'à 1000 RPM)
- **Données & Stockage** → localStorage + webhooks n8n

---

## 🖥️ 2️⃣ Frontend — Vercel

| Élément | Description | Coût |
|---------|-------------|------|
| **Hébergement Vercel** | Déploiement du front-end (React + Vite) avec CI/CD intégré. | **0 € / mois** (plan Hobby) |
| **Nom de domaine** | Si domaine personnalisé (ex : `lynvia.app`) via Vercel ou OVH. | ~10 €/an |
| **Build & logs** | Inclus dans le plan gratuit (limite : 100 Go de bande passante / mois, 100 builds / jour). | 0 € tant que limites non dépassées |
| **Surcoût (Pro plan)** | Si trafic > 100 Go ou usage professionnel. | 20–25 €/mois |

🔹 **Estimation totale : 0–25 €/mois**

---

## ⚙️ 3️⃣ Automatisation — n8n

| Élément | Description | Coût |
|---------|-------------|------|
| **Hébergement n8n Cloud (officiel)** | Automatisation des workflows IA, gestion des leads, génération de rapports, etc. | 20 $/mois (plan Basic) |
| **n8n Self-hosted (VPS)** | Alternative auto-hébergée (ex : Hetzner, Contabo, OVH). | ~6–10 €/mois |
| **Base de données (PostgreSQL / SQLite)** | Stockage des workflows, logs et données IA. | inclus sur VPS |
| **Nombre de workflows actifs** | En moyenne : 10–15 (agents IA, RH, CRM, etc.) | inclus |
| **Webhooks** | Connexion directe entre front (Vercel) et n8n via HTTPS | inclus |

🔹 **Estimation totale : 6–20 €/mois**

---

## 🗣️ 4️⃣ Synthèse vocale — ElevenLabs

| Élément | Description | Coût |
|---------|-------------|------|
| **Plan gratuit** | 10 000 caractères / mois (~5 min d'audio). | 0 € |
| **Plan Starter** | 30 000 caractères / mois (~15–20 min d'audio). | 5 $/mois |
| **Plan Creator** | 100 000 caractères / mois (~1h d'audio). | 22 $/mois |
| **Intégration** | Appels API via n8n (Text → Speech), résultat stocké dans `/public/audios`. | inclus |

🔹 **Estimation totale : 0–22 $/mois**

---

## 🤖 5️⃣ IA / APIs — Google Gemini 2.0 Flash Lite

| Élément | Description | Coût |
|---------|-------------|------|
| **Google Gemini 2.0 Flash (Gratuit)** | Plan gratuit pour agents IA, qualification de leads, génération de résumés. | **0 €** (jusqu'à 1000 RPM) |
| **Google Gemini 2.0 Flash (Payant - Tier 1)** | Requests supplémentaires au-delà de 1000 RPM (level 1 tarification). | $0.075 / 1M input tokens |
| **Intégration API** | Appels API directes ou via n8n pour chaque interaction d'agent. | inclus |

📊 **Détail tarification Gemini 2.0 Flash (Tier 1)** :
- **Input tokens** : $0.075 / 1M tokens
- **Output tokens** : $0.30 / 1M tokens
- **Cache writing** : $0.225 / 1M tokens
- **Cache reading** : $0.0225 / 1M tokens

💡 **Usage moyen estimé** :
- ~500 000 input tokens / mois = ~0.04 €/mois
- ~100 000 output tokens / mois = ~0.03 €/mois

🔹 **Estimation totale : 0–5 €/mois** *(gratuit en dessous de 1000 RPM, très faible coût après)*

---

## ☁️ 6️⃣ Hébergement complémentaire (optionnel)

| Service | Rôle | Coût |
|---------|------|------|
| **VPS (Hetzner, OVH, Contabo, Render)** | Si tu héberges n8n toi-même. | 6–12 €/mois |
| **Base de données externe (Supabase / Neon / PlanetScale)** | Si tu veux stocker les conversations ou analytics. | 0–10 €/mois |
| **Stockage objet (Backblaze, Cloudflare R2, AWS S3)** | Si tu veux sauvegarder les audios ElevenLabs générés. | 0.01 €/Go |

---

## 💵 7️⃣ Coût total estimé par mois

| Poste | Minimum | Maximum |
|-------|---------|---------|
| **Vercel (frontend)** | 0 € | 25 € |
| **n8n (automatisation)** | 6 € | 20 € |
| **ElevenLabs (audio IA)** | 0 € | 22 € |
| **Google Gemini 2.0 Flash** | 0 € | 5 € |
| **Hébergement VPS (si self-host)** | — | 10 € |
| **💰 Total estimé** | **6 € / mois** | **82 € / mois** |

📈 **Meilleur scénario** (startup / MVP) : **6 €/mois**
- Vercel gratuit
- n8n self-hosted VPS : 6 €
- ElevenLabs gratuit
- Gemini gratuit (< 1000 RPM)

🎯 **Scénario recommandé** (production) : **≈ 30–40 €/mois**
- Vercel gratuit
- n8n Cloud : 20 €
- ElevenLabs Starter : 5 €
- Gemini : < 1 €

---

## 🧾 8️⃣ Synthèse budgétaire annuelle

| Poste | Annuel min. | Annuel max. |
|-------|-------------|-------------|
| **Hébergement front (Vercel)** | 0 € | 300 € |
| **n8n Cloud / VPS** | 72 € | 240 € |
| **ElevenLabs** | 0 € | 264 € |
| **Google Gemini 2.0 Flash** | 0 € | 60 € |
| **Hébergement VPS (optionnel)** | — | 120 € |
| **📊 Total annuel estimé** | **≈ 72 €** | **≈ 984 €** |

---

### 📝 Notes importantes

✅ **Gemini 2.0 Flash** est **gratuitement utilisable** jusqu'à 1000 requêtes par minute (RPM)  
✅ Pour un MVP, vous restez **100% gratuit** avec Gemini (tier gratuit)  
✅ Les coûts majorés arrivent surtout avec **n8n Cloud** et **ElevenLabs** à l'échelle  
✅ **Recommandation** : Commencer en gratuit, puis passer à n8n Cloud (20 €/mois) pour la stabilité production

---

**© 2025 Lynvia Connect – Tous droits réservés.**