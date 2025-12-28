'use client';

import { useState, useEffect } from 'react';
import { formatDistanceToNow } from 'date-fns';

interface ClientTimeProps {
  date: string | number | Date;
}

export function ClientTime({ date }: ClientTimeProps) {
  const [formattedDate, setFormattedDate] = useState('');

  useEffect(() => {
    setFormattedDate(formatDistanceToNow(new Date(date), { addSuffix: true }));
  }, [date]);

  if (!formattedDate) {
    return null; // Or a loading skeleton
  }

  return <>{formattedDate}</>;
}
