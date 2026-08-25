const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;


export async function initializePayment(credentials) {
    const accessToken = localStorage?.getItem("access_token");
  const res = await fetch(`${BASE_URL}/payments/initialize`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "authorization": `Bearer ${accessToken}`,
    },
    body: JSON.stringify(credentials),
  });

  const data = await res.json();
  console.log('initialize payment data:', data)
  if (!res.ok) {
    throw new Error(data.message || "Failed to initialize payment");
  }

  return data; // usually contains authorization_url, reference, etc.
}