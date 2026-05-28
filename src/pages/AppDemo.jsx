import { useState, useEffect, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import ChatBubble from '../components/ChatBubble'
import ScenarioTab from '../components/ScenarioTab'
import { scenarios } from '../data/chatScenarios'

export default function AppDemo() {
  const navigate = useNavigate()
  const [activeScenarioId, setActiveScenarioId] = useState(1)
  const [displayedMessages, setDisplayedMessages] = useState([])
  const [isTyping, setIsTyping] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const messagesEndRef = useRef(null)
  const queueRef = useRef([])
  const processingRef = useRef(false)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [displayedMessages, isTyping])

  const processQueue = useCallback(() => {
    if (processingRef.current || queueRef.current.length === 0) return
    processingRef.current = true

    const msg = queueRef.current.shift()
    const delay = msg.delay || 0

    if (msg.role === 'ai') {
      setIsTyping(true)
      setTimeout(() => {
        setIsTyping(false)
        setDisplayedMessages(prev => [...prev, msg])
        processingRef.current = false
        setTimeout(processQueue, 400)
      }, delay)
    } else {
      setTimeout(() => {
        setDisplayedMessages(prev => [...prev, msg])
        processingRef.current = false
        setTimeout(processQueue, 200)
      }, delay)
    }
  }, [])

  useEffect(() => {
    const scenario = scenarios.find(s => s.id === activeScenarioId)
    if (!scenario) return

    setDisplayedMessages([])
    setIsTyping(false)
    processingRef.current = false
    queueRef.current = [...scenario.messages]

    setTimeout(() => processQueue(), 300)
  }, [activeScenarioId, processQueue])

  const handleSend = () => {
    if (!inputValue.trim()) return
    const msg = {
      id: Date.now(),
      role: 'user',
      type: 'text',
      content: inputValue.trim(),
    }
    setDisplayedMessages(prev => [...prev, msg])
    setInputValue('')
    // Simulate AI thinking
    setIsTyping(true)
    setTimeout(() => {
      setIsTyping(false)
      setDisplayedMessages(prev => [...prev, {
        id: Date.now() + 1,
        role: 'ai',
        type: 'text',
        content: '感谢您的消息！这是一个 Demo 演示，如需体验完整对话，请切换上方的场景标签 😊',
      }])
    }, 1200)
  }

  const activeScenario = scenarios.find(s => s.id === activeScenarioId)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center p-4">
      {/* Back button */}
      <button
        onClick={() => navigate('/')}
        className="fixed top-4 left-4 z-50 flex items-center gap-2 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full px-3 py-1.5 text-sm transition-all"
      >
        ← 返回
      </button>

      <div className="flex flex-col items-center gap-4">
        {/* Module label */}
        <div className="text-center">
          <div className="text-white font-semibold text-lg">APP 客服界面</div>
          <div className="text-white/50 text-sm">移动端用户视角 · 375px</div>
        </div>

        {/* Phone frame */}
        <div
          className="relative bg-white rounded-[40px] shadow-2xl overflow-hidden flex flex-col"
          style={{ width: 375, height: 780 }}
        >
          {/* Status bar */}
          <div className="bg-gray-900 px-6 pt-3 pb-2 flex items-center justify-between flex-shrink-0">
            <span className="text-white text-xs font-medium">9:41</span>
            <div className="w-24 h-5 bg-black rounded-full" />
            <div className="flex items-center gap-1">
              <div className="flex gap-0.5 items-end">
                <div className="w-1 h-2 bg-white rounded-sm" />
                <div className="w-1 h-3 bg-white rounded-sm" />
                <div className="w-1 h-4 bg-white rounded-sm" />
              </div>
              <span className="text-white text-xs ml-1">100%</span>
            </div>
          </div>

          {/* App nav bar */}
          <div className="bg-gray-900 px-4 pb-3 flex-shrink-0">
            <div className="flex items-center gap-3">
              <button className="text-gray-400 text-lg">←</button>
              <div className="flex items-center gap-2 flex-1">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-xs font-bold">
                  C
                </div>
                <div>
                  <div className="text-white text-sm font-semibold">Coros AI</div>
                  <div className="flex items-center gap-1">
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                    <span className="text-green-400 text-xs">在线服务中</span>
                  </div>
                </div>
              </div>
              <button className="text-gray-400 text-lg">⋮</button>
            </div>
          </div>

          {/* Scenario tabs */}
          <div className="bg-gray-50 px-3 py-2 border-b border-gray-200 flex-shrink-0">
            <ScenarioTab
              scenarios={scenarios}
              activeId={activeScenarioId}
              onChange={setActiveScenarioId}
            />
          </div>

          {/* Scenario label */}
          <div className="bg-blue-50 px-4 py-2 flex items-center gap-2 flex-shrink-0">
            <span className="text-base">{activeScenario?.icon}</span>
            <div>
              <span className="text-xs font-semibold text-blue-800">{activeScenario?.title}</span>
              <span className="text-xs text-blue-500 ml-2">· 演示场景</span>
            </div>
          </div>

          {/* Messages area */}
          <div className="flex-1 overflow-y-auto px-3 py-4 bg-gray-50 scrollbar-thin" style={{ minHeight: 0 }}>
            {/* Date chip */}
            <div className="text-center mb-4">
              <span className="text-xs bg-gray-200 text-gray-500 px-3 py-1 rounded-full">今天</span>
            </div>

            {displayedMessages.map((msg) => (
              <ChatBubble
                key={msg.id}
                message={msg}
                isTyping={false}
              />
            ))}

            {isTyping && (
              <ChatBubble
                message={{ id: 'typing', role: 'ai', type: 'text', content: '' }}
                isTyping={true}
              />
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input area */}
          <div className="bg-white border-t border-gray-200 px-3 py-3 flex-shrink-0">
            <div className="flex items-center gap-2">
              <button className="text-gray-400 hover:text-gray-600 p-1 transition-colors">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-11H8v2h4v4h2v-4h4v-2h-4V7h-2v4z"/>
                </svg>
              </button>
              <div className="flex-1 bg-gray-100 rounded-full px-4 py-2 flex items-center">
                <input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="输入消息…"
                  className="bg-transparent text-sm text-gray-800 placeholder-gray-400 outline-none flex-1"
                />
              </div>
              <button
                onClick={handleSend}
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                  inputValue.trim()
                    ? 'bg-blue-600 text-white hover:bg-blue-700 scale-100'
                    : 'bg-gray-200 text-gray-400'
                }`}
              >
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                </svg>
              </button>
            </div>
          </div>

          {/* Home indicator */}
          <div className="bg-white h-6 flex items-center justify-center flex-shrink-0">
            <div className="w-28 h-1 bg-gray-300 rounded-full" />
          </div>
        </div>

        {/* Scene hint */}
        <div className="text-white/40 text-xs text-center">
          切换上方标签体验不同场景 · 场景对话自动播放
        </div>
      </div>
    </div>
  )
}
