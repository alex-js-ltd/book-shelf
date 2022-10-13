const formatDate = (date: number) =>
  new Intl.DateTimeFormat('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(date);

export { formatDate };
