import { useEffect, useState } from 'react'

function TypingDots() {
  return (
    <div className="flex items-center gap-1 px-4 py-3">
      <span className="dot-bounce w-2 h-2 bg-gray-400 rounded-full inline-block" />
      <span className="dot-bounce w-2 h-2 bg-gray-400 rounded-full inline-block" />
      <span className="dot-bounce w-2 h-2 bg-gray-400 rounded-full inline-block" />
    </div>
  )
}

function KnowledgeCard({ content }) {
  return (
    <div className="bg-white rounded-2xl rounded-tl-sm shadow-sm border border-gray-100 overflow-hidden max-w-[280px]">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="text-white font-semibold text-sm">{content.title}</span>
        </div>
        <div className="flex items-center gap-2 mt-1.5">
          <span className="text-xs bg-white/20 text-white px-2 py-0.5 rounded-full">
            {content.intent}
          </span>
          <span className="text-xs text-white/80">置信度 {content.confidence}%</span>
        </div>
      </div>
      <div className="p-3 space-y-3">
        {content.sections.map((s, i) => (
          <div key={i}>
            <div className="text-xs font-semibold text-gray-800 mb-1">{s.heading}</div>
            <div className="text-xs text-gray-600 leading-relaxed">{s.text}</div>
          </div>
        ))}
        <div className="pt-2 border-t border-gray-100">
          <div className="text-xs text-gray-400 mb-1.5">参考文档</div>
          <div className="space-y-1">
            {content.docs.map((d, i) => (
              <a key={i} href={d.url}
                className="flex items-center gap-1.5 text-xs text-blue-600 hover:text-blue-700">
                <span>📄</span>
                <span className="underline underline-offset-2">{d.label}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function OrderCard({ content }) {
  const statusColor = content.status === 'shipped'
    ? 'bg-blue-100 text-blue-700'
    : content.status === 'delivered'
      ? 'bg-green-100 text-green-700'
      : 'bg-gray-100 text-gray-600'

  return (
    <div className="bg-white rounded-2xl rounded-tl-sm shadow-sm border border-gray-100 overflow-hidden max-w-[280px]">
      <div className="bg-gradient-to-r from-emerald-500 to-teal-600 px-4 py-3">
        <div className="text-white text-sm font-semibold">订单物流查询</div>
        <div className="text-white/80 text-xs mt-0.5">{content.orderId}</div>
      </div>
      <div className="p-3 space-y-2.5">
        <div>
          <div className="text-xs text-gray-400">商品</div>
          <div className="text-xs font-medium text-gray-800 mt-0.5">{content.product}</div>
        </div>
        <div className="flex items-center gap-2">
          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColor}`}>
            {content.statusLabel}
          </span>
          <span className="text-xs text-gray-500">{content.logistics.company}</span>
          <span className="text-xs text-gray-400">{content.logistics.trackingNo}</span>
        </div>
        <div className="bg-blue-50 rounded-lg p-2.5">
          <div className="text-xs text-blue-700 font-medium">📍 {content.logistics.lastLocation}</div>
          <div className="text-xs text-blue-600 mt-0.5">{content.logistics.lastUpdate}</div>
        </div>
        <div className="bg-amber-50 rounded-lg p-2.5">
          <div className="text-xs text-amber-800 font-medium">⏰ 预计送达</div>
          <div className="text-xs text-amber-700 mt-0.5">{content.logistics.eta}</div>
        </div>
        <div className="space-y-1.5 pt-1">
          {content.timeline.map((t, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full flex-shrink-0 ${t.done ? 'bg-blue-500' : 'bg-gray-200'}`} />
              <span className={`text-xs ${t.done ? 'text-gray-700' : 'text-gray-400'}`}>{t.event}</span>
              <span className="text-xs text-gray-400 ml-auto">{t.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function FeedbackCard({ content }) {
  const [showToast, setShowToast] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setShowToast(true), 600)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="max-w-[280px]">
      <div className="bg-white rounded-2xl rounded-tl-sm shadow-sm border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-r from-violet-500 to-purple-600 px-4 py-3">
          <div className="text-white text-sm font-semibold">反馈已记录</div>
          <div className="text-white/80 text-xs mt-0.5">#{content.feedbackId}</div>
        </div>
        <div className="p-3 space-y-2.5">
          <div>
            <div className="text-xs text-gray-400">反馈内容</div>
            <div className="text-xs text-gray-800 mt-0.5 font-medium">{content.summary}</div>
          </div>
          <div className="flex flex-wrap gap-1">
            {content.tags.map((tag, i) => (
              <span key={i} className="text-xs bg-purple-50 text-purple-700 px-2 py-0.5 rounded-full">
                {tag}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-1.5 bg-green-50 rounded-lg px-2.5 py-2">
            <span className="text-green-600 text-sm">✓</span>
            <span className="text-xs text-green-700 font-medium">{content.status}</span>
          </div>
          <div>
            <div className="text-xs text-gray-400">提交时间</div>
            <div className="text-xs text-gray-600 mt-0.5">{content.submittedAt}</div>
          </div>
          <div className="text-xs text-gray-500 bg-gray-50 rounded-lg p-2 leading-relaxed">
            {content.followUp}
          </div>
        </div>
      </div>
      {showToast && (
        <div className="mt-2 flex items-center gap-2 bg-indigo-50 border border-indigo-200 rounded-xl px-3 py-2 animate-fade-in">
          <span className="text-indigo-500 text-sm">🪁</span>
          <span className="text-xs text-indigo-700">{content.feishuNotice}</span>
        </div>
      )}
    </div>
  )
}

function TransferCard({ content }) {
  return (
    <div className="bg-white rounded-2xl rounded-tl-sm shadow-sm border border-gray-100 overflow-hidden max-w-[280px]">
      <div className="bg-gradient-to-r from-red-500 to-rose-600 px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
          <div className="text-white text-sm font-semibold">正在转接人工客服</div>
        </div>
        <div className="text-white/80 text-xs mt-0.5">{content.reason}</div>
      </div>
      <div className="p-4">
        <div className="flex flex-col items-center py-3">
          <div className="relative">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center text-white text-xl font-bold transfer-ring">
              {content.agentName?.[0]}
            </div>
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-400 rounded-full border-2 border-white" />
          </div>
          <div className="text-sm font-semibold text-gray-900 mt-3">{content.agentName}</div>
          <div className="text-xs text-gray-500 mt-0.5">{content.agentTitle}</div>
          <div className="text-xs text-gray-400 mt-0.5">工号 {content.agentId}</div>
        </div>
        <div className="space-y-2 mt-2">
          <div className="flex items-center justify-between bg-amber-50 rounded-lg px-3 py-2">
            <span className="text-xs text-amber-700">预计等待时间</span>
            <span className="text-xs font-semibold text-amber-800">{content.waitTime}</span>
          </div>
          <div className="flex items-center justify-between bg-red-50 rounded-lg px-3 py-2">
            <span className="text-xs text-red-700">处理优先级</span>
            <span className="text-xs font-semibold text-red-800">{content.priority}</span>
          </div>
        </div>
        <div className="text-xs text-gray-500 text-center mt-3 leading-relaxed">
          {content.message}
        </div>
      </div>
    </div>
  )
}

export function StepFlow({ content, onComplete }) {
  const [completedSteps, setCompletedSteps] = useState([])
  const [expandedTip, setExpandedTip] = useState(null)

  const handleAction = (stepId) => {
    setCompletedSteps(prev => [...prev, stepId])
    if (stepId === content.steps.length) {
      onComplete?.()
    }
  }

  const activeStep = content.steps.find(s => !completedSteps.includes(s.id))

  return (
    <div className="bg-white rounded-2xl rounded-tl-sm shadow-sm border border-gray-100 overflow-hidden max-w-[280px]">
      <div className="bg-gradient-to-r from-orange-500 to-amber-500 px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="text-white text-base">🔧</span>
          <div className="text-white text-sm font-semibold">{content.title}</div>
        </div>
        <div className="text-white/80 text-xs mt-0.5">
          {completedSteps.length}/{content.steps.length} 步已完成
        </div>
      </div>
      <div className="p-3 space-y-2">
        {content.steps.map((step) => {
          const isDone = completedSteps.includes(step.id)
          const isActive = !isDone && step.id === (activeStep?.id)

          return (
            <div key={step.id}
              className={`rounded-xl border p-3 transition-all ${
                isDone
                  ? 'bg-green-50 border-green-200'
                  : isActive
                    ? 'bg-blue-50 border-blue-200'
                    : 'bg-gray-50 border-gray-200 opacity-60'
              }`}
            >
              <div className="flex items-center gap-2">
                <div className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                  isDone ? 'bg-green-500 text-white' : isActive ? 'bg-blue-500 text-white' : 'bg-gray-300 text-white'
                }`}>
                  {isDone ? '✓' : step.id}
                </div>
                <div className="text-xs font-semibold text-gray-800">{step.title}</div>
              </div>

              {(isActive || isDone) && (
                <div className="mt-2 text-xs text-gray-600 leading-relaxed pl-7">
                  {step.description}
                </div>
              )}

              {isActive && (
                <div className="mt-2.5 space-y-1.5 pl-7">
                  <button
                    onClick={() => handleAction(step.id)}
                    className="w-full text-xs bg-blue-600 hover:bg-blue-700 text-white py-1.5 rounded-lg font-medium transition-colors"
                  >
                    ✓ {step.action}
                  </button>
                  <button
                    onClick={() => setExpandedTip(expandedTip === step.id ? null : step.id)}
                    className="w-full text-xs border border-gray-200 hover:bg-gray-100 text-gray-600 py-1.5 rounded-lg transition-colors"
                  >
                    {step.actionAlt}
                  </button>
                  {expandedTip === step.id && (
                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-2 text-xs text-amber-800 leading-relaxed animate-fade-in">
                      💡 {step.tip}
                    </div>
                  )}
                </div>
              )}

              {isDone && (
                <div className="mt-1.5 pl-7 text-xs text-green-600 font-medium">✓ {step.action}</div>
              )}
            </div>
          )
        })}

        {completedSteps.length === content.steps.length && (
          <div className="bg-green-50 border border-green-200 rounded-xl p-3 text-xs text-green-700 text-center font-medium animate-fade-in">
            🎉 排查完成！如问题仍存在，日志已提交给技术团队，将在 24h 内跟进。
          </div>
        )}
      </div>
    </div>
  )
}

export default function ChatBubble({ message, isTyping, onStepComplete }) {
  const [displayed, setDisplayed] = useState('')
  const [isAnimating, setIsAnimating] = useState(false)

  const isUser = message.role === 'user'

  useEffect(() => {
    if (isUser || message.type !== 'text') {
      setDisplayed(message.content || '')
      return
    }
    setDisplayed('')
    setIsAnimating(true)
    const text = message.content || ''
    let i = 0
    const speed = Math.max(20, Math.min(50, 2000 / text.length))
    const interval = setInterval(() => {
      i++
      setDisplayed(text.slice(0, i))
      if (i >= text.length) {
        clearInterval(interval)
        setIsAnimating(false)
      }
    }, speed)
    return () => clearInterval(interval)
  }, [message.id, message.content])

  if (isUser) {
    return (
      <div className="flex justify-end mb-3 animate-fade-in">
        <div className="max-w-[75%] bg-blue-600 text-white rounded-2xl rounded-tr-sm px-4 py-2.5 text-sm leading-relaxed shadow-sm">
          {message.content}
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-start gap-2 mb-3 animate-fade-in">
      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5 shadow-sm">
        C
      </div>
      <div className="flex flex-col gap-1 max-w-[82%]">
        {isTyping ? (
          <div className="bg-gray-100 rounded-2xl rounded-tl-sm shadow-sm">
            <TypingDots />
          </div>
        ) : message.type === 'text' ? (
          <div className="bg-gray-100 rounded-2xl rounded-tl-sm px-4 py-2.5 text-sm text-gray-800 leading-relaxed shadow-sm">
            {displayed}
            {isAnimating && <span className="typing-cursor" />}
          </div>
        ) : message.type === 'knowledge_card' ? (
          <KnowledgeCard content={message.content} />
        ) : message.type === 'order_card' ? (
          <OrderCard content={message.content} />
        ) : message.type === 'step_flow' ? (
          <StepFlow content={message.content} onComplete={onStepComplete} />
        ) : message.type === 'feedback_card' ? (
          <FeedbackCard content={message.content} />
        ) : message.type === 'transfer_card' ? (
          <TransferCard content={message.content} />
        ) : null}
      </div>
    </div>
  )
}
