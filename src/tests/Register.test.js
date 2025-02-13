import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Register from '@components/pages/Register.jsx';
import { BrowserRouter as Router } from 'react-router-dom';
import UserService from '@/service/UserService.jsx';

// Мокаем UserService
jest.mock('@/service/UserService.jsx');

describe('Register Component', () => {
    beforeEach(() => {
        // Очищаем все моки перед каждым тестом
        jest.clearAllMocks();
    });

    test('renders the registration form', () => {
        render(
            <Router>
                <Register />
            </Router>
        );

        expect(screen.getByText('Регистрация')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('эл. почта')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Ваше имя')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Ваша фамилия')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Номер телефона')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Введите пароль')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Повторите пароль')).toBeInTheDocument();
        expect(screen.getByText('Зарегистрироваться')).toBeInTheDocument();
        expect(screen.getByText('Уже есть аккаунт?')).toBeInTheDocument();
    });

    test('submits the form with valid data', async () => {
        UserService.register.mockResolvedValueOnce({});

        render(
            <Router>
                <Register />
            </Router>
        );

        fireEvent.change(screen.getByPlaceholderText('эл. почта'), { target: { value: 'test@example.com' } });
        fireEvent.change(screen.getByPlaceholderText('Ваше имя'), { target: { value: 'John' } });
        fireEvent.change(screen.getByPlaceholderText('Ваша фамилия'), { target: { value: 'Doe' } });
        fireEvent.change(screen.getByPlaceholderText('Номер телефона'), { target: { value: '1234567890' } });
        fireEvent.change(screen.getByPlaceholderText('Введите пароль'), { target: { value: 'password123' } });
        fireEvent.change(screen.getByPlaceholderText('Повторите пароль'), { target: { value: 'password123' } });

        fireEvent.click(screen.getByText('Зарегистрироваться'));

        await waitFor(() => {
            expect(UserService.register).toHaveBeenCalledWith({
                email: 'test@example.com',
                firstName: 'John',
                lastName: 'Doe',
                phone: '1234567890',
                password: 'password123',
                confirmPassword: 'password123',
            });
        });
    });

    test('shows error message when passwords do not match', async () => {
        render(
            <Router>
                <Register />
            </Router>
        );

        fireEvent.change(screen.getByPlaceholderText('Введите пароль'), { target: { value: 'password123' } });
        fireEvent.change(screen.getByPlaceholderText('Повторите пароль'), { target: { value: 'differentpassword' } });

        fireEvent.click(screen.getByText('Зарегистрироваться'));

        await waitFor(() => {
            expect(screen.getByText('Пароли не совпадают!')).toBeInTheDocument();
        });
    });

    test('shows error message when registration fails', async () => {
        UserService.register.mockRejectedValueOnce(new Error('Registration failed'));

        render(
            <Router>
                <Register />
            </Router>
        );

        fireEvent.change(screen.getByPlaceholderText('эл. почта'), { target: { value: 'test@example.com' } });
        fireEvent.change(screen.getByPlaceholderText('Введите пароль'), { target: { value: 'password123' } });
        fireEvent.change(screen.getByPlaceholderText('Повторите пароль'), { target: { value: 'password123' } });

        fireEvent.click(screen.getByText('Зарегистрироваться'));

        await waitFor(() => {
            expect(screen.getByText('Ошибка при регистрации пользователя')).toBeInTheDocument();
        });
    });
});