/**
 * ForgotPasswordForm.test.tsx
 * 
 * Test suite for the ForgotPasswordForm component. Tests rendering, 
 * email input interaction, form validation, and successful submission behavior.
 */
import { render, screen, fireEvent, act } from '@testing-library/react';
import { ForgotPasswordForm } from '../screen/ForgotPasswordForm';
import { useLanguage } from '@/features/common/lang/contexts/LanguageContext';
import { AUTH_STRINGS } from '../constants';

jest.mock('@/features/common/lang/contexts/LanguageContext', () => ({
  useLanguage: jest.fn()
}));

describe('ForgotPasswordForm', () => {
  beforeEach(() => {
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
    render(<ForgotPasswordForm />);
    expect(screen.getByPlaceholderText('name@company.com')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: new RegExp(AUTH_STRINGS.en.SEND_RESET_LINK, 'i') })).toBeInTheDocument();
  });

  it('handles form submission and shows success message', async () => {
    render(<ForgotPasswordForm />);
    
    const emailInput = screen.getByPlaceholderText('name@company.com');
    const submitButton = screen.getByRole('button', { name: new RegExp(AUTH_STRINGS.en.SEND_RESET_LINK, 'i') });
    
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    
    await act(async () => {
      fireEvent.submit(submitButton.closest('form')!);
    });

    // Loading state
    expect(submitButton).toBeDisabled();
    
    await act(async () => {
      jest.advanceTimersByTime(1500);
    });

    // Success state message
    expect(screen.getByText(AUTH_STRINGS.en.RESET_SUCCESS)).toBeInTheDocument();
  });
});
