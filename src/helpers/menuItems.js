// Menu items for Drawer navigation
const menuItems = [
  { route: '/business-partner', displayName: 'Business Partners', icon: 'bi bi-people-fill',isMenuItem: true },
  { route: '/business-partner/add', displayName: 'New Business Partner', icon: 'bi bi-person-plus-fill' },
  { route: '/business-partner/edit/:id', displayName: 'Edit Business Partner', icon: 'bi bi-pencil-fill' },
  { route: '/inquiry', displayName: 'Falty Acknowledgment', icon: 'bi bi-headset',isMenuItem: true },
  { route: '/Inquiry/add', displayName: 'New Faulty Acknowledgment', icon: 'bi bi-headset'},
  //   { route: '/inquiry-list', displayName: 'Inquiry List', icon: 'bi bi-headset',isMenuItem: true },
  { route: '/user-master', displayName: 'User Master', icon: 'bi bi-person-badge', isMenuItem: true },
  { route: '/user-master/add', displayName: 'Add User', icon: 'bi bi-person-plus' },
  { route: '/user-master/edit/:id', displayName: 'Edit User', icon: 'bi bi-pencil' },
  { route: '/item-master', displayName: 'Item Master', icon: 'bi bi-box-seam-fill',isMenuItem: true },
    { route: '/item-master/add', displayName: 'Item Master', icon: 'bi bi-box-seam-fill',isMenuItem: false },
  { route: '/item-category', displayName: 'Item Category', icon: 'bi bi-tags',isMenuItem: true },
  { route: '/grn', displayName: 'GRN', icon: 'bi bi-receipt',isMenuItem: true },
  { route: '/invoice', displayName: 'Invoice', icon: 'bi bi-file-earmark-text', isMenuItem: true },
  { route: '/invoice/add', displayName: 'Add Invoice', icon: 'bi bi-file-earmark-text' },

  { route: '/vehicale-confirmation', displayName: 'Vehicle Confirmation', icon: 'bi bi-file-earmark-text', isMenuItem: true },
  { route: '/vehicale-confirmation/add', displayName: 'Add Vehicle Confirmation', icon: 'bi bi-file-earmark-text' },

  { route: '/daily-report', displayName: 'Daily Report', icon: 'bi bi-journal-text', isMenuItem: true },
  { route: '/daily-report/add', displayName: 'Add Daily Report', icon: 'bi bi-journal-plus' },
];

export default menuItems;
