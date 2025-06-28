import React from 'react';
import { Twitter, Plus } from 'lucide-react';
import { Button } from '../ui/Button';

interface ConnectTwitterButtonProps {
  onConnect: () => void;
  isLoading?: boolean;
}

export function ConnectTwitterButton({ onConnect, isLoading }: ConnectTwitterButtonProps) {
  return (
    <div className="border-2 border-dashed border-gray-700 rounded-xl p-8 text-center hover:border-purple-500 transition-colors">
      <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
        <Twitter className="w-8 h-8 text-gray-400" />
      </div>
      <h3 className="text-white font-semibold mb-2">Connect Twitter Account</h3>
      <p className="text-gray-400 text-sm mb-4">
        Link your Twitter account to start scheduling and posting tweets
      </p>
      <Button
        onClick={onConnect}
        isLoading={isLoading}
        leftIcon={<Plus className="w-4 h-4" />}
        className="bg-twitter-blue hover:bg-twitter-blue/90"
      >
        Connect Account
      </Button>
    </div>
  );
}