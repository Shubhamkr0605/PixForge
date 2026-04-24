import { useNavigate } from "react-router-dom";

const BuyCredit = ({ setCredits }) => {
  const navigate = useNavigate();

  const handleBuy = (amount) => {
    setCredits((prev) => prev + amount);
    navigate("/");
  };

  return (
    <div
      className="
        min-h-screen
        bg-gradient-to-br
        from-emerald-200 via-teal-100 to-cyan-200
        dark:from-black dark:via-[#020617] dark:to-black
        transition-colors duration-500
      "
    >
      <div className="max-w-5xl mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-14">
          Buy Credits 💳
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[5, 10, 25].map((credits) => (
            <div
              key={credits}
              className="
                p-8 rounded-3xl text-center
                bg-white/80 dark:bg-white/5
                backdrop-blur-xl
                border border-gray-200 dark:border-white/10
                shadow-xl
              "
            >
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                {credits} Credits
              </h3>

              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Generate {credits} AI images
              </p>

              <button
                onClick={() => handleBuy(credits)}
                className="
                  w-full py-3 rounded-xl
                  bg-teal-500 hover:bg-teal-600
                  text-white font-semibold
                  transition
                "
              >
                Buy Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BuyCredit;
