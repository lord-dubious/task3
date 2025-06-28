import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Cloud, Key, Eye, EyeOff, CheckCircle, AlertCircle, Database } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { useLocalStorage } from '../../hooks/useLocalStorage';

export function CloudflareR2Settings() {
  const [r2Config, setR2Config] = useLocalStorage('cloudflare_r2_config', {
    accountId: '',
    accessKeyId: '',
    secretAccessKey: '',
    bucketName: 'tasker',
    endpoint: ''
  });
  
  const [showSecrets, setShowSecrets] = useState({
    accessKey: false,
    secretKey: false
  });
  
  const [isValidating, setIsValidating] = useState(false);
  const [validationStatus, setValidationStatus] = useState<'idle' | 'valid' | 'invalid'>('idle');

  const handleConfigChange = (field: string, value: string) => {
    setR2Config(prev => ({ ...prev, [field]: value }));
    setValidationStatus('idle');
  };

  const validateR2Connection = async () => {
    if (!r2Config.accessKeyId || !r2Config.secretAccessKey || !r2Config.bucketName || !r2Config.endpoint) {
      setValidationStatus('invalid');
      return;
    }

    setIsValidating(true);
    try {
      // Test connection by attempting to list bucket contents
      const { S3Client, ListObjectsV2Command } = await import('@aws-sdk/client-s3');
      
      const s3Client = new S3Client({
        region: 'auto',
        endpoint: r2Config.endpoint,
        credentials: {
          accessKeyId: r2Config.accessKeyId,
          secretAccessKey: r2Config.secretAccessKey,
        },
        forcePathStyle: true,
      });

      const command = new ListObjectsV2Command({
        Bucket: r2Config.bucketName,
        MaxKeys: 1
      });

      await s3Client.send(command);
      setValidationStatus('valid');
    } catch (error) {
      console.error('R2 validation error:', error);
      setValidationStatus('invalid');
    } finally {
      setIsValidating(false);
    }
  };

  const getStatusIcon = () => {
    switch (validationStatus) {
      case 'valid':
        return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'invalid':
        return <AlertCircle className="w-4 h-4 text-red-400" />;
      default:
        return null;
    }
  };

  const getStatusText = () => {
    switch (validationStatus) {
      case 'valid':
        return 'Connection verified';
      case 'invalid':
        return 'Connection failed';
      default:
        return '';
    }
  };

  return (
    <Card>
      <div className="space-y-6">
        <div className="flex items-center space-x-3">
          <Cloud className="w-5 h-5 text-orange-400" />
          <h3 className="text-lg font-semibold text-white">Cloudflare R2 Storage</h3>
        </div>
        
        <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-4">
          <h4 className="text-blue-300 font-medium mb-2">Why Cloudflare R2?</h4>
          <ul className="text-blue-200 text-sm space-y-1">
            <li>• Zero egress fees - no charges for downloads</li>
            <li>• S3-compatible API for easy integration</li>
            <li>• Global edge network for fast delivery</li>
            <li>• Cost-effective storage pricing</li>
          </ul>
        </div>
        
        <div className="space-y-4">
          <Input
            label="Account ID"
            value={r2Config.accountId}
            onChange={(e) => handleConfigChange('accountId', e.target.value)}
            placeholder="Your Cloudflare account ID"
            leftIcon={<Key className="w-4 h-4" />}
          />

          <Input
            label="Access Key ID"
            value={r2Config.accessKeyId}
            onChange={(e) => handleConfigChange('accessKeyId', e.target.value)}
            placeholder="R2 access key ID"
            leftIcon={<Key className="w-4 h-4" />}
          />

          <Input
            label="Secret Access Key"
            type={showSecrets.secretKey ? 'text' : 'password'}
            value={r2Config.secretAccessKey}
            onChange={(e) => handleConfigChange('secretAccessKey', e.target.value)}
            placeholder="R2 secret access key"
            leftIcon={<Key className="w-4 h-4" />}
            rightIcon={
              <button
                type="button"
                onClick={() => setShowSecrets(prev => ({ ...prev, secretKey: !prev.secretKey }))}
                className="hover:text-white transition-colors"
              >
                {showSecrets.secretKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            }
          />

          <Input
            label="Bucket Name"
            value={r2Config.bucketName}
            onChange={(e) => handleConfigChange('bucketName', e.target.value)}
            placeholder="Your R2 bucket name"
            leftIcon={<Database className="w-4 h-4" />}
          />

          <Input
            label="Endpoint URL"
            value={r2Config.endpoint}
            onChange={(e) => handleConfigChange('endpoint', e.target.value)}
            placeholder="https://your-account-id.r2.cloudflarestorage.com"
            leftIcon={<Cloud className="w-4 h-4" />}
          />

          <div className="flex items-center justify-between">
            <Button
              onClick={validateR2Connection}
              disabled={isValidating || !r2Config.accessKeyId || !r2Config.secretAccessKey}
              isLoading={isValidating}
              variant="secondary"
            >
              Test Connection
            </Button>
            
            {validationStatus !== 'idle' && (
              <div className="flex items-center space-x-2">
                {getStatusIcon()}
                <span className={`text-sm ${
                  validationStatus === 'valid' ? 'text-green-400' : 'text-red-400'
                }`}>
                  {getStatusText()}
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="bg-gray-900/50 rounded-lg p-4">
          <h4 className="text-white font-medium mb-2">Setup Instructions:</h4>
          <ol className="text-gray-400 text-sm space-y-1 list-decimal list-inside">
            <li>Create a Cloudflare account and enable R2</li>
            <li>Create a new R2 bucket for your media files</li>
            <li>Generate R2 API tokens with read/write permissions</li>
            <li>Copy your account ID from the Cloudflare dashboard</li>
            <li>Enter the credentials above and test the connection</li>
          </ol>
          <p className="text-gray-500 text-xs mt-2">
            Your credentials are stored locally and used only for direct API calls to R2.
          </p>
        </div>

        {validationStatus === 'valid' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-green-500/20 border border-green-500/30 rounded-lg p-4"
          >
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <div>
                <p className="text-green-300 font-medium">R2 Storage Connected!</p>
                <p className="text-green-200 text-sm">
                  Your media files will now be stored in Cloudflare R2 with zero egress fees.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </Card>
  );
}