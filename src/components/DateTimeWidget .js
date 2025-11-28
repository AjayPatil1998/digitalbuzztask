import { useState } from "react";
import dayjs from "dayjs";

export default function DateTimeWidget({ }) {
  const today = dayjs();
  const [currentMonth, setCurrentMonth] = useState(dayjs());
  const [selectedDate, setSelectedDate] = useState(today);
  const [range, setRange] = useState("Today");


  const [displayValue, setDisplayValue] = useState(
    dayjs().format("DD MMM YYYY, hh:mm A")
  );
 console.log("displayValue", displayValue)
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const [time, setTime] = useState({
    hour: today.hour() % 12 || 12,
    minute: today.minute(),
    ampm: today.hour() >= 12 ? "PM" : "AM",
  });

  const daysInMonth = currentMonth.daysInMonth();
  const firstDay = currentMonth.startOf("month").day();


  const handleSelectDay = (day) => {
    const newDate = currentMonth.date(day);
    if (newDate.isBefore(today, "day")) return;
    setSelectedDate(newDate);
  };

 
  const handleSet = () => {
    const finalDate = selectedDate
      .hour(time.ampm === "PM" ? time.hour + 12 : time.hour)
      .minute(time.minute);


    setDisplayValue(finalDate.format("DD MMM YYYY, hh:mm A"));
    setRange("Custom");

  };

  const changeHour = (val) => {
    setTime((t) => ({
      ...t,
      hour: Math.min(12, Math.max(1, t.hour + val)),
    }));
  };

  const changeMinute = (val) => {
    setTime((t) => ({
      ...t,
      minute: (t.minute + val + 60) % 60,
    }));
  };

  const handleRangeChange = (val) => {
    setRange(val);

    switch (val) {
      case "Today":
        setDisplayValue(dayjs().format("DD MMM YYYY, hh:mm A"));
        break;

      case "Last 7 Days":
        setDisplayValue(
          `${dayjs().subtract(7, "day").format("DD MMM YYYY")} - ${dayjs().format(
            "DD MMM YYYY"
          )}`
        );
        break;

      case "This Month":
        setDisplayValue(
          `${dayjs().startOf("month").format("DD MMM")} - ${dayjs().format(
            "DD MMM"
          )}`
        );
        break;

      default:
        break;
    }
  };

  return (
    <div className="flex gap-6 p-6">
      {/* ---------------- -----------------WIDGET ------------------------------- */}
      <div className="bg-[#0E0F1A] text-white p-4 rounded-xl w-[300px] shadow-xl">

        {/* --------------------------------Header--------------------------------- */}
        <div className="flex justify-between items-center mb-4">
          <i
            onClick={() => setCurrentMonth(currentMonth.subtract(1, "month"))}
            className="pi pi-chevron-left"
          ></i>

          <div className="font-semibold text-lg">
            {currentMonth.format("MMMM YYYY")}
          </div>

          <i
            onClick={() => setCurrentMonth(currentMonth.add(1, "month"))}
            className="pi pi-chevron-right"
          ></i>
        </div>

        {/*--------------------------------- Weekdays------------------------------- */}
        <div className="grid grid-cols-7 text-center text-[12px] mb-1 opacity-60">
          {weekDays.map((day) => (
            <div>{day}</div>
          ))}
        </div>

        {/*--------------------------------- Calendar------------------------------- */}
        <div className="grid grid-cols-7 text-center gap-1 mb-4">
          {Array(daysInMonth)
            .fill("")
            .map((_, i) => {
              const day = i + 1;
              const dayDate = currentMonth.date(day);
              const isPast = dayDate.isBefore(today, "day");
              const isSelected = dayDate.isSame(selectedDate, "day");

              return (
                <button
                  key={day}
                  onClick={() => handleSelectDay(day)}
                  className={`h-8 w-8 flex items-center justify-center rounded-full
                  ${isSelected ? "bg-green-500 text-black" : ""}
                  ${isPast ? "opacity-30 cursor-not-allowed" : "hover:bg-gray-700"}
                `}
                >
                  {day}
                </button>
              );
            })}
        </div>

        {/* ------------------------Time Selection--------------------------- */}
        <div className="flex justify-center gap-4 mb-4">
          {/* -------------------------Hour---------------------------------- */}
          <div className="flex flex-col items-center gap-2">
            <i className="pi pi-chevron-up" onClick={() => changeHour(1)}></i>
            <div className="text-[18px] bg-white text-black font-semibold p-1 px-2 rounded-sm">
              {time.hour.toString().padStart(2, "0")}
            </div>
            <i className="pi pi-chevron-down" onClick={() => changeHour(-1)}></i>
          </div>

          {/*--------------------------- Minute---------------------------- */}
          <div className="flex flex-col items-center gap-2">
            <i className="pi pi-chevron-up" onClick={() => changeMinute(1)}></i>
            <div className="text-[18px] bg-white text-black font-semibold p-1 px-2 rounded-sm">
              {time.minute.toString().padStart(2, "0")}
            </div>
            <i className="pi pi-chevron-down" onClick={() => changeMinute(-1)}></i>
          </div>

          {/* ------------------------AM / PM --------------------------------*/}
          <div className="flex flex-col items-center gap-2">
            <i
              className="pi pi-chevron-up"
              onClick={() =>
                setTime((t) => ({ ...t, ampm: t.ampm === "AM" ? "PM" : "AM" }))
              }
            ></i>
            <div className="text-[16px] border border-white p-1 rounded-sm">
              {time.ampm}
            </div>
            <i
              className="pi pi-chevron-down"
              onClick={() =>
                setTime((t) => ({ ...t, ampm: t.ampm === "AM" ? "PM" : "AM" }))
              }
            ></i>
          </div>
        </div>

        {/*-------------------------- Buttons----------------------- */}
        <div className="flex justify-between mt-4">
          <button className="text-gray-400" onClick={()=>{setDisplayValue(); setSelectedDate()}}>
            Cancel
          </button>
          <button className="text-white font-semibold" onClick={handleSet}>
            Set
          </button>
        </div>
      </div>

      {/* ---------------- Right ---------------- */}
      <div className="bg-[#0E0F1A] text-white p-5 rounded-xl w-[300px] shadow-xl">
        <h3 className="text-lg font-semibold mb-3">Selected:</h3>

        <div className="text-green-400 font-bold text-[15px] mb-4">
          {displayValue ?? "-"}
        </div>

        <label className="text-sm opacity-60">Quick Range</label>
        <select
          className="mt-1 w-full p-2 bg-[#161826] border border-gray-700 text-white rounded-lg"
          value={range}
          onChange={(e) => handleRangeChange(e.target.value)}
        >
          <option>Today</option>
          <option>Last 7 Days</option>
          <option>This Month</option>
          <option>Custom</option>
        </select>
      </div>
    </div>
  );
}
