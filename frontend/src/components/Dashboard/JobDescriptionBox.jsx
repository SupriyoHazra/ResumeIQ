export default function JobDescriptionBox({
  value,
  onChange,
}) {
  return (
    <textarea
      value={value}
      onChange={onChange}
      rows={10}
      placeholder="Paste Job Description Here..."
      className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-5 text-white"
    />
  );
}