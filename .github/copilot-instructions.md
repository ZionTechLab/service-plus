
# Copilot Instructions for service-plus

## Project Overview
This is a React SPA for managing service inquiries, business partners, and inventory items. The app uses a modern tabbed workflow with inline components (not modals) for primary user flows. Data is persisted in localStorage; there is no backend integration.

**Key Stack:**
- React 19, Redux Toolkit (state management)
- React Router (nested navigation)
- Formik + Yup (forms/validation)
- Bootstrap 5 + custom CSS (no external CSS framework)
- localStorage (persistence via service classes)

## Architecture & Patterns

### Layout
- `MainLayout.jsx` wraps all pages: includes `Navbar`, `Drawer` (slide-out, with theme toggle), `Overlay`, and `Outlet` for route content.
- Drawer navigation is auto-generated from `helpers/menuItems.js` (see `isMenuItem` flag).

### Data & Forms
- **Formik Builder Pattern:** Use `useFormikBuilder(fields, submitHandler)` (see `helpers/formikBuilder.js`).
- **Field Config:** Fields are objects with `name`, `type`, `placeholder`, `initialValue`, `validation` (Yup), and optional `dataBinding` for selects.
- **Service Classes:** CRUD logic is in class-based services (e.g., `pages/BusinessPartners/PartnerService.js`), using localStorage for persistence.
- **Confirmation:** Use `useConfirm` or `usePopupMessage` for success/error popups (never `alert`).

### UI/UX Conventions
- **Tabbed Workflows:** Use `<Tabs>` (see `components/Tabs/`) for multi-step flows (e.g., `pages/Inquary/AddInquary.jsx`).
- **Inline Components:** Prefer inline tables/forms within tabs for selection; avoid modals except for confirmations or column visibility.
- **Data Tables:** Use `components/DataTable/` for sortable/filterable tables. Columns are configured with `{ header, field, isAction, actionTemplate }`.
- **Theme:** Dark/light mode toggle is in the Drawer; theme is stored in localStorage and set on `<html>`.
- **Icons:** Use Bootstrap Icons (`bi bi-*` classes).

### Component Organization
- **Pages:** Route components in `src/pages/FeatureName/`
- **Components:** Reusable UI in `src/components/ComponentName/index.js`
- **Helpers:** Utilities in `src/helpers/` (e.g., `InputField`, `DataTable`, `formikBuilder.js`)
- **Layout:** Wrappers in `src/layout/`

## Developer Workflows

### Adding Features
1. Create a page in `src/pages/FeatureName/`
2. Add a route in `AppRoutes.jsx`
3. Add a menu item in `helpers/menuItems.js`
4. Create a service class if persistence is needed
5. Use `useFormikBuilder` for forms

### Form Example
```jsx
const fields = { /* field definitions */ };
const handleSubmit = (values, { resetForm }) => {
  confirm("Success").then(() => navigate("/somewhere"));
};
const formik = useFormikBuilder(fields, handleSubmit);
<InputField {...fields.fieldName} formik={formik} />
```

### Build, Test, Debug
- **Start dev:** `npm start` ([http://localhost:3000](http://localhost:3000))
- **Test:** `npm test` (Jest + React Testing Library)
- **Build:** `npm run build`
- **Deploy:** `npm run deploy` (to GitHub Pages)
- **Debug:** Use browser DevTools and Redux DevTools

## Integration Points

- **Redux:** App-wide state in `src/features/` (currently only auth)
- **localStorage:** All business data is persisted via service classes
- **Routing:** Main routes in `AppRoutes.jsx`, protected by `ProtectedRoute` wrapper
- **Menu/Drawer:** Menu items in `helpers/menuItems.js` (with icons)

## Examples & References
- **Tabbed Workflow:** `pages/Inquary/AddInquary.jsx`
- **Data Table:** `components/DataTable/index.js`
- **Service Class:** `pages/BusinessPartners/PartnerService.js`
- **Form Builder:** `helpers/formikBuilder.js`, `helpers/InputField.js`

---
