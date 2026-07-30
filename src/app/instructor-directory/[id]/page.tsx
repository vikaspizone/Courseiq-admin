/**
 * Instructor Detail Page.
 * Next.js route page for viewing instructor details.
 */
import { InstructorDetailView } from "@/features/instructor_detail/screen/InstructorDetailView";

export default async function InstructorDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  return <InstructorDetailView id={resolvedParams.id} />;
}
