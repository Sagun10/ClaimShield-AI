import React, { useState } from 'react';
import { ThumbsUp, ThumbsDown, Check, MessageSquare } from 'lucide-react';

export const FeedbackWidget: React.FC = () => {
  const [feedbackState, setFeedbackState] = useState<'prompt' | 'submitted'>('prompt');
  const [rating, setRating] = useState<'up' | 'down' | null>(null);

  const handleVote = (vote: 'up' | 'down') => {
    setRating(vote);
    setFeedbackState('submitted');
  };

  return (
    <div className="bg-white border border-slate-200/90 rounded-xl p-3 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
      <div className="flex items-center space-x-2 text-slate-600">
        <MessageSquare className="w-3.5 h-3.5 text-sky-600 shrink-0" />
        <span className="font-medium">
          Was this claim check easy to understand and navigate?
        </span>
      </div>

      {feedbackState === 'prompt' ? (
        <div className="flex items-center space-x-2">
          <button
            type="button"
            onClick={() => handleVote('up')}
            className="px-2.5 py-1 bg-slate-50 hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 border border-slate-200 hover:border-emerald-300 rounded-lg flex items-center space-x-1.5 transition-colors cursor-pointer"
          >
            <ThumbsUp className="w-3.5 h-3.5" />
            <span className="font-semibold">Yes, very clear</span>
          </button>
          <button
            type="button"
            onClick={() => handleVote('down')}
            className="px-2.5 py-1 bg-slate-50 hover:bg-rose-50 text-slate-700 hover:text-rose-700 border border-slate-200 hover:border-rose-300 rounded-lg flex items-center space-x-1.5 transition-colors cursor-pointer"
          >
            <ThumbsDown className="w-3.5 h-3.5" />
            <span className="font-semibold">Needs improvement</span>
          </button>
        </div>
      ) : (
        <div className="flex items-center space-x-1.5 text-emerald-700 font-semibold bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
          <Check className="w-3.5 h-3.5" />
          <span>Thank you! Your feedback helps us keep ClaimShield simple.</span>
        </div>
      )}
    </div>
  );
};
