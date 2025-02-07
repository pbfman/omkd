import Link from "next/link";
import { RoughNotation } from "react-rough-notation";
import cn from "classnames";
import { FC, useState } from "react";
import { getWeekDates } from "../utils/dates";

type Day = {
  date: string;
  name: string;
};

type NavigationProps = {
  selectedDate: string;
};

const Navigation: FC<NavigationProps> = ({ selectedDate }) => {
  const [today] = useState(() => new Date().toISOString().slice(0, 10));
  const [weekDays] = useState(() =>
    getWeekDates().map((date) => {
      const day = new Date(date).getDay();
      const name = ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"][day];
      return { date, name } as Day;
    })
  );
  return (
    <nav
      className="flex divide-x divide-gray-900 rounded-lg shadow isolate"
      aria-label="Tabs"
    >
      {weekDays.map((tab, tabIdx) => (
        <Link
          key={tab.name}
          href={`/${tab.date === today ? "today" : tab.date}`}
        >
          <a
            className={cn(
              tab.date === selectedDate
                ? "text-white"
                : "text-gray-300 hover:text-gray-100",
              tabIdx === 0 ? "rounded-l-lg" : "",
              tabIdx === weekDays.length - 1 ? "rounded-r-lg" : "",
              "group relative min-w-0 flex-1 overflow-hidden bg-gray-800 py-4 px-4 text-sm font-medium text-center hover:bg-gray-700 focus:z-10"
            )}
          >
            <span>
              <RoughNotation
                type="circle"
                color="#3b82f6"
                iterations={2}
                strokeWidth={3}
                padding={[8, 8, 8, 8]}
                animationDelay={1000}
                animationDuration={1000}
                show={tab.date === today}
              >
                {tab.name}
              </RoughNotation>
            </span>
            <span
              aria-hidden="true"
              className={cn(
                tab.date === selectedDate ? "bg-blue-500" : "bg-transparent",
                "absolute inset-x-0 bottom-0 h-1"
              )}
            />
          </a>
        </Link>
      ))}
    </nav>
  );
};
export default Navigation;
