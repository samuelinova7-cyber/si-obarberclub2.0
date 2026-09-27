import React, { useState, useEffect, useRef } from 'react';
import { Scissors, Trophy, Play, RotateCcw, Award, Sparkles, Zap, Star, Gamepad2, ArrowRight } from 'lucide-react';

export function SiaoMiniGame() {
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'gameover' | 'won'>('idle');
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(20);
  const [items, setItems] = useState<Array<{ id: number; x: number; y: number; type: 'scissor' | 'pomade' | 'razor' | 'bad' }>>([]);
  const [clickEffect, setClickEffect] = useState<{ x: number; y: number; text: string } | null>(null);
  const gameAreaRef = useRef<HTMLDivElement | null>(null);

  // Sound generator using Web Audio API
  const playSound = (type: 'collect' | 'bad' | 'start' | 'win') => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      if (type === 'collect') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
        osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.15); // A5
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);
        osc.start();
        osc.stop(ctx.currentTime + 0.15);
      } else if (type === 'bad') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(150, ctx.currentTime);
        osc.frequency.setValueAtTime(90, ctx.currentTime + 0.1);
        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
        osc.start();
        osc.stop(ctx.currentTime + 0.2);
      } else if (type === 'start') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(440, ctx.currentTime);
        osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.1);
        osc.frequency.setValueAtTime(880, ctx.currentTime + 0.2);
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
        osc.start();
        osc.stop(ctx.currentTime + 0.3);
      } else if (type === 'win') {
        osc.type = 'sine';
        [523.25, 659.25, 783.99, 1046.50].forEach((freq, idx) => {
          setTimeout(() => {
            const o = ctx.createOscillator();
            const g = ctx.createGain();
            o.connect(g);
            g.connect(ctx.destination);
            o.frequency.value = freq;
            g.gain.setValueAtTime(0.15, ctx.currentTime);
            g.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
            o.start();
            o.stop(ctx.currentTime + 0.2);
          }, idx * 100);
        });
      }
    } catch (e) {
      // Audio context policy ignored
    }
  };

  useEffect(() => {
    let timer: any;
    let spawner: any;

    if (gameState === 'playing') {
      playSound('start');
      setTimeLeft(20);
      setScore(0);
      setItems([]);

      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            clearInterval(spawner);
            setGameState('won');
            playSound('win');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      spawner = setInterval(() => {
        const types: Array<'scissor' | 'pomade' | 'razor' | 'bad'> = ['scissor', 'pomade', 'razor', 'bad', 'scissor', 'pomade'];
        const randomType = types[Math.floor(Math.random() * types.length)];
        const newItem = {
          id: Date.now() + Math.random(),
          x: Math.floor(Math.random() * 80) + 10, // percentage width
          y: Math.floor(Math.random() * 70) + 15, // percentage height
          type: randomType,
        };

        setItems((curr) => [...curr.slice(-6), newItem]); // keep max 7 items
      }, 900);
    }

    return () => {
      clearInterval(timer);
      clearInterval(spawner);
    };
  }, [gameState]);

  const handleItemClick = (id: number, type: string, e: React.MouseEvent) => {
    if (gameState !== 'playing') return;

    const rect = (e.target as HTMLElement).getBoundingClientRect();
    const parentRect = gameAreaRef.current?.getBoundingClientRect() || { left: 0, top: 0 };
    setClickEffect({
      x: rect.left - parentRect.left + 20,
      y: rect.top - parentRect.top,
      text: type === 'bad' ? '-3 pts' : '+1 pt'
    });
    setTimeout(() => setClickEffect(null), 400);

    if (type === 'bad') {
      playSound('bad');
      setScore((s) => Math.max(0, s - 3));
    } else {
      playSound('collect');
      setScore((s) => s + 1);
    }

    setItems((curr) => curr.filter((item) => item.id !== id));
  };

  return (
    <section id="minigame" className="py-28 px-6 bg-neutral-950 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <span className="text-amber-500 font-bold tracking-[0.4em] uppercase text-[10px] block mb-2">
          ARCADE SIÃO BARBER
        </span>
        <h2 className="font-display font-black text-4xl sm:text-6xl uppercase text-white mb-4">
          MINI GAME DO <span className="text-amber-500 italic">SIÃO</span>
        </h2>
        <p className="text-neutral-400 text-sm max-w-xl mx-auto mb-10 leading-relaxed">
          Mostre sua agilidade! Clique nas tesouras, pomadas e navalhas que aparecem na tela antes que o tempo acabe. Faça 12 pontos e ganhe um desconto especial!
        </p>

        {/* Game Container with Glassmorphism */}
        <div 
          ref={gameAreaRef}
          className="relative w-full h-[420px] sm:h-[480px] rounded-[32px] bg-neutral-900/80 backdrop-blur-xl border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col items-center justify-center p-6 select-none"
        >
          {/* Top HUD */}
          <div className="absolute top-0 inset-x-0 h-16 bg-neutral-900/90 border-b border-white/10 px-6 flex items-center justify-between z-20">
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-black tracking-widest uppercase text-white">
                PONTOS: <span className="text-amber-500 text-base">{score}</span>
              </span>
            </div>
            <div className="text-xs font-black tracking-widest uppercase text-white">
              TEMPO: <span className={`text-base ${timeLeft <= 5 ? 'text-red-500 animate-bounce' : 'text-amber-500'}`}>{timeLeft}s</span>
            </div>
          </div>

          {/* Idle State */}
          {gameState === 'idle' && (
            <div className="text-center z-10 animate-fade-in mt-6 max-w-lg mx-auto">
              <div className="w-20 h-20 bg-amber-500/20 border border-amber-500/40 rounded-3xl flex items-center justify-center mx-auto mb-6 text-amber-500 shadow-xl shadow-amber-500/20">
                <Scissors size={36} />
              </div>
              <h3 className="font-display font-black text-2xl sm:text-3xl uppercase text-white mb-3">
                MINI GAME DO SIÃO
              </h3>
              <p className="text-xs text-neutral-400 max-w-sm mx-auto mb-8 leading-relaxed">
                Acesse a versão completa e interativa do mini game no portal Siaolego.
              </p>
              
              <div className="flex items-center justify-center">
                <a
                  href="https://siaolego.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-amber-500 text-neutral-950 font-black text-xs tracking-widest uppercase px-10 py-5 rounded-2xl hover:bg-white transition-all shadow-xl shadow-amber-500/20 active:scale-95 flex items-center justify-center gap-3 cursor-pointer"
                >
                  <Gamepad2 size={18} /> JOGAR NO SIAOLEGO.VERCEL.APP <ArrowRight size={16} />
                </a>
              </div>
            </div>
          )}

          {/* Playing State */}
          {gameState === 'playing' && (
            <div className="absolute inset-0 pt-16">
              {items.map((item) => (
                <button
                  key={item.id}
                  onClick={(e) => handleItemClick(item.id, item.type, e)}
                  style={{ top: `${item.y}%`, left: `${item.x}%` }}
                  className={`absolute w-14 h-14 rounded-2xl flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2 transition-transform hover:scale-125 active:scale-90 cursor-pointer shadow-lg animate-bounce ${
                    item.type === 'bad'
                      ? 'bg-red-500/20 border border-red-500/50 text-red-400'
                      : 'bg-amber-500/20 border border-amber-500/50 text-amber-400'
                  }`}
                >
                  {item.type === 'scissor' && <Scissors size={24} />}
                  {item.type === 'pomade' && <Sparkles size={24} />}
                  {item.type === 'razor' && <Zap size={24} />}
                  {item.type === 'bad' && <span className="font-black text-lg">⚠️</span>}
                </button>
              ))}

              {clickEffect && (
                <span 
                  className={`absolute font-black text-sm pointer-events-none animate-fade-in ${clickEffect.text.includes('-') ? 'text-red-400' : 'text-emerald-400'}`}
                  style={{ top: `${clickEffect.y}px`, left: `${clickEffect.x}px` }}
                >
                  {clickEffect.text}
                </span>
              )}
            </div>
          )}

          {/* Won / Game Over State */}
          {(gameState === 'won' || gameState === 'gameover') && (
            <div className="text-center z-10 animate-fade-in mt-10">
              <div className="w-20 h-20 bg-amber-500/20 border border-amber-500/40 rounded-3xl flex items-center justify-center mx-auto mb-6 text-amber-500">
                {score >= 12 ? <Trophy size={38} /> : <Award size={38} />}
              </div>
              <h3 className="font-display font-black text-2xl sm:text-3xl uppercase text-white mb-2">
                {score >= 12 ? 'EXCELENTE! VOCÊ VENCEU!' : 'FIM DE JOGO!'}
              </h3>
              <p className="text-amber-500 font-bold text-sm mb-4">
                PONTUAÇÃO FINAL: {score} PONTOS
              </p>
              <p className="text-xs text-neutral-400 max-w-md mx-auto mb-8">
                {score >= 12 
                  ? 'Parabéns! Você ganhou 10% de desconto em qualquer serviço ou plano em nossas unidades. Apresente este resultado no WhatsApp!'
                  : 'Você chegou perto! Tente novamente para garantir seu bônus exclusivo na Sião Barber Club.'}
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                {score >= 12 && (
                  <a
                    href={`https://wa.me/5582993651280?text=${encodeURIComponent(`Olá! Consegui ${score} pontos no Mini Game da Sião Barber Club e gostaria de resgatar meu desconto especial!`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-emerald-500 text-neutral-950 font-black text-xs tracking-widest uppercase px-8 py-4 rounded-xl flex items-center gap-2 hover:bg-white transition-all shadow-xl shadow-emerald-500/20"
                  >
                    Resgatar Desconto no WhatsApp
                  </a>
                )}
                <button
                  type="button"
                  onClick={() => setGameState('playing')}
                  className="bg-amber-500 text-neutral-950 font-black text-xs tracking-widest uppercase px-8 py-4 rounded-xl flex items-center gap-2 hover:bg-white transition-all shadow-xl shadow-amber-500/20 cursor-pointer"
                >
                  <RotateCcw size={16} /> Jogar Novamente
                </button>
                <a
                  href="https://siaolego.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-xl font-black text-xs tracking-widest uppercase px-8 py-4 rounded-xl transition-all flex items-center gap-2"
                >
                  Acessar Site Original (siaolego)
                </a>
              </div>
            </div>
          )}

        </div>
      </div>
    </section>
  );
}
