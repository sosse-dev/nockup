import CallList from "@/components/CallList";

export default function Previous() {
  return (
    <section className="flex size-full flex-col gap-10 text-blue-500">
      <h1 className="text-3xl font-bold">Sebelumnya</h1>

      <CallList type="ended" />
    </section>
  );
}
