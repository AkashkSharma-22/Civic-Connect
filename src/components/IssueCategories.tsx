import React, { useState } from 'react';

interface CategoryData {
  name: string;
  count: number;
  percentage: number;
  color: string;
  icon: string;
  trend: 'up' | 'down' | 'stable';
  trendValue: number;
}

const IssueCategories: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'year'>('month');

  const categories: CategoryData[] = [
    {
      name: 'Road Infrastructure',
      count: 2347,
      percentage: 28.5,
      color: '#ef4444',
      icon: '🛣️',
      trend: 'up',
      trendValue: 12.3
    },
    {
      name: 'Water Supply',
      count: 1892,
      percentage: 23.0,
      color: '#3b82f6',
      icon: '💧',
      trend: 'up',
      trendValue: 8.7
    },
    {
      name: 'Electricity',
      count: 1567,
      percentage: 19.1,
      color: '#f97316',
      icon: '⚡',
      trend: 'down',
      trendValue: -5.2
    },
    {
      name: 'Sanitation',
      count: 1234,
      percentage: 15.0,
      color: '#22c55e',
      icon: '🗑️',
      trend: 'stable',
      trendValue: 0.8
    },
    {
      name: 'Public Transport',
      count: 789,
      percentage: 9.6,
      color: '#8b5cf6',
      icon: '🚌',
      trend: 'up',
      trendValue: 15.4
    },
    {
      name: 'Street Lighting',
      count: 401,
      percentage: 4.9,
      color: '#eab308',
      icon: '💡',
      trend: 'up',
      trendValue: 22.1
    }
  ];

  const totalIssues = categories.reduce((sum, cat) => sum + cat.count, 0);

  const getTrendIcon = (trend: string, value: number) => {
    switch (trend) {
      case 'up':
        return (
          <span className="inline-flex items-center text-green-600">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
            {value}%
          </span>
        );
      case 'down':
        return (
          <span className="inline-flex items-center text-red-600">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            {Math.abs(value)}%
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center text-slate-600">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            {value}%
          </span>
        );
    }
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Issues by Category
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Comprehensive breakdown of civic issues across different categories with real-time trends
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Category Cards */}
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-slate-800">Categories Overview</h3>
              <div className="flex space-x-2">
                {(['week', 'month', 'year'] as const).map((range) => (
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

            {categories.map((category, index) => (
              <div
                key={index}
                className={`bg-white rounded-xl p-4 border transition-all duration-300 ${
                  selectedCategory === category.name
                    ? 'border-blue-500 shadow-lg scale-105'
                    : 'border-slate-200 hover:border-slate-300 hover:shadow-md'
                }`}
                onClick={() => setSelectedCategory(
                  selectedCategory === category.name ? null : category.name
                )}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div 
                      className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl"
                      style={{ backgroundColor: `${category.color}15` }}
                    >
                      {category.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-800">{category.name}</h4>
                      <p className="text-sm text-slate-600">{category.count.toLocaleString()} issues</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-slate-900">{category.percentage}%</div>
                    {getTrendIcon(category.trend, category.trendValue)}
                  </div>
                </div>

                {/* Progress bar */}
                <div className="mt-3">
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div
                      className="h-2 rounded-full transition-all duration-500"
                      style={{
                        width: `${category.percentage}%`,
                        backgroundColor: category.color
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Visualization Panel */}
          <div className="bg-white rounded-2xl shadow-xl p-6 border border-slate-200">
            <h3 className="text-xl font-semibold text-slate-800 mb-4">Visualization</h3>
            
            {/* Pie Chart */}
            <div className="relative">
              <svg viewBox="0 0 200 200" className="w-full h-64 mx-auto">
                <circle
                  cx="100"
                  cy="100"
                  r="80"
                  fill="none"
                  stroke="#e2e8f0"
                  strokeWidth="2"
                />
                
                {/* Pie segments */}
                {(() => {
                  let currentAngle = -90;
                  return categories.map((category, index) => {
                    const angle = (category.percentage / 100) * 360;
                    const x1 = 100 + 80 * Math.cos((currentAngle * Math.PI) / 180);
                    const y1 = 100 + 80 * Math.sin((currentAngle * Math.PI) / 180);
                    const x2 = 100 + 80 * Math.cos(((currentAngle + angle) * Math.PI) / 180);
                    const y2 = 100 + 80 * Math.sin(((currentAngle + angle) * Math.PI) / 180);
                    const largeArcFlag = angle > 180 ? 1 : 0;
                    
                    const pathData = [
                      `M 100 100`,
                      `L ${x1} ${y1}`,
                      `A 80 80 0 ${largeArcFlag} 1 ${x2} ${y2}`,
                      `Z`
                    ].join(' ');
                    
                    currentAngle += angle;
                    
                    return (
                      <g key={index}>
                        <path
                          d={pathData}
                          fill={category.color}
                          className="cursor-pointer transition-opacity duration-300"
                          opacity={selectedCategory && selectedCategory !== category.name ? 0.3 : 1}
                          onClick={() => setSelectedCategory(
                            selectedCategory === category.name ? null : category.name
                          )}
                        />
                      </g>
                    );
                  });
                })()}
                
                {/* Center text */}
                <text
                  x="100"
                  y="100"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="text-2xl font-bold fill-slate-900"
                >
                  {totalIssues.toLocaleString()}
                </text>
                <text
                  x="100"
                  y="115"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="text-sm fill-slate-600"
                >
                  Total Issues
                </text>
              </svg>
            </div>

            {/* Legend */}
            <div className="mt-6 space-y-2">
              {categories.map((category, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition-colors ${
                    selectedCategory === category.name
                      ? 'bg-blue-50 border border-blue-200'
                      : 'hover:bg-slate-50'
                  }`}
                  onClick={() => setSelectedCategory(
                    selectedCategory === category.name ? null : category.name
                  )}
                >
                  <div className="flex items-center space-x-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: category.color }}
                    />
                    <span className="text-sm text-slate-700">{category.name}</span>
                  </div>
                  <span className="text-sm font-medium text-slate-900">{category.percentage}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IssueCategories;