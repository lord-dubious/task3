import React from 'react';
import { Menu, User, Bell, Settings } from 'lucide-react';
import { Button } from '../ui/Button';
import { useAuth } from '../../hooks/useAuth';

interface MobileHeaderProps {
  title: string;
  subtitle?: string;
  onMenuToggle: () => void;
}

export function MobileHeader({ title, subtitle, onMenuToggle }: MobileHeaderProps) {
  const { user } = useAuth();

  return (
    <header className="bg-gray-900/95 backdrop-blur-sm border-b border-gray-700 px-4 py-3 flex items-center justify-between sticky top-0 z-30">
      <div className="flex items-center space-x-3">
        <Button
          variant="ghost"
          size="sm"
          onClick={onMenuToggle}
          className="p-2"
        >
          <Menu className="w-6 h-6" />
        </Button>
        
        <div className="min-w-0">
          <h1 className="text-lg font-bold text-white truncate">{title}</h1>
          {subtitle && (
            <p className="text-sm text-gray-400 truncate">{subtitle}</p>
          )}
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        <Button variant="ghost" size="sm" className="p-2">
          <Bell className="w-5 h-5" />
        </Button>
        
        <Button variant="ghost" size="sm" className="p-2">
          <Settings className="w-5 h-5" />
        </Button>
        
        <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-purple-500">
          {user?.user_metadata?.avatar_url || user?.user_metadata?.picture ? (
            <img
              src={user.user_metadata.avatar_url || user.user_metadata.picture}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
          )}
        </div>
      </div>
    </header>
  );
}