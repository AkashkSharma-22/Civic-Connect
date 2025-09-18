import React, { useState, useEffect } from 'react';

interface StateData {
  name: string;
  issues: number;
  x: number;
  y: number;
  color: string;
}

const HeroSection: React.FC = () => {
  const [hoveredState, setHoveredState] = useState<string | null>(null);
  const [selectedState, setSelectedState] = useState<string | null>(null);

  const indiaStates: StateData[] = [
    { name: 'Maharashtra', issues: 342, x: 150, y: 280, color: '#ef4444' },
    { name: 'Delhi', issues: 289, x: 180, y: 160, color: '#f97316' },
    { name: 'Karnataka', issues: 234, x: 120, y: 320, color: '#f97316' },
    { name: 'Tamil Nadu', issues: 198, x: 160, y: 380, color: '#eab308' },
    { name: 'Uttar Pradesh', issues: 456, x: 220, y: 180, color: '#dc2626' },
    { name: 'Gujarat', issues: 167, x: 100, y: 240, color: '#f59e0b' },
    { name: 'Rajasthan', issues: 134, x: 120, y: 200, color: '#fbbf24' },
    { name: 'West Bengal', issues: 189, x: 280, y: 240, color: '#f97316' },
    { name: 'Kerala', issues: 145, x: 140, y: 420, color: '#f59e0b' },
    { name: 'Punjab', issues: 98, x: 160, y: 120, color: '#fbbf24' },
    { name: 'Haryana', issues: 87, x: 170, y: 140, color: '#fbbf24' },
    { name: 'Madhya Pradesh', issues: 223, x: 180, y: 220, color: '#f97316' },
    { name: 'Bihar', issues: 267, x: 260, y: 200, color: '#f97316' },
    { name: 'Odisha', issues: 156, x: 240, y: 280, color: '#f59e0b' },
    { name: 'Assam', issues: 112, x: 320, y: 180, color: '#fbbf24' },
    { name: 'Telangana', issues: 178, x: 180, y: 320, color: '#f59e0b' },
    { name: 'Andhra Pradesh', issues: 201, x: 200, y: 340, color: '#eab308' }
  ];

  const maxIssues = Math.max(...indiaStates.map(s => s.issues));

  const getHeatmapColor = (issues: number) => {
    const intensity = issues / maxIssues;
    if (intensity > 0.8) return '#dc2626';
    if (intensity > 0.6) return '#ef4444';
    if (intensity > 0.4) return '#f97316';
    if (intensity > 0.2) return '#f59e0b';
    return '#fbbf24';
  };

  const getCircleSize = (issues: number) => {
    const baseSize = 8;
    const maxSize = 25;
    const ratio = issues / maxIssues;
    return baseSize + (maxSize - baseSize) * ratio;
  };

  return (
    <section className="relative bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-20 overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6">
            Civic Issues Across
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600"> India</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Visualizing civic issues across Indian states with interactive heatmaps and real-time data insights
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* India Heatmap */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-slate-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-slate-800">India Heatmap</h3>
                <div className="flex items-center space-x-2 text-sm text-slate-600">
                  <span>Total Issues: {indiaStates.reduce((sum, state) => sum + state.issues, 0)}</span>
                </div>
              </div>
              
              <div className="relative">
                <svg 
                  viewBox="0 0 400 500" 
                  className="w-full h-auto max-h-[500px] rounded-lg bg-slate-50"
                  style={{ minHeight: '400px' }}
                >
                  {/* India outline */}
                  <path
                    d="M 50 100 L 350 100 L 350 450 L 50 450 Z"
                    fill="none"
                    stroke="#e2e8f0"
                    strokeWidth="2"
                  />
                  
                  {/* State boundaries */}
                  <g className="state-boundaries">
                    {indiaStates.map((state, index) => (
                      <circle
                        key={index}
                        cx={state.x}
                        cy={state.y}
                        r={getCircleSize(state.issues)}
                        fill={getHeatmapColor(state.issues)}
                        fillOpacity={hoveredState === state.name ? 0.9 : 0.7}
                        stroke={hoveredState === state.name ? '#1e293b' : '#ffffff'}
                        strokeWidth={hoveredState === state.name ? 2 : 1}
                        className="cursor-pointer transition-all duration-300 hover:scale-110"
                        onMouseEnter={() => setHoveredState(state.name)}
                        onMouseLeave={() => setHoveredState(null)}
                        onClick={() => setSelectedState(state.name)}
                      />
                    ))}
                  </g>
                  
                  {/* State labels */}
                  <g className="state-labels">
                    {indiaStates.map((state, index) => (
                      <text
                        key={`label-${index}`}
                        x={state.x}
                        y={state.y - getCircleSize(state.issues) - 8}
                        textAnchor="middle"
                        className="text-xs font-medium fill-slate-700 pointer-events-none"
                        style={{ 
                          opacity: hoveredState === state.name ? 1 : 0.8,
                          fontSize: hoveredState === state.name ? '12px' : '10px'
                        }}
                      >
                        {state.name}
                      </text>
                    ))}
                  </g>
                </svg>
                
                {/* Heatmap legend */}
                <div className="mt-4 flex items-center justify-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-slate-600">Low</span>
                    <div className="flex space-x-1">
                      {[
                        { color: '#fbbf24', label: '20%' },
                        { color: '#f59e0b', label: '40%' },
                        { color: '#f97316', label: '60%' },
                        { color: '#ef4444', label: '80%' },
                        { color: '#dc2626', label: '100%' }
                      ].map((item, index) => (
                        <div
                          key={index}
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: item.color }}
                          title={item.label}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-slate-600">High</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* State Details Panel */}
          <div className="space-y-6">
            {/* Selected State Details */}
            {selectedState && (
              <div className="bg-white rounded-2xl shadow-xl p-6 border border-slate-200">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-semibold text-slate-800">{selectedState}</h4>
                  <button
                    onClick={() => setSelectedState(null)}
                    className="text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">Total Issues:</span>
                    <span className="font-semibold text-slate-800">
                      {indiaStates.find(s => s.name === selectedState)?.issues || 0}
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2 rounded-full transition-all duration-500"
                      style={{ 
                        width: `${((indiaStates.find(s => s.name === selectedState)?.issues || 0) / maxIssues) * 100}%` 
                      }}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Quick Stats */}
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-slate-200">
              <h4 className="text-lg font-semibold text-slate-800 mb-4">Quick Stats</h4>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Total States</span>
                  <span className="font-semibold text-slate-800">{indiaStates.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Total Issues</span>
                  <span className="font-semibold text-slate-800">{indiaStates.reduce((sum, state) => sum + state.issues, 0)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Avg per State</span>
                  <span className="font-semibold text-slate-800">
                    {Math.round(indiaStates.reduce((sum, state) => sum + state.issues, 0) / indiaStates.length)}
                  </span>
                </div>
              </div>
            </div>

            {/* Hover Info */}
            {hoveredState && !selectedState && (
              <div className="bg-white rounded-2xl shadow-xl p-6 border border-slate-200">
                <h4 className="text-lg font-semibold text-slate-800 mb-2">{hoveredState}</h4>
                <p className="text-slate-600">
                  {indiaStates.find(s => s.name === hoveredState)?.issues || 0} issues reported
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;