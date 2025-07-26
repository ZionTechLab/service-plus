# Copilot Instructions for service-plus

## Project Overview
This is a React SPA for managing service inquiries, business partners, and inventory items. The app uses a modern tabbed workflow approach with inline components instead of modals for better UX.

**Key Stack:**
- React 19 + Redux Toolkit for state management
- React Router for navigation with nested routes  
- Formik + Yup for form handling and validation
- Bootstrap 5 + custom CSS (no external CSS framework dependency)
- localStorage for persistence (no backend integration currently)

## Architecture Patterns

### Layout Structure
```
MainPage (layout wrapper)
├── Navbar (top bar with hamburger menu)
├── Drawer (slide-out navigation with theme toggle)
├── Overlay (backdrop for drawer)
└── Outlet (route content)
```

### Form & Data Flow Patterns
1. **Formik Builder Pattern**: Use `useFormikBuilder(fields, submitHandler)` - see `helpers/formikBuilder.js`
2. **Field Configuration**: Define fields as objects with `name`, `type`, `placeholder`, `initialValue`, `validation` 
3. **Service Classes**: Use class-based services for data operations (e.g., `PartnerService`) with localStorage
4. **Confirmation Pattern**: Use `useConfirm` hook for success/error popups instead of alerts

### Component Organization
- **Pages**: Route components in `src/pages/FeatureName/`
- **Components**: Reusable UI in `src/components/ComponentName/index.js`
- **Layout**: Layout wrappers in `src/layout/`
- **Helpers**: Utilities in `src/helpers/` (InputField, DataTable, etc.)

## Key Conventions

### Tab-Based Workflows
Modern approach uses `<Tabs>` component instead of modals:
```jsx
// Example from AddInquary.jsx
const tabs = [
  { id: 'select-customer', label: 'Select Customer', disabled: false },
  { id: 'inquiry-details', label: 'Inquiry Details', disabled: !selectedCustomer }
];
```

### Inline Components vs Modals
- **Prefer**: Inline tables/forms within tabs for selection workflows
- **Avoid**: Modal popups for primary workflows (legacy pattern being phased out)
- **Use Modals**: Only for column visibility, confirmations, or secondary actions

### Form Field Patterns
```javascript
// Standard field definition
const fields = {
  fieldName: {
    name: "fieldName",
    type: "text|email|select|textarea|checkbox|date",
    placeholder: "Display Text",
    initialValue: "",
    validation: Yup.string().required("Error message"),
    dataBinding: { data: array, keyField: "id", valueField: "name" } // for selects
  }
};
```

### Data Table Configuration
```javascript
const columns = [
  { header: 'Name', field: 'name' },
  { header: 'Action', isAction: true, actionTemplate: (row) => <button>Edit</button> }
];
```

## Developer Workflows

### Adding New Features
1. Create page component in `src/pages/FeatureName/`
2. Add route to `AppRoutes.jsx`
3. Add menu item to `helpers/menuItems.js`
4. Create service class if data persistence needed
5. Use `useFormikBuilder` for forms

### Form Workflow Pattern
```jsx
// 1. Define fields configuration
const fields = { /* field definitions */ };

// 2. Create submit handler
const handleSubmit = (values, { resetForm }) => {
  // Save data, show confirmation, navigate
  confirm("Success message").then(() => navigate('/somewhere'));
};

// 3. Initialize formik
const formik = useFormikBuilder(fields, handleSubmit);

// 4. Use InputField components
<InputField {...fields.fieldName} formik={formik} />
```

### Testing & Debugging
- **Start dev**: `npm start` (http://localhost:3000)
- **Run tests**: `npm test` (Jest + React Testing Library)  
- **Build prod**: `npm run build`
- **Debug**: Browser DevTools + Redux DevTools extension

## Integration Points

### State Management
- **Redux**: App-wide state in `src/features/` (currently only auth)
- **Local State**: Component state for UI interactions
- **localStorage**: Data persistence via service classes

### Navigation & Routing  
- **Main Routes**: Defined in `AppRoutes.jsx` with protected/public route wrappers
- **Menu Items**: Configured in `helpers/menuItems.js` with icons
- **Drawer Navigation**: Auto-generated from menuItems with `isMenuItem: true`

### Service Layer
Business logic in class-based services:
```javascript
class PartnerService {
  constructor() { this.storageKey = 'partners'; }
  createPartner(data) { /* localStorage operations */ }
  getAllPartners() { /* return array */ }
}
```

## Current Implementation Notes
- **Recent Change**: AddInquary now uses tabbed workflow with inline customer selection instead of modal
- **Theme Support**: Dark/light mode toggle in drawer footer
- **Responsive**: Bootstrap grid system with mobile-first approach  
- **Icons**: Bootstrap Icons (`bi bi-*` classes)
- **Forms**: All forms use consistent Formik + InputField pattern

## Examples
- **Tab Workflow**: `pages/Inquary/AddInquary.jsx` - shows modern tab-based UX
- **Data Table**: `components/DataTable/index.js` - sortable, filterable, with column toggle
- **Service Pattern**: `pages/BusinessPartners/PartnerService.js` - localStorage CRUD operations
- **Form Builder**: `helpers/formikBuilder.js` + `helpers/InputField.js` - declarative form creation
