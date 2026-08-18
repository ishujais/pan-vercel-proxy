export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const apiResponse = await fetch("https://eportal.incometax.gov.in/iec/registrationapi/saveEntity", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Origin": "https://eportal.incometax.gov.in",
        "Referer": "https://eportal.incometax.gov.in/iec/foservices/#/pre-login/register",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36"
      },
      body: JSON.stringify(req.body)
    });

    const data = await apiResponse.json();
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
