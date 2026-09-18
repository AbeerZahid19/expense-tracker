import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const COLORS = ['#6a5acd', '#48c6ef', '#2ecc71', '#f39c12', '#e74c3c', '#9b59b6'];

function CategoryPieChart({ expenses }) {
  const categoryTotals = {};
  expenses.forEach((exp) => {
    categoryTotals[exp.category] = (categoryTotals[exp.category] || 0) + exp.amount;
  });

  const data = Object.keys(categoryTotals).map((category) => ({
    name: category,
    value: categoryTotals[category],
  }));

  if (data.length === 0) {
    return (
      <div className="card">
        <h2>Spending by Category</h2>
        <p className="empty-state">No data to show yet.</p>
      </div>
    );
  }

  return (
    <div className="card">
      <h2>Spending by Category</h2>
      <ResponsiveContainer width="100%" height={280}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={90}
            dataKey="value"
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{ background: '#2a2a3d', border: '1px solid #444460', borderRadius: '8px', color: '#eaeaea' }}
            formatter={(value) => `Rs. ${value}`}
          />
          <Legend wrapperStyle={{ color: '#b0b0d0', fontSize: '0.85rem' }} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default CategoryPieChart;