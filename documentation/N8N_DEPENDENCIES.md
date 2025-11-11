# 📊 N8N_DEPENDENCIES.md – Tables requises pour les workflows n8n

> **Tables de données obligatoires** à créer directement dans n8n sur l'onglet *Data Tables* **avant d'importer** les fichiers JSON des workflows.  
Si vous créez les tables après l'import du JSON, vous devrez reconfigurer manuellement les nœuds dépendants.

---

## 📋 Table des matières

1. [Notes importantes](#⚠️-notes-importantes)
2. [Tables requises](#📦-tables-requises)
3. [Checklist de validation](#✅-checklist-de-validation-avant-import)

---

## ⚠️ Notes importantes

✅ Utiliser **exactement les mêmes noms** de tables et colonnes  
✅ Les colonnes par défaut ne sont pas détaillées mais doivent être conservées  
✅ Respecter la **casse exacte** des noms (sensible à la casse)  
✅ **Ordre critique** : Créer les tables → Puis importer les workflows JSON

---

## 📦 Tables requises

### 1️⃣ **Available_slots**

**Objectif** : Stocker les créneaux horaires proposés à l'utilisateur.

| Property | Value |
|----------|-------|
| **Flow usage** | Telegram_flow (source/usage) |
| **Description** | Table d'agenda contenant les slots disponibles pour les rendez-vous |

**Colonnes requises** :

| Colonne | Type | Description |
|---------|------|-------------|
| `User` | string | Identifiant utilisateur |
| `Slots` | string | Créneau horaire proposé (format : JSON ou texte) |

---

### 2️⃣ **sales_table**

**Objectif** : Stocker l'historique complet de la conversation client et le suivi de qualification de leads.

| Property | Value |
|----------|-------|
| **Flow usage** | Telegram_flow (source/usage) / Reminder_flow (source/usage) |
| **Description** | Contexte de conversation pour qualification IA et envoi de rappels |
| **Clearing** | La conversation est supprimée quand le lead réserve un créneau avec succès |

**Colonnes requises** :

| Colonne | Type | Description |
|---------|------|-------------|
| `name` | string | Nom du lead |
| `email` | string | Adresse email du lead |
| `phone` | string | Numéro de téléphone du lead |
| `chat_id` | string | Identifiant du chat (Telegram/WhatsApp) |
| `contact_key` | string | Clé unique d'identification du contact |
| `message` | string | Dernier message échangé |
| `direction` | string | Direction du message (inbound/outbound) |
| `source` | string | Source du contact (Telegram, WhatsApp, etc.) |

---

### 3️⃣ **strategy_context**

**Objectif** : Créer des agents IA personnalisés pour interagir avec les utilisateurs.

| Property | Value |
|----------|-------|
| **Flow usage** | Telegram_flow (usage) / Front_flow (source) |
| **Description** | Configuration des agents IA créés depuis le frontend |
| **Rôle** | Contexte utilisé par les LLMs pour les interactions |

**Colonnes requises** :

| Colonne | Type | Description |
|---------|------|-------------|
| `agent_name` | string | Nom unique de l'agent IA |
| `sector` | string | Secteur d'activité cible |
| `context` | string | Description du contexte client |
| `qualification` | number | Score de qualification (0-100) |
| `objection` | number | Score de gestion des objections (0-100) |
| `prompt` | string | Instructions système pour le LLM |

---

## ✅ Checklist de validation avant import

Avant d'importer les fichiers JSON des workflows, vérifier que :

- ✅ **Les 3 tables existent** avec les noms exacts : `Available_slots`, `sales_table`, `strategy_context`
- ✅ **Les colonnes requises** sont présentes avec l'orthographe exacte
- ✅ **Les types de données** correspondent (string, number)
- ✅ **Connexion de base de données** : Les nœuds de connexion n8n pointent vers la bonne DB/schéma
- ✅ **Permissions** : Accès en lecture/écriture sur toutes les tables
- ✅ **Import ordre** : Les tables existent avant l'import des workflows JSON

---

### 🔗 Workflows dépendants

| Workflow | Tables utilisées | Type |
|----------|------------------|------|
| **Telegram_flow** | `Available_slots`, `sales_table`, `strategy_context` | Source + Usage |
| **Reminder_flow** | `sales_table` | Source + Usage |
| **Front_flow** | `strategy_context` | Source |

---

**© 2025 Lynvia Connect – Tous droits réservés.**