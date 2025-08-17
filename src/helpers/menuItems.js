const menuItems = [
  { route: '/business-partner', displayName: 'Business Partners', icon: 'bi bi-people-fill',isMenuItem: true },
  { route: '/business-partner/add', displayName: 'New Business Partner', icon: 'bi bi-person-plus-fill' },
  { route: '/business-partner/edit', displayName: 'Edit Business Partner', icon: 'bi bi-pencil-fill' },

  { route: '/inquiry', displayName: 'Faulty Acknowledgment', icon: 'bi bi-headset',isMenuItem: false },
  { route: '/inquiry/add', displayName: 'New Faulty Acknowledgment', icon: 'bi bi-headset'},
  { route: '/inquiry/edit', displayName: 'Edit Faulty Acknowledgment', icon: 'bi bi-headset'},

  { route: '/user-master', displayName: 'User Master', icon: 'bi bi-person-badge', isMenuItem: false },
  { route: '/user-master/add', displayName: 'Add User', icon: 'bi bi-person-plus' },
  { route: '/user-master/edit', displayName: 'Edit User', icon: 'bi bi-pencil' },

  { route: '/item-master', displayName: 'Item Master', icon: 'bi bi-box-seam-fill',isMenuItem: false },
  { route: '/item-master/add', displayName: 'New Item Master', icon: 'bi bi-box-seam-fill',isMenuItem: false },
  { route: '/item-master/edit', displayName: 'Edit Item Master', icon: 'bi bi-box-seam-fill',isMenuItem: false },

  { route: '/item-category', displayName: 'Item Category', icon: 'bi bi-tags',isMenuItem: false },

  { route: '/grn', displayName: 'GRN', icon: 'bi bi-receipt',isMenuItem: false },

  { route: '/invoice', displayName: 'Invoice', icon: 'bi bi-file-earmark-text', isMenuItem: true },
  { route: '/invoice/add', displayName: 'Add Invoice', icon: 'bi bi-file-earmark-text' },
  { route: '/invoice/edit', displayName: 'Edit Invoice', icon: 'bi bi-file-earmark-text' },

    { route: '/invoice', displayName: 'Invoice', icon: 'bi bi-file-earmark-text', isMenuItem: true },
  { route: '/invoice/add', displayName: 'Add Invoice', icon: 'bi bi-file-earmark-text' },
  { route: '/invoice/edit', displayName: 'Edit Invoice', icon: 'bi bi-file-earmark-text' },

  { route: '/tax-invoice', displayName: 'Tax Invoice', icon: 'bi bi-file-earmark-text', isMenuItem: true },
  { route: '/tax-invoice/add', displayName: 'Add Tax Invoice', icon: 'bi bi-file-earmark-text' },
  { route: '/tax-invoice/edit', displayName: 'Edit Tax Invoice', icon: 'bi bi-file-earmark-text' },

  { route: '/daily-report', displayName: 'Daily Report', icon: 'bi bi-journal-text', isMenuItem: true },
  { route: '/daily-report/add', displayName: 'Add Daily Report', icon: 'bi bi-journal-plus' },
  { route: '/daily-report/edit', displayName: 'Edit Daily Report', icon: 'bi bi-journal-plus' },
];

export default menuItems;
