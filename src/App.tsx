import React, { useState, useEffect, useRef } from 'react';
import { 
  Scissors, 
  Star, 
  ArrowRight, 
  ArrowLeft, 
  Menu, 
  X, 
  CreditCard, 
  MapPin, 
  Phone, 
  Instagram, 
  MessageCircle, 
  Clock, 
  Volume2, 
  VolumeX, 
  ShoppingBag, 
  Briefcase,
  Coffee,
  Wifi,
  Sparkles,
  Gamepad2,
  ThumbsUp,
  Tv,
  MonitorPlay,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Users
} from 'lucide-react';
import { CareerForm } from './components/CareerForm';
import { SiaoMiniGame } from './components/SiaoMiniGame';
import { FloatingParticles } from './components/FloatingParticles';

// Assets from Cloudinary
const LOGO_IMAGE = "https://res.cloudinary.com/dbuiqh0ee/image/upload/v1780446381/WhatsApp_Image_2026-01-11_at_10.55.31_AM_1_slz0il.jpg";
const HERO_BG_VIDEO = "https://res.cloudinary.com/dbuiqh0ee/video/upload/v1780446389/Create_a_twoframe_1080p_202601111008_hzhom0.mp4";
const ACADEMY_VIDEO = "https://res.cloudinary.com/dbuiqh0ee/video/upload/v1780446379/SnapInsta.to_AQMPXPvh17YFW61JJDTj11oUoJxkl36RAms6egC1XDIv0Zfg084CnNCwiJLY4RoWOBswmz4zS08263HuxudhfIve0geRTkVitHjG9m4_pavls4.mp4";
const PROPOSAL_TV_VIDEO = "https://res.cloudinary.com/ddfacd0wf/video/upload/v1790550274/WhatsApp_Video_2026-05-26_at_5.43.37_PM_jiipmq.mp4";

const PRODUCT_IMAGES = [
  "https://res.cloudinary.com/dbuiqh0ee/image/upload/v1780446359/Captura_de_tela_2026-02-17_173735_xhlgif.png",
  "https://res.cloudinary.com/dbuiqh0ee/image/upload/v1780446360/Captura_de_tela_2026-02-17_173755_btx7bl.png",
  "https://res.cloudinary.com/dbuiqh0ee/image/upload/v1780446360/Captura_de_tela_2026-02-17_173811_dwq6dh.png",
  "https://res.cloudinary.com/dbuiqh0ee/image/upload/v1780446360/Captura_de_tela_2026-02-17_173826_zovxgw.png",
  "https://res.cloudinary.com/dbuiqh0ee/image/upload/v1780446384/WhatsApp_Image_2026-03-28_at_10.26.35_AM_3_x4jzjj.jpg"
];

const GALLERY_IMAGES = [
  "https://res.cloudinary.com/dbuiqh0ee/image/upload/v1780446361/Captura_de_tela_2026-03-28_103600_aaigux.png",
  "https://res.cloudinary.com/dbuiqh0ee/image/upload/v1780446361/Captura_de_tela_2026-03-28_103735_gqjkev.png",
  "https://res.cloudinary.com/dbuiqh0ee/image/upload/v1780446361/Captura_de_tela_2026-03-28_103527_gkp1o8.png",
  "https://res.cloudinary.com/dbuiqh0ee/image/upload/v1780446362/Captura_de_tela_2026-03-28_103750_ru0xdc.png",
  "https://res.cloudinary.com/dbuiqh0ee/image/upload/v1780446362/Captura_de_tela_2026-03-28_103908_sksr2e.png",
  "https://res.cloudinary.com/dbuiqh0ee/image/upload/v1780446363/Captura_de_tela_2026-04-08_140959_cz4bek.png",
  "https://res.cloudinary.com/dbuiqh0ee/image/upload/v1780446362/Captura_de_tela_2026-03-28_103929_dkkdyj.png",
  "https://res.cloudinary.com/dbuiqh0ee/image/upload/v1780446364/Captura_de_tela_2026-04-08_141015_nnwqsz.png",
  "https://res.cloudinary.com/dbuiqh0ee/image/upload/v1780446365/Captura_de_tela_2026-04-08_141031_szy0u3.png"
].filter(Boolean);

const UNIT_CARAVELAS = "https://res.cloudinary.com/dbuiqh0ee/image/upload/v1780446370/Captura_de_tela_2026-04-08_144326_n42owu.png";
const UNIT_MANGUABA = "https://res.cloudinary.com/dbuiqh0ee/image/upload/v1780446371/Captura_de_tela_2026-04-08_144419_sqf7nm.png";
const UNIT_TREVO = "https://res.cloudinary.com/dbuiqh0ee/image/upload/v1780446370/Captura_de_tela_2026-04-08_144351_vuxl2v.png";

const SERVICES = {
  "Cabelo": [
    { name: "Corte (a partir de 7 anos)", price: "R$ 35,00" },
    { name: "Penteado", price: "R$ a partir de 25,00" },
    { name: "Progressiva", price: "R$ a partir de 100,00" },
    { name: "Relaxamento", price: "R$ a partir de 55,00" },
    { name: "Luzes", price: "R$ a partir de 80,00" },
    { name: "Pigmentação de Cabelo", price: "R$ 30,00" }
  ],
  "Barba": [
    { name: "Barba Expressa", price: "R$ 15,00" },
    { name: "Barba Simples", price: "R$ 25,00" },
    { name: "Barba Terapia", price: "R$ 35,00" },
    { name: "Pigmentação de Barba", price: "R$ 20,00" }
  ],
  "Estética": [
    { name: "Limpeza de Pele", price: "R$ 40,00" },
    { name: "Depilação Nasal / Orelha", price: "R$ 20,00" },
    { name: "Sobrancelha", price: "R$ 10,00" },
    { name: "Hidratação Cabelo / Barba", price: "R$ 25,00" }
  ]
};

const PLANS = [
  { 
    name: "PLANO DE CORTE ILIMITADO", 
    price: "59,99", 
    icon: <Scissors size={16} />, 
    features: [
      "CORTE DE CABELO ILIMITADO", 
      "ATENDIMENTO PADRÃO SIÃO", 
      "10% DE DESCONTO EM PRODUTOS E SERVIÇOS", 
      "LAVAGEM INCLUSA"
    ] 
  },
  { 
    name: "PLANO DE CORTE E BARBOTERAPIA", 
    price: "129,99", 
    icon: <Star size={16} />, 
    promo: "DIRETO PARA", 
    features: [
      "CORTES E BARBAS ILIMITADOS", 
      "ATENDIMENTO PADRÃO SIÃO", 
      "10% DE DESCONTO EM PRODUTOS E SERVIÇOS", 
      "MASSAGEM FACIAL INCLUSA"
    ], 
    popular: true 
  },
  { 
    name: "PLANO DE CORTE E BARBA SIMPLES", 
    price: "110,99", 
    icon: <Sparkles size={16} />, 
    features: [
      "CORTES ILIMITADOS", 
      "BARBA SIMPLES ILIMITADA", 
      "ATENDIMENTO PADRÃO SIÃO", 
      "10% DE DESCONTO EM PRODUTOS E SERVIÇOS"
    ] 
  },
  { 
    name: "PLANO DE BARBA ILIMITADO", 
    price: "63,00", 
    icon: <MessageCircle size={16} />, 
    features: [
      "BARBA SIMPLES ILIMITADA", 
      "ATENDIMENTO PADRÃO SIÃO", 
      "10% DE DESCONTO EM PRODUTOS E SERVIÇOS", 
      "HIDRATAÇÃO DE BARBA"
    ] 
  }
];

const LOCATIONS = [
  { 
    name: "UNIDADE PRAIA DO FRANCÊS (CARAVELAS)", 
    image: UNIT_CARAVELAS, 
    video: "https://res.cloudinary.com/dbuiqh0ee/video/upload/v1784594160/SnapInsta.to_AQMzLMQdfx50f-x_B5LUh-ewg-2FFkQl88bRV7XK2AEf7BxCPB8Dg8_oZv4ct7-EHzQUyIWSI3sxV0LlNR_HXDIXBflKEmdsb3xb490_smeeuo.mp4",
    review: "https://g.page/r/CWufi9YZUFOEEAE/review", 
    color: "#D4AF37", 
    address: "Galeria Caravelas, Praia do Francês", 
    phone: "(82) 99388-1114", 
    desc: "Atendimento padrão Sião com o máximo de conforto, sofisticação e a brisa do mar.", 
    mapLink: "https://maps.app.goo.gl/k9eAMK98ZcEa4Y977" 
  },
  { 
    name: "UNIDADE TREVO", 
    image: UNIT_TREVO, 
    video: "https://res.cloudinary.com/dbuiqh0ee/video/upload/v1784594163/SnapInsta.to_AQMPI7zNjCzfm0FP9y__U4GjcrKm7zTDiXZdJRRHfBstMI43LIJoDFh7dwMDz3rJpw7kMdFxlmgVddj59ABFTk9uGS8siasNyaDTZgY_rbndve.mp4",
    review: "https://g.page/r/CVbdoJRvt2hgEAE/review", 
    color: "#ffffff", 
    address: "Trevo do Francês", 
    phone: "(82) 99106-6112", 
    desc: "Atendimento padrão Sião com agilidade, excelência e praticidade para sua rotina.", 
    mapLink: "https://www.google.com/maps/search/?api=1&query=Barbearia+Siao+Trevo+do+Frances" 
  },
  { 
    name: "UNIDADE MANGUABA", 
    image: UNIT_MANGUABA, 
    video: "https://res.cloudinary.com/dbuiqh0ee/video/upload/v1784594160/SnapInsta.to_AQPboXncLGAwZiK0AFr6mEBOl3l6hohX5xkgwVMsD3i2OpwWX3vhPDSI2U6hx930CDNQPTjGhnreZMd1X4HymkLg8rudBEU24gZ1MKA_sn4rx7.mp4",
    review: "https://g.page/r/CdP3R-dd6deoEAE/review", 
    color: "#ffffff", 
    address: "Rodovia Edvaldo Lopes, em direção à Fazenda Barreiros", 
    phone: "(82) 99146-8648", 
    desc: "Atendimento padrão Sião em um espaço moderno e sofisticado para toda a família.", 
    mapLink: "https://www.google.com/maps/search/?api=1&query=Barbearia+Siao+Manguaba+Rodovia+Edvaldo+Lopes" 
  }
];

// Sound generator for arcade button clicks
const playArcadeClick = () => {
  try {
    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(440, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.08);
    gain.gain.setValueAtTime(0.1, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.08);
    osc.start();
    osc.stop(ctx.currentTime + 0.08);
  } catch (e) {
    // Audio context error ignored
  }
};

const AnimatedLogo = ({ className = "h-14 w-14" }: { className?: string }) => {
  return (
    <div className={`relative ${className} rounded-full overflow-hidden border border-amber-500/50 shadow-[0_0_20px_rgba(245,158,11,0.3)] bg-neutral-900 group flex items-center justify-center`}>
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none z-10" />
      <div className="absolute inset-0 w-[200%] h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-[20deg] translate-x-[-150%] animate-shine pointer-events-none z-20" />
      <video 
        src={HERO_BG_VIDEO}
        autoPlay 
        loop 
        muted 
        playsInline 
        preload="auto"
        className="w-full h-full object-cover rounded-full group-hover:scale-110 transition-transform duration-700 select-none"
        referrerPolicy="no-referrer"
      />
    </div>
  );
};

const VideoWithSoundToggle = ({ 
  src, 
  className, 
  overlay = true,
  caption
}: { 
  src: string; 
  className?: string; 
  overlay?: boolean;
  caption?: string;
}) => {
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const toggleSound = (e: React.MouseEvent) => {
    e.stopPropagation();
    playArcadeClick();
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="relative w-full h-full aspect-[9/16] overflow-hidden group bg-neutral-950">
       <video 
         ref={videoRef}
         autoPlay 
         loop 
         muted={isMuted} 
         playsInline 
         preload="auto"
         className={`w-full h-full object-cover select-none ${className || ''}`} 
         referrerPolicy="no-referrer"
         src={src}
       />
       {caption && (
         <div className="absolute top-4 left-4 z-20 pointer-events-none">
           <span className="bg-neutral-950/80 backdrop-blur-md border border-white/10 text-white font-black text-[10px] tracking-widest uppercase px-3 py-1.5 rounded-lg shadow-lg">
             {caption}
           </span>
         </div>
       )}
       {overlay && (
         <div className="absolute bottom-4 right-4 z-20">
           <button 
             type="button"
             onClick={toggleSound}
             className="bg-neutral-950/85 hover:bg-amber-500 hover:text-neutral-950 text-white p-2.5 sm:p-3 rounded-full border border-white/20 backdrop-blur-md transition-all shadow-xl flex items-center justify-center cursor-pointer group-hover:scale-105 active:scale-95"
             title={isMuted ? "Ativar som" : "Desativar som"}
           >
             {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
           </button>
         </div>
       )}
    </div>
  );
};

export function App() {
  const [activeUnit, setActiveUnit] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productIndex, setProductIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProductIndex((prev) => (prev + 1) % PRODUCT_IMAGES.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  const handleGlobalClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest('button') || target.closest('a')) {
      playArcadeClick();
    }
  };

  return (
    <div onClick={handleGlobalClick} className="min-h-screen bg-neutral-950 text-white font-sans selection:bg-amber-500 selection:text-neutral-950 relative overflow-x-hidden">
      
      {/* Floating Golden Particles Background */}
      <FloatingParticles />

      {/* Navigation Header with Glassmorphism */}
      <header className="fixed top-0 inset-x-0 z-50 bg-neutral-950/70 backdrop-blur-xl border-b border-white/10 transition-all">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          
          <a href="#" className="flex items-center gap-3 group">
            <AnimatedLogo className="h-12 w-12" />
            <div className="flex flex-col">
              <span className="font-display font-black text-lg tracking-wider text-white">SIÃO</span>
              <span className="text-[9px] font-bold text-amber-500 tracking-[0.3em] uppercase">BARBER CLUB</span>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-7 text-xs font-bold uppercase tracking-widest text-neutral-300">
            {[
              { name: "Início", href: "#" },
              { name: "Planos", href: "#plans" },
              { name: "Mini Game", href: "#minigame" },
              { name: "Serviços nas TVs", href: "#tv-services" },
              { name: "Serviços", href: "#services" },
              { name: "Unidades", href: "#units" },
              { name: "Avaliações", href: "#reviews" },
              { name: "Recrutamento", href: "#work-with-us" }
            ].map((item, idx) => (
              <a key={idx} href={item.href} className="hover:text-amber-500 transition-colors">
                {item.name}
              </a>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-4">
            <a 
              href="https://cashbarber.com.br/siaobarberclub" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-amber-500 hover:bg-white text-neutral-950 font-black text-xs tracking-widest uppercase px-6 py-3.5 rounded-xl transition-all shadow-lg shadow-amber-500/20 active:scale-95 flex items-center gap-2"
            >
              <Clock size={15} /> AGENDAR HORÁRIO
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            type="button" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2.5 rounded-xl bg-white/5 border border-white/10 text-white"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden absolute top-20 inset-x-0 bg-neutral-950/95 backdrop-blur-2xl border-b border-white/10 p-6 flex flex-col gap-4 animate-fade-in z-50">
            {[
              { name: "Início", href: "#" },
              { name: "Planos", href: "#plans" },
              { name: "Mini Game", href: "#minigame" },
              { name: "Serviços nas TVs", href: "#tv-services" },
              { name: "Serviços", href: "#services" },
              { name: "Unidades", href: "#units" },
              { name: "Avaliações", href: "#reviews" },
              { name: "Recrutamento", href: "#work-with-us" }
            ].map((item, idx) => (
              <a 
                key={idx} 
                href={item.href} 
                onClick={() => setMobileMenuOpen(false)}
                className="text-xs font-bold uppercase tracking-widest text-neutral-300 hover:text-amber-500 py-2 border-b border-white/5"
              >
                {item.name}
              </a>
            ))}
            <a 
              href="https://cashbarber.com.br/siaobarberclub" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-amber-500 text-neutral-950 font-black text-xs tracking-widest uppercase px-6 py-4 rounded-xl text-center mt-2 flex items-center justify-center gap-2"
            >
              <Clock size={15} /> AGENDAR HORÁRIO
            </a>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative min-h-[95vh] flex flex-col items-center justify-center text-center px-6 pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 w-full h-full opacity-50 pointer-events-none">
           <video autoPlay muted loop playsInline preload="auto" className="w-full h-full object-cover transform scale-110" referrerPolicy="no-referrer">
             <source src={HERO_BG_VIDEO} type="video/mp4" />
           </video>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/40 via-neutral-950/70 to-neutral-950" />

        <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[11px] font-black tracking-[0.3em] uppercase mb-6 backdrop-blur-md shadow-lg shadow-amber-500/10">
            <Sparkles size={15} /> ATENDIMENTO PADRÃO SIÃO • MARECHAL DEODORO
          </div>

          <h1 className="font-display font-black text-5xl sm:text-7xl md:text-8xl uppercase tracking-tight mb-6 leading-none">
            MODERNIDADE E TRADIÇÃO <br /><span className="text-amber-500 italic">EM CADA DETALHE.</span>
          </h1>

          <p className="text-neutral-300 text-sm sm:text-base max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
            Muito mais do que um corte comum. Um ritual de precisão, sofisticação e o verdadeiro atendimento padrão Sião no coração de Marechal Deodoro e região.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center">
            <a 
              href="https://cashbarber.com.br/siaobarberclub" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-amber-500 text-neutral-950 font-black text-xs tracking-widest uppercase px-10 py-5 rounded-2xl hover:bg-white transition-all shadow-xl shadow-amber-500/20 active:scale-95 flex items-center gap-3"
            >
              <Clock size={16} /> AGENDAR HORÁRIO <ArrowRight size={16} />
            </a>
            <a 
              href="https://siaolego.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-xl font-black text-xs tracking-widest uppercase px-10 py-5 rounded-2xl transition-all active:scale-95 flex items-center gap-3"
            >
              <Gamepad2 size={16} className="text-amber-500" /> JOGAR MINI GAME (SIAOLEGO) <ArrowRight size={14} />
            </a>
          </div>
        </div>
      </section>

      {/* Amenities & Highlights Strip */}
      <div className="border-y border-white/10 bg-neutral-900/60 backdrop-blur-xl py-4 px-6 relative z-10">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-8 sm:gap-12 text-xs font-bold uppercase tracking-wider text-neutral-300">
          <div className="flex items-center gap-2 text-amber-400">
            <Sparkles size={16} /> <span>Atendimento Padrão Sião</span>
          </div>
          <div className="flex items-center gap-2">
            <Coffee size={16} className="text-amber-500" /> <span>Café Exclusivo & Ambiente Confortável</span>
          </div>
          <div className="flex items-center gap-2">
            <Wifi size={16} className="text-amber-500" /> <span>Wi-Fi de Alta Velocidade</span>
          </div>
          <div className="flex items-center gap-2">
            <Scissors size={16} className="text-amber-500" /> <span>Profissionais Especializados</span>
          </div>
        </div>
      </div>

      {/* Trio of Hero Videos in 9:16 Aspect Ratio with Lateral Controls */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-0 border-b border-white/10 relative z-10 bg-neutral-950">
        {[
          {
            src: "https://res.cloudinary.com/dbuiqh0ee/video/upload/v1784594163/SnapInsta.to_AQMPI7zNjCzfm0FP9y__U4GjcrKm7zTDiXZdJRRHfBstMI43LIJoDFh7dwMDz3rJpw7kMdFxlmgVddj59ABFTk9uGS8siasNyaDTZgY_rbndve.mp4",
            title: "UNIDADE TREVO"
          },
          {
            src: "https://res.cloudinary.com/dbuiqh0ee/video/upload/v1784594160/SnapInsta.to_AQMzLMQdfx50f-x_B5LUh-ewg-2FFkQl88bRV7XK2AEf7BxCPB8Dg8_oZv4ct7-EHzQUyIWSI3sxV0LlNR_HXDIXBflKEmdsb3xb490_smeeuo.mp4",
            title: "UNIDADE CARAVELAS"
          },
          {
            src: "https://res.cloudinary.com/dbuiqh0ee/video/upload/v1784594160/SnapInsta.to_AQPboXncLGAwZiK0AFr6mEBOl3l6hohX5xkgwVMsD3i2OpwWX3vhPDSI2U6hx930CDNQPTjGhnreZMd1X4HymkLg8rudBEU24gZ1MKA_sn4rx7.mp4",
            title: "UNIDADE MANGUABA"
          }
        ].map((item, idx) => (
          <div key={idx} className="aspect-[9/16] relative overflow-hidden group bg-neutral-900 border-r border-white/10 last:border-r-0">
            <VideoWithSoundToggle src={item.src} overlay={true} caption={item.title} />
          </div>
        ))}
      </section>

      {/* Subscription Plans Section with Glassmorphism */}
      <section id="plans" className="py-32 px-6 relative z-10">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-amber-500 font-bold tracking-[0.4em] uppercase text-[10px] block mb-3">ASSINATURA EXCLUSIVE</span>
            <h2 className="font-display font-black text-5xl sm:text-7xl uppercase mb-6 leading-none">
              PLANO DE CORTE <span className="text-amber-500 italic">ILIMITADO.</span>
            </h2>
            <p className="text-neutral-400 text-sm leading-relaxed">
              Mantenha seu visual impecável todos os dias com economia e praticidade. Escolha o plano que melhor se adapta ao seu estilo de vida.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {PLANS.map((plan, i) => (
              <div 
                key={i} 
                className={`relative rounded-[32px] p-8 backdrop-blur-xl border flex flex-col justify-between transition-all duration-500 hover:-translate-y-2 ${
                  plan.popular 
                    ? 'bg-neutral-900/95 border-amber-500 shadow-[0_0_50px_rgba(245,158,11,0.2)] ring-1 ring-amber-500/50' 
                    : 'bg-neutral-900/75 border-white/10 hover:border-amber-500/40'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-amber-500 text-neutral-950 font-black text-[9px] tracking-[0.3em] uppercase py-1.5 px-5 rounded-full shadow-lg">
                    MAIS POPULAR
                  </div>
                )}

                <div>
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-500 mb-6">
                    {plan.icon}
                  </div>
                  <h3 className="font-display font-bold text-lg uppercase mb-4 text-white leading-snug">{plan.name}</h3>
                  <div className="flex items-baseline gap-1 mb-8">
                    <span className="text-xs font-bold text-neutral-400">R$</span>
                    <span className="font-display font-black text-4xl text-white">{plan.price}</span>
                    <span className="text-xs text-neutral-500 font-bold">/mês</span>
                  </div>

                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feat, j) => (
                      <li key={j} className="flex items-start gap-3 text-xs font-bold uppercase tracking-wider text-neutral-300">
                        <span className="text-amber-500 mt-0.5">✓</span> {feat}
                      </li>
                    ))}
                  </ul>
                </div>

                <a 
                  href="https://cashbarber.com.br/siaobarberclub" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={`w-full py-4 rounded-2xl font-black text-xs tracking-widest uppercase transition-all flex items-center justify-center gap-2 ${
                    plan.popular
                      ? 'bg-amber-500 text-neutral-950 hover:bg-white shadow-xl shadow-amber-500/20'
                      : 'bg-white/5 border border-white/10 text-white hover:bg-amber-500 hover:text-neutral-950'
                  }`}
                >
                  ASSINAR PLANO <ArrowRight size={14} />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* Mini Game Section */}
      <div id="minigame" className="relative z-10">
        <SiaoMiniGame />
      </div>

      {/* Seção de Serviços nas Televisões e Proposta de Divulgação */}
      <section id="tv-services" className="py-32 px-6 relative z-10 bg-neutral-900/60 backdrop-blur-md border-t border-b border-white/10 overflow-hidden">
        {/* Ambient Glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-amber-500/10 blur-[160px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[10px] font-black tracking-[0.3em] uppercase mb-4 backdrop-blur-md">
              <Tv size={14} /> PUBLICIDADE & MARKETING INDOOR
            </div>
            <h2 className="font-display font-black text-5xl sm:text-7xl uppercase mb-6 leading-none">
              PROPOSTA NAS <span className="text-amber-500 italic">TELEVISÕES.</span>
            </h2>
            <p className="text-neutral-400 text-sm leading-relaxed">
              Divulgue sua marca para mais de <strong className="text-white">2.000 clientes por mês</strong> em nossa rede de Smart TVs instaladas nas barbearias Sião Barber Club em Marechal Deodoro.
            </p>
          </div>

          {/* Partnership Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-neutral-900/80 backdrop-blur-xl border border-white/10 rounded-[28px] p-8 shadow-xl flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-500 mb-6">
                  <MapPin size={22} />
                </div>
                <h3 className="font-display font-bold text-lg uppercase text-white mb-3">Rede de Unidades</h3>
                <p className="text-xs text-neutral-400 leading-relaxed mb-4">
                  3 filiais estratégicas em Marechal Deodoro com um total de 6 TVs exibindo conteúdos diariamente:
                </p>
                <ul className="space-y-2 text-xs font-bold text-neutral-300 uppercase">
                  <li className="flex items-center gap-2 text-amber-400">✓ Unidade Manguaba</li>
                  <li className="flex items-center gap-2 text-amber-400">✓ Trevo do Francês</li>
                  <li className="flex items-center gap-2 text-amber-400">✓ Caravelas (Praia do Francês)</li>
                </ul>
              </div>
            </div>

            <div className="bg-neutral-900/80 backdrop-blur-xl border border-white/10 rounded-[28px] p-8 shadow-xl flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-500 mb-6">
                  <Users size={22} />
                </div>
                <h3 className="font-display font-bold text-lg uppercase text-white mb-3">Público & Alcance</h3>
                <p className="text-xs text-neutral-400 leading-relaxed mb-4">
                  Exposição direta para mais de <strong className="text-white">2.000 clientes por mês</strong> que assistem aos conteúdos enquanto aguardam o atendimento.
                </p>
                <ul className="space-y-2 text-xs font-bold text-neutral-300 uppercase">
                  <li className="flex items-center gap-2 text-amber-400">✓ Exclusividade de nicho</li>
                  <li className="flex items-center gap-2 text-amber-400">✓ Ambiente qualificado</li>
                  <li className="flex items-center gap-2 text-amber-400">✓ Visualização diária garantida</li>
                </ul>
              </div>
            </div>

            <div className="bg-neutral-900/80 backdrop-blur-xl border border-white/10 rounded-[28px] p-8 shadow-xl flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-500 mb-6">
                  <Clock size={22} />
                </div>
                <h3 className="font-display font-bold text-lg uppercase text-white mb-3">Especificações</h3>
                <p className="text-xs text-neutral-400 leading-relaxed mb-4">
                  Formatos aceitos para veiculação nas telas:
                </p>
                <ul className="space-y-2 text-xs font-bold text-neutral-300 uppercase">
                  <li className="flex items-center gap-2 text-amber-400">✓ Vídeo de até 35 segundos</li>
                  <li className="flex items-center gap-2 text-amber-400">✓ Imagem estática em HD</li>
                  <li className="flex items-center gap-2 text-amber-400">✓ Formato Vertical (9:16)</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Pricing Table & WhatsApp Contact */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16 bg-neutral-900/90 backdrop-blur-2xl border border-white/10 rounded-[36px] p-8 sm:p-12 shadow-2xl">
            <div>
              <span className="text-amber-500 font-bold tracking-[0.3em] uppercase text-[10px] block mb-2">INVESTIMENTO MENSAL</span>
              <h3 className="font-display font-black text-3xl uppercase text-white mb-6">PLANOS DE DIVULGAÇÃO</h3>
              <p className="text-neutral-300 text-sm mb-6 leading-relaxed">
                Escolha o pacote ideal para o tamanho da sua empresa e posicione sua marca em destaque para todo o público de Marechal Deodoro.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-center justify-between p-4 rounded-2xl bg-neutral-950 border border-white/10">
                  <div>
                    <h4 className="font-bold text-sm uppercase text-white">1 Unidade</h4>
                    <p className="text-xs text-neutral-400">Anúncio exibido em 1 filial</p>
                  </div>
                  <span className="font-display font-black text-xl text-amber-400">R$ 120,00 <span className="text-[10px] font-normal text-neutral-400">/mês</span></span>
                </div>

                <div className="flex items-center justify-between p-4 rounded-2xl bg-neutral-950 border border-white/10">
                  <div>
                    <h4 className="font-bold text-sm uppercase text-white">2 Unidades</h4>
                    <p className="text-xs text-neutral-400">Anúncio exibido em 2 filiais</p>
                  </div>
                  <span className="font-display font-black text-xl text-amber-400">R$ 180,00 <span className="text-[10px] font-normal text-neutral-400">/mês</span></span>
                </div>

                <div className="flex items-center justify-between p-4 rounded-2xl bg-neutral-950 border border-amber-500/50 shadow-lg shadow-amber-500/10">
                  <div>
                    <h4 className="font-bold text-sm uppercase text-white flex items-center gap-2">
                      3 Unidades (Todas) 
                      <span className="text-[9px] bg-amber-500 text-neutral-950 px-2 py-0.5 rounded-full font-black">MAIS POPULAR</span>
                    </h4>
                    <p className="text-xs text-neutral-400">Exibição máxima em toda a rede</p>
                  </div>
                  <span className="font-display font-black text-xl text-amber-400">R$ 200,00 <span className="text-[10px] font-normal text-neutral-400">/mês</span></span>
                </div>
              </div>

              <a
                href="https://wa.me/5582993651280?text=Ol%C3%A1%20Daniel,%20gostaria%20de%20saber%20mais%20sobre%20a%20proposta%20de%20divulga%C3%A7%C3%A3o%20nas%20TVs%20da%20Si%C3%A3o%20Barber%20Club!"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-amber-500 text-neutral-950 font-black text-xs tracking-widest uppercase px-8 py-5 rounded-2xl flex items-center justify-center gap-3 hover:bg-white transition-all shadow-xl shadow-amber-500/20 active:scale-95"
              >
                <MessageCircle size={18} /> FALAR COM DANIEL SIÃO (WHATSAPP) <ArrowRight size={16} />
              </a>
            </div>

            {/* Featured Proposal Video in 9:16 format */}
            <div className="relative rounded-[32px] bg-gradient-to-b from-neutral-800 to-neutral-950 p-4 border-2 border-neutral-700 shadow-2xl flex flex-col items-center">
              <div className="w-full flex items-center justify-between px-3 py-2 mb-3 bg-neutral-900 rounded-xl text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="font-display font-black text-[10px] tracking-wider text-white">
                    VÍDEO OFICIAL DE PROPOSTA • 9:16
                  </span>
                </div>
                <span className="bg-amber-500 text-neutral-950 font-black text-[9px] px-2 py-0.5 rounded uppercase tracking-wider">
                  HD
                </span>
              </div>

              <div className="aspect-[9/16] w-full max-w-[320px] rounded-2xl overflow-hidden border border-white/10 shadow-2xl relative bg-neutral-950">
                <VideoWithSoundToggle src={PROPOSAL_TV_VIDEO} overlay={true} caption="PROPOSTA NAS TVs" />
              </div>

              <p className="text-[11px] text-neutral-400 mt-4 text-center font-medium">
                Exibição contínua em todas as unidades da Sião Barber Club.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Services Table Section with Glassmorphism */}
      <section id="services" className="py-32 px-6 relative z-10 bg-neutral-900/40">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-amber-500 font-bold tracking-[0.4em] uppercase text-[10px] block mb-3">EXPERIÊNCIA SIÃO</span>
            <h2 className="font-display font-black text-5xl sm:text-7xl uppercase mb-6 leading-none">
              TABELA DE <span className="text-amber-500 italic">SERVIÇOS.</span>
            </h2>
            <p className="text-neutral-400 text-sm leading-relaxed">
              Oferecemos uma seleção completa de serviços focada na estética masculina contemporânea, unindo técnicas clássicas à inovação constante de nossa equipe.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {Object.entries(SERVICES).map(([category, items], idx) => (
              <div key={idx} className="bg-neutral-900/85 backdrop-blur-2xl border border-white/10 rounded-[32px] p-8 shadow-2xl">
                <h3 className="font-display font-black text-xl uppercase text-amber-500 mb-6 pb-4 border-b border-white/10 flex items-center justify-between">
                  <span>{category}</span>
                  <Scissors size={18} className="opacity-60" />
                </h3>
                <div className="space-y-6">
                  {items.map((serv, i) => (
                    <div key={i} className="flex items-center justify-between gap-4">
                      <span className="text-xs font-bold uppercase tracking-wider text-neutral-300">{serv.name}</span>
                      <span className="text-xs font-black text-amber-400 tracking-wider shrink-0">{serv.price}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Shop Section */}
      <section id="shop" className="py-32 px-6 relative z-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-amber-500 font-bold tracking-[0.4em] uppercase text-[10px] block mb-3">MANTENHA A PAIXÃO EM CASA</span>
            <h2 className="font-display font-black text-5xl sm:text-7xl uppercase mb-6 leading-none">
              NOSSOS <span className="text-amber-500 italic">PRODUTOS.</span>
            </h2>
            <p className="text-neutral-400 text-sm leading-relaxed mb-8">
              Uma seleção rigorosa do que há de melhor em estética masculina e cuidados pessoais para o seu dia a dia. Pomadas, óleos, balms e shampoos exclusivos.
            </p>
            <div className="flex items-center gap-6">
              <a 
                href="https://wa.link/q20rlq" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-amber-500 text-neutral-950 font-black text-xs tracking-widest uppercase px-10 py-5 rounded-2xl hover:bg-white transition-all shadow-xl shadow-amber-500/20 active:scale-95 flex items-center gap-3"
              >
                <ShoppingBag size={16} /> COMPRAR NO WHATSAPP
              </a>
            </div>
          </div>

          <div className="relative aspect-square overflow-hidden rounded-[40px] border border-white/10 bg-neutral-900/60 backdrop-blur-xl p-10 flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/10 via-transparent to-transparent pointer-events-none" />
            <img src={PRODUCT_IMAGES[productIndex]} alt="Product" className="w-[85%] relative z-10 animate-float pointer-events-none drop-shadow-[0_0_80px_rgba(212,175,55,0.4)]" referrerPolicy="no-referrer" />
          </div>
        </div>
      </section>

      {/* Sião Academy Section */}
      <section id="academy" className="py-32 px-6 relative z-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1">
            <div className="aspect-[9/16] max-w-[400px] mx-auto rounded-[40px] overflow-hidden border-[10px] border-neutral-900 shadow-[0_0_100px_rgba(0,0,0,0.8)] relative cursor-pointer">
               <VideoWithSoundToggle src={ACADEMY_VIDEO} overlay={true} />
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <span className="text-amber-500 font-bold tracking-[0.4em] uppercase text-[10px] block mb-3">FORMAÇÃO PROFISSIONAL</span>
            <h2 className="font-display font-black text-5xl sm:text-7xl uppercase mb-6 leading-none">
              SIÃO <span className="text-amber-500 italic">ACADEMY.</span>
            </h2>
            <p className="text-neutral-400 text-sm leading-relaxed mb-8">
              Transforme sua paixão pela barbearia em uma carreira de sucesso. Nossos cursos intensivos e mentorias práticas ensinam técnicas avançadas de corte, barba e gestão de barbearia.
            </p>
            <a 
              href="https://wa.me/5582993651280?text=Ol%C3%A1%20Daniel,%20gostaria%20de%20saber%20mais%20sobre%20os%20cursos%20da%20Si%C3%A3o%20Academy!" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-white/5 border border-white/10 hover:bg-amber-500 hover:text-neutral-950 font-black text-xs tracking-widest uppercase px-10 py-5 rounded-2xl transition-all"
            >
              GARANTIR VAGA NA PRÓXIMA TURMA <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </section>

      {/* Google Reviews Section (Avaliando no Google por Unidade) */}
      <section id="reviews" className="py-32 px-6 relative z-10 bg-neutral-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-amber-500 font-bold tracking-[0.4em] uppercase text-[10px] block mb-3">EXCELÊNCIA RECONHECIDA</span>
            <h2 className="font-display font-black text-5xl sm:text-7xl uppercase mb-6 leading-none">
              AVALIE A <span className="text-amber-500 italic">SIÃO.</span>
            </h2>
            <p className="text-neutral-400 text-sm leading-relaxed">
              Sua opinião é fundamental para continuarmos elevando o padrão da barbearia em Alagoas. Escolha sua unidade e deixe sua avaliação no Google!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {LOCATIONS.map((loc, i) => (
              <div key={i} className="bg-neutral-900/85 backdrop-blur-2xl border border-white/10 rounded-[32px] p-8 shadow-2xl flex flex-col justify-between group hover:border-amber-500/50 transition-all">
                <div>
                  <div className="flex items-center gap-1 text-amber-500 mb-4">
                    {[...Array(5)].map((_, s) => (
                      <Star key={s} size={16} fill="currentColor" />
                    ))}
                    <span className="text-xs font-bold text-white ml-2">5.0 no Google</span>
                  </div>
                  <h3 className="font-display font-black text-lg uppercase text-white mb-3">{loc.name}</h3>
                  <p className="text-xs text-neutral-400 mb-6">{loc.address}</p>
                </div>

                <a 
                  href={loc.review}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-amber-500 text-neutral-950 font-black text-xs tracking-widest uppercase py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-white transition-all shadow-lg"
                >
                  <ThumbsUp size={16} /> AVALIAR NO GOOGLE <ArrowRight size={14} />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Locations / Units Section with Glassmorphism */}
      <section id="units" className="py-32 px-6 relative z-10 bg-neutral-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-amber-500 font-bold tracking-[0.4em] uppercase text-[10px] block mb-3">ESTAMOS ONDE VOCÊ PRECISA</span>
            <h2 className="font-display font-black text-5xl sm:text-7xl uppercase mb-6 leading-none">
              NOSSAS <span className="text-amber-500 italic">UNIDADES.</span>
            </h2>
            <p className="text-neutral-400 text-sm leading-relaxed">
              Três unidades estrategicamente localizadas para oferecer o máximo de conforto, elegância e facilidade de acesso.
            </p>
          </div>

          {/* Unit Selector Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {LOCATIONS.map((loc, i) => (
              <div 
                key={i} 
                onClick={() => setActiveUnit(i)} 
                className={`relative group cursor-pointer overflow-hidden rounded-3xl border-2 transition-all p-6 backdrop-blur-xl ${
                  activeUnit === i 
                    ? 'border-amber-500 bg-neutral-900/90 shadow-2xl shadow-amber-500/10' 
                    : 'border-white/10 bg-neutral-900/50 opacity-70 hover:opacity-100'
                }`}
              >
                <div className="aspect-[9/16] max-h-[340px] relative rounded-2xl overflow-hidden mb-4 bg-neutral-950">
                  <VideoWithSoundToggle src={loc.video} overlay={true} caption={loc.name.split('(')[0]} />
                </div>
                <h3 className="font-display font-black text-base uppercase text-white mb-2">{loc.name}</h3>
                <p className="text-xs text-neutral-400 line-clamp-2">{loc.desc}</p>
              </div>
            ))}
          </div>

          {/* Active Unit Map & Video Showcase with Glassmorphism */}
          <div className="bg-neutral-900/85 backdrop-blur-2xl border border-white/10 rounded-[32px] p-8 sm:p-12 shadow-2xl grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <span className="text-amber-500 font-bold tracking-[0.3em] uppercase text-[10px] block mb-2">UNIDADE SELECIONADA</span>
              <h3 className="font-display font-black text-3xl uppercase text-white mb-6">{LOCATIONS[activeUnit].name}</h3>
              <p className="text-neutral-300 text-sm mb-6 leading-relaxed">{LOCATIONS[activeUnit].desc}</p>
              
              <div className="space-y-4 mb-8">
                <p className="flex items-center gap-3 text-neutral-300 text-xs font-bold uppercase tracking-wider">
                  <MapPin size={16} className="text-amber-500 shrink-0" /> {LOCATIONS[activeUnit].address}
                </p>
                <p className="flex items-center gap-3 text-neutral-300 text-xs font-bold uppercase tracking-wider">
                  <Phone size={16} className="text-amber-500 shrink-0" /> {LOCATIONS[activeUnit].phone}
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <a 
                  href={LOCATIONS[activeUnit].mapLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-amber-500 text-neutral-950 font-black text-xs tracking-widest uppercase px-8 py-4 rounded-xl flex items-center gap-2 hover:bg-white transition-all shadow-lg"
                >
                  ABRIR NO GOOGLE MAPS <ArrowRight size={14} />
                </a>
                <a 
                  href={LOCATIONS[activeUnit].review} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-white/5 border border-white/10 text-white font-black text-xs tracking-widest uppercase px-8 py-4 rounded-xl flex items-center gap-2 hover:bg-white/10 transition-all"
                >
                  AVALIAR UNIDADE <Star size={14} fill="currentColor" className="text-amber-500" />
                </a>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="aspect-[9/16] rounded-2xl overflow-hidden border border-white/10 shadow-2xl relative bg-neutral-950">
                <VideoWithSoundToggle src={LOCATIONS[activeUnit].video} overlay={true} />
              </div>
              <div className="aspect-[9/16] rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-neutral-950">
                <iframe
                  title="Google Map"
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(LOCATIONS[activeUnit].address)}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                  className="w-full h-full border-0 filter invert contrast-125 opacity-90"
                  allowFullScreen={false}
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery & Art Section */}
      <section className="py-32 px-6 relative z-10 overflow-hidden">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <span className="text-amber-500 font-bold tracking-[0.4em] uppercase text-[10px] block mb-3">A ARTE DA BARBEARIA</span>
          <h2 className="font-display font-black text-5xl sm:text-7xl uppercase mb-6 leading-none">
            GALERIA <span className="text-amber-500 italic">SIÃO.</span>
          </h2>
        </div>

        {/* Horizontal Scrolling Marquee */}
        <div className="flex gap-6 overflow-x-auto pb-6 scrollbar-none px-4">
          {GALLERY_IMAGES.map((img, idx) => (
             <div key={idx} className="w-[300px] h-[450px] shrink-0 rounded-3xl overflow-hidden group border border-white/10 shadow-xl">
                <img src={img} alt="Gallery" className="w-full h-full object-cover group-hover:scale-110 transition-all duration-1000" referrerPolicy="no-referrer" />
             </div>
          ))}
        </div>
      </section>

      {/* Trabalhe Conosco / Recrutamento Section with CareerForm */}
      <section id="work-with-us" className="py-32 px-6 relative z-10 bg-neutral-900/40">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <span className="text-amber-500 font-bold tracking-[0.4em] uppercase text-[10px] block mb-3">FAÇA PARTE DO TIME</span>
          <h2 className="font-display font-black text-5xl sm:text-7xl uppercase mb-6 leading-none">
            TRABALHE <span className="text-amber-500 italic">CONOSCO.</span>
          </h2>
          <p className="text-neutral-400 text-sm max-w-2xl mx-auto leading-relaxed">
            Estamos sempre em busca de talentos que compartilham nossa paixão pela excelência e pela arte da barbearia. Preencha o formulário abaixo para enviar sua candidatura direto para o nosso WhatsApp!
          </p>
        </div>

        <CareerForm defaultPosition="barbeiro" />
      </section>

      {/* Footer */}
      <footer className="py-20 px-6 border-t border-white/10 bg-neutral-950 text-center relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col items-center gap-6">
          <AnimatedLogo className="h-16 w-16" />
          <h3 className="font-display font-black text-2xl uppercase tracking-wider text-white">SIÃO BARBER CLUB</h3>
          <p className="text-xs text-neutral-500 max-w-md uppercase tracking-widest leading-relaxed">
            Tradição, modernidade e excelência em Marechal Deodoro - Alagoas.
          </p>
          <div className="flex items-center gap-6 text-neutral-400 mt-4">
            <a href="https://instagram.com/siaobarberclub" target="_blank" rel="noopener noreferrer" className="hover:text-amber-500 transition-colors">
              <Instagram size={20} />
            </a>
            <a href="https://wa.me/5582993651280" target="_blank" rel="noopener noreferrer" className="hover:text-amber-500 transition-colors">
              <MessageCircle size={20} />
            </a>
          </div>
          <p className="text-[10px] text-neutral-600 uppercase tracking-widest mt-8">
            © {new Date().getFullYear()} Sião Barber Club. Todos os direitos reservados.
          </p>
        </div>
      </footer>

    </div>
  );
}

export default App;
