import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = ({ credits }) => {
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const handleGenerate = () => {
    if (!input.trim()) return;

    localStorage.setItem("prompt", input);

    navigate("/result", {
      state: { prompt: input.trim() },
    });
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#020617] text-white">

    

      {/* 🔥 Background Glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute w-[500px] h-[500px] bg-teal-500/20 rounded-full blur-[120px] top-[-100px] left-[-100px]" />
        <div className="absolute w-[400px] h-[400px] bg-purple-500/20 rounded-full blur-[120px] bottom-[-100px] right-[-100px]" />
      </div>

      {/* 🚀 Main Section */}
      <section className="flex items-center justify-center min-h-screen px-6">
        <div className="max-w-4xl w-full text-center">

          {/* Heading */}
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6">
            Turn Ideas into{" "}
            <span className="bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent">
              Stunning AI Images
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-gray-400 text-lg mb-10">
            Describe anything and let AI bring it to life.
          </p>

          {/* Input Box */}
          <div className="flex flex-col sm:flex-row gap-4 p-3 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/10">

            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="A futuristic city floating in the sky..."
              className="flex-1 px-5 py-4 rounded-xl bg-transparent text-white placeholder-gray-400 outline-none"
            />

            <button
              onClick={handleGenerate}
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-teal-500 to-blue-600 hover:opacity-90"
            >
              Generate ✨
            </button>
          </div>

          {/* Tags */}
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {[
              "Cyberpunk warrior",
              "Futuristic city",
              "AI robot portrait",
              "Fantasy landscape",
            ].map((tag, i) => (
              <button
                key={i}
                onClick={() => setInput(tag)}
                className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-sm"
              >
                {tag}
              </button>
            ))}
          </div>

        </div>
      </section>
    </div>
  );
};

export default Home;