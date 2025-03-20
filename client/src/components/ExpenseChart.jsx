// client/src/components/ExpenseChart.jsx
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { useSelector } from 'react-redux';

ChartJS.register(ArcElement, Tooltip, Legend);

function ExpenseChart({ expenses }) {
  const { categories } = useSelector((state) => state.categories);

  const expensesByCategory = expenses.reduce((acc, expense) => {
    if (!acc[expense.category]) {
      acc[expense.category] = 0;
    }
    acc[expense.category] += expense.amount;
    return acc;
  }, {});

  const labels = Object.keys(expensesByCategory);
  const data = Object.values(expensesByCategory);

  const getCategoryColor = (categoryName) => {
    const category = categories.find((cat) => cat.name === categoryName);
    return category ? category.color : getRandomColor();
  };

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Expenses by Category',
        data,
        backgroundColor: labels.map((label) => getCategoryColor(label)),
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Expense Distribution'
      }
    },
    radius: '50%'
  };

  return (
    <div className="chart-container" style={{ height: '300px', width: '300px', margin: '0 auto' }}>
      <h3>Expense Distribution</h3>
      <Pie data={chartData} options={options} />
    </div>
  );
}

export default ExpenseChart;
