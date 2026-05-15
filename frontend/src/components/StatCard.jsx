export default function StatCard({ title, value, change }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-lg hover:scale-105 transition">
      <p className="text-gray-400">{title}</p>

      <h2 className="text-3xl font-bold mt-2">{value}</h2>

      <span className="text-green-400 mt-2 inline-block">
        {change}
      </span>
    </div>
  );
}