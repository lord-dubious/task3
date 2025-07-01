import React, { useState } from 'react';
import { Save } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { useNotifications } from '../../hooks/useNotifications';
import { TwitterIntegration } from './TwitterIntegration';
import { GoogleAISettings } from './GoogleAISettings';
import { CloudflareR2Settings } from './CloudflareR2Settings';
import { EdgeFunctionSetup } from './EdgeFunctionSetup';

export function SettingsView() {
  const [twitterCredentials, setTwitterCredentials] = useLocalStorage('twitter_credentials', {
    apiKey: '',
    apiSecret: '',
    accessToken: '',
    accessTokenSecret: ''
  });
  
  const [showKeys, setShowKeys] = useState({
    twitterApi: false,
    twitterSecret: false,
    accessToken: false,
    accessSecret: false
  });
  const { showSuccess } = useNotifications();

  const handleSave = () => {
    // Settings are automatically saved via useLocalStorage
    showSuccess('Settings saved', 'Your settings have been saved successfully');
  };

  return (
    <div className="max-w-2xl mx-auto space-y-4 sm:space-y-6">
      <GoogleAISettings />
      <TwitterIntegration />
      <EdgeFunctionSetup />
      <CloudflareR2Settings />

      <div className="flex justify-end pt-4">
        <Button onClick={handleSave} leftIcon={<Save className="w-4 h-4" />}>
          Save Settings
        </Button>
      </div>
    </div>
  );
}