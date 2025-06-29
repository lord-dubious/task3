import React from 'react';
import { motion } from 'framer-motion';
import { 
  Home, 
  Calendar, 
  FileText, 
  FolderOpen,
  BarChart3, 
  Settings, 
  Bot,
  CheckSquare
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: Home },
  { id: 'compose', label: 'Compose', icon: FileText },
  { id: 'schedule', label: 'Schedule', icon: Calendar },
  { id: 'media', label: 'Media Library', icon: FolderOpen },
  { id: 'ai-agents', label: 'AI Agents', icon: Bot },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  return (
    <div className="w-80 bg-md3-surface-container h-screen flex flex-col border-r border-md3-outline-variant">
      <div className="p-6 border-b border-md3-outline-variant">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-md3-primary to-md3-primary-container rounded-2xl flex items-center justify-center shadow-elevation-2 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-md3-primary/20 to-transparent"></div>
            <CheckSquare className="w-7 h-7 text-md3-on-primary relative z-10" />
          </div>
          <div>
            <h1 className="md3-title-large text-md3-on-surface">Tasker</h1>
            <p className="md3-label-medium text-md3-primary">Pro</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-3 py-6 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <motion.button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`
                w-full flex items-center space-x-4 px-4 py-3 rounded-full text-left transition-all duration-200 state-layer
                ${isActive 
                  ? 'bg-md3-primary-container text-md3-on-primary-container shadow-elevation-0' 
                  : 'text-md3-on-surface hover:bg-md3-on-surface/8'
                }
              `}
              whileHover={{ x: isActive ? 0 : 4 }}
              whileTap={{ scale: 0.98 }}
            >
              <Icon className={`w-6 h-6 ${isActive ? 'text-md3-on-primary-container' : 'text-md3-on-surface-variant'}`} />
              <span className="md3-label-large">{item.label}</span>
            </motion.button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-md3-outline-variant">
        <div className="bg-md3-primary-container rounded-2xl p-4 text-center">
          <div className="w-12 h-12 bg-gradient-to-br from-md3-primary to-md3-primary-container rounded-full flex items-center justify-center mx-auto mb-3 shadow-elevation-1">
            <CheckSquare className="w-6 h-6 text-md3-on-primary" />
          </div>
          <p className="md3-title-small text-md3-on-primary-container mb-2">Upgrade to Pro</p>
          <p className="md3-body-small text-md3-on-primary-container/80 mb-4">
            Unlock unlimited tasks, scheduling and advanced AI features
          </p>
          <button className="bg-md3-primary text-md3-on-primary px-6 py-2 rounded-full md3-label-large hover:shadow-elevation-1 transition-all duration-200 state-layer">
            Upgrade Now
          </button>
        </div>
      </div>
    </div>
  );
}