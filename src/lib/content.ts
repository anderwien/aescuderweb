type OrderedEntry = {
  data: {
    order?: number;
    date?: Date;
    draft?: boolean;
  };
};

export function byOrder<T extends OrderedEntry>(a: T, b: T) {
  return (a.data.order ?? 999) - (b.data.order ?? 999);
}

export function byDateDesc<T extends OrderedEntry>(a: T, b: T) {
  const aTime = a.data.date?.getTime() ?? 0;
  const bTime = b.data.date?.getTime() ?? 0;
  return bTime - aTime;
}

export function isPublished<T extends OrderedEntry>(entry: T) {
  return entry.data.draft !== true;
}

export function formatDate(date: Date) {
  return new Intl.DateTimeFormat('en', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
}
