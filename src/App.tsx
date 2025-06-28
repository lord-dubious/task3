import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Toaster } from 'sonner';
import { AuthGuard } from './components/auth/AuthGuard';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { DashboardView } from './components/dashboard/DashboardView';
import { TweetComposer } from './components/compose/TweetComposer';
import { SettingsView } from './components/settings/SettingsView';
import { AgentSettingsView } from './components/agents/AgentSettingsView';
import { SchedulingView } from './components/scheduling/SchedulingView';
import { MediaLibraryView } from './components/media/MediaLibraryView';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const getHeaderProps = () => {
    switch (activeTab) {
      case 'dashboard':
        return { title: 'Dashboard', subtitle: 'Overview of your Twitter activity' };
      case 'compose':
        return { title: 'Compose', subtitle: 'Create and schedule your tweets' };
      case 'schedule':
        return { title: 'Schedule', subtitle: 'Manage your scheduled posts' };
      case 'ai-agents':
        return { title: 'AI Agents', subtitle: 'Manage your AI personas' };
      case 'media':
        return { title: 'Media Library', subtitle: 'Manage your uploaded media files' };
      case 'analytics':
        return { title: 'Analytics', subtitle: 'Track your performance' };
      case 'settings':
        return { title: 'Settings', subtitle: 'Configure your account and integrations' };
      default:
        return { title: 'Dashboard', subtitle: 'Overview of your Twitter activity' };
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardView />;
      case 'compose':
        return <TweetComposer />;
      case 'schedule':
        return <SchedulingView />;
      case 'settings':
        return <SettingsView />;
      case 'ai-agents':
        return <AgentSettingsView />;
      case 'media':
        return <MediaLibraryView />;
      default:
        return (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-white mb-2">Coming Soon</h3>
              <p className="text-gray-400">This feature is under development</p>
            </div>
          </div>
        );
    }
  };

  return (
    <AuthGuard>
      <div className="min-h-screen bg-black flex">
        <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
        
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header {...getHeaderProps()} />
          
          <main className="flex-1 overflow-y-auto">
            <div className="p-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {renderContent()}
                </motion.div>
              </AnimatePresence>
            </div>
          </main>
        </div>
      </div>
      
      {/* Toast Notifications */}
      <Toaster 
        theme="dark"
        position="top-right"
        expand={true}
        richColors={true}
        closeButton={true}
        toastOptions={{
          style: {
            background: 'rgb(17, 24, 39)',
            border: '1px solid rgb(55, 65, 81)',
            color: 'rgb(243, 244, 246)',
            zIndex: 10000,
          },
        }}
      />
        toastOptions={{
          style: {
            background: 'rgb(17, 24, 39)',
            border: '1px solid rgb(55, 65, 81)',
            color: 'rgb(243, 244, 246)',
          },
        }}
      />
    </AuthGuard>
  );
}

export default App;