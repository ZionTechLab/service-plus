// Build combined menu items from static list and auth init data
// Keeps Drawer clean and logic reusable/testing-friendly

export const slugify = (s) => String(s || '')
  .toLowerCase()
  .trim()
  .replace(/[^a-z0-9\s-]/g, '')
  .replace(/\s+/g, '-')
  .replace(/-+/g, '-');

export function buildCombinedMenuItems(staticMenuItems, initData) {
  const dynamicMenuItemsRaw = (initData?.meta ?? []).map((m) => ({
    route: `/refferance/${slugify(m.categoryName)}`,
    displayName: m.categoryName,
    icon: 'bi bi-bookmarks',
    isMenuItem: true,
  }));
  // Deduplicate by route in case meta changes or duplicates exist
  const seen = new Set();
  const dynamicMenuItems = dynamicMenuItemsRaw.filter((it) => {
    if (seen.has(it.route)) return false;
    seen.add(it.route);
    return true;
  });

  return [...staticMenuItems, ...dynamicMenuItems];
}

export default buildCombinedMenuItems;
