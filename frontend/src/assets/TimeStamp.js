

const  timeSince=(dateString)=> {
    const date = new Date(dateString);
    const seconds = Math.floor((new Date() - date) / 1000);
    const intervals = [
      { key: "year", value: 31536000 },
      { key: "month", value: 2592000 },
      { key: "week", value: 604800 },
      { key: "day", value: 86400 },
      { key: "hour", value: 3600 },
      { key: "minute", value: 60 },
      { key: "second", value: 1 },
    ];
  
    if (seconds === 0) {
      return "just now";
    }
  
    let interval;
    for (const i in intervals) {
      interval = intervals[i];
      if (seconds >= interval.value) {
        const count = Math.floor(seconds / interval.value);
        return `${count} ${interval.key}${count > 1 ? "s" : ""} ago` ;
      }
    }
  }
  

export default timeSince;

