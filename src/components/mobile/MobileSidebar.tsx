import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, 
  Calendar, 
  FileText, 
  FolderOpen,
  BarChart3, 
  Settings, 
  Bot,
  Sparkles,
  X
} from 'lucide-react';

interface MobileSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  isOpen: boolean;
  onClose: () => void;
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

export function MobileSidebar({ activeTab, onTabChange, isOpen, onClose }: MobileSidebarProps) {
  const handleItemClick = (itemId: string) => {
    onTabChange(itemId);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={onClose}
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 left-0 h-full w-80 bg-gray-900/95 backdrop-blur-sm border-r border-gray-700 z-50 flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-gray-700 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-700 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-white">TweetScheduler</h1>
                  <p className="text-sm text-purple-300">Pro</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-gray-800 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 py-6 px-4 space-y-2 overflow-y-auto">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                
                return (
                  <motion.button
                    key={item.id}
                    onClick={() => handleItemClick(item.id)}
                    className={`
                      w-full flex items-center space-x-4 px-4 py-4 rounded-xl text-left transition-all duration-200
                      ${isActive 
                        ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/25' 
                        : 'text-gray-300 hover:text-white hover:bg-gray-800'
                      }
                    `}
                    whileHover={{ x: isActive ? 0 : 4 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Icon className={`w-6 h-6 ${isActive ? 'text-white' : 'text-gray-400'}`} />
                    <span className="font-medium text-base">{item.label}</span>
                  </motion.button>
                );
              })}
            </nav>

            {/* Footer */}
            <div className="p-4 border-t border-gray-700">
              <div className="text-center text-xs text-gray-500">
                TweetScheduler Pro v1.0.0
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}