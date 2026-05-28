import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar, Cell,
} from 'recharts'
import MetricCard from '../components/MetricCard'
import { sentimentTrend, issueCategories, kpiData, wordCloudData, latestFeedbacks } from '../data/feedbacks'

const dateRanges = [
  { id: '7', label: '近 7 天' },
  { id: '30', label: '近 30 天' },
  { id: '90', label: '近 90 天' },
]

const sentimentConfig = {
  positive: { label: '正面', color: '#22c55e', stroke: '#22c55e' },
  neutral: { label: '中性', color: '#94a3b8', stroke: '#94a3b8' },
  negative: { label: '负面', color: '#ef4444', stroke: '#ef4444' },
}

const sourceConfig = {
  APP: { bg: 'bg-blue-100', text: 'text-blue-700' },
  邮件: { bg: 'bg-purple-100', text: 'text-purple-700' },
  社媒: { bg: 'bg-pink-100', text: 'text-pink-700' },
}

function SentimentBadge({ sentiment }) {
  const config = {
    positive: { label: '正面', bg: 'bg-green-100', text: 'text-green-700', dot: '🟢' },
    neutral: { label: '中性', bg: 'bg-gray-100', text: 'text-gray-600', dot: '⚪' },
    negative: { label: '负面', bg: 'bg-red-100', text: 'text-red-700', dot: '🔴' },
  }[sentiment] || { label: '未知', bg: 'bg-gray-100', text: 'text-gray-600' }

  return (
    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${config.bg} ${config.text}`}>
      {config.label}
    </span>
  )
}

const CustomTooltipLine = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray-200 rounded-xl shadow-lg px-4 py-3 text-xs">
        <div className="font-semibold text-gray-700 mb-2">{label}</div>
        {payload.map((entry, i) => (
          <div key={i} className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full" style={{ background: entry.color }} />
            <span className="text-gray-600">{entry.name}：</span>
            <span className="font-bold" style={{ color: entry.color }}>{entry.value}%</span>
          </div>
        ))}
      </div>
    )
  }
  return null
}

const CustomTooltipBar = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray-200 rounded-xl shadow-lg px-4 py-3 text-xs">
        <div className="font-semibold text-gray-700">{payload[0].payload.category}</div>
        <div className="text-indigo-600 font-bold mt-1">{payload[0].value} 条反馈</div>
      </div>
    )
  }
  return null
}

export default function VoiceDashboard() {
  const navigate = useNavigate()
  const [dateRange, setDateRange] = useState('30')

  const trendData = sentimentTrend[dateRange]
  const categoryData = issueCategories[dateRange]
  const kpi = kpiData[dateRange]

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
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-sm">
            📊
          </div>
          <div>
            <div className="font-semibold text-sm">用户声音看板</div>
            <div className="text-gray-400 text-xs">产品 & 市场团队视角</div>
          </div>
        </div>

        {/* Date range selector */}
        <div className="flex items-center gap-2 ml-auto">
          <span className="text-gray-400 text-xs">时间范围</span>
          <div className="flex gap-1 bg-white/10 rounded-lg p-1">
            {dateRanges.map(r => (
              <button
                key={r.id}
                onClick={() => setDateRange(r.id)}
                className={`text-xs px-3 py-1.5 rounded-md font-medium transition-all ${
                  dateRange === r.id
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* KPI row */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex-shrink-0">
        <div className="grid grid-cols-4 gap-4">
          <MetricCard
            icon="💬"
            label="本月反馈总量"
            value={kpi.totalFeedback.toLocaleString()}
            sub={`时段: 近 ${dateRange} 天`}
            color="blue"
            trend={15}
          />
          <MetricCard
            icon="😊"
            label="正面情绪占比"
            value={kpi.positiveRatio}
            sub="较上期 +3.2%"
            color="green"
            trend={3}
          />
          <MetricCard
            icon="🔥"
            label="最高频问题"
            value={kpi.topCategory}
            sub="占总量 31%"
            color="orange"
          />
          <MetricCard
            icon="⭐"
            label="NPS 分数"
            value={kpi.nps}
            sub="行业均值 42"
            color="purple"
            trend={5}
          />
        </div>
      </div>

      {/* Dashboard grid */}
      <div className="flex-1 overflow-y-auto scrollbar-thin p-5">
        <div className="grid grid-cols-2 gap-5 max-w-7xl mx-auto">
          {/* Top-left: Sentiment trend */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-semibold text-gray-900">情绪趋势</h3>
                <p className="text-xs text-gray-400 mt-0.5">近 {dateRange} 天正面 / 中性 / 负面占比（%）</p>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="date" tick={{ fontSize: 10, fill: '#94a3b8' }} />
                <YAxis tick={{ fontSize: 10, fill: '#94a3b8' }} unit="%" domain={[0, 100]} />
                <Tooltip content={<CustomTooltipLine />} />
                <Legend
                  wrapperStyle={{ fontSize: 11, paddingTop: 8 }}
                  formatter={(value) => sentimentConfig[value]?.label || value}
                />
                <Line
                  type="monotone"
                  dataKey="positive"
                  name="positive"
                  stroke="#22c55e"
                  strokeWidth={2.5}
                  dot={false}
                  activeDot={{ r: 5 }}
                />
                <Line
                  type="monotone"
                  dataKey="neutral"
                  name="neutral"
                  stroke="#94a3b8"
                  strokeWidth={2}
                  strokeDasharray="4 2"
                  dot={false}
                  activeDot={{ r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="negative"
                  name="negative"
                  stroke="#ef4444"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Top-right: Issue categories */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <div className="mb-4">
              <h3 className="text-sm font-semibold text-gray-900">问题分类</h3>
              <p className="text-xs text-gray-400 mt-0.5">按反馈提及频次排序</p>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={categoryData} layout="vertical" margin={{ left: 10, right: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 10, fill: '#94a3b8' }} />
                <YAxis
                  type="category"
                  dataKey="category"
                  tick={{ fontSize: 10, fill: '#374151' }}
                  width={60}
                />
                <Tooltip content={<CustomTooltipBar />} />
                <Bar dataKey="count" radius={[0, 6, 6, 0]}>
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 0 ? '#6366f1' : index < 3 ? '#818cf8' : '#a5b4fc'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Bottom-left: Word cloud */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <div className="mb-4">
              <h3 className="text-sm font-semibold text-gray-900">热词云</h3>
              <p className="text-xs text-gray-400 mt-0.5">高频用户反馈关键词</p>
            </div>
            <div
              className="flex flex-wrap gap-x-4 gap-y-3 items-center justify-center px-4 py-4 bg-gray-50 rounded-xl"
              style={{ minHeight: 200 }}
            >
              {wordCloudData.map((item, i) => (
                <span
                  key={i}
                  className="cursor-default transition-transform hover:scale-110 select-none"
                  style={{
                    fontSize: item.size,
                    color: item.color,
                    fontWeight: item.size > 28 ? 700 : item.size > 20 ? 600 : 500,
                    opacity: 0.85 + (item.size / 42) * 0.15,
                    lineHeight: 1.3,
                  }}
                  title={`提及 ${item.weight} 次`}
                >
                  {item.word}
                </span>
              ))}
            </div>
          </div>

          {/* Bottom-right: Latest feedbacks */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-semibold text-gray-900">最新反馈</h3>
                <p className="text-xs text-gray-400 mt-0.5">实时用户反馈流</p>
              </div>
              <button className="text-xs text-blue-600 hover:text-blue-700 font-medium">
                查看全部 →
              </button>
            </div>
            <div className="space-y-3 overflow-y-auto scrollbar-thin" style={{ maxHeight: 240 }}>
              {latestFeedbacks.map((fb) => {
                const src = sourceConfig[fb.source] || { bg: 'bg-gray-100', text: 'text-gray-600' }
                return (
                  <div key={fb.id} className="flex gap-3 pb-3 border-b border-gray-100 last:border-0 last:pb-0">
                    <div className="flex-shrink-0 mt-0.5">
                      <SentimentBadge sentiment={fb.sentiment} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-700 leading-relaxed line-clamp-2">{fb.content}</p>
                      <div className="flex items-center gap-2 mt-1.5">
                        <span className="text-xs text-gray-400">{fb.device}</span>
                        <span className="text-gray-200">·</span>
                        <span className={`text-xs px-1.5 py-0.5 rounded font-medium ${src.bg} ${src.text}`}>
                          {fb.source}
                        </span>
                        <span className="text-gray-200">·</span>
                        <span className="text-xs text-gray-400 ml-auto flex-shrink-0">{fb.time}</span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
