import navigation from '../data/navigation.json';

export function flattenNavigation(items = navigation, parents = []) {
  return items.flatMap((item) => {
    const current = [...parents, item.title];
    const ownPage = item.file
      ? [{ ...item, breadcrumb: current, parentIds: parents.map((_, index) => index) }]
      : [];
    return [...ownPage, ...flattenNavigation(item.children || [], current)];
  });
}

export function findPageById(id, items = navigation) {
  for (const item of items) {
    if (item.id === id) return item;
    const found = findPageById(id, item.children || []);
    if (found) return found;
  }
  return null;
}

export function findPageByPath(path, pages) {
  return pages.find((page) => page.id === path) || pages[0] || null;
}

export function pageHref(id) {
  return `#/docs/${id}`;
}

export function headingHref(pageId, headingId) {
  return `${pageHref(pageId)}#${encodeURIComponent(headingId)}`;
}

export { navigation };
