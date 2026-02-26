import useUIStore, { type TITLE_TYPE } from "../../lib/store/useUIStore";

const MENU_LIST = [
  { id: 0, category: "회원 관리" },
  { id: 1, category: "출결 관리" },
  { id: 2, category: "세션 관리" },
];

export default function MainMenu() {
  const selected = useUIStore((state) => state.selectedCategory);
  return (
    <div className="flex-1 bg-gray-300">
      <div className="p-5">
        <img src="/logo.webp"></img>
      </div>
      <nav className="p-5">
        <ul>
          {MENU_LIST.map((el) => (
            <li
              className="p-2 mb-2"
              key={el.id}
              onClick={() => selected(el.category as TITLE_TYPE)}
            >
              {el.category}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
