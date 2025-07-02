import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Toaster } from 'sonner';
import { AuthGuard } from './components/auth/AuthGuard';
import { MobileSidebar } from './components/mobile/MobileSidebar';
import { MobileHeader } from './components/mobile/MobileHeader';
import { MobileBottomNav } from './components/mobile/MobileBottomNav';
import { MobileDashboard } from './components/mobile/MobileDashboard';
import { MobileTweetComposer } from './components/mobile/MobileTweetComposer';
import { WebSidebar } from './components/web/WebSidebar';
import { WebHeader } from './components/web/WebHeader';
import { DashboardView } from './components/dashboard/DashboardView';
import { TweetComposer } from './components/compose/TweetComposer';
import { SettingsView } from './components/settings/SettingsView';
import { AgentSettingsView } from './components/agents/AgentSettingsView';
import { SchedulingView } from './components/scheduling/SchedulingView';
import { MediaLibraryView } from './components/media/MediaLibraryView';
import { useDeviceType } from './hooks/useDeviceType';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const deviceType = useDeviceType();
  const isMobile = deviceType === 'mobile';

  // Handle responsive sidebar collapse
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024 && !isMobile) {
        setSidebarCollapsed(false);
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Check initial size

    return () => window.removeEventListener('resize', handleResize);
  }, [isMobile]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen && isMobile) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen, isMobile]);

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

  const renderMobileContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <MobileDashboard />;
      case 'compose':
        return <MobileTweetComposer />;
      default:
        return (
          <div className="flex items-center justify-center h-64 pb-20">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-white mb-2">Coming Soon</h3>
              <p className="text-gray-400">Mobile version under development</p>
            </div>
          </div>
        );
    }
  };

  const renderWebContent = () => {
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

  if (isMobile) {
    return (
      <AuthGuard>
        <div className="min-h-screen bg-black">
          <MobileHeader 
            {...getHeaderProps()} 
            onMenuToggle={() => setMobileMenuOpen(!mobileMenuOpen)}
          />
          
          <MobileSidebar
            activeTab={activeTab}
            onTabChange={setActiveTab}
            isOpen={mobileMenuOpen}
            onClose={() => setMobileMenuOpen(false)}
          />
          
          <main className="min-h-screen bg-black">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {renderMobileContent()}
              </motion.div>
            </AnimatePresence>
          </main>
          
          <MobileBottomNav
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
        </div>
        
        {/* Toast Notifications */}
        <Toaster 
          theme="dark"
          position="top-center"
          richColors={true}
          closeButton={true}
          duration={4000}
          visibleToasts={3}
          toastOptions={{
            style: {
              background: '#111827',
              border: '1px solid #374151',
              color: '#f3f4f6',
              zIndex: 500,
              borderRadius: '12px',
              fontSize: '13px',
              fontWeight: '500',
            },
          }}
        />
      </AuthGuard>
    );
  }
  return (
    <AuthGuard>
      <div className="min-h-screen bg-black flex overflow-hidden">
        <WebSidebar 
          activeTab={activeTab} 
          onTabChange={setActiveTab}
          isCollapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
        
        <div className={`
          flex-1 flex flex-col min-h-screen transition-all duration-300
          ${sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'}
        `}>
          <WebHeader 
            {...getHeaderProps()} 
            sidebarCollapsed={sidebarCollapsed}
          />
          
          <main className="flex-1 overflow-y-auto bg-black">
            <div className="p-6 min-h-full">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {renderWebContent()}
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
        duration={4000}
        visibleToasts={4}
        toastOptions={{
          style: {
            background: '#111827',
            border: '1px solid #374151',
            color: '#f3f4f6',
            zIndex: 500,
            borderRadius: '12px',
            fontSize: '13px',
            fontWeight: '500',
            backdropFilter: 'blur(8px)',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04), 0 0 0 1px rgba(255, 255, 255, 0.05)',
            maxWidth: '400px',
            width: 'auto',
          },
          classNames: {
            toast: 'shadow-xl backdrop-blur-sm',
            title: 'text-white font-semibold',
            description: 'text-gray-300',
            actionButton: 'bg-purple-600 hover:bg-purple-700 text-white border-none',
            cancelButton: 'bg-gray-700 hover:bg-gray-600 text-gray-200 border-none',
            closeButton: 'text-gray-400 hover:text-white border-gray-600 hover:border-gray-500',
            success: 'border-green-500/30 bg-green-500/10',
            error: 'border-red-500/30 bg-red-500/10',
            warning: 'border-yellow-500/30 bg-yellow-500/10',
            info: 'border-blue-500/30 bg-blue-500/10',
          },
        }}
      />
    </AuthGuard>
  );
}

export default App;