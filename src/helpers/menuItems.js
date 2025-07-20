// Menu items for Drawer navigation
const menuItems = [
  { route: '/business-partner', displayName: 'Business Partners', icon: 'bi bi-people-fill',isMenuItem: true },
  { route: '/business-partner/add', displayName: 'Add Business Partner', icon: 'bi bi-person-plus-fill' },
  { route: '/business-partner/edit/:id', displayName: 'Edit Business Partner', icon: 'bi bi-pencil-fill' },
  { route: '/service-inquiry', displayName: 'Service Inquiry', icon: 'bi bi-headset',isMenuItem: true },
  { route: '/inquiry-list', displayName: 'Inquiry List', icon: 'bi bi-list-ul',isMenuItem: true },
  { route: '/item-master', displayName: 'Item Master', icon: 'bi bi-box-seam-fill',isMenuItem: true },
  { route: '/item-category', displayName: 'Item Category', icon: 'bi bi-tags',isMenuItem: true },
  { route: '/grn', displayName: 'GRN', icon: 'bi bi-receipt',isMenuItem: true },
];

export default menuItems;
