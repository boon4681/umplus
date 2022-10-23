import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import {
    createBrowserRouter,
    RouterProvider,
    Route,
} from "react-router-dom";
import AuthProvider from './components/AuthProvider';

const router = createBrowserRouter([
    {
        path: "/*",
        element: <App />,
    },
]);

ReactDOM.createRoot(document.querySelector('div') as HTMLElement).render(
    <React.StrictMode>
        <AuthProvider>
            <RouterProvider router={router} />
        </AuthProvider>
    </React.StrictMode>
)
