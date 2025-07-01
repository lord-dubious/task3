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
  Sparkles
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
    <div className="fixed top-0 left-0 w-64 bg-gray-900/95 backdrop-blur-sm border-r border-gray-700 h-screen flex flex-col z-sidebar">
      <div className="p-4 sm:p-6 border-b border-gray-700 flex-shrink-0">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-700 rounded-lg flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">TweetScheduler</h1>
            <p className="text-sm text-purple-300">Pro</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-3 sm:px-4 py-4 sm:py-6 space-y-1 sm:space-y-2 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <motion.button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`
                w-full flex items-center space-x-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg text-left transition-all duration-200
                ${isActive 
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/25' 
                  : 'text-gray-300 hover:text-white hover:bg-gray-800'
                }
              `}
              whileHover={{ x: isActive ? 0 : 4 }}
              whileTap={{ scale: 0.98 }}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-400'}`} />
              <span className="font-medium text-sm sm:text-base">{item.label}</span>
            </motion.button>
          );
        })}
      </nav>

    </div>
  );
}