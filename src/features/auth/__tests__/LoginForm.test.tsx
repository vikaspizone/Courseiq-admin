/**
 * LoginForm.test.tsx
 * 
 * Test suite for the LoginForm component. Tests rendering, 
 * input interaction, form validation, and login submission behavior.
 */
import { render, screen, fireEvent } from '@testing-library/react';
import { LoginForm } from '../screen/LoginForm';
import { AUTH_STRINGS, AUTH_MESSAGES } from '../constants';

// Mock the hooks
jest.mock('../hooks/useAuth', () => ({
  useAuth: jest.fn()
}));

jest.mock('@/features/common/lang/contexts/LanguageContext', () => ({
  useLanguage: jest.fn()
}));

import { useAuth } from '../hooks/useAuth';
import { useLanguage } from '@/features/common/lang/contexts/LanguageContext';

describe('LoginForm', () => {
  const mockHandleLogin = jest.fn((e) => e.preventDefault());
  const mockSetEmail = jest.fn();
  const mockSetPassword = jest.fn();

  beforeEach(() => {
    (useLanguage as jest.Mock).mockReturnValue({
      language: 'en'
    });

    (useAuth as jest.Mock).mockReturnValue({
      email: '',
      setEmail: mockSetEmail,
      password: '',
      setPassword: mockSetPassword,
      error: '',
      loading: false,
      handleLogin: mockHandleLogin
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    render(<LoginForm />);
    expect(screen.getByPlaceholderText(AUTH_STRINGS.en.EMAIL_PLACEHOLDER)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(AUTH_STRINGS.en.PASSWORD_PLACEHOLDER)).toBeInTheDocument();
    expect(screen.getByText(AUTH_STRINGS.en.SIGN_IN_BUTTON)).toBeInTheDocument();
  });

  it('calls setEmail on email input change', () => {
    render(<LoginForm />);
    const emailInput = screen.getByPlaceholderText(AUTH_STRINGS.en.EMAIL_PLACEHOLDER);
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    expect(mockSetEmail).toHaveBeenCalledWith('test@example.com');
  });

  it('calls setPassword on password input change', () => {
    render(<LoginForm />);
    const passwordInput = screen.getByPlaceholderText(AUTH_STRINGS.en.PASSWORD_PLACEHOLDER);
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    expect(mockSetPassword).toHaveBeenCalledWith('password123');
  });

  it('displays error message when error exists', () => {
    (useAuth as jest.Mock).mockReturnValue({
      email: '',
      setEmail: mockSetEmail,
      password: '',
      setPassword: mockSetPassword,
      error: 'Invalid credentials',
      loading: false,
      handleLogin: mockHandleLogin
    });
    render(<LoginForm />);
    expect(screen.getByText(AUTH_MESSAGES.en.INVALID_CREDENTIALS)).toBeInTheDocument();
  });

  it('calls handleLogin on form submit', () => {
    render(<LoginForm />);
    
    // Fill required fields
    const emailInput = screen.getByPlaceholderText(AUTH_STRINGS.en.EMAIL_PLACEHOLDER);
    const passwordInput = screen.getByPlaceholderText(AUTH_STRINGS.en.PASSWORD_PLACEHOLDER);
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    const submitButton = screen.getByRole('button', { name: new RegExp(AUTH_STRINGS.en.SIGN_IN_BUTTON, 'i') });
    // In jsdom, clicking submit button might not trigger form submit if validation fails or requires full form submission event
    fireEvent.submit(submitButton.closest('form')!);
    expect(mockHandleLogin).toHaveBeenCalled();
  });

  it('toggles password visibility', () => {
    render(<LoginForm />);
    const passwordInput = screen.getByPlaceholderText(AUTH_STRINGS.en.PASSWORD_PLACEHOLDER);
    const toggleButton = screen.getByRole('button', { name: /visibility/i });
    
    expect(passwordInput).toHaveAttribute('type', 'password');
    fireEvent.click(toggleButton);
    expect(passwordInput).toHaveAttribute('type', 'text');
    fireEvent.click(toggleButton);
    expect(passwordInput).toHaveAttribute('type', 'password');
  });
});
