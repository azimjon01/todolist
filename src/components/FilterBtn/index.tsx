import { useEffect, useRef, useState } from "react";
import { FilterOutline } from "react-ionicons";
import { SetState } from "../../types";
import { TFilter } from "../RenderTodos/type";

interface FilterBtnProps {
  setFilter: SetState<TFilter>;
}

const FilterBtn = ({ setFilter }: FilterBtnProps) => {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleMenuToggle = () => {
    setShowMenu(!showMenu);
  };

  const handleFilterChange = (
    newFilter: "all" | "completed" | "uncompleted",
  ) => {
    setFilter(newFilter);
    setShowMenu(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={menuRef} className="relative inline-block">
      <button
        onClick={handleMenuToggle}
        className="flex items-center bg-[#1e2329] hover:bg-[#F6C90E] rounded-md cursor-pointer py-3 px-3"
      >
        <FilterOutline color={"#fff"} />
      </button>
      {showMenu && (
        <div className="absolute mt-2 bg-[#1e2329] rounded-md shadow z-50">
          <span
            onClick={() => handleFilterChange("all")}
            className="flex border-b border-white items-center w-full p-2 text-[#fff] cursor-pointer hover:bg-[#F6C90E] rounded-t-md"
          >
            All
          </span>
          <span
            onClick={() => handleFilterChange("completed")}
            className="flex border-b border-white items-center w-full p-2 text-[#fff] cursor-pointer hover:bg-[#F6C90E]"
          >
            Completed
          </span>
          <span
            onClick={() => handleFilterChange("uncompleted")}
            className="flex  items-center w-full p-2 text-[#fff] cursor-pointer hover:bg-[#F6C90E] rounded-b-md"
          >
            Uncompleted
          </span>
        </div>
      )}
    </div>
  );
};

export default FilterBtn;
