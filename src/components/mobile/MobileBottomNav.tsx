import React from 'react';
import { motion } from 'framer-motion';
import { Home, FileText, Calendar, Bot, Settings } from 'lucide-react';

interface MobileBottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const navItems = [
  { id: 'dashboard', label: 'Home', icon: Home },
  { id: 'compose', label: 'Compose', icon: FileText },
  { id: 'schedule', label: 'Schedule', icon: Calendar },
  { id: 'ai-agents', label: 'AI', icon: Bot },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export function MobileBottomNav({ activeTab, onTabChange }: MobileBottomNavProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900/95 backdrop-blur-sm border-t border-gray-700 z-30">
      <div className="flex items-center justify-around px-2 py-2 safe-area-pb">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <motion.button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`
                flex flex-col items-center justify-center p-3 rounded-xl min-w-0 flex-1 mx-1
                ${isActive ? 'text-purple-400' : 'text-gray-400'}
              `}
              whileTap={{ scale: 0.95 }}
            >
              <Icon className={`w-6 h-6 mb-1 ${isActive ? 'text-purple-400' : 'text-gray-400'}`} />
              <span className={`text-xs font-medium truncate ${isActive ? 'text-purple-400' : 'text-gray-400'}`}>
                {item.label}
              </span>
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute -top-1 w-1 h-1 bg-purple-400 rounded-full"
                />
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}