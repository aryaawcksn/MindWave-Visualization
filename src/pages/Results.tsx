import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Brain, 
  Download, 
  Share2, 
  Calendar, 
  Clock, 
  TrendingUp, 
  Activity,
  BarChart3,
  FileText,
  ArrowLeft,
  Filter,
  RefreshCw
} from "lucide-react";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { EEGWaveChart } from "../components/EEGWaveChart";
import { BrainActivityGauge } from "../components/BrainActivityGauge";
import { BrainActivityDonut } from "../components/BrainActivityDonut";
import { StatCard } from "../components/StatCard";
import { InsightCard } from "../components/InsightCard";

interface SessionResult {
  id: string;
  date: Date;
  duration: number; // in minutes
  brainActivityIndex: number;
  averageWaves: {
    alpha: number;
    beta: number;
    gamma: number;
    theta: number;
  };
  peakPerformance: number;
  mentalState: string;
  insights: Array<{
    id: string;
    type: "success" | "info" | "warning";
    message: string;
    timestamp: Date;
  }>;
}

export default function Results() {
  const [selectedSession, setSelectedSession] = useState<SessionResult | null>(null);
  const [chartTimeInterval, setChartTimeInterval] = useState<1 | 10 | 30 | 60>(30);
  const [isLoading, setIsLoading] = useState(true);
  const [sessions, setSessions] = useState<SessionResult[]>([]);

  // Mock data generation
  useEffect(() => {
    const generateMockSessions = (): SessionResult[] => {
      const mockSessions: SessionResult[] = [];
      const now = new Date();
      
      for (let i = 0; i < 5; i++) {
        const sessionDate = new Date(now.getTime() - (i * 24 * 60 * 60 * 1000));
        const alpha = 45 + Math.random() * 30;
        const beta = 40 + Math.random() * 35;
        const gamma = 25 + Math.random() * 40;
        const theta = 55 + Math.random() * 25;
        
        mockSessions.push({
          id: `session-${i}`,
          date: sessionDate,
          duration: 15 + Math.random() * 45,
          brainActivityIndex: Math.round(60 + Math.random() * 35),
          averageWaves: { alpha, beta, gamma, theta },
          peakPerformance: Math.round(70 + Math.random() * 25),
          mentalState: ["Focused", "Relaxed", "Active", "Meditative"][Math.floor(Math.random() * 4)],
          insights: [
            {
              id: `insight-${i}-1`,
              type: "success",
              message: "Optimal alpha wave activity detected during session",
              timestamp: sessionDate
            },
            {
              id: `insight-${i}-2`,
              type: "info",
              message: `${Math.round(15 + Math.random() * 10)} minutes of sustained focus achieved`,
              timestamp: sessionDate
            }
          ]
        });
      }
      return mockSessions;
    };

    setTimeout(() => {
      const mockData = generateMockSessions();
      setSessions(mockData);
      setSelectedSession(mockData[0]);
      setIsLoading(false);
    }, 1000);
  }, []);

  // Generate chart data for selected session
  const generateChartData = () => {
    if (!selectedSession) return [];
    
    const dataPoints = chartTimeInterval * 10;
    const data = [];
    
    for (let i = 0; i < dataPoints; i++) {
      const time = i * 0.1;
      data.push({
        time,
        alpha: selectedSession.averageWaves.alpha + Math.sin(time) * 15 + Math.random() * 5,
        beta: selectedSession.averageWaves.beta + Math.cos(time / 2) * 12 + Math.random() * 5,
        gamma: selectedSession.averageWaves.gamma + Math.sin(time / 3) * 20 + Math.random() * 5,
        theta: selectedSession.averageWaves.theta + Math.cos(time / 1.5) * 8 + Math.random() * 5,
      });
    }
    
    return data;
  };

  const chartData = generateChartData();
  const donutData = selectedSession ? [
    { name: 'alpha', value: selectedSession.averageWaves.alpha },
    { name: 'beta', value: selectedSession.averageWaves.beta },
    { name: 'gamma', value: selectedSession.averageWaves.gamma },
    { name: 'theta', value: selectedSession.averageWaves.theta },
  ] : [];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#101b33] to-[#152540] flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <RefreshCw className="w-8 h-8 text-cyan-300 animate-spin mx-auto mb-4" />
          <p className="text-cyan-200">Loading session results...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#101b33] to-[#152540] dark font-['Inter',sans-serif]">
      {/* Animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-cyan-400/8 rounded-full blur-2xl" style={{ animation: 'pulse 4s ease-in-out infinite' }} />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-blue-500/8 rounded-full blur-2xl" style={{ animation: 'pulse 4s ease-in-out infinite 1s' }} />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="p-6 md:p-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                className="text-cyan-300 hover:text-white hover:bg-cyan-500/20"
                onClick={() => window.history.back()}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <div className="flex items-center gap-3">
                <div 
                  className="p-2.5 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl shadow-2xl"
                  style={{ boxShadow: '0 0 30px rgba(34, 211, 238, 0.4)' }}
                >
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-white text-2xl" style={{ textShadow: '0 0 20px rgba(255, 255, 255, 0.3)' }}>
                    Session Results
                  </h1>
                  <p className="text-cyan-200 text-sm">EEG Analysis & Brain Activity Report</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                className="border-cyan-400/40 text-cyan-200 hover:bg-cyan-500/10"
              >
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="border-cyan-400/40 text-cyan-200 hover:bg-cyan-500/10"
              >
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="border-cyan-400/40 text-cyan-200 hover:bg-cyan-500/10"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>
          </div>

          {/* Session Selector */}
          <div className="mb-8">
            <h3 className="text-white mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-cyan-300" />
              Recent Sessions
            </h3>
            <div className="flex gap-3 overflow-x-auto pb-2">
              {sessions.map((session) => (
                <motion.div
                  key={session.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Card
                    className={`min-w-[280px] cursor-pointer transition-all ${
                      selectedSession?.id === session.id
                        ? 'bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border-cyan-400/50'
                        : 'bg-gradient-to-br from-[#1a2847]/80 to-[#1d2d50]/80 border-cyan-400/20 hover:border-cyan-400/40'
                    }`}
                    onClick={() => setSelectedSession(session)}
                  >
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-cyan-300" />
                          <span className="text-sm text-cyan-200">
                            {session.date.toLocaleDateString()}
                          </span>
                        </div>
                        <span className="text-xs text-cyan-300 px-2 py-1 bg-cyan-400/10 rounded-full">
                          {Math.round(session.duration)}min
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-white text-lg">{session.brainActivityIndex}</p>
                          <p className="text-xs text-cyan-300">Activity Index</p>
                        </div>
                        <div className="text-right">
                          <p className="text-white text-sm">{session.mentalState}</p>
                          <p className="text-xs text-cyan-300">Mental State</p>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <AnimatePresence mode="wait">
            {selectedSession && (
              <motion.div
                key={selectedSession.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 lg:grid-cols-3 gap-6"
              >
                {/* Left Column - Charts */}
                <div className="lg:col-span-2 space-y-6">
                  {/* EEG Wave Chart */}
                  <EEGWaveChart
                    data={chartData}
                    title="Session EEG Waves"
                    chartTimeInterval={chartTimeInterval}
                    onChartTimeIntervalChange={setChartTimeInterval}
                    isRecording={false}
                  />

                  {/* Stats Cards */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <StatCard
                      title="Alpha Waves"
                      value={selectedSession.averageWaves.alpha}
                      unit="Hz"
                      color="bg-gradient-to-r from-purple-500 to-purple-600"
                      sparklineColor="#a78bfa"
                      icon={<Activity className="w-4 h-4" />}
                      trend={Math.round((selectedSession.averageWaves.alpha / 80) * 100)}
                      sparklineData={chartData.slice(-20).map(d => d.alpha)}
                    />
                    <StatCard
                      title="Beta Waves"
                      value={selectedSession.averageWaves.beta}
                      unit="Hz"
                      color="bg-gradient-to-r from-blue-500 to-blue-600"
                      sparklineColor="#3b82f6"
                      icon={<Activity className="w-4 h-4" />}
                      trend={Math.round((selectedSession.averageWaves.beta / 80) * 100)}
                      sparklineData={chartData.slice(-20).map(d => d.beta)}
                    />
                    <StatCard
                      title="Gamma Waves"
                      value={selectedSession.averageWaves.gamma}
                      unit="Hz"
                      color="bg-gradient-to-r from-green-500 to-green-600"
                      sparklineColor="#10b981"
                      icon={<Activity className="w-4 h-4" />}
                      trend={Math.round((selectedSession.averageWaves.gamma / 80) * 100)}
                      sparklineData={chartData.slice(-20).map(d => d.gamma)}
                    />
                    <StatCard
                      title="Theta Waves"
                      value={selectedSession.averageWaves.theta}
                      unit="Hz"
                      color="bg-gradient-to-r from-amber-500 to-amber-600"
                      sparklineColor="#f59e0b"
                      icon={<Activity className="w-4 h-4" />}
                      trend={Math.round((selectedSession.averageWaves.theta / 80) * 100)}
                      sparklineData={chartData.slice(-20).map(d => d.theta)}
                    />
                  </div>
                </div>

                {/* Right Column - Analysis */}
                <div className="space-y-6">
                  {/* Brain Activity Gauge */}
                  <Card className="bg-gradient-to-br from-[#1a2847]/80 to-[#1d2d50]/80 border border-cyan-400/20 backdrop-blur-xl">
                    <div className="p-6">
                      <BrainActivityGauge
                        value={selectedSession.brainActivityIndex}
                        currentStats={selectedSession.averageWaves}
                      />
                    </div>
                  </Card>

                  {/* Wave Distribution */}
                  <Card className="bg-gradient-to-br from-[#1a2847]/80 to-[#1d2d50]/80 border border-cyan-400/20 backdrop-blur-xl">
                    <BrainActivityDonut data={donutData} />
                  </Card>

                  {/* Session Summary */}
                  <Card className="bg-gradient-to-br from-[#1a2847]/80 to-[#1d2d50]/80 border border-cyan-400/20 backdrop-blur-xl">
                    <div className="p-6">
                      <h3 className="text-white mb-4 flex items-center gap-2">
                        <FileText className="w-5 h-5 text-cyan-300" />
                        Session Summary
                      </h3>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-cyan-300 text-sm">Duration</span>
                          <span className="text-white">{Math.round(selectedSession.duration)} minutes</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-cyan-300 text-sm">Mental State</span>
                          <span className="text-white">{selectedSession.mentalState}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-cyan-300 text-sm">Peak Performance</span>
                          <span className="text-white">{selectedSession.peakPerformance}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-cyan-300 text-sm">Date</span>
                          <span className="text-white">{selectedSession.date.toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                  </Card>

                  {/* Insights */}
                  <Card className="bg-gradient-to-br from-[#1a2847]/80 to-[#1d2d50]/80 border border-cyan-400/20 backdrop-blur-xl">
                    <InsightCard insights={selectedSession.insights} />
                  </Card>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
