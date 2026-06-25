export function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
  });
}
