import CallList from "@/components/CallList";

export default function Recordings() {
    return (
        <section className="flex size-full flex-col gap-10 text-blue-500">
        <h1 className="text-3xl font-bold">Rekaman</h1>

        <CallList type="recordings" />
        
    </section>
    )
}