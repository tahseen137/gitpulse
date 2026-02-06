'use client';

import { useMemo } from 'react';

interface ContributionDay {
  date: string;
  count: number;
}

interface ContributionHeatmapProps {
  data: ContributionDay[];
}

export default function ContributionHeatmap({ data }: ContributionHeatmapProps) {
  const weeks = useMemo(() => {
    const result: ContributionDay[][] = [];
    let currentWeek: ContributionDay[] = [];

    data.forEach((day, index) => {
      currentWeek.push(day);
      if ((index + 1) % 7 === 0) {
        result.push(currentWeek);
        currentWeek = [];
      }
    });

    if (currentWeek.length > 0) {
      result.push(currentWeek);
    }

    return result;
  }, [data]);

  const getColor = (count: number) => {
    if (count === 0) return 'bg-gray-800';
    if (count <= 2) return 'bg-green-900';
    if (count <= 4) return 'bg-green-700';
    if (count <= 6) return 'bg-green-500';
    return 'bg-green-400';
  };

  return (
    <div className="overflow-x-auto">
      <div className="inline-flex gap-1">
        {weeks.map((week, weekIndex) => (
          <div key={weekIndex} className="flex flex-col gap-1">
            {week.map((day, dayIndex) => (
              <div
                key={dayIndex}
                className={`w-3 h-3 rounded-sm ${getColor(day.count)} hover:ring-2 hover:ring-green-500 transition-all cursor-pointer group relative`}
                title={`${day.date}: ${day.count} contributions`}
              >
                <div className="hidden group-hover:block absolute z-10 bg-gray-900 text-xs text-white px-2 py-1 rounded whitespace-nowrap -top-8 left-1/2 transform -translate-x-1/2">
                  {day.date}: {day.count} contributions
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2 mt-4 text-xs text-gray-400">
        <span>Less</span>
        <div className="flex gap-1">
          <div className="w-3 h-3 rounded-sm bg-gray-800" />
          <div className="w-3 h-3 rounded-sm bg-green-900" />
          <div className="w-3 h-3 rounded-sm bg-green-700" />
          <div className="w-3 h-3 rounded-sm bg-green-500" />
          <div className="w-3 h-3 rounded-sm bg-green-400" />
        </div>
        <span>More</span>
      </div>
    </div>
  );
}
