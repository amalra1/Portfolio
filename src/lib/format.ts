export function padIndex(value: number) {
  return String(value).padStart(2, '0');
}

export function slugToLabel(slug: string) {
  return slug.replace(/-/g, ' ');
}
