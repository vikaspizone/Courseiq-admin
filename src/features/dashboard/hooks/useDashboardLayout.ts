import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useRouteGuard } from "@/features/auth/hooks/useRouteGuard";

export function useDashboardLayout() {
  const { isAccessDenied, authLoading, firstAccessibleRoute } = useRouteGuard();
  const router = useRouter();

  useEffect(() => {
    if (isAccessDenied && firstAccessibleRoute) {
      router.push(firstAccessibleRoute);
    }
  }, [isAccessDenied, firstAccessibleRoute, router]);

  return { isAccessDenied, authLoading, firstAccessibleRoute };
}
