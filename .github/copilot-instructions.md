# Copilot Instructions for service-plus

## Project Overview
- This is a React SPA for managing service inquiries, customers, and items.
- Uses Redux Toolkit for state management (`src/store.js`, `src/features/`).
- Routing is handled by React Router, with main routes in `src/App.js` and nested routes in `MainPage`.
- Forms use Formik and Yup for validation (see `helpers/formikBuilder.js`, component form logic).
- UI is styled with Pico.css and custom component CSS files.
- Data is currently mock/local (see `src/data.js`), with localStorage used for persistence in some flows (e.g., ServiceInquiry).

## Key Patterns & Conventions
- Components are modular, in `src/components/FeatureName/index.js`.
- Redux slices live in `src/features/featureName/featureSlice.js`.
- Helper utilities are in `src/helpers/` (e.g., `InputField.js`, `DataTable.js`).
- Use PascalCase for components and camelCase for variables/functions.
- Prefer local state for UI, Redux for app-wide state.
- ServiceInquiry workflow: form submission updates localStorage, triggers popup, and resets form.
- Customer selection uses a modal and updates form fields directly.

## Developer Workflows
- **Start dev server:** `npm start` (http://localhost:3000)
- **Run tests:** `npm test` (Jest + React Testing Library)
- **Build for production:** `npm run build`
- **Install dependencies:** `npm install`
- **Environment:** Set `REACT_APP_API_BASE_URL` in `.env` if integrating with an API.

## Integration Points
- No backend/API calls by default; mock data and localStorage are used.
- If adding API calls, use Axios or Fetch, and store base URL in `.env`.
- Authentication state managed in `features/auth/authSlice.js`.

## Examples
- To add a new feature, create a folder in `src/components/FeatureName/` and a Redux slice in `src/features/featureName/`.
- To persist new data, use localStorage or update mock data in `src/data.js`.
- For forms, use Formik builder pattern as in `ServiceInquiry`.

## Testing & Debugging
- Test files are named `*.test.js` and colocated with source files.
- Use React Testing Library for UI/component tests.
- Debug by inspecting browser console and Redux state.

## References
- See `DOCUMENTATION.md` and `README.md` for more details on setup and architecture.
- Example: `ServiceInquiry` component demonstrates form, modal, localStorage, and popup patterns.

---

If any section is unclear or missing, please provide feedback to improve these instructions.
