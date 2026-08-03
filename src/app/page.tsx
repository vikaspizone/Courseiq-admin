/**
 * Home page.
 * Renders the landing page or redirects to the appropriate route.
 */

import { redirect } from 'next/navigation';
import { ROUTES } from '@/features/common/constants/routes';

export default function Home() {
  // In a real application, you would check for authentication here
  // and redirect to the dashboard if authenticated, or login if not.
  
  // For this demo, we'll redirect to the login page by default
  redirect(ROUTES.LOGIN);
}
