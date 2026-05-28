export default function ScenarioTab({ scenarios, activeId, onChange }) {
  return (
    <div className="flex gap-1.5 overflow-x-auto scrollbar-thin pb-0.5">
      {scenarios.map((s) => (
        <button
          key={s.id}
          onClick={() => onChange(s.id)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
            activeId === s.id
              ? 'bg-blue-600 text-white shadow-sm'
              : 'bg-white/80 text-gray-600 hover:bg-white hover:text-gray-900'
          }`}
        >
          <span>{s.icon}</span>
          <span>{s.label}</span>
        </button>
      ))}
    </div>
  )
}
