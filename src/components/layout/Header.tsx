import React from 'react';
import { User, LogOut } from 'lucide-react';
import { Button } from '../ui/Button';
import { QuickSettingsDropdown } from './QuickSettingsDropdown';
import { NotificationDropdown } from './NotificationDropdown';
import { useAuth } from '../../hooks/useAuth';

interface HeaderProps {
  title: string;
  subtitle?: string;
}

export function Header({ title, subtitle }: HeaderProps) {
  const { user, signOut } = useAuth();

  return (
    <header className="bg-md3-surface border-b border-md3-outline-variant px-6 py-4 relative z-[100]">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="md3-headline-small text-md3-on-surface">{title}</h1>
          {subtitle && <p className="md3-body-medium text-md3-on-surface-variant mt-1">{subtitle}</p>}
        </div>
        
        <div className="flex items-center space-x-3">
          <NotificationDropdown />
          
          <QuickSettingsDropdown />
          
          <Button variant="text" size="sm" onClick={signOut}>
            <LogOut className="w-5 h-5" />
          </Button>
          
          <div className="flex items-center space-x-3 pl-4 border-l border-md3-outline-variant">
            {user?.user_metadata?.avatar_url || user?.user_metadata?.picture ? (
              <img
                src={user.user_metadata.avatar_url || user.user_metadata.picture}
                alt="Profile"
                className="w-10 h-10 rounded-full border-2 border-md3-primary"
              />
            ) : (
              <div className="w-10 h-10 bg-md3-primary rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-md3-on-primary" />
              </div>
            )}
            <div className="text-sm">
              <p className="md3-body-medium text-md3-on-surface font-medium">
                {user?.user_metadata?.full_name || user?.user_metadata?.name || user?.email?.split('@')[0]}
              </p>
              <p className="md3-body-small text-md3-on-surface-variant">{user?.email}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}