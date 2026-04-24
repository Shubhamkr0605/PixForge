import { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function Result({ credits, setCredits }) {
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const hasGenerated = useRef(false);

  const prompt =
    location.state?.prompt || localStorage.getItem("prompt");

  const generateImage = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!prompt) {
        navigate("/");
        return;
      }

      if (credits <= 0) {
        navigate("/buy-credit");
        return;
      }

      setLoading(true);
      setError("");
      setImage("");

      const res = await fetch("http://localhost:4000/api/image/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();
      console.log(data);

      if (!res.ok) throw new Error(data.message);

      const imageUrl =
        data.image?.imageUrl || data.imageUrl || data.url;

      setImage(imageUrl);

      setCredits((prev) => Math.max(prev - 1, 0));
    } catch (err) {
      setError("Failed to generate image");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (hasGenerated.current) return;
    hasGenerated.current = true;

    generateImage();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#020617] text-white px-6">

      {/* 🔥 Title */}
      <h1 className="text-4xl font-bold mb-3">
        Creation Unlocked
      </h1>

      {/* 🧠 Prompt */}
      <p className="text-gray-400 mb-6 text-center max-w-xl">
        <span className="text-white font-semibold">Prompt:</span> {prompt}
      </p>

      {/* ⏳ Loading */}
      {loading && (
        <div className="flex flex-col items-center gap-4">

          {/* Spinner */}
          <div className="w-12 h-12 border-4 border-teal-400 border-t-transparent rounded-full animate-spin"></div>

          <p className="text-yellow-400 text-lg">
            Moulding your imagination into reality...
          </p>
        </div>
      )}

      {/* ❌ Error */}
      {error && (
        <div className="bg-red-600 px-6 py-3 rounded-lg">
          {error}
        </div>
      )}

      {/* 🖼️ Image */}
      {image && (
        <div className="flex flex-col items-center mt-6">

          <img
            src={image}
            alt="Generated"
            className="rounded-2xl shadow-2xl max-w-md mb-6 border border-white/10"
          />

          {/* Buttons */}
          <div className="flex gap-4">

            <a href={image} download>
              <button className="bg-blue-500 px-5 py-2 rounded-lg hover:bg-blue-600">
                Download
              </button>
            </a>

            <button
              onClick={() => navigate("/")}
              className="bg-gray-700 px-5 py-2 rounded-lg hover:bg-gray-600"
            >
              Generate Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Result;