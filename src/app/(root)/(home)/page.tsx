import MeetingTypeList from "@/components/MeetingTypeList";

export default function Home() {
  const now = new Date();

  const time = now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
  
  const date = new Intl.DateTimeFormat("en-US", {
    dateStyle: "full",
  }).format(now);

  return (
    <section className="flex size-full flex-col gap-10 text-white">
      <div className="h-[300px] w-full rounded-[2px] bg-hero bg-cover">
        <div className="flex h-full flex-col justify-center max-md:px-5 max-md:py-8 lg:p-11">
          <h2 className="glassmorphism max-w-[270px] rounded text-center text-base font-normal px-8 py-4">
          
            <div className="flex flex-col gap-2">
              <h1 className="text-4xl font-extrabold lg:text-7xl">{time}</h1>
              <p className="text-lg font-medium text-sky-1 lg:text-xl">
                {date}
              </p>
            </div>
          </h2>
        </div>
      </div>

      <MeetingTypeList />
    </section>
  );
}
