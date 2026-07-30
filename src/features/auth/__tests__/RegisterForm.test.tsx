/**
 * RegisterForm.test.tsx
 * 
 * Test suite for the RegisterForm component. Tests rendering, 
 * input interaction, form validation, and registration flow behavior.
 */
import { render, screen, fireEvent, act } from '@testing-library/react';
import { RegisterForm } from '../screen/RegisterForm';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/features/common/lang/contexts/LanguageContext';
import { AUTH_STRINGS } from '../constants';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn()
}));

jest.mock('@/features/common/lang/contexts/LanguageContext', () => ({
  useLanguage: jest.fn()
}));

describe('RegisterForm', () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush
    });
    
    (useLanguage as jest.Mock).mockReturnValue({
      language: 'en'
    });
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.useRealTimers();
  });

  it('renders correctly', () => {
    render(<RegisterForm />);
    expect(screen.getByPlaceholderText(AUTH_STRINGS.en.FULL_NAME_PLACEHOLDER)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(AUTH_STRINGS.en.EMAIL_PLACEHOLDER)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(AUTH_STRINGS.en.PASSWORD_PLACEHOLDER)).toBeInTheDocument();
  });

  it('handles form submission and redirects', async () => {
    render(<RegisterForm />);
    
    // Fill required fields
    const nameInput = screen.getByPlaceholderText(AUTH_STRINGS.en.FULL_NAME_PLACEHOLDER);
    const emailInput = screen.getByPlaceholderText(AUTH_STRINGS.en.EMAIL_PLACEHOLDER);
    const passwordInput = screen.getByPlaceholderText(AUTH_STRINGS.en.PASSWORD_PLACEHOLDER);
    const termsCheckbox = screen.getByRole('checkbox');
    
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(termsCheckbox);

    const submitButton = screen.getByRole('button', { name: new RegExp(AUTH_STRINGS.en.CREATE_ACCOUNT_BUTTON, 'i') });
    
    await act(async () => {
      fireEvent.submit(submitButton.closest('form')!);
    });

    // Loading state
    expect(submitButton).toBeDisabled();
    
    await act(async () => {
      jest.advanceTimersByTime(1500);
    });

    // Success state
    expect(screen.getByText(new RegExp(AUTH_STRINGS.en.WELCOME, 'i'))).toBeInTheDocument();
    
    await act(async () => {
      jest.advanceTimersByTime(1000);
    });

    expect(mockPush).toHaveBeenCalledWith('/dashboard');
  });

  it('toggles password visibility', () => {
    render(<RegisterForm />);
    const passwordInput = screen.getByPlaceholderText(AUTH_STRINGS.en.PASSWORD_PLACEHOLDER);
    // Button doesn't have name, it has the icon inner text. 
    // Wait, my initial test clicked a button with name /visibility/i, let me change it to query by type.
    const toggleButton = passwordInput.nextElementSibling as HTMLButtonElement;
    
    expect(passwordInput).toHaveAttribute('type', 'password');
    fireEvent.click(toggleButton);
    expect(passwordInput).toHaveAttribute('type', 'text');
    fireEvent.click(toggleButton);
    expect(passwordInput).toHaveAttribute('type', 'password');
  });
});
