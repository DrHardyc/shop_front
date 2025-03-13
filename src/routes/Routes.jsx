import { Routes, Route, Outlet } from "react-router-dom";
import { lazy, Suspense } from "react";
import { ProtectedRoute } from "@/routes/ProtectedRoute.jsx";

const routes = {
    public: [
        { path: "/", component: lazy(() => import("@components/layout/Body.jsx")) },
        { path: "/about", component: lazy(() => import("@components/pages/About.jsx")) },
        { path: "/login", component: lazy(() => import("@components/pages/Login.jsx")) },
        { path: "/register", component: lazy(() => import("@components/pages/Register.jsx")) },
    ],
    vendor: [
        { path: "dashboard", component: lazy(() => import("@components/pages/vendor/VendorDashboard.jsx")) },
        { path: "products", component: lazy(() => import("@components/pages/vendor/VendorProducts.jsx")) },
        { path: "profile/:vendorId", component: lazy(() => import("@components/pages/vendor/VendorProfile.jsx")) },
        { path: "profile", component: lazy(() => import("@components/pages/vendor/VendorProfile.jsx")) },
    ],
    buyer: [
        { path: "profile/:buyerId", component: lazy(() => import("@components/pages/buyer/BuyerProfile.jsx")) },
        { path: "profile", component: lazy(() => import("@components/pages/buyer/BuyerProfile.jsx")) },
    ],
};

export default function AppRoutes() {
    return (
        <Suspense fallback={<div className="text-center p-10">Загрузка...</div>}>
            <Routes>
                {routes.public.map(({ path, component: Component }) => (
                    <Route key={path} path={path} element={<Component />} />
                ))}

                <Route path="/vendor" element={<ProtectedRoute allowedRoles={["OWNER"]}>
                    <Outlet />
                </ProtectedRoute>}>
                    {routes.vendor.map(({ path, component: Component }) => (
                        <Route key={path} path={path} element={<Component />} />
                    ))}
                </Route>
                <Route path="/buyer" element={<ProtectedRoute allowedRoles={["CUSTOMER"]}>
                    <Outlet />
                </ProtectedRoute>}>
                    {routes.buyer.map(({ path, component: Component }) => (
                        <Route key={path} path={path} element={<Component />} />
                    ))}
                </Route>
            </Routes>
        </Suspense>
    );
}