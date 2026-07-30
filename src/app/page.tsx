/**
 * Home page.
 * Renders the landing page or redirects to the appropriate route.
 */

import { redirect } from 'next/navigation';

export default function Home() {
  redirect('/auth/login');
}
