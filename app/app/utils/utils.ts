export function formatDate(date: string | Date, dateOnly = false) {
  return Intl.DateTimeFormat(navigator.language || 'en-US', {
    dateStyle: 'medium',
    timeStyle: dateOnly ? undefined : 'medium',
  }).format(new Date(date));
}

/** For some reason, Sanity is sending back like 500 invisible characters on strings. This removes them. */
export function sanitize(data: Record<string, any>) {
  Object.keys(data).forEach((key) => {
    if (typeof data[key] === 'string') {
      data[key] = data[key].replace(/(\u200b|\u200c|\u200d|\ufeff)/g, '');
    } else if (typeof data[key] === 'object') {
      sanitize(data[key]);
    }
  });
}
