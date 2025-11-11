SECURITY.md — Lynvia Connect
🎯 Portée & objectifs

Ce document décrit la posture sécurité de Lynvia Connect : protections applicatives, gestion des secrets, sécurisation des webhooks n8n, exposition publique sur Vercel, et processus de divulgation responsable. L’objectif est de réduire les risques (exposition de secrets, XSS, injection, abus des webhooks) et de donner un cadre pour l’exploitation quotidienne.

🧱 Contexte d’architecture (résumé)

Frontend : React + Vite déployé sur Vercel (CDN, TLS).

Backend d’orchestration : n8n (cloud ou self-host) appelé via webhooks HTTPS.

IA : OpenAI (génération de texte), ElevenLabs (TTS) via API.

Persistance : localStorage côté client (pas de DB serveur en V1) ; DB prévue en V2.

Point important : aucune base de données externe en V1 ; agents et métriques locales (navigateur). La V2 introduira une DB serveur (cf. roadmap/costs).

🔒 Données traitées

En V1 (actuel) :

Config d’agents, quelques stats et états stockés localement (localStorage).

Échanges transitent vers n8n / IA (OpenAI, ElevenLabs) mais ne sont pas persistés côté app.

En V2 (prévu) :

Ajout d’une DB serveur (conversations, analytics, journaux). Durées de rétention à définir (reco : 30–90 j selon type).

Recommandation : limiter les PII ; si des leads sont traités par n8n/CRM, segmenter et pseudonymiser au maximum côté workflows.

🪪 Authentification & autorisation

Frontend : pas d’auth utilisateur en V1 (prévu en roadmap). Protéger les pages sensibles (ex. /integrations, /billing) dès l’introduction d’un auth (JWT + rotation + SameSite=strict).

n8n Webhooks (critique) :

Utiliser HTTPS uniquement.

Ajouter un secret de signature (ex. header X-Webhook-Signature HMAC) vérifié en tout début de workflow.

Chemins non triviaux + Basic Auth côté webhook si possible.

Rate limiting en amont (CDN, reverse proxy) + rejet > payload max.

Allowlist IP si self-host (reverse proxy).

Séparer les webhooks publics (réception) des internes (chaînage), et ne jamais réutiliser la même URL dans plusieurs contextes.

🤐 Gestion des secrets

Jamais en dur dans le code ni dans le repo.

Vercel : stocker les clés (OpenAI, ElevenLabs, endpoints n8n) dans Environment Variables (Production/Preview/Dev).

n8n : utiliser le store de credentials et une clé d’encryption forte (self-host).

Principe du moindre privilège : clés restreintes, rotation trimestrielle (ou post-incident), audit des accès.

🔐 Chiffrement & transport

TLS de bout en bout (Vercel <-> navigateur, Front <-> n8n, n8n <-> APIs IA).

HSTS conseillé (1 an, preload) via headers Vercel.

Pas de contenu mixte (aucun HTTP).

🌐 CORS, CSP & en-têtes de sécurité

CORS : n’autoriser que les origines nécessaires (ex. https://lynvia-connect.vercel.app).

CSP stricte pour limiter XSS/injections ; X-Frame-Options: DENY ; X-Content-Type-Options: nosniff ; Referrer-Policy: strict-origin-when-cross-origin ; Permissions-Policy minimale.

Exemple vercel.json (adapter les domaines réellement utilisés : Vercel, APIs, médias ElevenLabs) :

{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "Strict-Transport-Security", "value": "max-age=31536000; includeSubDomains; preload" },
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" },
        { "key": "Permissions-Policy", "value": "geolocation=(), camera=(), microphone=()" },
        {
          "key": "Content-Security-Policy",
          "value": "default-src 'self'; img-src 'self' data: blob:; media-src 'self' https://*.elevenlabs.io data: blob:; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; font-src 'self' data:; connect-src 'self' https://*.vercel.app https://*.n8n.cloud https://*.openai.com https://api.elevenlabs.io; frame-ancestors 'none'; base-uri 'self';"
        }
      ]
    }
  ]
}


Nota : l’app joue de l’audio ElevenLabs depuis la page Analytics (bouton “Écouter le résumé”) — garder media-src ouvert à leur domaine et aux blobs locaux.

🧪 Sécurité applicative (Front)

Validation/échappement stricts de toutes les entrées envoyées aux webhooks (pas de JSON “libre” sans schéma).

Désérialisation sûre côté n8n (parser JSON → schéma zod/ajv, filtrer champs).

Pas de secrets dans le bundle (ni endpoints internes).

Gestion locale (localStorage) : ne stocker aucune info sensible/PII ; nettoyer à la déconnexion (quand auth sera ajouté).

⚙️ Sécurité des workflows n8n

Noeud d’entrée : vérification signature/secret, taille payload, type MIME.

Compartimenter par agent (IDs uniques transmis par le front) ; interdire l’exécution croisée entre agents.

Sorties : ne renvoyer que le strict nécessaire au front ; jamais de secrets.

Journaux : ne jamais logger de PII/sensibles ; limiter la rétention (reco : 30 j).

Webhook de stratégie (/webhook/strategie-ai) : traiter le payload minimal, tracer l’ID d’agent, auditer les rejets.

🧩 Dépendances & supply chain

npm : npm audit à chaque build ; activer Dependabot.

Lockfile commité (package-lock.json) ; mises à jour contrôlées.

CI : build reproductibles (Vercel) ; refuser les dépendances non-pinnées.

🧭 Journalisation, monitoring & rétention

Frontend : logs minimaux (erreurs techniques, aucun PII).

n8n : activer la rotation, accès restreint (RBAC).

Rétention suggérée : 30 jours (ops), 90 jours (sécurité) ; anonymiser si conservation plus longue.

🔁 Continuité & sauvegardes

V1 : pas de DB → pas de backup applicatif spécifique.

V2 : prévoir backup quotidien chiffré (stockage objet S3/R2, clé KMS), tests de restauration trimestriels.

🛡️ Abus, anti-automatisation & quotas

Limiter la fréquence des appels frontend → webhooks (debounce, quotas par agent).

Côté n8n : limiter l’évent storm (file d’attente, backoff).

APIs IA : plafonds (tokens/min) + monitoring des coûts.

📣 Divulgation responsable (vulnérabilités)

Si tu découvres une faille :

Ne pas l’exploiter.

Ne pas publier d’informations ou de données d’utilisateurs.

Envoyer les détails à sanaeayda@yahoo.fr
 (objet : [SECURITY] <titre>), avec : description, impact, étapes de repro, PoC, version/commit, proposition de correction.

SLA visé :

Accusé de réception : 72 h ouvrées

Triage : 7 jours

Correctif & communication : selon sévérité (CVSS), généralement 7–30 jours.

Contact mainteneur & hébergement figure aussi dans le README.

✅ Checklist “Durcissement rapide”

 Webhooks n8n derrière signature HMAC + Basic Auth

 CSP stricte + HSTS + XFO=DENY + nosniff sur Vercel

 Aucune PII dans localStorage / logs

 Variables d’environnement pour toutes les clés (Vercel + n8n)

 npm audit / Dependabot activés

 Rate limiting en amont des webhooks

 Plan de rotation des secrets (≥ trimestriel)

 Plan de rétention logs (≤ 30–90 j)

 Backups chiffrés (dès V2 DB)

🗓️ Historique des mises à jour

2025-11-11 : version initiale (V1, DB en V2).

Annexes – Faits de référence du repo

Archi & modules (front React, n8n, ElevenLabs, OpenAI ; Analytics avec audio) ; ID d’agent transmis au webhook n8n.

Persistance locale only en V1 ; DB prévue ; coûts/hosting (Vercel/n8n/IA).
