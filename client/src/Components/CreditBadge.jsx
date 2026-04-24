const CreditBadge = ({ credits }) => {
  return (
    <div className="px-4 py-2 rounded-lg bg-teal-100
      text-teal-800 font-semibold">
      Credits: {credits}
    </div>
  );
};

export default CreditBadge;
