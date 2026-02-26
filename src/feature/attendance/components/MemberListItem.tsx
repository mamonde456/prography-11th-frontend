import type { IContent } from "../../membership/types";

type Props = {
  members: IContent[];
  onSelect: (item: IContent) => void;
};

export default function MemberListItem({ members, onSelect }: Props) {
  return (
    <ul className="flex flex-col gap-2">
      {members.map((item) => (
        <li
          className="border-b-1 border-gray-300 p-2 hover:bg-gray-300 flex cursor-pointer"
          key={item.id}
          onClick={() => onSelect(item)}
        >
          <div className="w-full flex gap-5">
            <span className="flex-1">{item.name}</span>
            <span className="flex-1">{item.teamName}</span>
            <span className="flex-1">{item.createdAt.split("T")[0]}</span>
            <span className="flex-1">{item.status}</span>
          </div>
        </li>
      ))}
    </ul>
  );
}
