import React from 'react';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import { Provider } from '../../src/components/index.js';
import { useDispatch, useSelector } from 'react-redux';
import { useQueryClient } from '@tanstack/react-query';
import { login, logout } from '../../src/store/authSlice.js';
import { put } from '../../src/store/formSlice.js';

// Mock child component to test Redux (authSlice)
const ReduxAuthChild = () => {
    const dispatch = useDispatch();
    const { status, userData } = useSelector((state) => state.auth);
    return (
        <div>
            <button onClick={() => dispatch(login({ name: 'John Doe' }))}>
                Login
            </button>
            <button onClick={() => dispatch(logout())}>Logout</button>
            <span>Auth Status: {status ? 'Logged In' : 'Logged Out'}</span>
            <span>User Data: {userData ? userData.name : 'No User'}</span>
        </div>
    );
};

// Mock child component to test Redux (formSlice)
const ReduxFormChild = () => {
    const dispatch = useDispatch();
    const { status, formsData } = useSelector((state) => state.form);
    return (
        <div>
            <button onClick={() => dispatch(put({ formId: 123 }))}>
                Put Form Data
            </button>
            <span>
                Form Status: {status ? 'Form Submitted' : 'Form Not Submitted'}
            </span>
            <span>
                Form Data: {formsData ? formsData.formId : 'No Form Data'}
            </span>
        </div>
    );
};

// Mock child component to test React Query
const ReactQueryChild = () => {
    const queryClient = useQueryClient();
    return (
        <div>
            {queryClient
                ? 'QueryClient available'
                : 'QueryClient not available'}
        </div>
    );
};

afterEach(() => {
    cleanup();
});

describe('Provider component', () => {
    it('Should render children correctly', () => {
        const { getByText } = render(
            <Provider>
                <div>Test Child</div>
            </Provider>,
        );

        expect(getByText('Test Child')).toBeInTheDocument();
    });

    it('Should provide the redux store (authSlice) to children', () => {
        render(
            <Provider>
                <ReduxAuthChild />
            </Provider>,
        );

        expect(screen.getByText(/login/i)).toBeInTheDocument();
        expect(screen.getByText(/logout/i)).toBeInTheDocument();

        // Initial state check
        expect(screen.getByText('Auth Status: Logged Out')).toBeInTheDocument();
        expect(screen.getByText('User Data: No User')).toBeInTheDocument();

        // Dispatch login action
        fireEvent.click(screen.getByText('Login'));
        expect(screen.getByText('Auth Status: Logged In')).toBeInTheDocument();
        expect(screen.getByText('User Data: John Doe')).toBeInTheDocument();

        // Dispatch logout action
        fireEvent.click(screen.getByText('Logout'));
        expect(screen.getByText('Auth Status: Logged Out')).toBeInTheDocument();
        expect(screen.getByText('User Data: No User')).toBeInTheDocument();
    });

    it('Should provide the redux store (formSlice) to children', () => {
        render(
            <Provider>
                <ReduxFormChild />
            </Provider>,
        );

        expect(screen.getByText('Put Form Data')).toBeInTheDocument();

        // Initial state check
        expect(
            screen.getByText('Form Status: Form Not Submitted'),
        ).toBeInTheDocument();
        expect(screen.getByText('Form Data: No Form Data')).toBeInTheDocument();

        // Dispatch put action
        fireEvent.click(screen.getByText('Put Form Data'));
        expect(
            screen.getByText('Form Status: Form Submitted'),
        ).toBeInTheDocument();
        expect(screen.getByText('Form Data: 123')).toBeInTheDocument();
    });

    it('Should provide the React Query client to children', () => {
        render(
            <Provider>
                <ReactQueryChild />
            </Provider>
        );
        expect(screen.getByText('QueryClient available')).toBeInTheDocument();
    });
});
