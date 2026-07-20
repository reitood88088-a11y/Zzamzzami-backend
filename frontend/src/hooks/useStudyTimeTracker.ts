import { useEffect, useRef } from 'react';
import { reportStudyTime } from '../api/client';

export function useStudyTimeTracker(subject: 'English' | 'Chinese' | 'Japanese' | 'ALL' | null) {
  const accumulatedTimeRef = useRef(0);

  useEffect(() => {
    if (!subject) return;

    const flushTime = async () => {
      const timeToReport = accumulatedTimeRef.current;
      if (timeToReport > 0) {
        accumulatedTimeRef.current = 0;
        try {
          await reportStudyTime(subject, timeToReport);
        } catch (error) {
          console.error('Failed to report study time', error);
          // Re-accumulate if failed
          accumulatedTimeRef.current += timeToReport;
        }
      }
    };

    const interval = setInterval(() => {
      accumulatedTimeRef.current += 1;
      
      // Flush every 10 seconds to ensure data is not lost
      if (accumulatedTimeRef.current >= 10) {
        flushTime();
      }
    }, 1000);

    return () => {
      clearInterval(interval);
      flushTime();
    };
  }, [subject]);
}
