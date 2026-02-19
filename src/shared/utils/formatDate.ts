export const formatDate = (createdAt: string | number | Date) => {
  const date = new Date(createdAt);
  const isValidDate = !isNaN(date.getTime());

  if (!isValidDate) return { formattedDate: '', isoDate: '' };

  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  const formattedDate = `${yyyy}.${mm}.${dd}`;

  const isoDate = date.toISOString();

  return { formattedDate, isoDate };
};
