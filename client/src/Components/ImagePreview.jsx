const ImagePreview = () => {
  return (
    <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6">
      {[1, 2].map((_, i) => (
        <div
          key={i}
          className="h-64 rounded-xl bg-gray-200
          animate-pulse flex items-center justify-center"
        >
          Image Preview
        </div>
      ))}
    </div>
  );
};

export default ImagePreview;
