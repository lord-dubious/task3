import React from 'react';
import { Users, UserPlus, Unlink } from 'lucide-react';
import { TwitterAccount } from '../../types';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';

interface TwitterAccountCardProps {
  account: TwitterAccount;
  onDisconnect: (accountId: string) => void;
}

export function TwitterAccountCard({ account, onDisconnect }: TwitterAccountCardProps) {
  return (
    <Card className="p-4">
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <img
              src={account.profileImage}
              alt={account.displayName}
              className="w-12 h-12 rounded-full border-2 border-purple-500"
            />
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-black flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
          </div>
          
          <div>
            <h3 className="text-white font-semibold">{account.displayName}</h3>
            <p className="text-gray-400 text-sm">@{account.username}</p>
            <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
              <div className="flex items-center space-x-1">
                <Users className="w-3 h-3" />
                <span>{account.followers.toLocaleString()} followers</span>
              </div>
              <div className="flex items-center space-x-1">
                <UserPlus className="w-3 h-3" />
                <span>{account.following.toLocaleString()} following</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1 text-green-400 text-sm">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <span>Connected</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDisconnect(account.id)}
            className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
          >
            <Unlink className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
