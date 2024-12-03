import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeAll } from 'vitest';
import AddEvent from '../src/components/AddEvent';
import { Event } from '../src/services/api';
import { eventDateToHtmlInput } from '../src/modules/functions/eventHelperFunctions';
import { User, UserRole, UserWithId } from '../src/services/usersApi';
import Register from "../src/views/Profile/Register/Register"

vi.mock('../src/services/api.tsx', () => ({
    createEvent: vi.fn(),
}));

describe('Register Component', () => {
    const mockOnClose = vi.fn();
    const mockOnAddEvent = vi.fn();

    const defaultForm: User = {
        username: "",
        password: "",
        fullName: "",
        role: UserRole.UNASSIGNED
    };

    const newUser: User = {
        username: "Tina",
        password: '12345',
        fullName: 'Tina Zajc',
        role: UserRole.MANAGEMENT
    }

    beforeAll(() => {
        // Reset mocks before each test
        vi.clearAllMocks();
    });

    it('Should render the Register form', async () => {
        render(<Register />);

        expect(screen.getByText('Registracija')).toBeInTheDocument();     
        expect(screen.getByText('Uporabniško Ime')).toBeInTheDocument();
        expect(screen.getByText('Geslo')).toBeInTheDocument();
        expect(screen.getByText('Polno Ime')).toBeInTheDocument();
        expect(screen.getByText('Vloga')).toBeInTheDocument();
    });

    it('Should render the Register form input fields', async () => {
        render(<Register />);

        expect(screen.getByLabelText('Uporabniško Ime')).toBeInTheDocument();
        expect(screen.getByLabelText('Geslo')).toBeInTheDocument();
        expect(screen.getByLabelText('Polno Ime')).toBeInTheDocument();
        expect(screen.getByLabelText('Vloga')).toBeInTheDocument();
    });

    it('Should render the Register form empty input fields', async () => {
        render(<Register />);

        expect(screen.getByLabelText('Uporabniško Ime').value).toBe(defaultForm.username);
        expect(screen.getByLabelText('Geslo').value).toBe(defaultForm.password);
        expect(screen.getByLabelText('Polno Ime').value).toBe(defaultForm.fullName);
        expect(screen.getByLabelText('Vloga').value).toBe(defaultForm.role);
    });

    it('Should update state when input fields are changed', () => {
        render(<Register />);
        
        // Simulate typing in the form fields
        fireEvent.change(screen.getByLabelText('Uporabniško Ime'), { target: { value: newUser.username } });
        fireEvent.change(screen.getByLabelText('Geslo'), { target: { value: newUser.password } });
        fireEvent.change(screen.getByLabelText('Polno Ime'), { target: { value: newUser.fullName } });
        fireEvent.change(screen.getByLabelText('Vloga'), { target: { value: newUser.role } });

        // Check if state updates correctly
        expect(screen.getByLabelText('Uporabniško Ime').value).toBe(newUser.username);
        expect(screen.getByLabelText('Geslo').value).toBe(newUser.password);
        expect(screen.getByLabelText('Polno Ime').value).toBe(newUser.fullName);
        expect(screen.getByLabelText('Vloga').value).toBe(newUser.role);
    });

    it('Should click on Register button', async () => {
        const consoleErrorMock = vi.spyOn(console, 'error').mockImplementation(() => {});

        render(<Register />);

        const submitButton = screen.getByText('Registriraj');
        expect(submitButton).toBeInTheDocument();

        fireEvent.click(screen.getByText('Registriraj'));

        // Assert that the button was clicked (via console or visual confirmation)
        expect(consoleErrorMock).not.toHaveBeenCalled(); // Optional: Assert that no error was logged
        consoleErrorMock.mockRestore(); // Clean up the mock
    });
});
