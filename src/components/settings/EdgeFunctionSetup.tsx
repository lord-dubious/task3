import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Zap, 
  CheckCircle, 
  AlertCircle, 
  Play, 
  RefreshCw,
  Terminal,
  ExternalLink,
  Copy
} from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { useNotifications } from '../../hooks/useNotifications';
import { supabase } from '../../lib/supabase';

export function EdgeFunctionSetup() {
  const [setupStatus, setSetupStatus] = useState<{
    edgeFunctionDeployed: boolean;
    cronJobConfigured: boolean;
    extensionsEnabled: boolean;
    checking: boolean;
  }>({
    edgeFunctionDeployed: false,
    cronJobConfigured: false,
    extensionsEnabled: false,
    checking: true
  });

  const [isTestingFunction, setIsTestingFunction] = useState(false);
  const { showSuccess, showError, showInfo } = useNotifications();

  const checkSetupStatus = async () => {
    setSetupStatus(prev => ({ ...prev, checking: true }));

    try {
      // Check if cron job exists with better error handling
      let extensionsEnabled = false;
      let cronJobConfigured = false;

      try {
        const { data: cronData, error: cronError } = await supabase
          .from('cron_job_status')
          .select('*');

        if (!cronError && cronData) {
          extensionsEnabled = true;
          cronJobConfigured = cronData.length > 0;
        } else if (cronError) {
          // Handle case where cron_job_status view doesn't exist
          if (cronError.code === 'PGRST116' || cronError.message.includes('does not exist')) {
            console.warn('cron_job_status view not found - migrations may not have run');
            showError('Setup Required', 'Database migrations have not been run. Please run "npm run setup-db" first.');
          } else {
            console.warn('Error accessing cron_job_status:', cronError.message);
          }

          // Try alternative detection method for extensions
          try {
            const { error: extensionError } = await supabase.rpc('pg_cron_job_count');
            extensionsEnabled = !extensionError;
          } catch {
            extensionsEnabled = false;
          }
        }
      } catch (error) {
        console.error('Failed to check cron job status:', error);
        extensionsEnabled = false;
        cronJobConfigured = false;
      }

      // Test edge function with proper status code checking
      let edgeFunctionDeployed = false;
      try {
        const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/post-tweets`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({})
        });

        // Only consider 2xx, 4xx, and 5xx as successful deployment (function exists)
        // 404 would indicate the function doesn't exist, but other errors mean it exists but failed
        if (response.status >= 200 && response.status < 600) {
          edgeFunctionDeployed = true;
        } else {
          edgeFunctionDeployed = false;
        }
      } catch (error) {
        // Network errors or fetch failures indicate function might not exist
        console.warn('Failed to test edge function:', error);
        edgeFunctionDeployed = false;
      }

      setSetupStatus({
        edgeFunctionDeployed,
        cronJobConfigured,
        extensionsEnabled,
        checking: false
      });

    } catch (error) {
      console.error('Error checking setup status:', error);
      setSetupStatus(prev => ({ ...prev, checking: false }));
    }
  };

  useEffect(() => {
    checkSetupStatus();
  }, []);

  const testEdgeFunction = async () => {
    setIsTestingFunction(true);
    
    try {
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/post-tweets`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({})
      });

      const result = await response.json();
      
      if (response.ok) {
        showSuccess('Edge Function Test', result.message || 'Function is working correctly');
      } else {
        showError('Edge Function Test', result.error || 'Function returned an error');
      }
    } catch (error) {
      showError('Edge Function Test', 'Failed to connect to Edge Function');
    } finally {
      setIsTestingFunction(false);
    }
  };

  const copySetupCommand = async () => {
    try {
      await navigator.clipboard.writeText('npm run setup');
      showInfo('Copied to clipboard', 'Setup command copied to clipboard');
    } catch (error) {
      showError('Clipboard Error', 'Failed to copy setup command. Please check your browser permissions.');
    }
  };

  const getStatusIcon = (status: boolean, checking: boolean) => {
    if (checking) return <RefreshCw className="w-4 h-4 animate-spin text-gray-400" />;
    return status ? 
      <CheckCircle className="w-4 h-4 text-green-400" /> : 
      <AlertCircle className="w-4 h-4 text-red-400" />;
  };

  const getStatusText = (status: boolean, checking: boolean) => {
    if (checking) return 'Checking...';
    return status ? 'Configured' : 'Not configured';
  };

  const getStatusColor = (status: boolean, checking: boolean) => {
    if (checking) return 'text-gray-400';
    return status ? 'text-green-400' : 'text-red-400';
  };

  const allConfigured = setupStatus.edgeFunctionDeployed && 
                       setupStatus.cronJobConfigured && 
                       setupStatus.extensionsEnabled;

  return (
    <Card>
      <div className="space-y-6">
        <div className="flex items-center space-x-3">
          <Zap className="w-5 h-5 text-purple-400" />
          <h3 className="text-lg font-semibold text-white">Edge Function Setup</h3>
        </div>

        {/* Status Overview */}
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
            <div className="flex items-center space-x-3">
              {getStatusIcon(setupStatus.extensionsEnabled, setupStatus.checking)}
              <span className="text-white">Database Extensions</span>
            </div>
            <span className={`text-sm ${getStatusColor(setupStatus.extensionsEnabled, setupStatus.checking)}`}>
              {getStatusText(setupStatus.extensionsEnabled, setupStatus.checking)}
            </span>
          </div>

          <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
            <div className="flex items-center space-x-3">
              {getStatusIcon(setupStatus.edgeFunctionDeployed, setupStatus.checking)}
              <span className="text-white">Edge Function</span>
            </div>
            <span className={`text-sm ${getStatusColor(setupStatus.edgeFunctionDeployed, setupStatus.checking)}`}>
              {getStatusText(setupStatus.edgeFunctionDeployed, setupStatus.checking)}
            </span>
          </div>

          <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
            <div className="flex items-center space-x-3">
              {getStatusIcon(setupStatus.cronJobConfigured, setupStatus.checking)}
              <span className="text-white">Cron Job</span>
            </div>
            <span className={`text-sm ${getStatusColor(setupStatus.cronJobConfigured, setupStatus.checking)}`}>
              {getStatusText(setupStatus.cronJobConfigured, setupStatus.checking)}
            </span>
          </div>
        </div>

        {/* Overall Status */}
        {!setupStatus.checking && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-4 rounded-lg border ${
              allConfigured 
                ? 'bg-green-500/20 border-green-500/30' 
                : 'bg-yellow-500/20 border-yellow-500/30'
            }`}
          >
            <div className="flex items-center space-x-2 mb-2">
              {allConfigured ? (
                <CheckCircle className="w-5 h-5 text-green-400" />
              ) : (
                <AlertCircle className="w-5 h-5 text-yellow-400" />
              )}
              <span className={`font-medium ${
                allConfigured ? 'text-green-300' : 'text-yellow-300'
              }`}>
                {allConfigured ? 'Setup Complete!' : 'Setup Required'}
              </span>
            </div>
            <p className={`text-sm ${
              allConfigured ? 'text-green-200' : 'text-yellow-200'
            }`}>
              {allConfigured 
                ? 'Your scheduled tweet system is fully configured and ready to use.'
                : 'Some components need to be configured for scheduled tweets to work properly.'
              }
            </p>
          </motion.div>
        )}

        {/* Setup Instructions */}
        {!allConfigured && !setupStatus.checking && (
          <div className="space-y-4">
            <h4 className="text-white font-medium">Quick Setup</h4>
            
            <div className="bg-gray-900/50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-300 font-mono text-sm">npm run setup</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={copySetupCommand}
                >
                  <Copy className="w-3 h-3" />
                </Button>
              </div>
              <p className="text-gray-400 text-xs">
                Run this command in your terminal to automatically configure everything
              </p>
            </div>

            <div className="space-y-2">
              <h5 className="text-gray-300 font-medium text-sm">Manual Setup Steps:</h5>
              <ol className="text-gray-400 text-sm space-y-1 list-decimal list-inside">
                <li>Enable pg_cron and pg_net extensions in Supabase dashboard</li>
                <li>Deploy the Edge Function: <code className="bg-gray-800 px-1 rounded">supabase functions deploy post-tweets</code></li>
                <li>Apply database migrations: <code className="bg-gray-800 px-1 rounded">supabase db push</code></li>
              </ol>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            onClick={checkSetupStatus}
            disabled={setupStatus.checking}
            isLoading={setupStatus.checking}
            variant="secondary"
            leftIcon={<RefreshCw className="w-4 h-4" />}
          >
            Refresh Status
          </Button>

          {setupStatus.edgeFunctionDeployed && (
            <Button
              onClick={testEdgeFunction}
              disabled={isTestingFunction}
              isLoading={isTestingFunction}
              variant="ghost"
              leftIcon={<Play className="w-4 h-4" />}
            >
              Test Function
            </Button>
          )}

          <Button
            onClick={() => window.open('docs/DEPLOYMENT_SETUP.md', '_blank')}
            variant="ghost"
            leftIcon={<ExternalLink className="w-4 h-4" />}
          >
            Setup Guide
          </Button>
        </div>

        {/* Additional Info */}
        <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-4">
          <h4 className="text-blue-300 font-medium mb-2">About Edge Functions</h4>
          <ul className="text-blue-200 text-sm space-y-1">
            <li>• Serverless functions that run on Supabase's global edge network</li>
            <li>• Automatically process scheduled tweets every 5 minutes</li>
            <li>• Secure integration with Twitter API using stored credentials</li>
            <li>• Built-in error handling and retry logic</li>
          </ul>
        </div>
      </div>
    </Card>
  );
}