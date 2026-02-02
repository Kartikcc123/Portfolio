import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, useMotionTemplate, AnimatePresence } from 'framer-motion';
import { 
  Eye, Github, Linkedin, Mail, ExternalLink, 
  Code, Cpu, Layers, Terminal, ChevronDown, Rocket, 
  Sparkles, Globe, Smartphone, Palette, ArrowRight, X,
  Send, MapPin, Clock, Menu, ArrowUp, Phone 
} from 'lucide-react';
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import emailjs from '@emailjs/browser';

// --- UTILS ---
function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// --- DATA ---
const DATA = {
  hero: {
    role: "Full Stack Engineer & Textile Technologist",
  },
  skills: [
    "React", "Next.js", "Node.js", "MongoDB", "Google Cloud", "Docker", "Framer Motion", "Tailwind", "Python", "React Native"
  ],
  services: [
    {
      title: "Custom Web Development",
      desc: "High-performance websites using React & Vite. Perfect for businesses looking to dominate their local market.",
      icon: <Globe size={28} className="text-cyan-300" />
    },
    {
      title: "SaaS Architecture",
      desc: "Scalable MERN stack applications with real-time data handling, secure auth, and cloud deployment.",
      icon: <Terminal size={28} className="text-purple-300" />
    },
    {
      title: "Mobile Ecosystems",
      desc: "Cross-platform mobile apps (iOS/Android) ensuring your product is accessible everywhere.",
      icon: <Smartphone size={28} className="text-pink-300" />
    }
  ],
  projects: [
    {
      title: "Cricket Event Manager",
      tag: "SaaS Platform",
      desc: "Real-time tournament dashboard with live scoring and admin controls.",
      tech: ["React", "Node.js", "MongoDB"],
      image: "public/images/cricket.png",
      link: "https://github.com/Kartikcc123/Cricket-Event-Management-App.git"
    },
    {
      title: "Sujas College of Pharmacy",
      tag: "Client Success",
      desc: "Premium landing page that increased digital reservations by 40%.",
      tech: ["HTML", "CSS", "JavaScript", "UI/UX", "SEO"],
      image: "public/images/sujas.jpeg",
      link: "https://sujascollegeofpharmacy.in.net/"
    },
    {
      title: "AI Image Generator",
      tag: "AI Project",
      desc: "AI model predicting prompts and generating high-quality images.",
      tech: ["Vite + React", "Framer Motion", "Tailwind CSS"],
      image: "public/images/image.png",
      link: "https://github.com/Kartikcc123/imagify.git"
    },
    {
      title: "Video Language Converter",
      tag: "Advanced Tool",
      desc: "Gamified habit tracker with streak logic and state management.",
      tech: ["Python", "Vite", "MERN Stack"],
      image: "public/images/video.png"
    }
  ]
};

// --- COMPONENTS ---

// 1. Scroll Progress Bar
const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      className="fixed top-20 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 origin-left z-[40]"
      style={{ scaleX: scrollYProgress }}
    />
  );
};

// 2. Scroll To Top Button
const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-40 p-3 rounded-full bg-cyan-500 text-black shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:bg-white transition-colors"
        >
          <ArrowUp size={20} />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

// 3. Magnetic Button
const MagneticButton = ({ children, className, href, download, onClick, target }) => {
  return (
    <motion.a
      href={href}
      download={download}
      target={target}
      rel={target === "_blank" ? "noopener noreferrer" : undefined}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={cn("relative cursor-pointer transition-colors", className)}
    >
      {children}
    </motion.a>
  );
};

// 4. Infinite Tech Marquee
const TechTicker = () => (
  <div className="w-full py-8 bg-black/20 border-y border-white/5 overflow-hidden flex relative z-10 backdrop-blur-sm">
    <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#030305] to-transparent z-10" />
    <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#030305] to-transparent z-10" />
    <motion.div 
      className="flex gap-16 whitespace-nowrap"
      animate={{ x: ["0%", "-50%"] }}
      transition={{ ease: "linear", duration: 20, repeat: Infinity }}
    >
      {[...DATA.skills, ...DATA.skills, ...DATA.skills].map((skill, i) => (
        <span key={i} className="text-2xl font-bold text-slate-700 uppercase tracking-widest">{skill}</span>
      ))}
    </motion.div>
  </div>
);

// 5. Spotlight Card
function SpotlightCard({ children, className = "" }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      className={cn(
        "group relative border border-white/10 bg-slate-900/40 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)] overflow-hidden rounded-2xl backdrop-blur-md",
        className
      )}
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              500px circle at ${mouseX}px ${mouseY}px,
              rgba(6, 182, 212, 0.15),
              transparent 80%
            )
          `,
        }}
      />
      <div className="relative h-full">{children}</div>
    </div>
  );
}

// 6. NAVBAR
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-20 bg-black/90 backdrop-blur-md border-b border-white/10">
      <div className="w-full max-w-7xl mx-auto px-6 h-full flex justify-between items-center">
        
        {/* Large, Clear Logo */}
        <a href="#" className="text-2xl font-black tracking-tighter text-white hover:text-cyan-400 transition-colors">
          KA<span className="text-cyan-500">.</span>
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-10">
          {['Home', 'Services', 'Work', 'Contact'].map((item) => (
            <a 
              key={item}
              href={item === 'Home' ? '#' : `#${item.toLowerCase()}`}
              className="text-base font-medium text-slate-300 hover:text-white transition-colors relative group"
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-400 transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
        </div>

        {/* VIEW RESUME BUTTON */}
        <div className="hidden md:block">
          <a 
            href="public/resume/Kartik Agarwal.pdf" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-2 px-6 py-2.5 bg-white text-black text-sm font-bold rounded-full overflow-hidden transition-all hover:bg-cyan-400 hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(6,182,212,0.6)]"
          >
            {/* Shimmer Effect */}
            <div className="absolute inset-0 -translate-x-[100%] group-hover:translate-x-[100%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/50 to-transparent z-10" />
            
            <Eye size={18} className="transition-transform duration-300 group-hover:scale-110" />
            <span className="relative z-10">VIEW RESUME</span>
          </a>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden p-2 text-white hover:text-cyan-400"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={32} /> : <Menu size={32} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black border-b border-white/10"
          >
            <div className="flex flex-col p-6 space-y-4">
              {['Home', 'Services', 'Work', 'Contact'].map((item) => (
                <a 
                  key={item}
                  href={item === 'Home' ? '#' : `#${item.toLowerCase()}`}
                  onClick={() => setIsOpen(false)}
                  className="text-lg font-medium text-slate-200 hover:text-cyan-400 py-2 border-b border-white/5"
                >
                  {item}
                </a>
              ))}
              <a 
                href="public/resume/Kartik Agarwal.pdf" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-lg font-bold text-cyan-400 pt-2"
                onClick={() => setIsOpen(false)}
              >
                <Eye size={18} /> View Resume
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

// --- MAIN APP ---

export default function App() {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState({ type: '', text: '' });

  // --- EMAILJS SUBMIT ---
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      console.error('Missing EmailJS env vars');
      setStatus({ type: 'error', text: 'Email service not configured. Please check the environment variables.' });
      setIsSubmitting(false);
      setTimeout(() => setStatus({ type: '', text: '' }), 4000);
      return;
    }

    const templateParams = {
      from_name: formState.name,
      from_email: formState.email,
      message: formState.message,
    };

    emailjs.send(serviceId, templateId, templateParams, publicKey)
      .then(() => {
        setStatus({ type: 'success', text: 'Message sent — I will get back to you soon!' });
        setFormState({ name: '', email: '', message: '' });
        setTimeout(() => setStatus({ type: '', text: '' }), 4000);
      })
      .catch((err) => {
        console.error('EmailJS error:', err);
        setStatus({ type: 'error', text: 'Failed to send message. Please try again later.' });
        setTimeout(() => setStatus({ type: '', text: '' }), 4000);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  

  return (
    <div className="bg-[#030305] text-white selection:bg-cyan-500/30 font-sans overflow-x-hidden relative pt-20">
      <ScrollProgress />
      <Navbar />
      <ScrollToTop />

      {/* --- ENGINEERING GRID BACKGROUND --- */}
      <div className="fixed inset-0 z-0 pointer-events-none">
         {/* The Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
        
        {/* The Glows */}
        <div className="absolute top-[-10%] left-[-20%] w-[60vw] h-[60vw] bg-indigo-900/20 rounded-full blur-[150px] mix-blend-screen" />
        <div className="absolute top-[30%] right-[-25%] w-[70vw] h-[70vw] bg-cyan-900/10 rounded-full blur-[180px] mix-blend-screen" />
        <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] brightness-100" />
      </div>

      <div className="relative z-10">

        {/* 1. HERO SECTION */}
        <section className="min-h-[calc(100vh-80px)] flex flex-col justify-center items-center px-6 text-center">
          
          {/* Status Badge */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/30 bg-cyan-950/30 text-cyan-300 mb-8 shadow-[0_0_15px_rgba(6,182,212,0.1)] backdrop-blur-md"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            <span className="text-[11px] font-bold tracking-widest uppercase">Available for Projects</span>
          </motion.div>

          {/* NAME AS HEADLINE */}
          <h1 className="text-6xl md:text-[8rem] font-black tracking-tighter mb-8 leading-[0.85] text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/50 drop-shadow-2xl">
            KARTIK <br />
            AGARWAL
          </h1>

          <p className="max-w-2xl mx-auto text-xl text-slate-400 mb-12 leading-relaxed">
            <span className="text-white font-bold">Full Stack Engineer & Textile Technologist.</span> <br/>
            I blend <span className="text-cyan-300">Engineering Precision</span> with <span className="text-purple-300">Creative Design</span> to build software that drives growth.
          </p>

          <div className="flex flex-col md:flex-row gap-6">
            <MagneticButton href="#work" className="group bg-white text-black px-8 py-4 rounded-full font-bold flex items-center gap-2 shadow-[0_0_30px_rgba(255,255,255,0.2)]">
              View Work <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform"/>
            </MagneticButton>
            {/* LINKED TO CONTACT SECTION */}
            <MagneticButton href="#contact" className="px-8 py-4 rounded-full border border-white/10 hover:bg-white/5 font-medium text-white">
              Contact Me
            </MagneticButton>
          </div>
        </section>

        {/* 2. TECH MARQUEE */}
        <TechTicker />

        {/* 3. SERVICES SECTION */}
        <section id="services" className="py-32 px-6 max-w-7xl mx-auto">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-4">
            <div>
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-6 text-white">
                Technical <span className="text-cyan-500">Mastery.</span>
              </h2>
              <p className="text-slate-400 text-lg max-w-xl leading-relaxed">
                I engineer digital solutions with the precision of textile manufacturing. 
              </p>
            </div>
            <div className="h-px bg-white/10 flex-grow ml-8 mb-4 hidden md:block"></div>
          </div>
          
          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Web Development",
                desc: "Fast, responsive, and SEO-optimized web applications built for growth.",
                color: "from-cyan-400 to-blue-600",
                shadow: "group-hover:shadow-cyan-500/20",
                icon: <Globe size={32} className="text-cyan-400" />,
                tech: ["React", "Vite", "Tailwind"]
              },
              {
                title: "SaaS Architecture",
                desc: "Scalable backend systems designed to handle complex data and real-time users.",
                color: "from-purple-400 to-indigo-600",
                shadow: "group-hover:shadow-purple-500/20",
                icon: <Terminal size={32} className="text-purple-400" />,
                tech: ["Node.js", "MongoDB", "Cloud"]
              },
              {
                title: "Mobile Solutions",
                desc: "Native-quality iOS and Android apps that extend your business reach.",
                color: "from-pink-400 to-rose-600",
                shadow: "group-hover:shadow-pink-500/20",
                icon: <Smartphone size={32} className="text-pink-400" />,
                tech: ["React Native", "Expo", "API"]
              }
            ].map((service, idx) => (
              <div key={idx} className="group relative h-full">
                
                {/* Card Container */}
                <div className={`relative h-full bg-[#0e0e10] border border-white/10 rounded-3xl p-8 overflow-hidden transition-all duration-500 group-hover:-translate-y-2 ${service.shadow} group-hover:shadow-2xl`}>
                  
                  {/* Textile Mesh Grid Background (Subtle) */}
                  <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:16px_16px]" />

                  {/* Icon Area */}
                  <div className="relative z-10 mb-8 flex justify-between items-start">
                    <div className="p-4 bg-white/5 rounded-2xl border border-white/5 backdrop-blur-sm group-hover:bg-white/10 transition-colors">
                      {service.icon}
                    </div>
                    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest border border-white/5 px-2 py-1 rounded-lg">
                      0{idx + 1}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="relative z-10">
                    <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-cyan-200 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-slate-400 leading-relaxed mb-8 text-sm">
                      {service.desc}
                    </p>
                  </div>

                  {/* Tech Pills Footer */}
                  <div className="relative z-10 flex flex-wrap gap-2 pt-6 border-t border-white/5">
                    {service.tech.map((t, i) => (
                      <span key={i} className="text-[10px] font-bold text-slate-400 bg-white/5 px-3 py-1 rounded-full border border-white/5">
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Colored Bottom Glow Line */}
                  <div className={`absolute bottom-0 left-0 w-full h-1.5 bg-gradient-to-r ${service.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4. WORK SECTION */}
        <section id="work" className="py-32 px-6 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-4">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Selected Work</h2>
              <p className="text-slate-400 text-lg">Freelance & R&D Projects.</p>
            </div>
            <MagneticButton href="https://github.com/kartikcc123" target="_blank" className="hidden md:flex items-center gap-2 text-sm font-bold border-b border-white/20 pb-1 hover:text-cyan-400 hover:border-cyan-400 transition-colors">
              VIEW GITHUB <ArrowRight size={14}/>
            </MagneticButton>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {DATA.projects.map((project, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group"
              >
                {/* 1. WRAPPED IMAGE IN ANCHOR TAG (<a>) */}
                <a 
                  href={project.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block relative rounded-[2rem] overflow-hidden bg-slate-900 border border-white/10 aspect-[16/10] mb-6 shadow-[0_0_20px_rgba(6,182,212,0.15)] hover:shadow-[0_0_40px_rgba(6,182,212,0.4)] transition-shadow duration-500"
                >
                  {/* Image: Always Bright */}
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover opacity-100 group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                  
                  {/* Tag */}
                  <div className="absolute top-6 left-6 px-4 py-2 bg-black/50 backdrop-blur-md border border-white/10 rounded-full text-xs font-bold text-white uppercase tracking-wider">
                    {project.tag}
                  </div>
                </a>

                <div className="flex justify-between items-start px-2">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                      {/* Optional: Make Title Clickable too */}
                      <a href={project.link} target="_blank" rel="noopener noreferrer">{project.title}</a>
                    </h3>
                    <div className="flex gap-3 text-sm text-slate-500 font-mono">
                      {project.tech.map((t, i) => (
                        <span key={i}>{i > 0 && "•"} {t}</span>
                      ))}
                    </div>
                  </div>
                  
                  {/* 2. WRAPPED ICON IN ANCHOR TAG (<a>) */}
                  <a 
                    href={project.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-slate-500 hover:text-white transition-colors p-2"
                  >
                    <ExternalLink />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 5. ABOUT SECTION (Updated with LinkedIn Button) */}
        <section id="about" className="py-32 px-6 max-w-5xl mx-auto">
          <SpotlightCard className="bg-gradient-to-b from-slate-900/40 to-black p-12 md:p-20 border border-white/10 rounded-[3rem] text-center relative overflow-hidden">
             {/* Decorative Blur */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-indigo-500/20 blur-[100px] rounded-full" />
            
            <Sparkles className="text-cyan-400 mx-auto mb-8 w-12 h-12 relative z-10" />
            
            <h2 className="text-3xl md:text-5xl font-bold mb-8 relative z-10">
              Logic meets <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">Fabric.</span>
            </h2>
            
            <p className="text-lg text-slate-400 leading-relaxed mb-8 max-w-3xl mx-auto relative z-10">
              I am a 3rd-year <strong className="text-white">Textile Technology</strong> student. While my degree focuses on material science, my passion lies in <strong className="text-white">Full Stack Development</strong>.
              <br /><br />
              This unique combination allows me to approach problems with an industrial mindset—focusing on <span className="text-white">efficiency</span>, <span className="text-white">structure</span>, and <span className="text-white">scalability</span>.
            </p>

            {/* --- NEW STRATEGIC LINKEDIN BUTTON --- */}
            <div className="relative z-10 mb-10">
               <MagneticButton 
                  href="https://www.linkedin.com/in/kartik-agarwal-157289388/" 
                  target="_blank"
                  className="inline-flex items-center gap-2 px-6 py-3 border border-white/10 bg-white/5 hover:bg-[#0077b5] hover:border-[#0077b5] text-white font-bold rounded-full transition-all shadow-lg backdrop-blur-md"
               >
                  <Linkedin size={18} /> Connect on LinkedIn
               </MagneticButton>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-10 border-t border-white/10 relative z-10">
              {[
                { label: "Experience", val: "3+ Yrs" },
                { label: "Projects", val: "15+" },
                { label: "Clients", val: "5+" },
                { label: "Availability", val: "Open" }
              ].map((stat, i) => (
                <div key={i}>
                  <div className="text-3xl font-black text-white mb-1">{stat.val}</div>
                  <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">{stat.label}</div>
                </div>
              ))}
            </div>
          </SpotlightCard>
        </section>

        {/* 6. CONTACT SECTION */}
        <section id="contact" className="py-32 px-6 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
            
            {/* Left: Contact Info */}
            <div className="space-y-8">
              <h2 className="text-5xl md:text-6xl font-black tracking-tighter text-white">
                Let's start a <br />
                <span className="text-cyan-400">conversation.</span>
              </h2>
              <p className="text-slate-400 text-lg max-w-md leading-relaxed">
                Interested in working together? I am available for freelance projects and internships. Fill out the form and I'll get back to you.
              </p>
              
              <div className="flex flex-col gap-6 pt-6">
                 <div className="flex items-center gap-4 text-slate-300">
                    <div className="p-3 bg-white/5 rounded-full border border-white/10"><Mail className="text-cyan-400" size={20}/></div>
                    <div>
                      <div className="text-xs text-slate-500 font-bold uppercase tracking-wider">Email</div>
                      <div className="text-lg font-medium">kartikagarwal4256@gmail.com</div>
                    </div>
                 </div>
                 <div className="flex items-center gap-4 text-slate-300">
                    <div className="p-3 bg-white/5 rounded-full border border-white/10"><Phone className="text-green-400" size={20}/></div>
                    <div>
                      <div className="text-xs text-slate-500 font-bold uppercase tracking-wider">Phone</div>
                      <div className="text-lg font-medium">+91 9116901749</div>
                    </div>
                 </div>
                 <div className="flex items-center gap-4 text-slate-300">
                    <div className="p-3 bg-white/5 rounded-full border border-white/10"><MapPin className="text-purple-400" size={20}/></div>
                    <div>
                      <div className="text-xs text-slate-500 font-bold uppercase tracking-wider">Location</div>
                      <div className="text-lg font-medium">India (Remote Available)</div>
                    </div>
                 </div>
                 <div className="flex items-center gap-4 text-slate-300">
                    <div className="p-3 bg-white/5 rounded-full border border-white/10"><Clock className="text-pink-400" size={20}/></div>
                    <div>
                      <div className="text-xs text-slate-500 font-bold uppercase tracking-wider">Response Time</div>
                      <div className="text-lg font-medium flex items-center gap-2">
                        Within 24 Hours <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"/>
                      </div>
                    </div>
                 </div>
              </div>
            </div>

            {/* Right: Interactive Form */}
            <SpotlightCard className="p-8 md:p-10 bg-slate-900/50 backdrop-blur-xl">
              <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Your Name</label>
                  <input 
                    type="text" 
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({...formState, name: e.target.value})}
                    placeholder="John Doe" 
                    className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Email Address</label>
                  <input 
                    type="email" 
                    required
                    value={formState.email}
                    onChange={(e) => setFormState({...formState, email: e.target.value})}
                    placeholder="john@example.com" 
                    className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Message</label>
                  <textarea 
                    rows={4}
                    required
                    value={formState.message}
                    onChange={(e) => setFormState({...formState, message: e.target.value})}
                    placeholder="Tell me about your project..." 
                    className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all resize-none"
                  />
                </div>

                {status.text && (
                  <div role="status" aria-live="polite" className={`p-3 rounded-xl text-sm font-medium ${status.type === 'success' ? 'bg-green-900/30 text-green-300' : 'bg-red-900/30 text-red-300'}`}>
                    {status.text}
                  </div>
                )}

                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-white text-black font-bold py-4 rounded-xl hover:bg-cyan-400 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    "Sending..."
                  ) : (
                    <>Send Message <Send size={18} /></>
                  )}
                </button>
              </form>
            </SpotlightCard>

          </div>
        </section>

        {/* 7. FOOTER */}
        <footer className="py-12 border-t border-white/10 bg-black text-center relative overflow-hidden">
          <div className="flex justify-center gap-8 mb-8">
             <a href="https://github.com/kartikcc123" className="text-slate-500 hover:text-white transition-colors"><Github /></a>
             <a href="https://www.linkedin.com/in/kartik-agarwal-157289388/" className="text-slate-500 hover:text-white transition-colors"><Linkedin /></a>
             <a href="mailto:kartikagarwal4256@gmail.com" className="text-slate-500 hover:text-white transition-colors"><Mail /></a>
          </div>
          <p className="text-slate-700 text-xs uppercase tracking-widest">© 2026 Kartik Agarwal</p>
        </footer>

      </div>
    </div>
  );
}