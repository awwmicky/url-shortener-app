import { useState } from 'react'
// import './Time.css'


const epochs = [
  ['year'   , 31536000],
  ['month'  , 2592000 ],
  ['day'    , 86400   ],
  ['hour'   , 3600    ],
  ['minute' , 60      ],
  ['second' , 1       ]
];

const getDuration = (timeAgoInSeconds) => {
  for (let [ epoch , seconds ] of epochs) {
    const interval = Math.floor(timeAgoInSeconds / seconds);
    if (interval >= 1) return { interval , epoch };
  }
};

const timeAgo = (date) => {
  const timeAgoInSeconds = Math.floor((new Date() - Date.parse(date)) / 1000);
  if (timeAgoInSeconds === 0) return 'just now';
  const { interval , epoch } = getDuration(timeAgoInSeconds);
  const suffix = interval === 1 ? '' : 's';
  return `${interval} ${epoch + suffix} ago`;
};

const options = { 
  weekday : 'short',
  year    : 'numeric',
  month   : 'short', 
  day     : 'numeric'
};

const timestamp = (date) => new Date(date).toLocaleDateString(undefined, options);
const timeszone = (date) => new Date(date).toUTCString();

////

export default function Time (props) {

  const { date } = props;
  const [{ tAgo,tStamp,tZone }] = useState({
    tAgo   : timeAgo(date),
    tStamp : timestamp(date),
    tZone  : timeszone(date)
  });

  return (
    <>
      <time 
        className="time"
        title={ tStamp }
        dateTime={ tZone }
      >{ tAgo }</time>
    </>
  );
}