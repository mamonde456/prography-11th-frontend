import useUIStore from "../lib/store/useUIStore";

export default function Lable() {
  const category = useUIStore((state) => state.category);
  return (
    <div className="w-full h-20 p-5">
      <h2 className="text-[24px]">{category}</h2>
      <h3>회원 등록</h3>
    </div>
  );
}
