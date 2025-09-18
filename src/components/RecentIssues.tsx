import { MapPin, Clock, Eye, MessageCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import React, { useState } from 'react';

const issues = [
  {
    id: 1,
    title: "Large pothole on MG Road",
    description: "Deep pothole causing traffic congestion near Metro station",
    location: "MG Road, Bengaluru",
    status: "In Progress",
    priority: "High",
    timeAgo: "2 hours ago",
    views: 45,
    comments: 8,
    category: "Roads",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400",
  },
  {
    id: 2,
    title: "Garbage overflow near park",
    description: "Overflowing bins attracting pests and causing smell",
    location: "Cubbon Park, Bengaluru",
    status: "Reported",
    priority: "Medium",
    timeAgo: "4 hours ago",
    views: 32,
    comments: 5,
    category: "Sanitation",
    image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=400",
  },
  {
    id: 3,
    title: "Street light not working",
    description: "Main street light out for 3 days, affecting night safety",
    location: "Brigade Road, Bengaluru",
    status: "Assigned",
    priority: "High",
    timeAgo: "6 hours ago",
    views: 67,
    comments: 12,
    category: "Electricity",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400",
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "Reported":
      return "bg-warning text-warning-foreground";
    case "In Progress":
      return "bg-primary text-primary-foreground";
    case "Assigned":
      return "bg-accent text-accent-foreground";
    case "Resolved":
      return "bg-success text-success-foreground";
    default:
      return "bg-muted text-muted-foreground";
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "High":
      return "bg-destructive text-destructive-foreground";
    case "Medium":
      return "bg-warning text-warning-foreground";
    case "Low":
      return "bg-success text-success-foreground";
    default:
      return "bg-muted text-muted-foreground";
  }
};

interface TrendData {
  day: string;
  date: string;
  reported: number;
  resolved: number;
  pending: number;
}

const RecentIssues: React.FC = () => {
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'quarter'>('week');
  const [selectedMetric, setSelectedMetric] = useState<'all' | 'reported' | 'resolved' | 'pending'>('all');

  const weeklyData: TrendData[] = [
    { day: 'Mon', date: '2024-01-15', reported: 45, resolved: 38, pending: 7 },
    { day: 'Tue', date: '2024-01-16', reported: 52, resolved: 41, pending: 11 },
    { day: 'Wed', date: '2024-01-17', reported: 48, resolved: 44, pending: 4 },
    { day: 'Thu', date: '2024-01-18', reported: 61, resolved: 52, pending: 9 },
    { day: 'Fri', date: '2024-01-19', reported: 58, resolved: 49, pending: 9 },
    { day: 'Sat', date: '2024-01-20', reported: 34, resolved: 31, pending: 3 },
    { day: 'Sun', date: '2024-01-21', reported: 28, resolved: 25, pending: 3 }
  ];

  const monthlyData: TrendData[] = [
    { day: 'Week 1', date: '2024-01-01', reported: 312, resolved: 278, pending: 34 },
    { day: 'Week 2', date: '2024-01-08', reported: 345, resolved: 312, pending: 33 },
    { day: 'Week 3', date: '2024-01-15', reported: 298, resolved: 285, pending: 13 },
    { day: 'Week 4', date: '2024-01-22', reported: 367, resolved: 331, pending: 36 }
  ];

  const quarterlyData: TrendData[] = [
    { day: 'Jan', date: '2024-01', reported: 1342, resolved: 1206, pending: 136 },
    { day: 'Feb', date: '2024-02', reported: 1289, resolved: 1198, pending: 91 },
    { day: 'Mar', date: '2024-03', reported: 1456, resolved: 1321, pending: 135 },
    { day: 'Apr', date: '2024-04', reported: 1389, resolved: 1287, pending: 102 }
  ];

  const getData = () => {
    switch (timeRange) {
      case 'week': return weeklyData;
      case 'month': return monthlyData;
      case 'quarter': return quarterlyData;
      default: return weeklyData;
    }
  };

  const data = getData();
  const maxValue = Math.max(...data.flatMap(d => [d.reported, d.resolved, d.pending]));

  const getBarHeight = (value: number) => {
    return (value / maxValue) * 100;
  };

  const getColor = (type: string) => {
    switch (type) {
      case 'reported': return '#ef4444';
      case 'resolved': return '#22c55e';
      case 'pending': return '#f97316';
      default: return '#6b7280';
    }
  };

  const getTrendIcon = (trend: string, value: number) => {
    if (trend === 'up') {
      return (
        <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
        </svg>
      );
    } else if (trend === 'down') {
      return (
        <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
      );
    }
    return (
      <svg className="w-4 h-4 text-slate-500" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
      </svg>
    );
  };

  const calculateTrend = (data: TrendData[], key: keyof TrendData) => {
    if (data.length < 2) return { trend: 'stable', value: 0 };
    const current = data[data.length - 1][key] as number;
    const previous = data[data.length - 2][key] as number;
    const change = ((current - previous) / previous) * 100;
    
    if (Math.abs(change) < 2) return { trend: 'stable', value: 0 };
    return { trend: change > 0 ? 'up' : 'down', value: Math.abs(change) };
  };

  const reportedTrend = calculateTrend(data, 'reported');
  const resolvedTrend = calculateTrend(data, 'resolved');

  return (
    <section className="py-16 bg-slate-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Weekly Trends
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Track issue reporting and resolution patterns over time with interactive visualizations
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Chart */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-slate-200">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-slate-800">Issue Trends</h3>
                <div className="flex space-x-2">
                  {(['week', 'month', 'quarter'] as const).map((range) => (
                    <button
                      key={range}
                      onClick={() => setTimeRange(range)}
                      className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                        timeRange === range
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {range.charAt(0).toUpperCase() + range.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Chart Controls */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex space-x-4">
                  {(['all', 'reported', 'resolved', 'pending'] as const).map((metric) => (
                    <button
                      key={metric}
                      onClick={() => setSelectedMetric(metric)}
                      className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                        selectedMetric === metric
                          ? 'bg-slate-800 text-white'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {metric.charAt(0).toUpperCase() + metric.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Bar Chart */}
              <div className="h-80">
                <svg viewBox="0 0 400 300" className="w-full h-full">
                  {/* Grid lines */}
                  <g className="grid-lines">
                    {[0, 25, 50, 75, 100].map((percentage) => (
                      <line
                        key={percentage}
                        x1="40"
                        y1={20 + (percentage * 2.4)}
                        x2="380"
                        y2={20 + (percentage * 2.4)}
                        stroke="#e2e8f0"
                        strokeWidth="1"
                      />
                    ))}
                  </g>

                  {/* Bars */}
                  <g className="bars">
                    {data.map((item, index) => {
                      const barWidth = 320 / data.length;
                      const x = 40 + (index * barWidth) + (barWidth * 0.1);
                      const barSpacing = barWidth * 0.8;

                      return (
                        <g key={index}>
                          {(selectedMetric === 'all' || selectedMetric === 'reported') && (
                            <rect
                              x={x}
                              y={280 - getBarHeight(item.reported) * 2.4}
                              width={barSpacing / 3}
                              height={getBarHeight(item.reported) * 2.4}
                              fill="#ef4444"
                              rx="2"
                              className="transition-all duration-300 hover:opacity-80"
                            />
                          )}
                          {(selectedMetric === 'all' || selectedMetric === 'resolved') && (
                            <rect
                              x={x + barSpacing / 3}
                              y={280 - getBarHeight(item.resolved) * 2.4}
                              width={barSpacing / 3}
                              height={getBarHeight(item.resolved) * 2.4}
                              fill="#22c55e"
                              rx="2"
                              className="transition-all duration-300 hover:opacity-80"
                            />
                          )}
                          {(selectedMetric === 'all' || selectedMetric === 'pending') && (
                            <rect
                              x={x + (barSpacing * 2) / 3}
                              y={280 - getBarHeight(item.pending) * 2.4}
                              width={barSpacing / 3}
                              height={getBarHeight(item.pending) * 2.4}
                              fill="#f97316"
                              rx="2"
                              className="transition-all duration-300 hover:opacity-80"
                            />
                          )}
                        </g>
                      );
                    })}
                  </g>

                  {/* Labels */}
                  <g className="labels">
                    {data.map((item, index) => {
                      const barWidth = 320 / data.length;
                      const x = 40 + (index * barWidth) + (barWidth / 2);
                      
                      return (
                        <text
                          key={index}
                          x={x}
                          y="295"
                          textAnchor="middle"
                          className="text-xs fill-slate-600"
                        >
                          {item.day}
                        </text>
                      );
                    })}
                  </g>

                  {/* Y-axis labels */}
                  <g className="y-labels">
                    {[0, 25, 50, 75, 100].map((percentage) => (
                      <text
                        key={percentage}
                        x="35"
                        y={285 - (percentage * 2.4)}
                        textAnchor="end"
                        className="text-xs fill-slate-600"
                      >
                        {Math.round((percentage / 100) * maxValue)}
                      </text>
                    ))}
                  </g>

                  {/* Legend */}
                  <g className="legend">
                    <g transform="translate(40, 10)">
                      <rect x="0" y="0" width="12" height="12" fill="#ef4444" rx="2" />
                      <text x="16" y="10" className="text-xs fill-slate-600">Reported</text>
                    </g>
                    <g transform="translate(100, 10)">
                      <rect x="0" y="0" width="12" height="12" fill="#22c55e" rx="2" />
                      <text x="16" y="10" className="text-xs fill-slate-600">Resolved</text>
                    </g>
                    <g transform="translate(170, 10)">
                      <rect x="0" y="0" width="12" height="12" fill="#f97316" rx="2" />
                      <text x="16" y="10" className="text-xs fill-slate-600">Pending</text>
                    </g>
                  </g>
                </svg>
              </div>
            </div>
          </div>

          {/* Summary Cards */}
          <div className="space-y-6">
            {/* Overall Stats */}
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-slate-200">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Overall Stats</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Total Reported</span>
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold text-slate-900">
                      {data.reduce((sum, item) => sum + item.reported, 0).toLocaleString()}
                    </span>
                    {getTrendIcon(reportedTrend.trend, reportedTrend.value)}
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Total Resolved</span>
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold text-slate-900">
                      {data.reduce((sum, item) => sum + item.resolved, 0).toLocaleString()}
                    </span>
                    {getTrendIcon(resolvedTrend.trend, resolvedTrend.value)}
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Resolution Rate</span>
                  <span className="font-semibold text-green-600">
                    {Math.round(
                      (data.reduce((sum, item) => sum + item.resolved, 0) /
                        data.reduce((sum, item) => sum + item.reported, 0)) *
                        100
                    )}%
                  </span>
                </div>
              </div>
            </div>

            {/* Daily Average */}
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-slate-200">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Daily Average</h3>
              
              <div className="space-y-3">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">
                    {Math.round(data.reduce((sum, item) => sum + item.reported, 0) / data.length)}
                  </div>
                  <div className="text-sm text-slate-600">Issues Reported</div>
                </div>
                
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">
                    {Math.round(data.reduce((sum, item) => sum + item.resolved, 0) / data.length)}
                  </div>
                  <div className="text-sm text-slate-600">Issues Resolved</div>
                </div>
              </div>
            </div>

            {/* Peak Days */}
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-slate-200">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Peak Days</h3>
              
              <div className="space-y-2">
                {data
                  .sort((a, b) => b.reported - a.reported)
                  .slice(0, 3)
                  .map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">{item.day}</span>
                      <span className="text-sm font-medium text-slate-900">{item.reported}</span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RecentIssues;