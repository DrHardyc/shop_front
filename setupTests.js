import '@testing-library/jest-dom';
import { TextEncoder, TextDecoder } from 'text-encoding';
// import 'jest-matchmedia-mock';

// Полифилл для matchMedia
Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // Устаревшее
        removeListener: jest.fn(), // Устаревшее
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
    })),
});

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;