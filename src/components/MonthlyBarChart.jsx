import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

function MonthlyBarChart({ expenses }) {
  const monthTotals = {};

  expenses.forEach((exp) => {
    const monthKey = exp.date.slice(0, 7); // "2026-09"
    monthTotals[monthKey] = (monthTotals[monthKey] || 0) + exp.amount;
  });

  const data = Object.keys(monthTotals)
    .sort()
    .map((month) => ({
      month,
      total: monthTotals[month],
    }));

  if (data.length === 0) {
    return (
      <div className="card">
        <h2>Monthly Spending Trend</h2>
        <p className="empty-state">No data to show yet.</p>
      </div>
    );
  }

  return (
    <div className="card">
      <h2>Monthly Spending Trend</h2>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#444460" />
          <XAxis dataKey="month" stroke="#a0a0c0" fontSize={12} />
          <YAxis stroke="#a0a0c0" fontSize={12} />
          <Tooltip
            contentStyle={{ background: '#2a2a3d', border: '1px solid #444460', borderRadius: '8px', color: '#eaeaea' }}
            formatter={(value) => `Rs. ${value}`}
          />
          <Bar dataKey="total" fill="#6a5acd" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default MonthlyBarChart;