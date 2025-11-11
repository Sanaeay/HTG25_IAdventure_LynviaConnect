# ⚠️ AI_RISKS.md — Risques et limites de l’intelligence artificielle

Ce document vise à recenser les principaux risques, biais et limites liés à l’usage de l’intelligence artificielle dans le cadre du projet **Lynvia Connect**, afin d’en garantir une utilisation éthique, fiable, sécurisée et évolutive.

---

## 🧠 1. Risques de biais algorithmiques

### Description
Les modèles IA (ex. Gemini dans notre cas) sont entraînés sur de vastes corpus publics pouvant contenir des biais culturels, sociaux, économiques ou linguistiques. Cela peut entraîner :
- Des stéréotypes dans les réponses (métiers, publics, etc.)
- Des formulations orientées ou interprétations biaisées
- Une influence involontaire sur la qualification des leads

### Mesures d’atténuation
- Définir des prompts neutres et encadrés dans n8n
- Utiliser un jeu de test multi-secteurs (RH, immobilier, éducation, etc.)
- Réviser régulièrement les prompts avec des retours utilisateurs

---

## 🌫️ 2. Risques d’hallucination du modèle IA

### Description
Une hallucination correspond à une réponse fausse, incohérente ou inventée. Elle peut survenir lorsque :
- La question dépasse le contexte du modèle
- Les données d’entrée sont incomplètes
- Le prompt est mal calibré

### Exemple
Un agent IA pourrait annoncer un taux de conversion erroné ou inventer des informations sur un prospect absent du workflow.

### Mesures d’atténuation
- Ajouter une vérification contextuelle dans n8n
- Intégrer une étape de “sanity check” ou validation humaine
- Limiter le champ d’action via des prompts fermés
- Stocker et analyser les conversations pour détecter les anomalies

---

## 🔐 3. Risques liés à la confidentialité et aux données

### Description
Les échanges IA peuvent contenir des données sensibles (noms, emails, contacts). L’usage d’APIs externes (OpenAI, ElevenLabs) implique un transfert hors infrastructure.

### Mesures d’atténuation
- Anonymiser les données avant envoi
- Ne pas stocker de données personnelles dans les logs ou fichiers audio
- Utiliser HTTPS et configurer CORS pour restreindre les domaines
- Héberger les données clients sur des serveurs européens (RGPD)

---

## 🔄 4. Risques d’incompréhension utilisateur

### Description
Une réponse trop technique ou ambiguë peut nuire à l’expérience utilisateur ou générer de la méfiance.

### Mesures d’atténuation
- Suivre les taux de satisfaction et les retours clients
- Concevoir les agents avec un ton clair, professionnel et humain
- Ajouter une option d’escalade vers un conseiller humain

---

## ⚙️ 5. Suivi et gouvernance de l’IA

- Registre des prompts versionnés dans Git
- Journal d’erreurs IA pour documenter les incohérences
- Dashboard Lynvia : suivi des hallucinations, réponses utiles, etc.
- Révision mensuelle des workflows pour corriger les biais

---

## ✅ 6. Objectif

Garantir que Lynvia Connect reste :
- **Fiable** : cohérence des réponses, vérification des données
- **Éthique** : neutralité des messages, transparence des actions
- **Sécurisée** : respect des données utilisateurs, conformité RGPD
- **Évolutive** : ajustement des prompts, audit continu

---
