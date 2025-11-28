import DateTimeWidget from "./components/DateTimeWidget ";
import { useState } from "react";
import "primeicons/primeicons.css";
import MultiSelectDropdown from "./components/Multiselect";
import ChartWidget from "./components/Charts";
import MultiDocumentUpload from "./components/FileSelection";

export default function App() {
  const [open, setOpen] = useState(true);
  const [value, setValue] = useState(null);

  const [activatedTab, setActivatedTab] = useState(1);

  return (
    <div className="">
      <div className="flex justify-center gap-4 pt-10 mb-8">
        <button
          onClick={() => setActivatedTab(1)}
          className={`px-4 py-2 rounded-lg font-semibold ${
            activatedTab == 1 ? "bg-green-500" : "bg-gray-500"
          }  text-white hover:bg-gray-700`}
        >
          Date & Time Widget
        </button>
        <button
          onClick={() => setActivatedTab(2)}
          className={`px-4 py-2 rounded-lg font-semibold ${
            activatedTab == 2 ? "bg-green-500" : "bg-gray-500"
          }  text-white hover:bg-gray-700`}
        >
          Dropdown Widget
        </button>
        <button
          onClick={() => setActivatedTab(3)}
          className={`px-4 py-2 rounded-lg font-semibold ${
            activatedTab == 3 ? "bg-green-500" : "bg-gray-500"
          }  text-white hover:bg-gray-700`}
        >
          Chart Widget
        </button>
        <button
          onClick={() => setActivatedTab(4)}
          className={`px-4 py-2 rounded-lg font-semibold ${
            activatedTab == 4 ? "bg-green-500" : "bg-gray-500"
          }  text-white hover:bg-gray-700`}
        >
         Add Documents
        </button>
      </div>

      <div className="flex items-center justify-center">
        <div className="">
          {(activatedTab == 1 && <DateTimeWidget />)}
          {(activatedTab == 2 && <MultiSelectDropdown />)}
          {(activatedTab == 3 && <ChartWidget />)}
          {(activatedTab == 4 && <MultiDocumentUpload />)}
        </div>
      </div>
    </div>
  );
}
