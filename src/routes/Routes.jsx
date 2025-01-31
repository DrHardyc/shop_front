import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';

const Body = lazy(() => import('../components/pages/Body.jsx'));
const About = lazy(() => import('../components/pages/About.jsx'));
const Login = lazy(() => import('../components/pages/Login.jsx'));
const Register = lazy(() => import('../components/pages/Register.jsx'));

export default function AppRoutes() {
    return (
        <Suspense fallback={<div className="text-center p-10">Загрузка...</div>}>
            <Routes>
                <Route path="/" element={<Body />} />
                <Route path="/about" element={<About />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </Suspense>
    );
}
