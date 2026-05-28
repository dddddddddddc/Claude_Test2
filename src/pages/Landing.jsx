import { useNavigate } from 'react-router-dom'

const modules = [
  {
    id: 'app',
    path: '/app-demo',
    icon: '📱',
    title: 'AI 智能客服',
    subtitle: 'APP 客服界面',
    description: '模拟用户在 COROS APP 内联系客服的完整体验，涵盖产品咨询、订单查询、设备排查、意见反馈与投诉五大场景。',
    role: '客服用户视角',
    roleColor: 'bg-blue-100 text-blue-700',
    gradient: 'from-blue-500 to-indigo-600',
    features: ['5 大服务场景', 'AI 打字机效果', '交互式排查流程', '订单物流卡片'],
  },
  {
    id: 'ticket',
    path: '/ticket-system',
    icon: '🎫',
    title: '工单管理系统',
    subtitle: '客服坐席后台',
    description: '桌面端工单管理系统，支持多状态筛选、AI 处理记录追踪、会话时间线浏览，实时统计今日数据。',
    role: '客服坐席视角',
    roleColor: 'bg-emerald-100 text-emerald-700',
    gradient: 'from-emerald-500 to-teal-600',
    features: ['8 条真实工单', 'AI 解决率追踪', '进度步骤条', '会话时间线'],
  },
  {
    id: 'voice',
    path: '/voice-dashboard',
    icon: '📊',
    title: '用户声音看板',
    subtitle: '产品 & 市场洞察',
    description: '数据驱动的用户反馈看板，包含情绪趋势图、问题分类分析、高频词云和最新反馈列表，支持多时段切换。',
    role: '产品市场团队视角',
    roleColor: 'bg-violet-100 text-violet-700',
    gradient: 'from-violet-500 to-purple-600',
    features: ['情绪趋势折线图', '问题分类条形图', '热词云', 'NPS 追踪'],
  },
]

export default function Landing() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950">
      {/* Header */}
      <div className="px-8 py-8">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
              <span className="text-xl">⌚</span>
            </div>
            <div>
              <div className="text-white font-bold text-lg tracking-wide">COROS</div>
              <div className="text-blue-300 text-xs">AI Customer Service Platform</div>
            </div>
          </div>
        </div>
      </div>

      {/* Hero */}
      <div className="px-8 pt-4 pb-16">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5 mb-6">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-white/80 text-sm">Demo 演示版 · All data is mocked</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
            AI 智能客服
            <span className="block bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mt-1">
              全链路演示
            </span>
          </h1>
          <p className="text-blue-200 text-lg max-w-2xl mx-auto leading-relaxed">
            从用户咨询到工单处理，再到产品洞察——体验 COROS AI 客服完整闭环
          </p>
        </div>
      </div>

      {/* Cards */}
      <div className="px-8 pb-20">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6">
          {modules.map((m) => (
            <button
              key={m.id}
              onClick={() => navigate(m.path)}
              className="group text-left bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/10 hover:border-white/20 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/30"
            >
              {/* Card gradient header */}
              <div className={`bg-gradient-to-br ${m.gradient} p-6`}>
                <div className="text-4xl mb-3">{m.icon}</div>
                <div className="text-white font-bold text-xl">{m.title}</div>
                <div className="text-white/70 text-sm mt-0.5">{m.subtitle}</div>
              </div>

              {/* Card body */}
              <div className="p-5">
                <p className="text-white/70 text-sm leading-relaxed mb-4">
                  {m.description}
                </p>

                {/* Features */}
                <div className="grid grid-cols-2 gap-1.5 mb-4">
                  {m.features.map((f, i) => (
                    <div key={i} className="flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 bg-white/40 rounded-full flex-shrink-0" />
                      <span className="text-xs text-white/60">{f}</span>
                    </div>
                  ))}
                </div>

                {/* Role badge + CTA */}
                <div className="flex items-center justify-between mt-auto">
                  <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${m.roleColor}`}>
                    {m.role}
                  </span>
                  <span className="text-white/50 group-hover:text-white/90 text-sm transition-colors">
                    进入 →
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="pb-8 text-center text-white/30 text-xs">
        COROS AI Customer Service Demo · React + Tailwind CSS · All data is mocked
      </div>
    </div>
  )
}
