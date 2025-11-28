import axios from "axios";
import { useEffect, useState, useRef } from "react";

export default function MultiSelectDropdown() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false)
  
  console.log("loading", loading)
  const [selected, setSelected] = useState([]);
  console.log("selected", selected)
  const dropdownRef = useRef(null);

  useEffect(()=>{
   fetchList()
  },[])

  const fetchList = async () => {
    try {
      setLoading(true)
      const res = await axios.get("https://679a0520747b09cdcccd62a3.mockapi.io/list/name");
      console.log("res", res)
      if (res?.status === 200) {
        setOptions(res?.data)
      } else {
        console.error("No data found in API response:", res);
      }
    } catch (error) {
      console.error("Error fetching pickup:", error);
    } finally{
      setLoading(false)
    }
  };


  const filteredOptions = options.filter((opt) =>
    opt?.name?.toLowerCase().includes(query.toLowerCase())
  );


  const toggleSelect = (item) => {
    if (selected.includes(item)) {
      setSelected(selected.filter((s) => s !== item));
    } else {
      setSelected([...selected, item]);
    }
  };

  const clearAll = () => setSelected([]);

  return (
    <div className="w-full max-w-md" ref={dropdownRef}>
      {/*------------------------------- Label-------------------------------------- */}
      <label className="block mb-1 font-medium text-gray-700">
        Property Sub-Type
        <span className="text-red-500">*</span>
      </label>

      {/*-------------------------- Input Container -----------------------------------*/}
      <div
        className="border border-gray-300 rounded-lg p-2 flex flex-wrap items-center gap-1 cursor-pointer bg-white w-[400px]"
        onClick={() => setOpen(!open)}
      >
        {/*-------------------------- Selected Chips------------------------------------- */}
        {selected.length > 0 ? (
          selected.map((item) => (
            <span
              key={item}
              className="flex items-center gap-1 bg-gray-200 text-gray-700 px-2 py-1 rounded-md text-sm"
            >
              {item}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleSelect(item);
                }}
                className="text-gray-500 hover:text-black"
              >
                ×
              </button>
            </span>
          ))
        ) : (
          <span className="text-gray-400">{loading ? "Loading..." : "Select..."}</span>
        )}

        {/*------------------------------ Dropdown icon -----------------------------------------*/}
        <span className="ml-auto text-gray-600">▾</span>
      </div>

      {/*---------------------------------- Dropdown Box --------------------------------------------*/}
      {open && (
        <div className="border border-gray-300 mt-1 rounded-lg shadow-md bg-white absolute w-[400px] z-10">
          {/*------------------------------- Search Box -----------------------------------------------*/}
          <input
            type="text"
            placeholder="Search..."
            className="w-full border-b border-gray-200 p-2 outline-none"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
          />

          {/*------------------------------- Options List ----------------------------------------------*/}
          <div className="max-h-60 overflow-y-auto">
            {filteredOptions.length === 0 ? (
              <div className="p-2 text-gray-500 text-sm">No results found</div>
            ) : (
              filteredOptions.map((opt) => (
                <div
                  key={opt}
                  tabIndex={0}
                  onKeyDown={(e) => e.key === "Enter" && toggleSelect(opt?.name)}
                  className={`p-2 cursor-pointer hover:bg-gray-100 flex justify-between items-center ${
                    selected.includes(opt) ? "bg-gray-50" : ""
                  }`}
                  onClick={() => toggleSelect(opt?.name)}
                >
                  {opt?.name}
               
                </div>
              ))
            )}
          </div>

          {/* -------------------------------------------Clear All----------------------------------- */}
          {selected.length > 0 && (
            <button
              className="w-full text-left p-2 text-red-500 hover:bg-red-50 text-sm"
              onClick={clearAll}
            >
              Clear All
            </button>
          )}
        </div>
      )}
    </div>
  );
}
