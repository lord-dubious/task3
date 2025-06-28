import React, { useState } from 'react';
import { Save } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { TwitterIntegration } from './TwitterIntegration';
import { GoogleAISettings } from './GoogleAISettings';
import { CloudflareR2Settings } from './CloudflareR2Settings';

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

  const handleSave = () => {
    // Settings are automatically saved via useLocalStorage
    alert('Settings saved successfully!');
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <GoogleAISettings />
      <TwitterIntegration />
      <CloudflareR2Settings />

      <div className="flex justify-end">
        <Button onClick={handleSave} leftIcon={<Save className="w-4 h-4" />}>
          Save Settings
        </Button>
      </div>
    </div>
  );
}