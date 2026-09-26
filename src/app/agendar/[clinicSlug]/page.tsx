import ClientBookingView from "@/components/booking/ClientBookingView";

export function generateStaticParams() {
  return [{ clinicSlug: "lumina" }];
}

export default async function ClientBookingPage({
  params,
}: {
  params: Promise<{ clinicSlug: string }>;
}) {
  const { clinicSlug } = await params;
  return <ClientBookingView clinicSlug={clinicSlug} />;
}
