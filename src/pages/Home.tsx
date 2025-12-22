import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import { motion, AnimatePresence } from "framer-motion";
import { JackpotStat } from "../components/jackpotStat";

const waves = [
  { type: "Brainn", color: "text-white", font: "font-semibold" },
  { type: "Relaxation", color: "text-purple-400", font: "font-semibold" },
  { type: "Focus", color: "text-blue-400", font: "font-semibold"},
  { type: "Creative", color: "text-emerald-400", font: "font-semibold" },
  { type: "Imaginary", color: "text-amber-400", font: "font-semibold" },
  
];

export default function Home() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % waves.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const navLinks = [
    { to: "/", icon: "mdi:home-outline", label: "Home", glow: "bg-cyan-400/30" },
    { to: "/simulate", icon: "fluent:brain-circuit-20-regular", label: "Simulation", glow: "bg-blue-400/30" },
    { to: "/results", icon: "mdi:chart-line", label: "Results", glow: "bg-purple-400/30" },
    { to: "/profile", icon: "mdi:account-outline", label: "Profile", glow: "bg-pink-400/30" },
  ];
    
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#0f1b33] via-[#152540] to-[#1c2e4d] text-white font-['Inter',sans-serif] overflow-hidden">
      
      {/* 🌈 Animated Background Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 w-[900px] h-[900px] -translate-x-1/2 -translate-y-1/2 bg-white/5 rounded-full blur-[180px]" />
        <div className="absolute top-[-150px] left-[-150px] w-[450px] h-[450px] bg-gradient-to-br from-cyan-400/25 to-blue-500/20 rounded-full blur-[200px] animate-floating-slow" />
        <div className="absolute top-[-100px] right-[-150px] w-[380px] h-[380px] bg-gradient-to-br from-purple-500/25 to-pink-400/20 rounded-full blur-[180px] animate-floating" />
        <div className="absolute bottom-[-150px] left-[-150px] w-[400px] h-[400px] bg-gradient-to-br from-teal-400/25 to-cyan-400/10 rounded-full blur-[160px] animate-floating-reverse" />
        <div className="absolute bottom-[-150px] right-[-150px] w-[450px] h-[450px] bg-gradient-to-br from-pink-400/20 to-purple-400/10 rounded-full blur-[180px] animate-floating-slow" />
      </div>

      {/* 🧭 Navbar */}
      <header className="relative z-10 flex flex-col md:flex-row justify-between items-center px-4 md:px-8 py-4 md:py-6 w-full max-w-7xl mx-auto gap-4 md:gap-6">
  {/* Logo */}
  <div className="flex items-center gap-3">
    <div className="relative p-[6px] rounded-lg">
      <div className="absolute inset-0 bg-cyan-400/5 rounded-lg blur-sm"></div>
      <div className="relative w-12 h-12 md:w-14 md:h-14 rounded-lg bg-[#0f172a]/70 flex items-center justify-center backdrop-blur-md border border-cyan-400/20">
        <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-white/25 to-transparent pointer-events-none" />
        <Icon
          icon="fluent:brain-circuit-48-regular"
          className="w-8 h-8 md:w-12 md:h-12 text-white drop-shadow-[0_0_5px_rgba(255,255,255,1)]"
        />
      </div>
    </div>
    <div>
      <h1 className="text-white text-xl font-semibold">MindWave</h1>
      <p className="text-cyan-200 text-sm">EEG Brain Activity Visualization</p>
    </div>
  </div>

  {/* Navbar */}
  <nav className="flex items-center justify-center md:justify-end gap-2 md:gap-4 w-full md:w-auto overflow-x-auto scrollbar-none snap-x snap-mandatory">
    {navLinks.map((link) => (
      <Link
        key={link.label}
        to={link.to}
        className="flex items-center gap-2 px-3 py-2 md:px-5 rounded-lg text-cyan-300 hover:text-white hover:bg-cyan-500/10 transition-all group text-sm md:text-base snap-start whitespace-nowrap"
      >
        <div className="relative w-6 h-6 flex items-center justify-center">
          <div className={`absolute inset-0 rounded-full ${link.glow} blur-md opacity-0 group-hover:opacity-100 transition-all duration-300`} />
          <Icon
            icon={link.icon}
            className="w-4 h-4 md:w-5 md:h-5 text-cyan-300 group-hover:text-white transition-all duration-300"
          />
        </div>
        {link.label}
      </Link>
    ))}
  </nav>
</header>

      {/* 🌌 Hero Section */}
      <main className="relative z-10 flex flex-col lg:flex-row items-center justify-center gap-20 px-10 lg:px-24 min-h-[80vh] w-full max-w-7xl">

        {/* 🧠 LEFT TEXT - Slide from left */}
        <motion.div
          className="max-w-2xl text-center lg:text-left space-y-6"
          initial={{ opacity: 0, x: -80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="relative flex flex-col items-center md:items-start justify-start text-center md:text-left min-h-[vh]">
      <h2 className="text-6xl md:text-6xl font-bold leading-tight">
        Visualize Your{" "}
       <AnimatePresence mode="wait">
  <motion.span
    key={waves[index].type}
    className={`relative inline-block mx-2 ${waves[index].color} ${waves[index].font}`}
    initial={{
      opacity: 0,
      x: -40,              // mulai dari kiri (lebih kecil biar halus)
      filter: "blur(6px)", // blur awal
    }}
    animate={{
      opacity: 1,
      x: 0,
      filter: "blur(0px)", // hilangin blur pas stabil
    }}
    exit={{
      opacity: 0,
      x: 40,               // keluar ke kanan
      filter: "blur(6px)",
    }}
    transition={{
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1], // ease-in-out smooth
    }}
  >
    {waves[index].type}
  </motion.span>
</AnimatePresence>

        in Real-Time
      </h2>
    </div>
          <motion.p
  className="text-cyan-300/90 text-xl font-medium tracking-wide drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]"
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
>
  Advanced EEG Technology for Real-Time Brainwave Insights
</motion.p>


          <p className="text-cyan-200 text-lg leading-relaxed max-w-xl">
            MindWave provides cutting-edge EEG monitoring and visualization,
            helping you understand and optimize your mental state through
            advanced brain wave analysis.
          </p>

          {/* Buttons - slide from bottom */}
          <motion.div
            className="flex justify-center lg:justify-start gap-4 pt-4"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          >
            <Link
              to="/Register"
              className="px-6 py-3 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg shadow-lg flex items-center gap-2 hover:scale-105 transition-transform"
            >
              Simulate Now
            </Link>
            <a
              href="#learn-more"
              className="px-6 py-3 border border-cyan-400/40 rounded-lg text-cyan-300 hover:bg-cyan-500/10 transition-all"
            >
              Learn More
            </a>
          </motion.div>

          {/* Stats - slide up */}
          {/* Stats - jackpot style animation */}
<motion.div
  className="flex justify-center lg:justify-start gap-10 pt-10"
  initial={{ opacity: 0, y: 60 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
>
  <JackpotStat finalValue={4} label="Wave Types" />
  <JackpotStat finalValue={24} suffix="/7" label="Monitoring" />
  <JackpotStat finalValue={100} suffix="%" label="Accuracy" />
</motion.div>

        </motion.div>

        {/* 🧩 RIGHT - Brain Gradient Card with floating animation */}
        <motion.div
          className="mt-16 lg:mt-0 lg:ml-20 relative"
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
        >
          <motion.div
            className="relative w-[350px] h-[350px] rounded-[40px] bg-gradient-to-br from-[#6EE7B7] via-[#3B82F6] to-[#9333EA] bg-[length:200%_200%] animate-gradientShift p-[2px] shadow-2xl hover:scale-105 transition-transform duration-700"
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="w-full h-full rounded-[38px] bg-[#0f172a]/90 flex items-center justify-center backdrop-blur-md">
              <div className="absolute inset-0 rounded-[40px] bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
              <Icon
                icon="fluent:brain-circuit-48-regular"
                className="w-80 h-80 text-white drop-shadow-[0_0_25px_rgba(255,255,255,0.4)]"
              />
            </div>
          </motion.div>
        </motion.div>
      </main>
      {/* 🌟 Features Section */}
<section className="relative z-10 py-24 px-8 lg:px-24 w-full max-w-7xl text-center lg:text-left">
  <motion.h3
    className="text-4xl font-bold mb-12 text-white text-center"
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
  >
    Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">MindWave</span>?
  </motion.h3>

  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
    {/* Alpha */}
    <motion.div
      className="p-8 bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-400/20 rounded-2xl backdrop-blur-sm hover:scale-105 transition-transform"
      initial={{ opacity: 0, y: 30 }} 
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
    >
      <Icon icon="mdi:alpha-a" className="w-12 h-12 text-purple-400 mb-4" />
      <h4 className="text-lg font-semibold mb-2 text-white">Alpha Waves</h4>
      <p className="text-cyan-200 text-sm">Indicates relaxed and alert states — perfect for creativity and learning.</p>
    </motion.div>

    {/* Beta */}
    <motion.div
      className="p-8 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-400/20 rounded-2xl backdrop-blur-sm hover:scale-105 transition-transform"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <Icon icon="mdi:beta" className="w-12 h-12 text-blue-400 mb-4" />
      <h4 className="text-lg font-semibold mb-2 text-white">Beta Waves</h4>
      <p className="text-cyan-200 text-sm">Represent active thinking and focus — essential for problem-solving.</p>
    </motion.div>

    {/* Gamma */}
    <motion.div
      className="p-8 bg-gradient-to-br from-emerald-500/10 to-green-500/10 border border-emerald-400/20 rounded-2xl backdrop-blur-sm hover:scale-105 transition-transform"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <Icon icon="mdi:gamma" className="w-12 h-12 text-emerald-400 mb-4" />
      <h4 className="text-lg font-semibold mb-2 text-white">Gamma Waves</h4>
      <p className="text-cyan-200 text-sm">Associated with high-level cognitive processing and deep understanding.</p>
    </motion.div>

    {/* Theta */}
    <motion.div
      className="p-8 bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-400/20 rounded-2xl backdrop-blur-sm hover:scale-105 transition-transform"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      <Icon icon="mdi:waves" className="w-12 h-12 text-amber-400 mb-4" />
      <h4 className="text-lg font-semibold mb-2 text-white">Theta Waves</h4>
      <p className="text-cyan-200 text-sm">Linked to meditation and creativity — accessing subconscious insights.</p>
    </motion.div>
  </div>
</section>

{/* 💡 About Section */}
<section className="relative z-10 py-24 px-8 lg:px-24 w-full max-w-7xl text-center">
  <motion.h3
    className="text-4xl font-bold mb-6 text-white"
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
  >
    Advanced EEG Analytics Powered by{" "}
    <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
      AI & Data Sciencee
    </span>
  </motion.h3>

  <motion.p
    className="text-cyan-200 max-w-3xl mx-auto text-lg leading-relaxed"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
  >
    MindWaveeee integrates real-time EEG analysis with AI-driven pattern recognition to help you
    monitor cognitive performance, relaxation, and stress levels. Our technology transforms raw
    brainwave data into meaningful insights — enabling personal growth and focus optimization.
  </motion.p>

  <motion.div
    className="mt-12 flex justify-center"
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{ duration: 1, delay: 0.3 }}
  >
    <div className="w-[600px] h-[2px] bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent rounded-full"></div>
  </motion.div>
</section>
    </div>
  );
}
