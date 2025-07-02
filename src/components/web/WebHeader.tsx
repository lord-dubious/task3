import React from 'react';
import { User, LogOut } from 'lucide-react';
import { Button } from '../ui/Button';
import { QuickSettingsDropdown } from '../layout/QuickSettingsDropdown';
import { NotificationDropdown } from '../layout/NotificationDropdown';
import { useAuth } from '../../hooks/useAuth';

interface WebHeaderProps {
  title: string;
  subtitle?: string;
  sidebarCollapsed?: boolean;
}

export function WebHeader({ title, subtitle, sidebarCollapsed }: WebHeaderProps) {
  const { user, signOut } = useAuth();

  return (
    <header className={`
      bg-gray-900/95 backdrop-blur-sm border-b border-gray-700 px-6 py-4 
      relative z-header flex-shrink-0 transition-all duration-300
      ${sidebarCollapsed ? 'ml-16' : 'ml-64'}
    `}>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">{title}</h1>
          {subtitle && <p className="text-gray-400 mt-1">{subtitle}</p>}
        </div>
        
        <div className="flex items-center space-x-4">
          <NotificationDropdown />
          <QuickSettingsDropdown />
          <Button variant="ghost" size="sm" onClick={signOut}>
            <LogOut className="w-5 h-5" />
          </Button>
          
          <div className="flex items-center space-x-3 pl-4 border-l border-gray-600">
            {user?.user_metadata?.avatar_url || user?.user_metadata?.picture ? (
              <img
                src={user.user_metadata.avatar_url || user.user_metadata.picture}
                alt="Profile"
                className="w-8 h-8 rounded-full border-2 border-purple-500"
              />
            ) : (
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-700 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
            )}
            <div className="text-sm">
              <p className="text-white font-medium">
                {user?.user_metadata?.full_name || user?.user_metadata?.name || user?.email?.split('@')[0]}
              </p>
              <p className="text-gray-400">{user?.email}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}