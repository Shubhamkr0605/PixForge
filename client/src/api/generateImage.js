export const generateImage = async (prompt) => {
  const res = await fetch("http://localhost:4000/api/image/generate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ prompt }),
  });

  if (!res.ok) {
    throw new Error("Image generation failed");
  }

  return res.json();
};