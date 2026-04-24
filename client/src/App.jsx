import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

// Pages
import Home from "./Pages/Home";
import Result from "./Pages/Result";
import BuyCredit from "./Pages/BuyCredit";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";

// Components
import Navbar from "./Components/Navbar";

function App() {
  const [credits, setCredits] = useState(5);

  /* =========================
     Load credits
  ========================= */
  useEffect(() => {
    const savedCredits = localStorage.getItem("credits");

    if (savedCredits !== null) {
      setCredits(Number(savedCredits));
    } else {
      localStorage.setItem("credits", "5");
    }
  }, []);

  /* =========================
     Persist credits
  ========================= */
  useEffect(() => {
    localStorage.setItem("credits", credits.toString());
  }, [credits]);

  return (
    <div className="min-h-screen w-full bg-[#020617] text-white">

      {/* 🔹 Navbar */}
      <Navbar credits={credits} />

      {/* 🔹 Routes */}
      <main className="pt-24">
        <Routes>

          {/* 🏠 Home (IMPORTANT FIX HERE) */}
          <Route
            path="/"
            element={<Home credits={credits} />}
          />

          {/* 🎨 Result */}
          <Route
            path="/result"
            element={
              <Result
                credits={credits}
                setCredits={setCredits}
              />
            }
          />

          {/* 💳 Buy Credits */}
          <Route
            path="/buy-credit"
            element={<BuyCredit setCredits={setCredits} />}
          />

          {/* 🔐 Auth */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

        </Routes>
      </main>
    </div>
  );
}

export default App;