import {formatDistanceToNow} from 'date-fns';

// Function to format timestamp into "time ago" using date-fns
const formatTimeAgo = timestamp => {
  const postTime = new Date(timestamp.seconds * 1000); // Convert Firestore timestamp to Date object
  return formatDistanceToNow(postTime, {addSuffix: true}); // Returns "x minutes ago", "y days ago", etc.
};

export {formatTimeAgo};
