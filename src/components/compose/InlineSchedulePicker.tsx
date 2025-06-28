import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, X, Check, AlertCircle } from 'lucide-react';
import { Button } from '../ui/Button';
import { format, addDays, startOfDay, addMinutes } from 'date-fns';

interface InlineSchedulePickerProps {
  scheduledDateTime: string | null;
  onScheduleChange: (dateTime: string | null) => void;
  onClose: () => void;
}

export function InlineSchedulePicker({
  scheduledDateTime,
  onScheduleChange,
  onClose
}: InlineSchedulePickerProps) {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (scheduledDateTime) {
      const date = new Date(scheduledDateTime);
      setSelectedDate(format(date, 'yyyy-MM-dd'));
      setSelectedTime(format(date, 'HH:mm'));
    } else {
      // Set default to 1 hour from now
      const defaultTime = addMinutes(new Date(), 60);
      setSelectedDate(format(defaultTime, 'yyyy-MM-dd'));
      setSelectedTime(format(defaultTime, 'HH:mm'));
    }
  }, [scheduledDateTime]);

  const handleApply = () => {
    setError(null);

    if (!selectedDate || !selectedTime) {
      setError('Please select both date and time');
      return;
    }

    const scheduledDateTime = new Date(`${selectedDate}T${selectedTime}`);
    const now = new Date();

    if (scheduledDateTime <= now) {
      setError('Scheduled time must be in the future');
      return;
    }

    onScheduleChange(scheduledDateTime.toISOString());
    onClose();
  };

  const handleClear = () => {
    onScheduleChange(null);
    onClose();
  };

  const getQuickTimeOptions = () => {
    const now = new Date();
    return [
      { label: '1 hour', time: addMinutes(now, 60) },
      { label: '2 hours', time: addMinutes(now, 120) },
      { label: 'Tomorrow 9 AM', time: new Date(addDays(startOfDay(now), 1).setHours(9, 0, 0, 0)) },
      { label: 'Tomorrow 6 PM', time: new Date(addDays(startOfDay(now), 1).setHours(18, 0, 0, 0)) },
    ];
  };

  const quickOptions = getQuickTimeOptions();

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      className="border border-gray-600 rounded-lg p-4 bg-gray-800/50 backdrop-blur-sm"
    >
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-white font-medium flex items-center">
          <Calendar className="w-4 h-4 mr-2 text-purple-400" />
          Schedule Tweet
        </h4>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
        >
          <X className="w-4 h-4" />
        </Button>
      </div>

      <div className="space-y-4">
        {/* Quick Options */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Quick Schedule
          </label>
          <div className="grid grid-cols-2 gap-2">
            {quickOptions.map((option, index) => (
              <Button
                key={index}
                variant="ghost"
                size="sm"
                onClick={() => {
                  setSelectedDate(format(option.time, 'yyyy-MM-dd'));
                  setSelectedTime(format(option.time, 'HH:mm'));
                }}
                className="text-xs justify-start"
              >
                {option.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Date and Time Pickers */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Date
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                min={format(new Date(), 'yyyy-MM-dd')}
                className="w-full bg-gray-800 border border-gray-600 rounded-lg pl-10 pr-3 py-2 text-white focus:border-purple-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Time
            </label>
            <div className="relative">
              <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="time"
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                className="w-full bg-gray-800 border border-gray-600 rounded-lg pl-10 pr-3 py-2 text-white focus:border-purple-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Preview */}
        {selectedDate && selectedTime && (
          <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-3">
            <p className="text-purple-300 text-sm">
              <strong>Will post on:</strong>{' '}
              {format(new Date(`${selectedDate}T${selectedTime}`), 'EEEE, MMMM d, yyyy \'at\' h:mm a')}
            </p>
          </div>
        )}

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-500/20 border border-red-500/30 rounded-lg p-3 flex items-center space-x-2"
          >
            <AlertCircle className="w-4 h-4 text-red-400" />
            <p className="text-red-300 text-sm">{error}</p>
          </motion.div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-between pt-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClear}
            className="text-gray-400"
          >
            Clear Schedule
          </Button>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              size="sm"
              onClick={handleApply}
              disabled={!selectedDate || !selectedTime}
              leftIcon={<Check className="w-4 h-4" />}
            >
              Apply
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}