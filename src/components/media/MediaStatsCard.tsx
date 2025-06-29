import React from 'react';
import { motion } from 'framer-motion';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface MediaStatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  gradient?: string;
}

export function MediaStatsCard({ 
  title, 
  value, 
  icon: Icon,
  gradient = 'from-md3-primary to-md3-primary-container'
}: MediaStatsCardProps) {
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
        </div>
        <div className={`w-14 h-14 bg-gradient-to-br ${gradient} rounded-2xl flex items-center justify-center shadow-elevation-1`}>
          <Icon className="w-7 h-7 text-md3-on-primary" />
        </div>
      </div>
    </motion.div>
  );
}