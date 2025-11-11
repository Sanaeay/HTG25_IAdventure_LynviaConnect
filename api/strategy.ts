import type { VercelRequest, VercelResponse } from "@vercel/node";

/**
 * Backend Lynvia -> n8n
 * Transmet le contexte métier à n8n pour traitement Mistral
 */

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { name, sector, context, goal, delay, sliders, prompt } = req.body;

    // Vérification basique
    if (!name || !sector || !context) {
      return res.status(400).json({ error: "Champs requis manquants (name, sector, context)." });
    }

    // Construction du contexte métier structuré
    const businessContext = {
      name,
      sector,
      context,
      goal,
      delay,
      sliders,
      prompt,
    };

    console.log("🚀 Contexte envoyé à n8n :", businessContext);

    // Appel à ton webhook n8n (qui gère ensuite Mistral + enrichissement)
    const webhookUrl = "https://iadventure.app.n8n.cloud/webhook/strategie-ai";

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(businessContext),
    });

    if (!response.ok) {
      const text = await response.text();
      console.error("❌ Erreur n8n :", text);
      throw new Error(`Erreur webhook n8n (${response.status})`);
    }

    const data = await response.json();
    console.log("✅ Réponse de n8n :", data);

    // Renvoie la réponse enrichie à Lynvia (front)
    res.status(200).json({
      success: true,
      message: "Contexte envoyé à n8n avec succès",
      n8nResponse: data,
    });
  } catch (err: any) {
    console.error("💥 Erreur API /strategy :", err);
    res.status(500).json({
      error: "Erreur interne du serveur",
      details: err.message,
    });
  }
}
