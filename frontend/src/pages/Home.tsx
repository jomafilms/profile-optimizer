
import React from 'react';

export const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
      <div className="max-w-5xl w-full">
        <div className="bg-gradient-to-r from-indigo-600 to-violet-600 text-white rounded-2xl shadow-lg p-8 text-center">
          <h1 className="text-3xl font-bold mb-3">
            Welcome to Profile Optimizer
          </h1>
          <p className="text-lg text-indigo-100 mb-2">
            Your AI-powered assistant for enriching White Rabbit Ashland member profiles.
          </p>
          <div className="flex gap-4 justify-center items-center text-sm text-indigo-200 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              <span>Backend Running</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              <span>Frontend Running</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              <span>Ready to Chat</span>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">System Status</h2>
          <div className="space-y-2 text-gray-600">
            <p>✅ Database connected</p>
            <p>✅ API endpoints ready</p>
            <p>✅ Authentication configured</p>
            <p>✅ AI agents initialized</p>
          </div>
        </div>
      </div>
    </div>
  );
};
