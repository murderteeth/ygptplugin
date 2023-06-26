'use client'
import TimeAgo from 'react-timeago'

export default function TimeAgoUseClient({ date }: { date: Date }) { 
  return <TimeAgo date={date} />
}
