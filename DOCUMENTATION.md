# Technical Documentation

This document provides a comprehensive overview of the React application, its structure, and how to contribute.

## Project Overview

This application is a comprehensive tool designed to streamline the management of service inquiries, customer data, and item masters. It offers a user-friendly interface for efficient creation, viewing, and management of service-related information. The primary goal is to provide a robust and intuitive platform for businesses to handle their service operations, improve customer interactions, and maintain accurate inventory records.

## Overview

This application is a comprehensive tool for managing service inquiries, customer data, and item masters. It provides a user-friendly interface for creating, viewing, and managing service-related information.

**Key Technologies:**

*   **React:** A JavaScript library for building user interfaces.
*   **Redux:** A predictable state container for JavaScript apps.
*   **React Router:** A declarative routing library for React.
*   **Formik & Yup:** For building and validating forms.
<!-- *   **Pico.css:** A lightweight CSS framework for styling. -->

## Features

*   **Authentication:** Secure login and registration for users.
*   **Service Inquiry Management:** Create, view, and update service inquiries.
*   **Customer Master:** Manage customer information.
*   **Item Master:** Manage a catalog of items.
*   **User Profile:** View and manage user profiles.

## Folder Structure

The project follows a standard React application structure:

```
/
|-- public/           # Public assets and index.html
|-- src/              # Application source code
|   |-- components/     # Reusable React components
|   |-- features/       # Redux slices and related logic
|   |-- helpers/        # Helper functions and utilities
|   |-- App.js          # Main application component
|   |-- index.js        # Application entry point
|   |-- store.js        # Redux store configuration
|-- .gitignore        # Git ignore file
|-- package.json      # Project dependencies and scripts
|-- README.md         # Project README
```

*   **`src/components`**: Contains individual React components, each in its own folder with an `index.js` file for easy importing.
*   **`src/features`**: Houses Redux tool-kit slices, which manage the application's state.
*   **`src/helpers`**: Includes reusable functions and helper components that can be used across the application.

## Setup Instructions

### Prerequisites

*   Node.js (v14 or higher)
*   npm (v6 or higher)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    ```
2.  **Navigate to the project directory:**
    ```bash
    cd <project-directory>
    ```
3.  **Install dependencies:**
    ```bash
    npm install
    ```

### Running the Development Server

1.  **Create a `.env` file** in the root of the project.
2.  **Add the necessary environment variables** (see the "Environment Variables" section).
3.  **Start the development server:**
    ```bash
    npm start
    ```
    The application will be available at `http://localhost:3000`.

## Development Scripts

In the project directory, you can run the following scripts:

*   `npm start`: Runs the app in development mode. Opens [http://localhost:3000](http://localhost:3000) in your browser. The page reloads on edits.
*   `npm test`: Launches the test runner in interactive watch mode.
*   `npm run build`: Builds the app for production to the `build` folder. Optimizes and minifies the build for best performance.
*   `npm run eject`: **Use with caution!** This is a one-way operation that removes the single build dependency and copies configuration files and transitive dependencies into your project, giving you full control over them.

## Build & Deployment

### Building for Production

To create a production-ready build, run:
```bash
npm run build
```
This will generate a `build` folder with optimized and minified assets.

### Deployment

The application can be deployed to any static hosting service, such as Vercel, Netlify, or a custom server. Simply upload the contents of the `build` folder to your hosting provider.

## State Management

This application uses **Redux Toolkit** for state management.

*   **State Structure:** The Redux store is configured in `src/store.js`. Each feature has its own slice in the `src/features` directory, which defines its initial state and reducers.
*   **Accessing State:** Components can access the state using the `useSelector` hook from `react-redux` and dispatch actions using the `useDispatch` hook.

## Routing

**React Router** is used for handling navigation within the application.

*   **Route Configuration:** The main routes are defined in `src/App.js`.
*   **Protected Routes:** The application uses a `ProtectedRoute` component to restrict access to certain routes to authenticated users.
*   **Nested Routes:** The `MainPage` component contains nested routes for the different features of the application.

## API Integration

API integration is not explicitly defined in the provided code. However, a standard approach would be to use a library like **Axios** or the built-in **Fetch API** to make API calls.

*   **Base URL:** A base URL for the API should be configured in a central location, such as the `.env` file.
*   **Authentication:** API requests would likely include an authentication token in the headers, which can be retrieved from the Redux store.

## Components & Reusability

*   **Component Structure:** Components are designed to be modular and reusable. Each component is located in its own directory within `src/components`.
*   **Naming Conventions:** Components are named using PascalCase (e.g., `CustomerMaster`).
*   **Props:** Components receive data and functions through props, following standard React practices.

## UI/Styling

<!-- *   **CSS Framework:** The application uses **Pico.css**, a lightweight and semantic CSS framework. -->
*   **Custom Styles:** Custom styles are defined in individual CSS files for each component (e.g., `Drawer.css`).

## Environment Variables

The following environment variables are required. Create a `.env` file in the root of the project to configure them:

*   `REACT_APP_API_BASE_URL`: The base URL for the API.
*   Other environment-specific variables.

## Testing

The project is set up with **React Testing Library** and **Jest**.

*   **Running Tests:** To run the test suite, use the following command:
    ```bash
    npm test
    ```
*   **Test Files:** Test files are located alongside the components they are testing (e.g., `App.test.js`).

## Known Issues / Limitations

*   The application currently uses mock data (`src/data.js`) and does not have a real backend integration.
*   Some features may not be fully implemented.

## Future Enhancements

*   **Backend Integration:** Implement a robust backend to replace mock data, enabling persistent storage and real-time data updates.
*   **Advanced Reporting:** Develop comprehensive reporting features for service inquiries, customer data, and item masters.
*   **User Roles and Permissions:** Introduce a role-based access control system to manage user permissions more granularly.
*   **Notifications:** Implement in-app and email notification systems for important events (e.g., new inquiry, status change).
*   **Search and Filtering:** Enhance search and filtering capabilities across all data tables for improved usability.
*   **Internationalization (i18n):** Add support for multiple languages to cater to a broader user base.
*   **Offline Support:** Explore implementing offline capabilities for critical features using service workers.

## Contribution Guidelines

*   **Coding Style:** Follow the existing coding style and conventions.
*   **Branching:** Create a new branch for each feature or bug fix.
*   **Pull Requests:** Submit a pull request with a clear description of the changes.

## Maintainer / Contact Info

For any questions or issues, please contact the project maintainer.