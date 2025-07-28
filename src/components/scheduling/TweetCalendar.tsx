import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight, 
  Image, 
  CheckCircle,
  XCircle,
  Clock,
  Edit,
  Trash2
} from 'lucide-react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths } from 'date-fns';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import type { Tweet } from '../../hooks/useTweets';

interface TweetCalendarProps {
  tweets: Tweet[];
  onEditTweet: (tweet: Tweet) => void;
  onDeleteTweet: (tweetId: string) => void;
  onRetryTweet: (tweetId: string) => void;
}

interface CalendarEvent {
  tweet: Tweet;
  time: string;
}

export function TweetCalendar({
  tweets,
  onEditTweet,
  onDeleteTweet,
  onRetryTweet
}: TweetCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const calendarDays = eachDayOfInterval({ start: monthStart, end: monthEnd });

  // Group tweets by date
  const tweetsByDate = useMemo(() => {
    const grouped: Record<string, CalendarEvent[]> = {};
    
    tweets
      .filter(tweet => tweet.scheduled_for)
      .forEach(tweet => {
        const date = new Date(tweet.scheduled_for!);
        const dateKey = format(date, 'yyyy-MM-dd');
        
        if (!grouped[dateKey]) {
          grouped[dateKey] = [];
        }
        
        grouped[dateKey].push({
          tweet,
          time: format(date, 'HH:mm')
        });
      });

    // Sort events by time for each date
    Object.keys(grouped).forEach(dateKey => {
      grouped[dateKey].sort((a, b) => a.time.localeCompare(b.time));
    });

    return grouped;
  }, [tweets]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'bg-blue-500';
      case 'posted':
        return 'bg-green-500';
      case 'failed':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'scheduled':
        return <Clock className="w-3 h-3" />;
      case 'posted':
        return <CheckCircle className="w-3 h-3" />;
      case 'failed':
        return <XCircle className="w-3 h-3" />;
      default:
        return <Clock className="w-3 h-3" />;
    }
  };

  const selectedDateEvents = selectedDate 
    ? tweetsByDate[format(selectedDate, 'yyyy-MM-dd')] || []
    : [];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      {/* Calendar */}
      <div className="md:col-span-2">
        <Card>
          {/* Calendar Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 space-y-2 sm:space-y-0">
            <h2 className="text-lg sm:text-xl font-semibold text-white flex items-center">
              <CalendarIcon className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-purple-400" />
              {format(currentDate, 'MMMM yyyy')}
            </h2>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCurrentDate(subMonths(currentDate, 1))}
              >
                <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCurrentDate(new Date())}
                className="text-xs sm:text-sm"
              >
                Today
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCurrentDate(addMonths(currentDate, 1))}
              >
                <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
              </Button>
            </div>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1">
            {/* Day headers */}
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="p-1 sm:p-2 text-center text-xs sm:text-sm font-medium text-gray-400">
                {day}
              </div>
            ))}

            {/* Calendar days */}
            {calendarDays.map(day => {
              const dateKey = format(day, 'yyyy-MM-dd');
              const dayEvents = tweetsByDate[dateKey] || [];
              const isSelected = selectedDate && isSameDay(day, selectedDate);
              const isToday = isSameDay(day, new Date());

              return (
                <motion.div
                  key={day.toISOString()}
                  whileHover={{ scale: 1.02 }}
                  className={`
                    min-h-[60px] sm:min-h-[80px] p-1 sm:p-2 border border-gray-700 rounded-lg cursor-pointer transition-all
                    ${isSelected ? 'bg-purple-500/20 border-purple-500' : 'hover:bg-gray-800/50'}
                    ${!isSameMonth(day, currentDate) ? 'opacity-50' : ''}
                    ${isToday ? 'ring-1 ring-purple-400' : ''}
                  `}
                  onClick={() => setSelectedDate(day)}
                >
                  <div className={`text-xs sm:text-sm font-medium mb-1 ${
                    isToday ? 'text-purple-400' : 'text-white'
                  }`}>
                    {format(day, 'd')}
                  </div>
                  
                  <div className="space-y-1">
                    {dayEvents.slice(0, 2).map((event) => (
                      <div
                        key={event.tweet.id}
                        className={`
                          text-xs p-1 rounded flex items-center space-x-1 text-white
                          ${getStatusColor(event.tweet.status)}
                        `}
                      >
                        {getStatusIcon(event.tweet.status)}
                        <span className="truncate flex-1">
                          {event.time}
                        </span>
                        {event.tweet.media_urls && event.tweet.media_urls.length > 0 && (
                          <Image className="w-2 h-2" />
                        )}
                      </div>
                    ))}
                    {dayEvents.length > 2 && (
                      <div className="text-xs text-gray-400 text-center">
                        +{dayEvents.length - 2}
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </Card>
      </div>

      {/* Event Details Sidebar */}
      <div>
        <Card>
          <h3 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">
            {selectedDate ? format(selectedDate, 'MMMM d, yyyy') : 'Select a date'}
          </h3>

          {selectedDateEvents.length === 0 ? (
            <div className="text-center py-6 sm:py-8">
              <CalendarIcon className="w-10 h-10 sm:w-12 sm:h-12 text-gray-400 mx-auto mb-3 sm:mb-4" />
              <p className="text-sm sm:text-base text-gray-400">
                {selectedDate ? 'No tweets scheduled for this date' : 'Click on a date to view scheduled tweets'}
              </p>
            </div>
          ) : (
            <div className="space-y-3 sm:space-y-4">
              {selectedDateEvents.map((event) => (
                <motion.div
                  key={event.tweet.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-gray-800/50 rounded-lg p-3 sm:p-4 border border-gray-700"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <div className={`w-3 h-3 rounded-full ${getStatusColor(event.tweet.status)}`} />
                      <span className="text-xs sm:text-sm font-medium text-white">
                        {event.time}
                      </span>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        event.tweet.status === 'scheduled' ? 'bg-blue-500/20 text-blue-300' :
                        event.tweet.status === 'posted' ? 'bg-green-500/20 text-green-300' :
                        event.tweet.status === 'failed' ? 'bg-red-500/20 text-red-300' :
                        'bg-gray-500/20 text-gray-300'
                      }`}>
                        {event.tweet.status}
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-1">
                      {(event.tweet.status === 'scheduled' || event.tweet.status === 'draft') && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onEditTweet(event.tweet)}
                        >
                          <Edit className="w-3 h-3" />
                        </Button>
                      )}
                      {event.tweet.status === 'failed' && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onRetryTweet(event.tweet.id)}
                          className="text-blue-400 text-xs"
                        >
                          Retry
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onDeleteTweet(event.tweet.id)}
                        className="text-red-400"
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>

                  <p className="text-gray-300 text-xs sm:text-sm mb-2 line-clamp-3">
                    {event.tweet.content}
                  </p>

                  {event.tweet.media_urls && event.tweet.media_urls.length > 0 && (
                    <div className="flex items-center space-x-2 text-xs text-gray-400">
                      <Image className="w-3 h-3" />
                      <span>{event.tweet.media_urls.length} media file{event.tweet.media_urls.length !== 1 ? 's' : ''}</span>
                    </div>
                  )}

                  {event.tweet.failure_reason && (
                    <div className="mt-2 p-2 bg-red-500/20 border border-red-500/30 rounded text-xs text-red-300">
                      <strong>Error:</strong> {event.tweet.failure_reason}
                    </div>
                  )}

                  {event.tweet.retry_count > 0 && (
                    <div className="mt-2 text-xs text-gray-400">
                      Retry attempts: {event.tweet.retry_count}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
