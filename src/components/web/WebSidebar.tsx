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
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface WebSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
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

export function WebSidebar({ activeTab, onTabChange, isCollapsed, onToggleCollapse }: WebSidebarProps) {
  return (
    <motion.div
      initial={false}
      animate={{ width: isCollapsed ? '4rem' : '16rem' }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="fixed top-0 left-0 h-screen bg-gray-900/95 backdrop-blur-sm border-r border-gray-700 flex flex-col z-sidebar"
    >
      {/* Header */}
      <div className={`p-4 border-b border-gray-700 flex-shrink-0 ${isCollapsed ? 'px-2' : 'px-4'}`}>
        <div className="flex items-center justify-between">
          <div className={`flex items-center space-x-3 ${isCollapsed ? 'justify-center' : ''}`}>
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-700 rounded-lg flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <AnimatePresence>
              {!isCollapsed && (
                <motion.div
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 'auto' }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <h1 className="text-xl font-bold text-white whitespace-nowrap">TweetScheduler</h1>
                  <p className="text-sm text-purple-300 whitespace-nowrap">Pro</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className={`flex-1 py-4 space-y-1 overflow-y-auto ${isCollapsed ? 'px-2' : 'px-3'}`}>
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <motion.button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`
                w-full flex items-center rounded-lg text-left transition-all duration-200 group
                ${isCollapsed ? 'justify-center p-3' : 'space-x-3 px-3 py-2.5'}
                ${isActive 
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/25' 
                  : 'text-gray-300 hover:text-white hover:bg-gray-800'
                }
              `}
              whileHover={{ x: isActive ? 0 : 4 }}
              whileTap={{ scale: 0.98 }}
              title={isCollapsed ? item.label : undefined}
            >
              <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-white'}`} />
              <AnimatePresence>
                {!isCollapsed && (
                  <motion.span
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: 'auto' }}
                    exit={{ opacity: 0, width: 0 }}
                    transition={{ duration: 0.2 }}
                    className="font-medium text-sm overflow-hidden whitespace-nowrap"
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          );
        })}
      </nav>

      {/* Collapse Toggle */}
      <div className={`p-4 border-t border-gray-700 ${isCollapsed ? 'px-2' : 'px-4'}`}>
        <button
          onClick={onToggleCollapse}
          className={`
            w-full flex items-center text-gray-400 hover:text-white transition-colors
            ${isCollapsed ? 'justify-center p-2' : 'space-x-3 px-3 py-2'}
          `}
          title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsed ? (
            <ChevronRight className="w-5 h-5 flex-shrink-0" />
          ) : (
            <>
              <ChevronLeft className="w-5 h-5 flex-shrink-0" />
              <AnimatePresence>
                <motion.span
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 'auto' }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-sm overflow-hidden whitespace-nowrap"
                >
                  Collapse
                </motion.span>
              </AnimatePresence>
            </>
          )}
        </button>
      </div>
    </motion.div>
  );
}
