import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { AlertTriangle, MapPin, Users, Clock, TrendingUp, Filter } from 'lucide-react';

interface Issue {
  id: string;
  title: string;
  category: string;
  urgency: 'critical' | 'high' | 'medium' | 'low';
  reporterCount: number;
  reportedAt: string;
  location: string;
  description: string;
}

interface DistrictData {
  id: string;
  name: string;
  x: number;
  y: number;
  issues: Issue[];
  totalIssues: number;
  totalReporters: number;
  criticalIssues: number;
  highIssues: number;
  mediumIssues: number;
  lowIssues: number;
}

const MaharashtraDashboard: React.FC = () => {
  const [selectedUrgency, setSelectedUrgency] = useState<string>('all');
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);

  // Sample district data for Maharashtra
  const districts: DistrictData[] = [
    {
      id: 'mumbai',
      name: 'Mumbai',
      x: 120,
      y: 280,
      totalIssues: 245,
      totalReporters: 189,
      criticalIssues: 45,
      highIssues: 89,
      mediumIssues: 76,
      lowIssues: 35,
      issues: [
        { id: '1', title: 'Water Pipeline Burst', category: 'Infrastructure', urgency: 'critical', reporterCount: 23, reportedAt: '2 hours ago', location: 'Andheri West', description: 'Major water pipeline burst affecting 5000+ residents' },
        { id: '2', title: 'Potholes on Western Express', category: 'Roads', urgency: 'high', reporterCount: 15, reportedAt: '4 hours ago', location: 'Goregaon', description: 'Multiple large potholes causing traffic congestion' }
      ]
    },
    {
      id: 'pune',
      name: 'Pune',
      x: 180,
      y: 320,
      totalIssues: 189,
      totalReporters: 156,
      criticalIssues: 32,
      highIssues: 67,
      mediumIssues: 59,
      lowIssues: 31,
      issues: [
        { id: '3', title: 'Garbage Collection Delay', category: 'Sanitation', urgency: 'high', reporterCount: 18, reportedAt: '6 hours ago', location: 'Kothrud', description: 'No garbage collection for 3 days in residential area' }
      ]
    },
    {
      id: 'nagpur',
      name: 'Nagpur',
      x: 320,
      y: 220,
      totalIssues: 134,
      totalReporters: 98,
      criticalIssues: 21,
      highIssues: 45,
      mediumIssues: 48,
      lowIssues: 20,
      issues: []
    },
    {
      id: 'nashik',
      name: 'Nashik',
      x: 200,
      y: 250,
      totalIssues: 167,
      totalReporters: 134,
      criticalIssues: 28,
      highIssues: 56,
      mediumIssues: 52,
      lowIssues: 31,
      issues: []
    },
    {
      id: 'aurangabad',
      name: 'Aurangabad',
      x: 250,
      y: 290,
      totalIssues: 156,
      totalReporters: 123,
      criticalIssues: 25,
      highIssues: 48,
      mediumIssues: 49,
      lowIssues: 34,
      issues: []
    },
    {
      id: 'solapur',
      name: 'Solapur',
      x: 220,
      y: 380,
      totalIssues: 98,
      totalReporters: 78,
      criticalIssues: 15,
      highIssues: 32,
      mediumIssues: 31,
      lowIssues: 20,
      issues: []
    }
  ];

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'critical': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getUrgencyIcon = (urgency: string) => {
    switch (urgency) {
      case 'critical': return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'high': return <AlertTriangle className="h-4 w-4 text-orange-500" />;
      case 'medium': return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'low': return <Clock className="h-4 w-4 text-green-500" />;
      default: return null;
    }
  };

  const getDistrictColor = (district: DistrictData) => {
    if (district.criticalIssues > 0) return '#ef4444';
    if (district.highIssues > 0) return '#f97316';
    if (district.mediumIssues > 0) return '#eab308';
    return '#22c55e';
  };

  const filteredDistricts = useMemo(() => {
    if (selectedUrgency === 'all') return districts;
    return districts.filter(district => {
      switch (selectedUrgency) {
        case 'critical': return district.criticalIssues > 0;
        case 'high': return district.highIssues > 0;
        case 'medium': return district.mediumIssues > 0;
        case 'low': return district.lowIssues > 0;
        default: return true;
      }
    });
  }, [selectedUrgency]);

  const topDistricts = [...districts]
    .sort((a, b) => b.totalIssues - a.totalIssues)
    .slice(0, 5);

  const totalIssues = districts.reduce((sum, district) => sum + district.totalIssues, 0);
  const totalReporters = districts.reduce((sum, district) => sum + district.totalReporters, 0);
  const criticalCount = districts.reduce((sum, district) => sum + district.criticalIssues, 0);

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Maharashtra Civic Issues Dashboard</h1>
          <p className="text-gray-600">Real-time monitoring of civic issues across Maharashtra districts</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">Total Issues</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{totalIssues}</div>
              <div className="text-sm text-gray-500 mt-1">Across Maharashtra</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">Active Reporters</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{totalReporters}</div>
              <div className="text-sm text-gray-500 mt-1">Citizen reporters</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">Critical Issues</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{criticalCount}</div>
              <div className="text-sm text-gray-500 mt-1">Need immediate attention</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">Avg. Reports/District</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{Math.round(totalIssues / districts.length)}</div>
              <div className="text-sm text-gray-500 mt-1">Daily average</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Map Section */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>District Overview</span>
                  <div className="flex gap-2">
                    <Button
                      variant={selectedUrgency === 'all' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSelectedUrgency('all')}
                    >
                      All
                    </Button>
                    <Button
                      variant={selectedUrgency === 'critical' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSelectedUrgency('critical')}
                      className="bg-red-500 hover:bg-red-600"
                    >
                      Critical
                    </Button>
                    <Button
                      variant={selectedUrgency === 'high' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSelectedUrgency('high')}
                      className="bg-orange-500 hover:bg-orange-600"
                    >
                      High
                    </Button>
                  </div>
                </CardTitle>
                <CardDescription>Click on districts to view detailed issue reports</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <svg viewBox="0 0 400 450" className="w-full h-96 border rounded-lg bg-gray-50">
                    {/* Maharashtra state outline */}
                    <path
                      d="M 150 200 L 350 180 L 380 220 L 370 280 L 350 350 L 300 400 L 250 420 L 200 410 L 160 380 L 140 340 L 130 300 L 140 250 Z"
                      fill="#e5e7eb"
                      stroke="#9ca3af"
                      strokeWidth="2"
                    />
                    
                    {filteredDistricts.map((district) => (
                      <g key={district.id}>
                        <circle
                          cx={district.x}
                          cy={district.y}
                          r={Math.max(8, Math.min(20, district.totalIssues / 10))}
                          fill={getDistrictColor(district)}
                          stroke="white"
                          strokeWidth="2"
                          className="cursor-pointer hover:opacity-80 transition-opacity"
                          onClick={() => setSelectedDistrict(district.id)}
                        />
                        <text
                          x={district.x}
                          y={district.y + 30}
                          textAnchor="middle"
                          className="text-xs font-medium fill-gray-700 pointer-events-none"
                        >
                          {district.name}
                        </text>
                        <text
                          x={district.x}
                          y={district.y + 5}
                          textAnchor="middle"
                          className="text-xs font-bold fill-white pointer-events-none"
                        >
                          {district.totalIssues}
                        </text>
                      </g>
                    ))}
                  </svg>
                </div>

                {/* Legend */}
                <div className="mt-4 flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span>Critical Issues</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                    <span>High Priority</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <span>Medium Priority</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span>Low Priority</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Top Districts & Issue Details */}
          <div className="space-y-6">
            {/* Top Districts */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Top Districts by Issues
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {topDistricts.map((district, index) => (
                    <div key={district.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                          index === 0 ? 'bg-yellow-400 text-yellow-900' :
                          index === 1 ? 'bg-gray-400 text-gray-900' :
                          index === 2 ? 'bg-orange-400 text-orange-900' :
                          'bg-gray-200 text-gray-600'
                        }`}>
                          {index + 1}
                        </div>
                        <div>
                          <div className="font-medium">{district.name}</div>
                          <div className="text-sm text-gray-500">{district.totalReporters} reporters</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-lg">{district.totalIssues}</div>
                        <div className="flex gap-1">
                          {district.criticalIssues > 0 && (
                            <Badge variant="destructive" className="text-xs">{district.criticalIssues}</Badge>
                          )}
                          {district.highIssues > 0 && (
                            <Badge className="bg-orange-500 text-xs">{district.highIssues}</Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Issue Details */}
            {selectedDistrict && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Recent Issues</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedDistrict(null)}
                    >
                      ×
                    </Button>
                  </CardTitle>
                  <CardDescription>
                    Issues reported in {districts.find(d => d.id === selectedDistrict)?.name}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {districts
                      .find(d => d.id === selectedDistrict)
                      ?.issues.slice(0, 3)
                      .map((issue) => (
                        <div key={issue.id} className="border rounded-lg p-3">
                          <div className="flex items-start justify-between mb-2">
                            <h4 className="font-medium text-sm">{issue.title}</h4>
                            <Badge className={`${getUrgencyColor(issue.urgency)} text-white text-xs`}>
                              {issue.urgency}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{issue.description}</p>
                          <div className="flex items-center gap-4 text-xs text-gray-500">
                            <span className="flex items-center gap-1">
                              <Users className="h-3 w-3" />
                              {issue.reporterCount} reporters
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {issue.location}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {issue.reportedAt}
                            </span>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MaharashtraDashboard;