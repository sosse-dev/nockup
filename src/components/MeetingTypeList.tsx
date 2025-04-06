"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import HomeCard from "./HomeCard";
import MeetingModal from "./MeetingModal";
import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { toast } from "sonner";
import { Textarea } from "./ui/textarea";
import ReactDatePicker from "react-datepicker";
import { Input } from "./ui/input";

export default function MeetingTypeList() {
  const router = useRouter();
  const [meetingState, setMeetingState] = useState<
    "isScheduleMeeting" | "isJoiningMeeting" | "isInstantMeeting" | undefined
  >();
  const { user } = useUser();
  const client = useStreamVideoClient();
  const [values, setValues] = useState({
    dateTime: new Date(),
    description: "",
    text: "",
    link: "",
  });
  const [callDetails, setCallDetails] = useState<Call>();

  const createMeeting = async () => {
    if (!client || !user) return;

    try {
      if (!values.dateTime) {
        toast.error("Please select a date and time");
        return;
      }

      const id = crypto.randomUUID(); // crypto itu global property
      const call = client.call("default", id);

      if (!call) throw new Error("Failed to create call");

      const startsAt =
        values.dateTime.toISOString() || new Date(Date.now()).toISOString();
      const description = values.description || "Instant meeting";

      await call.getOrCreate({
        data: {
          starts_at: startsAt,
          custom: {
            description,
          },
        },
      });

      setCallDetails(call);

      if (!values.description) {
        router.push(`/meeting/${call.id}`);
      }

      toast.success("Meeting created");
    } catch (error) {
      toast.error("Failed to create meeting");
      console.log(error);
    }
  };

  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetails?.id}`;

  return (
    <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
    <HomeCard
      img="/icons/add-meeting.svg"
      title="Buat Pertemuan"
      description="Mulai pertemuan instan"
      handleClick={() => setMeetingState("isInstantMeeting")}
      className="bg-orange-1"
    />
    <HomeCard
      img="/icons/schedule.svg"
      title="Jadwalkan Pertemuan"
      description="Rencanakan pertemuan Anda"
      handleClick={() => setMeetingState("isScheduleMeeting")}
      className="bg-blue-1"
    />
    <HomeCard
      img="/icons/recordings.svg"
      title="Lihat Rekaman"
      description="Cek rekaman Anda"
      handleClick={() => router.push("/recordings")}
      className="bg-purple-1"
    />
    <HomeCard
      img="/icons/add-meeting.svg"
      title="Gabung Pertemuan"
      description="via tautan undangan"
      handleClick={() => setMeetingState("isJoiningMeeting")}
      className="bg-yellow-1"
    />
  
    {!callDetails ? (
      <MeetingModal
        isOpen={meetingState === "isScheduleMeeting"}
        onClose={() => setMeetingState(undefined)}
        title="Buat Pertemuan"
        handleClick={createMeeting}
      >
        <div className="flex flex-col gap-2.5">
          <label className="text-base text-normal leading-[22px] text-blue-1/80">
            Tambahkan deskripsi
          </label>
          <Textarea
            className="border-none bg-dark-3 focus-visible:ring-0 focus-visible-ring-offset-0"
            onChange={(e) => {
              setValues({ ...values, description: e.target.value });
            }}
          />
        </div>
        <div className="flex w-full flex-col gap-2.5">
          <label className="text-base text-normal leading-[22px] text-blue-1/80">
            Pilih Tanggal dan Waktu
          </label>
          <ReactDatePicker
            selected={values.dateTime}
            onChange={(date) => setValues({ ...values, dateTime: date! })}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            timeCaption="waktu"
            dateFormat="d MMMM yyyy HH:mm"
            className="2-full rounded bg-dark-3 p-2 focus:outline-none"
          />
        </div>
      </MeetingModal>
    ) : (
      <MeetingModal
        isOpen={meetingState === "isScheduleMeeting"}
        onClose={() => setMeetingState(undefined)}
        title="Pertemuan Dibuat"
        className="text-center"
        buttonText="Salin Tautan Pertemuan"
        handleClick={() => {
          navigator.clipboard.writeText(meetingLink);
          toast.success("Tautan Disalin");
        }}
        image="/icons/checked.svg"
        buttonIcon="/icons/copy.svg"
      />
    )}
  
    <MeetingModal
      isOpen={meetingState === "isInstantMeeting"}
      onClose={() => setMeetingState(undefined)}
      title="Mulai Pertemuan Instan"
      className="text-center"
      buttonText="Mulai Pertemuan"
      handleClick={createMeeting}
    />
  
    <MeetingModal
      isOpen={meetingState === "isJoiningMeeting"}
      onClose={() => setMeetingState(undefined)}
      title="Masukkan tautan di sini"
      className="text-center"
      buttonText="Gabung Pertemuan"
      handleClick={() => router.push(values.link)}
    >
      <Input
        className="border-none bg-dark-3 focus-visible:ring-0 focus-visible:ring-offset-0"
        placeholder="Tautan pertemuan"
        onChange={(e) => setValues({ ...values, link: e.target.value })}
      />
    </MeetingModal>
  </section>
  );
}
