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

export { generateTimeOptions, formatTime };
