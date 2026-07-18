export default function StatCard({
  title,
  value,
  color = "text-white",
}) {
  return (
    <div className="
      bg-slate-900
      rounded-3xl
      border
      border-slate-800
      p-6
    ">
      <p className="text-slate-400">
        {title}
      </p>

      <h2 className={`text-4xl font-bold mt-3 ${color}`}>
        {value}
      </h2>
    </div>
  );
}