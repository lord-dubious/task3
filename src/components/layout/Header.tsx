import React from 'react';
import { User, LogOut, Menu } from 'lucide-react';
import { Button } from '../ui/Button';
import { QuickSettingsDropdown } from './QuickSettingsDropdown';
import { NotificationDropdown } from './NotificationDropdown';
import { useAuth } from '../../hooks/useAuth';

interface HeaderProps {
  title: string;
  subtitle?: string;
  onMobileMenuToggle?: () => void;
  sidebarCollapsed?: boolean;
}

export function Header({ title, subtitle, onMobileMenuToggle, sidebarCollapsed }: HeaderProps) {
  const { user, signOut } = useAuth();

  return (
    <header className={`
      bg-gray-900/95 backdrop-blur-sm border-b border-gray-700 px-4 sm:px-6 py-3 sm:py-4 
      relative z-header flex-shrink-0 transition-all duration-300
      ${sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'}
    `}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={onMobileMenuToggle}
            className="lg:hidden"
          >
            <Menu className="w-5 h-5" />
          </Button>
          
          <div>
            <h1 className="text-lg sm:text-2xl font-bold text-white truncate">{title}</h1>
            {subtitle && <p className="text-gray-400 mt-1 text-sm sm:text-base hidden sm:block">{subtitle}</p>}
          </div>
        </div>
        
        <div className="flex items-center space-x-2 sm:space-x-4">
          <NotificationDropdown />
          
          <QuickSettingsDropdown />
          
          <Button variant="ghost" size="sm" onClick={signOut} className="hidden sm:flex">
            <LogOut className="w-5 h-5" />
          </Button>
          
          <div className="flex items-center space-x-2 sm:space-x-3 pl-2 sm:pl-4 border-l border-gray-600">
            {user?.user_metadata?.avatar_url || user?.user_metadata?.picture ? (
              <img
                src={user.user_metadata.avatar_url || user.user_metadata.picture}
                alt="Profile"
                className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 border-purple-500"
              />
            ) : (
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-purple-500 to-purple-700 rounded-full flex items-center justify-center">
                <User className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
              </div>
            )}
            <div className="text-xs sm:text-sm hidden sm:block">
              <p className="text-white font-medium truncate max-w-32">
                {user?.user_metadata?.full_name || user?.user_metadata?.name || user?.email?.split('@')[0]}
              </p>
              <p className="text-gray-400 truncate max-w-32">{user?.email}</p>
            </div>
            
            {/* Mobile sign out button */}
            <Button variant="ghost" size="sm" onClick={signOut} className="sm:hidden">
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}