type Attendance = {
  id: number;
  sessionId: number;
  status: string;
  createdAt: string;
};

type Props = {
  memberName: string;
  teamName: string;
  attendances: Attendance[];
  onSelect: (sessionId: number) => void;
};

export default function AttendanceListItem({
  memberName,
  teamName,
  attendances,
  onSelect,
}: Props) {
  return (
    <div className="p-5 flex flex-col gap-5 bg-gray-200 rounded-[5px]">
      {attendances.map((item) => (
        <div
          className="cursor-pointer"
          key={item.id}
          onClick={() => onSelect(item.sessionId)}
        >
          <p className="flex items-center justify-between gap-5 text-center">
            <span className="flex-1">{memberName}</span>
            <span className="flex-1">{teamName}</span>
            <span className="flex-1 rounded-[5px] bg-gray-400 text-gray-50">
              {item.createdAt.split("T")[0]}
            </span>
            <span className="flex-2 rounded-[5px] bg-gray-50">
              {item.status}
            </span>
          </p>
        </div>
      ))}
    </div>
  );
}
