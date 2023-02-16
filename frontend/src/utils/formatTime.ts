export function formatTime(time: string) {
  const [hour, minute, _] = time.split(":");

  return `${hour}:${minute}`;
}
