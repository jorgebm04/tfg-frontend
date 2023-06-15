import React,{useState} from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, Tooltip } from 'recharts';
import moment from 'moment';

const StackedBarChart = ({ subscriptions }) => {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  // Filter subscriptions based on selected year
  const filteredSubscriptions = subscriptions.filter(
    (subscription) => new Date(subscription.contractDate).getFullYear() === selectedYear
  );

  const data = calculateMonthlyTotals(filteredSubscriptions,selectedYear); // Calculate monthly totals

  const handleYearChange = (event) => {
    setSelectedYear(Number(event.target.value));
  };

  return (
    <div>
      <label htmlFor="year-selector">Select Year:</label>
      <select id="year-selector" value={selectedYear} onChange={handleYearChange}>
      <option value={2021}>2021</option>
        <option value={2022}>2022</option>
        <option value={2023}>2023</option>
      </select>

      <BarChart width={1200} height={600} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        {filteredSubscriptions.map((subscription, index) => (
          <Bar
            key={subscription.id}
            dataKey={`price${index}`}
            name={subscription.name}
            stackId="stack"
            fill={getBarColor(index)}
          />
        ))}
      </BarChart>
    </div>
  );
};

const calculateMonthlyTotals = (subscriptions, selectedYear) => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const data = months.map((month) => ({ month }));

  subscriptions.forEach((subscription, index) => {
    const { price, contractDate, subscriptionFrequency } = subscription;
    const contractYear = new Date(contractDate).getFullYear();
    const contractMonth = new Date(contractDate).getMonth();

    for (let i = 0; i < months.length; i++) {
      const currentYear = selectedYear;
      const currentMonth = i;

      const yearDifference = currentYear - contractYear;
      const totalMonthsPassed =
        yearDifference * 12 + (currentMonth - contractMonth) + (yearDifference > 0 ? 0 : 12);

      const monthsPassed = totalMonthsPassed % subscriptionFrequency;

      if (monthsPassed === 0 && totalMonthsPassed >= 0) {
        if (data[i][`price${index}`]) {
          data[i][`price${index}`] += price;
        } else {
          data[i][`price${index}`] = price;
        }
      } else {
        data[i][`price${index}`] = 0;
      }
    }
  });

  return data;
};




const getBarColor = (index) => {
    const colors = [
        '#8884d8', // Purple
        '#61dafb', // React Color
        '#82ca9d', // Green
        '#ffc658', // Yellow
        '#ff7300', // Orange
        '#ff004d', // Pink
        '#00bcd4', // Cyan
        '#4caf50', // Lime Green
        '#f44336', // Red
        '#9c27b0', // Violet
        '#e91e63', // Magenta
        '#3f51b5', // Indigo
        '#009688'  // Teal
      ];
  return colors[index % colors.length];
};

const MonthlyTotalsSummary = ({subscriptions}) => {
  return (
    <div>
      <h1>Subscription Expenses</h1>
      <StackedBarChart subscriptions={subscriptions} />
    </div>
  );
};

export default MonthlyTotalsSummary;