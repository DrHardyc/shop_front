import React from 'react';

export default function Footer() {
    return (
        <footer className="fixed bottom-0 left-0 w-full bg-white text-gray-800 py-4 hidden sm:block">
            <div className="container mx-auto text-center">
                <p>&copy; 2025 FastFood. Все права защищены.</p>
                <p>
                    <a href="/about" className="text-blue-400 hover:text-blue-600">О нас</a> |
                    <a href="/privacy" className="text-blue-400 hover:text-blue-600"> Политика конфиденциальности</a>
                </p>
            </div>
        </footer>
    );
}
