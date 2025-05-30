import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { avatarImages } from "@/constants";

interface MeetingCardProps {
  title: string;
  date: string;
  icon: string;
  isPreviousMeeting?: boolean;
  buttonIcon1?: string;
  buttonText?: string;
  handleClick: () => void;
  link: string;
}

export default function MeetingCard({
  title,
  date,
  icon,
  isPreviousMeeting,
  buttonIcon1,
  buttonText,
  handleClick,
  link,
}: MeetingCardProps) {
  return (
    <section className="flex min-h-[258px] w-full flex-col justify-between rounded-[14px] bg-dark-1 px-5 py-8 xl:max-w-[568px]">
      <article className="flex flex-col gap-5">
        <Image src={icon} alt="upcoming" width={28} height={28} />
        <div className="flex justify-between">
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-bold">{title}</h1>
            <p className="text-base font-normal">{date}</p>
          </div>
        </div>
      </article>
      <article className={cn("flex justify-center relative", {})}>
        <div className="relative flex w-full max-sm:hidden">
          {avatarImages.map((img, i) => (
            <Image
              key={i}
              src={img}
              alt="attendees"
              width={40}
              height={40}
              className={cn("rounded-full", {
                absolute: i > 0,
              })}
              style={{ top: 0, left: i * 28 }}
            />
          ))}
          <div className="flex-center absolute left-[75px] size-10 rounded-full border-[5px] border-dark-3 bg-dark-4">
            +5
          </div>
        </div>
        {!isPreviousMeeting && (
          <div className="flex gap-2 md:mr-8">
            <Button className="bg-blue-1 px-6" onClick={handleClick}>
              {buttonIcon1 && (
                <Image src={buttonIcon1} alt="feature" width={20} height={20} />
              )}
              {buttonText}
            </Button>
            <Button
              className="bg-black/80 px-6"
              onClick={() => {
                navigator.clipboard.writeText(link);
                toast.success("Link Copied");
              }}
            >
              <Image
                src="/icons/copy.svg"
                alt="feature"
                width={20}
                height={20}
              />
            </Button>
          </div>
        )}
      </article>
    </section>
  );
}
