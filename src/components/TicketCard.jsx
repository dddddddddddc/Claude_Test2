const statusConfig = {
  processing: { label: '处理中', bg: 'bg-blue-100', text: 'text-blue-700' },
  pending_reply: { label: '待回复', bg: 'bg-amber-100', text: 'text-amber-700' },
  resolved: { label: '已解决', bg: 'bg-green-100', text: 'text-green-700' },
  new: { label: '新工单', bg: 'bg-purple-100', text: 'text-purple-700' },
}

const priorityConfig = {
  high: { label: '高', bg: 'bg-red-100', text: 'text-red-600' },
  medium: { label: '中', bg: 'bg-amber-100', text: 'text-amber-600' },
  low: { label: '低', bg: 'bg-gray-100', text: 'text-gray-500' },
}

export default function TicketCard({ ticket, isSelected, onClick }) {
  const status = statusConfig[ticket.status] || statusConfig.new
  const priority = priorityConfig[ticket.priority] || priorityConfig.low

  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-4 py-3.5 border-b border-gray-100 hover:bg-gray-50 transition-colors ${
        isSelected ? 'bg-blue-50 border-l-4 border-l-blue-500' : 'border-l-4 border-l-transparent'
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
            {ticket.avatar}
          </div>
          <div className="min-w-0">
            <div className="font-medium text-sm text-gray-900">{ticket.userName}</div>
            <div className="text-xs text-gray-400">{ticket.device}</div>
          </div>
        </div>
        <div className="flex flex-col items-end gap-1 flex-shrink-0">
          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${status.bg} ${status.text}`}>
            {status.label}
          </span>
          <span className={`text-xs px-1.5 py-0.5 rounded font-medium ${priority.bg} ${priority.text}`}>
            {priority.label}
          </span>
        </div>
      </div>
      <div className="mt-2 text-xs text-gray-600 line-clamp-2 pl-9">
        {ticket.issue}
      </div>
      <div className="mt-1.5 flex items-center gap-2 pl-9">
        <span className="text-xs text-gray-400">{ticket.updatedAt}</span>
        <span className="text-xs text-gray-300">·</span>
        <span className="text-xs text-gray-400">{ticket.category}</span>
        {ticket.aiResolved && (
          <>
            <span className="text-xs text-gray-300">·</span>
            <span className="text-xs text-green-600 bg-green-50 px-1.5 py-0.5 rounded">AI解决</span>
          </>
        )}
      </div>
    </button>
  )
}
