export function formatDateToApi(date: Date): string {
  const day = date.getDate().toString();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();


  return `${year}-${('0' + month).slice(-2)}-${('0' + day).slice(-2)}`;
}

export function formatDateToUI(date: string): string {
  const [year, month, day] = date.split('-');

  return `${day}/${month}/${year}`;
}
