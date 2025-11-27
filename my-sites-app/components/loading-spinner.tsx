'use client';

export default function LoadingSpinner() {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-500 mx-auto mb-4"></div>
        <h1 className="text-2xl font-bold text-white mb-2">
          Initializing Sitecore Sites Manager
        </h1>
        <p className="text-blue-200">Please wait...</p>
      </div>
    </div>
  );
}
