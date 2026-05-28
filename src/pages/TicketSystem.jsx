import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TicketCard from '../components/TicketCard'
import MetricCard from '../components/MetricCard'
import { tickets, ticketStats } from '../data/tickets'

const statusFilters = [
  { id: 'all', label: '全部' },
  { id: 'processing', label: '处理中' },
  { id: 'pending_reply', label: '待回复' },
  { id: 'resolved', label: '已解决' },
]

const progressSteps = ['已提交', 'AI处理', '转人工', '已解决']

const statusConfig = {
  processing: { label: '处理中', bg: 'bg-blue-100', text: 'text-blue-700', dot: 'bg-blue-500' },
  pending_reply: { label: '待回复', bg: 'bg-amber-100', text: 'text-amber-700', dot: 'bg-amber-500' },
  resolved: { label: '已解决', bg: 'bg-green-100', text: 'text-green-700', dot: 'bg-green-500' },
  new: { label: '新工单', bg: 'bg-purple-100', text: 'text-purple-700', dot: 'bg-purple-500' },
}

const priorityConfig = {
  high: { label: '高优先级', color: 'text-red-600 bg-red-50 border-red-200' },
  medium: { label: '中优先级', color: 'text-amber-600 bg-amber-50 border-amber-200' },
  low: { label: '低优先级', color: 'text-gray-500 bg-gray-50 border-gray-200' },
}

function ConversationTimeline({ conversation }) {
  return (
    <div className="space-y-3">
      {conversation.map((item, i) => {
        const isUser = item.role === 'user'
        const isAI = item.role === 'ai'
        const isAgent = item.role === 'agent'

        return (
          <div key={i} className="flex gap-3 items-start">
            <div className="flex flex-col items-center flex-shrink-0 mt-1">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white ${
                isUser ? 'bg-gray-400' : isAI ? 'bg-gradient-to-br from-blue-500 to-indigo-600' : 'bg-emerald-500'
              }`}>
                {isUser ? '用' : isAI ? 'AI' : item.agentName?.[0] || '客'}
              </div>
              {i < conversation.length - 1 && (
                <div className="w-px h-4 bg-gray-200 mt-1" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-medium text-gray-700">
                  {isUser ? '用户' : isAI ? 'Coros AI' : item.agentName}
                </span>
                {isAI && (
                  <span className="text-xs bg-blue-50 text-blue-600 border border-blue-200 px-1.5 py-0.5 rounded-full">
                    AI 处理
                  </span>
                )}
                {isAgent && (
                  <span className="text-xs bg-emerald-50 text-emerald-600 border border-emerald-200 px-1.5 py-0.5 rounded-full">
                    人工介入
                  </span>
                )}
                <span className="text-xs text-gray-400 ml-auto flex-shrink-0">{item.time}</span>
              </div>
              <div className={`text-sm text-gray-700 rounded-xl px-3 py-2.5 leading-relaxed ${
                isUser
                  ? 'bg-gray-100'
                  : isAI
                    ? 'bg-blue-50 border border-blue-100'
                    : 'bg-emerald-50 border border-emerald-100'
              }`}>
                {item.content}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

function ProgressStepper({ progress }) {
  return (
    <div className="flex items-center">
      {progressSteps.map((step, i) => (
        <div key={i} className="flex items-center flex-1">
          <div className="flex flex-col items-center">
            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
              i < progress
                ? 'bg-blue-600 text-white'
                : i === progress
                  ? 'bg-blue-100 border-2 border-blue-600 text-blue-600'
                  : 'bg-gray-100 text-gray-400'
            }`}>
              {i < progress ? '✓' : i + 1}
            </div>
            <div className={`text-xs mt-1 whitespace-nowrap ${
              i <= progress ? 'text-blue-600 font-medium' : 'text-gray-400'
            }`}>
              {step}
            </div>
          </div>
          {i < progressSteps.length - 1 && (
            <div className={`flex-1 h-0.5 mx-1 mb-4 transition-colors ${
              i < progress ? 'bg-blue-600' : 'bg-gray-200'
            }`} />
          )}
        </div>
      ))}
    </div>
  )
}

export default function TicketSystem() {
  const navigate = useNavigate()
  const [activeFilter, setActiveFilter] = useState('all')
  const [selectedTicketId, setSelectedTicketId] = useState(tickets[0].id)
  const [replyText, setReplyText] = useState('')
  const [replyStatus, setReplyStatus] = useState(null)

  const filtered = activeFilter === 'all'
    ? tickets
    : tickets.filter(t => t.status === activeFilter)

  const selectedTicket = tickets.find(t => t.id === selectedTicketId)
  const status = statusConfig[selectedTicket?.status] || statusConfig.new
  const priority = priorityConfig[selectedTicket?.priority] || priorityConfig.low

  const handleReply = () => {
    if (!replyText.trim()) return
    setReplyStatus('sending')
    setTimeout(() => {
      setReplyStatus('sent')
      setReplyText('')
      setTimeout(() => setReplyStatus(null), 2500)
    }, 800)
  }

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Top nav */}
      <div className="bg-gray-900 text-white px-6 py-3 flex items-center gap-4 flex-shrink-0 shadow-lg">
        <button
          onClick={() => navigate('/')}
          className="text-gray-400 hover:text-white transition-colors text-sm flex items-center gap-1"
        >
          ← 返回
        </button>
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-sm">
            🎫
          </div>
          <div>
            <div className="font-semibold text-sm">工单管理系统</div>
            <div className="text-gray-400 text-xs">客服坐席后台</div>
          </div>
        </div>
        <div className="flex items-center gap-2 ml-auto">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span className="text-xs text-gray-400">实时更新中</span>
        </div>
      </div>

      {/* Stats bar */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex-shrink-0">
        <div className="grid grid-cols-4 gap-4">
          <MetricCard icon="📋" label="今日工单数" value={ticketStats.today} color="blue" trend={12} />
          <MetricCard icon="⏱️" label="平均处理时长" value={ticketStats.avgHandleTime} color="purple" />
          <MetricCard icon="🤖" label="AI 解决率" value={ticketStats.aiResolveRate} color="green" trend={8} />
          <MetricCard icon="🔴" label="待处理数量" value={ticketStats.pending} color="orange" />
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left sidebar */}
        <div className="w-80 bg-white border-r border-gray-200 flex flex-col flex-shrink-0">
          {/* Filter tabs */}
          <div className="px-4 py-3 border-b border-gray-100">
            <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
              {statusFilters.map(f => (
                <button
                  key={f.id}
                  onClick={() => setActiveFilter(f.id)}
                  className={`flex-1 text-xs py-1.5 rounded-md font-medium transition-all ${
                    activeFilter === f.id
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
            <div className="mt-2 text-xs text-gray-400 px-1">
              共 {filtered.length} 条工单
            </div>
          </div>

          {/* Ticket list */}
          <div className="flex-1 overflow-y-auto scrollbar-thin">
            {filtered.map(ticket => (
              <TicketCard
                key={ticket.id}
                ticket={ticket}
                isSelected={ticket.id === selectedTicketId}
                onClick={() => setSelectedTicketId(ticket.id)}
              />
            ))}
          </div>
        </div>

        {/* Right: ticket detail */}
        {selectedTicket && (
          <div className="flex-1 overflow-y-auto scrollbar-thin">
            <div className="p-6 max-w-4xl">
              {/* Ticket header */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 mb-4">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-xs text-gray-400 font-mono">{selectedTicket.id}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${status.bg} ${status.text}`}>
                        {status.label}
                      </span>
                      <span className={`text-xs px-2 py-0.5 rounded border font-medium ${priority.color}`}>
                        {priority.label}
                      </span>
                      {selectedTicket.aiResolved && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 border border-blue-200">
                          ✓ AI 解决
                        </span>
                      )}
                    </div>
                    <h2 className="text-base font-semibold text-gray-900">{selectedTicket.issue}</h2>
                  </div>
                  <div className="text-xs text-gray-400 text-right flex-shrink-0 ml-4">
                    <div>创建 {selectedTicket.createdAt}</div>
                    <div>更新 {selectedTicket.updatedAt}</div>
                  </div>
                </div>

                {/* Progress stepper */}
                <ProgressStepper progress={selectedTicket.progress} />
              </div>

              {/* 2-column: user info + conversation */}
              <div className="grid grid-cols-3 gap-4">
                {/* User info */}
                <div className="col-span-1 space-y-4">
                  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                    <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
                      用户信息
                    </div>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-sm font-bold">
                        {selectedTicket.avatar}
                      </div>
                      <div>
                        <div className="font-semibold text-sm text-gray-900">{selectedTicket.userName}</div>
                        <div className="text-xs text-gray-400">{selectedTicket.userId}</div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-500">设备型号</span>
                        <span className="text-gray-800 font-medium">{selectedTicket.device}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-500">配色</span>
                        <span className="text-gray-800">{selectedTicket.deviceColor}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-500">历史工单</span>
                        <span className="text-gray-800">{selectedTicket.historyCount} 条</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-500">问题分类</span>
                        <span className="text-gray-800 bg-gray-100 px-1.5 py-0.5 rounded">{selectedTicket.category}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                    <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
                      处理信息
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-500">负责客服</span>
                        <span className="text-gray-800 font-medium">{selectedTicket.assignee}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-500">工号</span>
                        <span className="text-gray-800 font-mono">{selectedTicket.assigneeId}</span>
                      </div>
                    </div>
                    <div className="mt-3 pt-3 border-t border-gray-100 flex gap-2">
                      <button className="flex-1 text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 py-1.5 rounded-lg transition-colors">
                        转派
                      </button>
                      <button className="flex-1 text-xs bg-blue-600 hover:bg-blue-700 text-white py-1.5 rounded-lg transition-colors">
                        跟进
                      </button>
                    </div>
                  </div>
                </div>

                {/* Conversation + reply */}
                <div className="col-span-2 space-y-4">
                  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                    <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-4">
                      会话记录
                    </div>
                    <ConversationTimeline conversation={selectedTicket.conversation} />
                  </div>

                  {/* Reply box */}
                  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                    <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
                      回复用户
                    </div>
                    <textarea
                      value={replyText}
                      onChange={e => setReplyText(e.target.value)}
                      placeholder="输入回复内容…"
                      rows={3}
                      className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2.5 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 resize-none"
                    />
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex gap-2">
                        <button className="text-xs text-gray-500 hover:text-gray-700 border border-gray-200 px-2.5 py-1.5 rounded-lg hover:bg-gray-50 transition-colors">
                          📎 附件
                        </button>
                        <button className="text-xs text-gray-500 hover:text-gray-700 border border-gray-200 px-2.5 py-1.5 rounded-lg hover:bg-gray-50 transition-colors">
                          🔖 模板
                        </button>
                      </div>
                      <div className="flex items-center gap-2">
                        {replyStatus === 'sent' && (
                          <span className="text-xs text-green-600 font-medium animate-fade-in">
                            ✓ 已发送
                          </span>
                        )}
                        <button
                          onClick={handleReply}
                          disabled={!replyText.trim() || replyStatus === 'sending'}
                          className={`text-sm px-4 py-1.5 rounded-lg font-medium transition-all ${
                            replyText.trim()
                              ? 'bg-blue-600 hover:bg-blue-700 text-white'
                              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          }`}
                        >
                          {replyStatus === 'sending' ? '发送中…' : '发送回复'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
