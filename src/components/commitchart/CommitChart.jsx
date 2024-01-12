import React, { useEffect, useState } from 'react';
import { format, addWeeks, addMonths } from 'date-fns';
import './CommitChart.css'
import CommitIcon from './CommitIcon';
import CustomDot from './CustomDot'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const CommitChart = ({ weeklyCounts, activeRepository, repoColors }) => {
  const [chartData, setChartData] = useState([]);
  const [hoveredData, setHoveredData] = useState(null);

  useEffect(() => {
    const allWeeks = Object.values(weeklyCounts)
      .flatMap(data => Object.keys(data).map(Number))
      .reduce((uniqueWeeks, week) => (uniqueWeeks.includes(week) ? uniqueWeeks : [...uniqueWeeks, week]), []);

    const sortedWeeks = allWeeks.sort((a, b) => a - b);

    const datasets = Object.entries(weeklyCounts).map(([label, data]) => {
      return sortedWeeks.map((week) => ({
        week: week + 1,
        [label]: data[week] || 0,
      }));
    });

    const mergedData = sortedWeeks.map((week, weekIndex) => {
      const dataPoint = { week: week + 1 };
      datasets.forEach((dataset, index) => {
        const label = Object.keys(weeklyCounts)[index];
        dataPoint[`dataset${index + 1}`] = dataset[weekIndex][label];
      });
      return dataPoint;
    });

    setChartData(mergedData);
  }, [weeklyCounts]);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const startDate = addMonths(new Date(), -4);
      const isoWeekStartDate = addWeeks(startDate, label);

      const hoveredDataPoint = payload.find(entry => entry.name === hoveredData?.label);

      return (
        <div className="custom-tooltip">
          <p>{`Week of ${format(isoWeekStartDate, 'MMM yyyy')}`}</p>
          {hoveredDataPoint && (
            <div key={hoveredDataPoint.dataKey} style={{ color: hoveredDataPoint.color }}>
              <CommitIcon color={hoveredDataPoint.color} size={16} />
              {`:${hoveredDataPoint.value}`}
            </div>
          )}
        </div>
      );
    }

    return null;
  };


  const handleMouseEnter = (data, label) => {
    setHoveredData({ data, label });
  };

  const handleMouseLeave = () => {
    setHoveredData(null);
  };

  return (
    <div className="commit-chart-container">
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="week" />
          <YAxis />
          <Tooltip content={<CustomTooltip />} label="" />
          <Legend />

          {Object.keys(weeklyCounts).map((label, index) => (
            <Line
              key={label}
              type="monotone"
              dataKey={`dataset${index + 1}`}
              name={label}
              stroke={repoColors[label]}
              strokeWidth={4}
              activeDot={{ r: 10, onMouseEnter: (data) => handleMouseEnter(data, label), onMouseLeave: handleMouseLeave }}
              dot={<CustomDot />}
              opacity={activeRepository && activeRepository !== label ? 0.2 : 1}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CommitChart;
