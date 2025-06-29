import React from 'react';
import { motion } from 'framer-motion';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon: LucideIcon;
  gradient?: string;
}

export function StatsCard({ 
  title, 
  value, 
  change, 
  changeType = 'neutral', 
  icon: Icon,
  gradient = 'from-md3-primary to-md3-primary-container'
}: StatsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-md3-surface-container rounded-2xl p-6 hover:shadow-elevation-2 transition-all duration-300 border border-md3-outline-variant/50 state-layer"
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="md3-body-medium text-md3-on-surface-variant font-medium">{title}</p>
          <p className="md3-headline-small text-md3-on-surface font-bold mt-2">{value}</p>
          {change && (
            <p className={`md3-body-small mt-3 flex items-center ${
              changeType === 'positive' ? 'text-green-400' : 
              changeType === 'negative' ? 'text-md3-error' : 'text-md3-on-surface-variant'
            }`}>
              {change}
            </p>
          )}
        </div>
        <div className={`w-14 h-14 bg-gradient-to-br ${gradient} rounded-2xl flex items-center justify-center shadow-elevation-1`}>
          <Icon className="w-7 h-7 text-md3-on-primary" />
        </div>
      </div>
    </motion.div>
  );
}