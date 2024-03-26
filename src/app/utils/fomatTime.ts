//The variable names are more descriptive, making the code easier to understand.
export function formatTime(milliseconds: number): string {
  const seconds = Math.floor(milliseconds / 1000); //directly calculate seconds, minutes, hours, days, and months without unnecessary intermediate variables.
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);

  const remainingSeconds = seconds % 60;
  const remainingMinutes = minutes % 60;
  const remainingHours = hours % 24;

  return `${months} months, ${days} days, ${remainingHours} hours, ${remainingMinutes} minutes, ${remainingSeconds} seconds`;
}
