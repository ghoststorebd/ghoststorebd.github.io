// api/create-order.js (Vercel Node.js Serverless Function)
export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, message: 'Method Not Allowed' });
    }

    const { variation_id, uid } = req.body;
    const API_KEY = process.env.GAMESKINBO_API_KEY || "gk_989ccb3eae09b361dc0d133eae2bda86eae09a48647cccdf";

    try {
        const apiRes = await fetch("https://gameskinbo.com/api/create_order", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-api-key": API_KEY
            },
            body: JSON.stringify({ variation_id, uid })
        });

        const data = await apiRes.json();
        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}
