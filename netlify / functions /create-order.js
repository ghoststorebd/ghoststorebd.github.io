exports.handler = async (event) => {
  // শুধু POST রিকোয়েস্ট অ্যালাউ করা হবে
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const body = JSON.parse(event.body || "{}");
    // আপনার গোপন সিক্রেট API Key (এটি সার্ভার সাইডে থাকবে, ব্রাউজারে দেখাবে না)
    const apiKey = "gk_989ccb3eae09b361dc0d133eae2bda86eea09a48647cccdf";

    // Games Kinbo API-তে ব্যাকএন্ড থেকে রিকোয়েস্ট পাঠানো
    const res = await fetch("https://gameskinbo.com/api/create_order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey
      },
      body: JSON.stringify({
        variation_id: body.variation_id,
        uid: body.uid
      })
    });

    const data = await res.json();

    return {
      statusCode: res.status,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify(data)
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, message: err.message })
    };
  }
};
