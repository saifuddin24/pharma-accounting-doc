export function slugify(value = '') {
  return value
    .toLowerCase()
    .trim()
    .replace(/[`~!@#$%^&*()=+[\]{}\\|:;"'<>,.?/]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}
