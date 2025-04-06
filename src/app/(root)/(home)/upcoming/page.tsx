import CallList from "@/components/CallList";

export default function Upcoming() {
  return (
    <section className="flex size-full flex-col gap-10 text-blue-500">
      <h1 className="text-3xl font-bold">Akan Datang</h1>

      <CallList type="upcoming" />
    </section>
  );
}
