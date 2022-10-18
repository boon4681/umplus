import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import {
    createBrowserRouter,
    RouterProvider,
    Route,
} from "react-router-dom";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
    },
]);

ReactDOM.createRoot(document.querySelector('div') as HTMLElement).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
)
