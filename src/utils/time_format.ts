const formatTime = (time: string | number | undefined) =>
  time ? String(time).split(':').slice(0, 2).join(':') : '';

const generateTimeOptions = () => {
  const times = [];
  for (let i = 0; i < 24; i++) {
    const hour = i.toString().padStart(2, '0'); // 00 → 23
    const timeLabel = `${hour}:00`; // "01:00"
    times.push({ label: timeLabel, value: timeLabel });
  }
  return times;
};

const time_duration = (fromTime: string, toTime: string) => {
  const [fromHour, fromMinute] = fromTime.split(':').map(Number);
  const [toHour, toMinute] = toTime.split(':').map(Number);
  const start = fromHour + fromMinute / 60;
  const end = toHour + toMinute / 60;
  const durationInHours = end - start; // 2
  return durationInHours;
};

export { generateTimeOptions, formatTime, time_duration };
