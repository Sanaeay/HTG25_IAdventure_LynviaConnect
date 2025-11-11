# 🚀 ROADMAD.md — Roadmap 2 semaines Lynvia Connect

## 🎯 Objectif global
Préparer la **V2 de Lynvia Connect** pour un déploiement plus large, avec :
- Un **routage intelligent des agents IA** (MCP)
- De **nouveaux workflows sectoriels**
- Un **dashboard interactif** connecté aux données réelles

---

## 📅 Semaine 1 — Structuration technique & modélisation

### 🎯 Objectifs principaux
- Définir la structure technique de la V2 (multi-secteurs + MCP intelligent)
- Modéliser les workflows spécifiques à d’autres métiers
- Préparer les intégrations nécessaires côté n8n et front-end

### 🔧 Tâches détaillées

#### 🧠 1. Workflows sectoriels
- Identifier 3 secteurs prioritaires (ex : RH, immobilier, formation)
- Échanger avec des professionnels pour comprendre leurs processus
- Créer un document de mapping des étapes de prospection
- Définir une structure JSON standard pour chaque workflow (intégration n8n)

#### 🔗 2. Architecture MCP (Master Control Point)
- Concevoir la logique de routage automatique des agents IA
- Définir les métadonnées par agent (secteur, objectif, type de flux)
- Ébaucher le schéma d’interconnexion MCP ↔ n8n (webhooks ou API REST)

#### 🧩 3. Côté front (préparation)
- Créer `src/lib/workflowConfig.ts` pour la correspondance Agent → Workflow
- Définir la structure d’appel du MCP (endpoint, payload, gestion d’erreurs)
- Ajouter les variables d’environnement dans `.env` (MCP + nouveaux flux)

#### 🧪 4. QA & Documentation
- Mettre à jour `TECH_SPEC.md` avec l’architecture multi-secteurs
- Rédiger le plan de test unitaire du MCP
- Créer une page temporaire “MCP Debug” dans le front

---

## 📅 Semaine 2 — Intégration, dashboard dynamique & tests

### 🎯 Objectifs principaux
- Connecter le front-end au backend n8n via le MCP
- Ajouter la première version dynamique du dashboard Analytics
- Tester bout-à-bout les flux de résumé et d’audio par secteur

### 🔧 Tâches détaillées

#### 🧠 1. Implémentation du MCP
- Créer le module MCP côté n8n (ou micro-service dédié)
- Définir les règles de routage : `agent.sector → workflow.id`
- Tester les retours de données (statut, logs, erreurs) vers le front
- Ajouter des logs pour la traçabilité

#### 📊 2. Dashboard dynamique
- Relier `Analytics.tsx` aux données réelles via API n8n
- Créer un endpoint `/stats` retournant :
  - nombre de conversations
  - leads qualifiés
  - rendez-vous pris
  - taux de conversion
- Intégrer les données dans les graphiques Recharts
- Ajouter une section “État des agents IA” en temps réel

#### 🧩 3. Audio & Résumé automatisé
- Adapter la génération de résumé par secteur
- Tester la création automatique de fichiers MP3 via ElevenLabs
- Vérifier la lecture front-end du bon résumé audio selon l’agent

#### 📋 4. QA & Documentation
- Mettre à jour `COST.md` (coûts scaling MCP + usage API)
- Mettre à jour `AI_RISKS.md` avec le plan de surveillance multi-agents
- Créer une note de synthèse “V2 Ready” pour la revue produit

---

## ✅ Livrables attendus (fin des 2 semaines)
- MCP intelligent opérationnel (routage multi-secteurs)
- 3 workflows sectoriels modélisés et intégrés dans n8n
- Dashboard Analytics connecté à des données dynamiques
- Résumé audio automatique fonctionnel par secteur
- Documentation produit & technique à jour
- Première démonstration de la V2 prête pour test utilisateur

---

## 🧭 Prochaines étapes (au-delà des 2 semaines)
- Authentification utilisateurs & gestion d’équipe
- Stockage des leads dans une base externe (Supabase / Postgres)
- Monitoring centralisé des agents IA
- Dashboard “multi-client” pour usage SaaS

