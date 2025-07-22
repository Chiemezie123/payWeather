const LoadingOverlay = () => {
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="w-20 h-20 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
};

export default LoadingOverlay;
