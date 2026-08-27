export default async function handler(req, res) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    let body = req.body;
    if (typeof body === 'string') {
      try { body = JSON.parse(body); } catch(e) {}
    }
    
    const { variation_id, uid } = body || {};
    const apiKey = "gk_989ccb3eae09b361dc0d133eae2bda86eea09a48647cccdf";

    if (!variation_id || !uid) {
      return res.status(400).json({ success: false, message: "Variation ID অথবা Player UID পাওয়া যায়নি।" });
    }

    // GamesKinbo API Call
    const response = await fetch("https://gameskinbo.com/api/create_order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey
      },
      body: JSON.stringify({ variation_id, uid })
    });

    const data = await response.json();
    return res.status(response.status).json(data);
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message || "Server Error" });
  }
}
