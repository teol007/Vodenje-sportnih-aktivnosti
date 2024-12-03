import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeAll } from 'vitest';
import AddEvent from '../src/components/AddEvent';
import { Event } from '../src/services/api';
import { eventDateToHtmlInput } from '../src/modules/functions/eventHelperFunctions';

vi.mock('../src/services/api.tsx', () => ({
    createEvent: vi.fn(),
}));

describe('CreateEvent Component', () => {
    const mockOnClose = vi.fn();
    const mockOnAddEvent = vi.fn();

    const newEvent: Event = {
        id: 1,
        name: 'Tek',
        description: 'Tek za 5 km.',
        date: '2024-11-30T10:00:00Z',
        location: 'Maribor',
        organizer: 'Florijan Rep',
    };

    beforeAll(() => {
        // Reset mocks before each test
        vi.clearAllMocks();
    });

    it('Should render the AddEvent form', async () => {
        render(<AddEvent onClose={mockOnClose} onAddEvent={mockOnAddEvent} />);

        expect(screen.getByText('Ime dogodka')).toBeInTheDocument();
        expect(screen.getByText('Opis')).toBeInTheDocument();
        expect(screen.getByText('Datum')).toBeInTheDocument();
        expect(screen.getByText('Lokacija')).toBeInTheDocument();
        expect(screen.getByText('Dodaj Dogodek')).toBeInTheDocument();      
    });

    it('Should render the AddEvent form input fields', async () => {
        render(<AddEvent onClose={mockOnClose} onAddEvent={mockOnAddEvent} />);

        expect(screen.getByLabelText('Ime dogodka')).toBeInTheDocument();
        expect(screen.getByLabelText('Opis')).toBeInTheDocument();
        expect(screen.getByLabelText('Datum')).toBeInTheDocument();
        expect(screen.getByLabelText('Lokacija')).toBeInTheDocument();
    });

    it('Should render the AddEvent form empty input fields', async () => {
        render(<AddEvent onClose={mockOnClose} onAddEvent={mockOnAddEvent} />);

        expect(screen.getByLabelText('Ime dogodka').value).toBe("");
        expect(screen.getByLabelText('Opis').value).toBe("");
        expect(screen.getByLabelText('Datum').value).toBe("");
        expect(screen.getByLabelText('Lokacija').value).toBe("");
    });

    it('Should update state when input fields are changed', () => {
        render(<AddEvent onClose={mockOnClose} onAddEvent={mockOnAddEvent} />);

        // Simulate typing in the form fields
        fireEvent.change(screen.getByLabelText('Ime dogodka'), { target: { value: newEvent.name } });
        fireEvent.change(screen.getByLabelText('Opis'), { target: { value: newEvent.description } });
        fireEvent.change(screen.getByLabelText('Datum'), { target: { value: eventDateToHtmlInput(newEvent.date) } });
        fireEvent.change(screen.getByLabelText('Lokacija'), { target: { value: newEvent.location } });

        // Check if state updates correctly
        expect(screen.getByLabelText('Ime dogodka').value).toBe(newEvent.name);
        expect(screen.getByLabelText('Opis').value).toBe(newEvent.description);
        expect(screen.getByLabelText('Datum').value).toBe(eventDateToHtmlInput(newEvent.date));
        expect(screen.getByLabelText('Lokacija').value).toBe(newEvent.location);
    });

    it('Should click on submit button', async () => {
        const consoleErrorMock = vi.spyOn(console, 'error').mockImplementation(() => {});

        render(<AddEvent onClose={mockOnClose} onAddEvent={mockOnAddEvent} />);

        const submitButton = screen.getByText('Dodaj Dogodek');
        expect(submitButton).toBeInTheDocument();

        fireEvent.click(screen.getByText('Dodaj Dogodek'));

        // Assert that the button was clicked (via console or visual confirmation)
        expect(consoleErrorMock).not.toHaveBeenCalled(); // Optional: Assert that no error was logged
        consoleErrorMock.mockRestore(); // Clean up the mock
    });
});
