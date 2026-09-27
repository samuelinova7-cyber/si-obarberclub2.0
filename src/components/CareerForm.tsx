import React, { useState } from 'react';
import { 
  Briefcase, 
  Scissors, 
  Users, 
  CheckCircle2, 
  Send, 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  Instagram, 
  FileText, 
  Sparkles,
  ArrowRight,
  RotateCcw
} from 'lucide-react';

interface CareerFormProps {
  id?: string;
  defaultPosition?: 'barbeiro' | 'colaborador';
}

export function CareerForm({ id, defaultPosition = 'barbeiro' }: CareerFormProps) {
  const [positionType, setPositionType] = useState<'barbeiro' | 'colaborador'>(defaultPosition);
  const [roleDetail, setRoleDetail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [preferredUnit, setPreferredUnit] = useState('Qualquer Unidade');
  const [experience, setExperience] = useState('1 a 3 anos');
  const [portfolio, setPortfolio] = useState('');
  const [bio, setBio] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);

      // Prepares structured text for WhatsApp redirect
      const roleText = positionType === 'barbeiro' 
        ? 'Barbeiro Profissional' 
        : (roleDetail ? `Colaborador (${roleDetail})` : 'Colaborador / Equipe');

      const message = `💈 *NOVA CANDIDATURA - SIÃO BARBER CLUB* 💈\n\n` +
        `💼 *Vaga:* ${roleText}\n` +
        `👤 *Nome:* ${name.trim()}\n` +
        `📱 *WhatsApp:* ${phone.trim()}\n` +
        (email.trim() ? `✉️ *E-mail:* ${email.trim()}\n` : '') +
        `📍 *Unidade de Preferência:* ${preferredUnit}\n` +
        `⏳ *Experiência:* ${experience}\n` +
        (portfolio.trim() ? `📸 *Instagram / Portfólio:* ${portfolio.trim()}\n` : '') +
        (bio.trim() ? `📝 *Sobre o Candidato:* ${bio.trim()}\n` : '') +
        `\n_Enviado pelo formulário oficial do site da Sião Barber Club_`;

      const whatsappUrl = `https://wa.me/5582993651280?text=${encodeURIComponent(message)}`;
      
      // Auto open WhatsApp link in new tab or popup
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    }, 600);
  };

  const handleReset = () => {
    setName('');
    setPhone('');
    setEmail('');
    setRoleDetail('');
    setPortfolio('');
    setBio('');
    setSubmitted(false);
  };

  return (
    <div id={id} className="w-full max-w-4xl mx-auto text-left">
      <div className="bg-neutral-900/90 border border-white/10 rounded-[32px] p-6 sm:p-10 md:p-14 shadow-2xl backdrop-blur-md relative overflow-hidden">
        {/* Glow accent */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

        {submitted ? (
          <div className="text-center py-12 relative z-10 animate-fade-in">
            <div className="w-20 h-20 bg-amber-500/20 border border-amber-500/40 rounded-full flex items-center justify-center mx-auto mb-6 text-amber-500">
              <CheckCircle2 size={44} />
            </div>
            <span className="text-amber-500 font-bold tracking-[0.3em] uppercase text-[10px] block mb-2">
              CANDIDATURA REGISTRADA
            </span>
            <h3 className="font-display font-black text-3xl sm:text-4xl uppercase text-white mb-4">
              Obrigado, <span className="text-amber-500">{name.split(' ')[0]}</span>!
            </h3>
            <p className="text-neutral-400 text-sm max-w-lg mx-auto leading-relaxed mb-8">
              Recebemos seu interesse para a vaga de{' '}
              <strong className="text-white">
                {positionType === 'barbeiro' ? 'Barbeiro' : (roleDetail || 'Colaborador')}
              </strong>
              . Nossa equipe de RH avaliará seu perfil e entrará em contato via WhatsApp.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={`https://wa.me/5582993651280?text=${encodeURIComponent(
                  `Olá, acabei de enviar minha candidatura para ${
                    positionType === 'barbeiro' ? 'Barbeiro' : 'Colaborador'
                  } pelo site (${name}) e gostaria de confirmar o recebimento!`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto bg-amber-500 text-neutral-950 font-black text-xs tracking-widest uppercase px-8 py-4 rounded-xl flex items-center justify-center gap-3 hover:bg-white transition-all shadow-xl shadow-amber-500/20 active:scale-95"
              >
                <Send size={16} /> Falar com o RH no WhatsApp
              </a>

              <button
                type="button"
                onClick={handleReset}
                className="w-full sm:w-auto bg-white/5 border border-white/10 text-neutral-300 font-bold text-xs tracking-widest uppercase px-8 py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-white/10 hover:text-white transition-all"
              >
                <RotateCcw size={16} /> Nova Candidatura
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="relative z-10 space-y-8">
            {/* Header of Form */}
            <div className="text-center sm:text-left border-b border-white/10 pb-6">
              <span className="text-amber-500 font-bold tracking-[0.3em] uppercase text-[10px] block mb-1">
                SELEÇÃO DE TALENTOS
              </span>
              <h3 className="font-display font-black text-2xl sm:text-3xl uppercase text-white">
                FORMULÁRIO DE <span className="text-amber-500 italic">CANDIDATURA</span>
              </h3>
              <p className="text-neutral-400 text-xs mt-2">
                Preencha os dados abaixo para se candidatar às nossas vagas abertas.
              </p>
            </div>

            {/* Position Selector Tabs */}
            <div>
              <label className="block text-[11px] font-black uppercase tracking-widest text-neutral-300 mb-3">
                1. Selecione a área desejada *
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setPositionType('barbeiro')}
                  className={`p-5 rounded-2xl border text-left transition-all flex items-start gap-4 ${
                    positionType === 'barbeiro'
                      ? 'bg-amber-500/10 border-amber-500 text-white shadow-lg shadow-amber-500/10'
                      : 'bg-white/5 border-white/10 text-neutral-400 hover:bg-white/10 hover:border-white/20'
                  }`}
                >
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                      positionType === 'barbeiro'
                        ? 'bg-amber-500 text-neutral-950 font-black'
                        : 'bg-neutral-800 text-neutral-400'
                    }`}
                  >
                    <Scissors size={22} />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm uppercase text-white flex items-center gap-2">
                      Vaga de Barbeiro
                      {positionType === 'barbeiro' && (
                        <span className="text-[9px] bg-amber-500 text-neutral-950 px-2 py-0.5 rounded-full font-black">
                          SELECIONADO
                        </span>
                      )}
                    </h4>
                    <p className="text-xs text-neutral-400 mt-1 leading-snug">
                      Para profissionais de corte, barba, químicas, barboterapia e design.
                    </p>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setPositionType('colaborador')}
                  className={`p-5 rounded-2xl border text-left transition-all flex items-start gap-4 ${
                    positionType === 'colaborador'
                      ? 'bg-amber-500/10 border-amber-500 text-white shadow-lg shadow-amber-500/10'
                      : 'bg-white/5 border-white/10 text-neutral-400 hover:bg-white/10 hover:border-white/20'
                  }`}
                >
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                      positionType === 'colaborador'
                        ? 'bg-amber-500 text-neutral-950 font-black'
                        : 'bg-neutral-800 text-neutral-400'
                    }`}
                  >
                    <Users size={22} />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm uppercase text-white flex items-center gap-2">
                      Vaga de Colaborador
                      {positionType === 'colaborador' && (
                        <span className="text-[9px] bg-amber-500 text-neutral-950 px-2 py-0.5 rounded-full font-black">
                          SELECIONADO
                        </span>
                      )}
                    </h4>
                    <p className="text-xs text-neutral-400 mt-1 leading-snug">
                      Recepção, atendimento, administrativo, suporte, limpeza ou marketing.
                    </p>
                  </div>
                </button>
              </div>
            </div>

            {/* If Colaborador is selected, specific role picker */}
            {positionType === 'colaborador' && (
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                <label className="block text-[11px] font-black uppercase tracking-widest text-neutral-300 mb-2">
                  Função específica de interesse:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {[
                    'Recepção & Atendimento',
                    'Caixa / Operacional',
                    'Auxiliar de Serviços Gerais',
                    'Gerência de Unidade',
                    'Social Media / Conteúdo',
                    'Outra Função'
                  ].map((role) => (
                    <button
                      key={role}
                      type="button"
                      onClick={() => setRoleDetail(role)}
                      className={`px-3 py-2.5 rounded-xl text-xs font-bold transition-all text-center ${
                        roleDetail === role
                          ? 'bg-amber-500 text-neutral-950'
                          : 'bg-neutral-800/80 text-neutral-400 hover:text-white hover:bg-neutral-700'
                      }`}
                    >
                      {role}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Section 2: Personal info */}
            <div>
              <label className="block text-[11px] font-black uppercase tracking-widest text-neutral-300 mb-3">
                2. Informações de Contato *
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-neutral-400 uppercase mb-1">
                    Nome Completo *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-500">
                      <User size={16} />
                    </div>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Ex: João da Silva"
                      className="w-full bg-neutral-950 border border-white/10 rounded-xl pl-10 pr-4 py-3.5 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-amber-500 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-neutral-400 uppercase mb-1">
                    WhatsApp / Telefone *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-500">
                      <Phone size={16} />
                    </div>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="(82) 99999-9999"
                      className="w-full bg-neutral-950 border border-white/10 rounded-xl pl-10 pr-4 py-3.5 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-amber-500 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-neutral-400 uppercase mb-1">
                    E-mail (opcional)
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-500">
                      <Mail size={16} />
                    </div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="seuemail@exemplo.com"
                      className="w-full bg-neutral-950 border border-white/10 rounded-xl pl-10 pr-4 py-3.5 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-amber-500 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-neutral-400 uppercase mb-1">
                    Unidade de Preferência
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-500">
                      <MapPin size={16} />
                    </div>
                    <select
                      value={preferredUnit}
                      onChange={(e) => setPreferredUnit(e.target.value)}
                      className="w-full bg-neutral-950 border border-white/10 rounded-xl pl-10 pr-4 py-3.5 text-sm text-white focus:outline-none focus:border-amber-500 transition-colors appearance-none cursor-pointer"
                    >
                      <option value="Qualquer Unidade">Qualquer Unidade / Onde houver vaga</option>
                      <option value="Praia do Francês (Galeria Caravelas)">Praia do Francês (Galeria Caravelas)</option>
                      <option value="Trevo do Francês">Trevo do Francês</option>
                      <option value="Manguaba (Rodovia Edvaldo Lopes)">Manguaba (Rodovia Edvaldo Lopes)</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 3: Professional Experience & Details */}
            <div>
              <label className="block text-[11px] font-black uppercase tracking-widest text-neutral-300 mb-3">
                3. Experiência e Perfil
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-neutral-400 uppercase mb-1">
                    Tempo de Experiência na Área
                  </label>
                  <select
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                    className="w-full bg-neutral-950 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-amber-500 transition-colors cursor-pointer"
                  >
                    <option value="Iniciante / Primeiro emprego">Iniciante / Primeiro emprego</option>
                    <option value="Menos de 1 ano">Menos de 1 ano</option>
                    <option value="1 a 3 anos">1 a 3 anos</option>
                    <option value="3 a 5 anos">3 a 5 anos</option>
                    <option value="Mais de 5 anos">Mais de 5 anos de experiência</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-neutral-400 uppercase mb-1">
                    Instagram Profissional / Portfólio / Link
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-500">
                      <Instagram size={16} />
                    </div>
                    <input
                      type="text"
                      value={portfolio}
                      onChange={(e) => setPortfolio(e.target.value)}
                      placeholder="@seu.perfil ou link com fotos dos trabalhos"
                      className="w-full bg-neutral-950 border border-white/10 rounded-xl pl-10 pr-4 py-3.5 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-amber-500 transition-colors"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-[10px] font-bold text-neutral-400 uppercase mb-1">
                  Conte um pouco sobre você e por que quer fazer parte da Sião Barber Club
                </label>
                <div className="relative">
                  <div className="absolute top-3.5 left-3.5 pointer-events-none text-neutral-500">
                    <FileText size={16} />
                  </div>
                  <textarea
                    rows={3}
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="Descreva suas habilidades, disponibilidade de horário e sua motivação..."
                    className="w-full bg-neutral-950 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-amber-500 transition-colors resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Submit CTA */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10">
              <div className="flex items-center gap-2 text-neutral-500 text-xs">
                <Sparkles size={16} className="text-amber-500 shrink-0" />
                <span>Seus dados são enviados diretamente ao nosso RH.</span>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto bg-amber-500 text-neutral-950 font-black text-xs tracking-widest uppercase px-10 py-5 rounded-2xl flex items-center justify-center gap-3 hover:bg-white transition-all shadow-xl shadow-amber-500/20 active:scale-95 disabled:opacity-50 cursor-pointer"
              >
                {loading ? (
                  <span>ENVIANDO...</span>
                ) : (
                  <>
                    <Briefcase size={16} />
                    <span>ENVIAR CANDIDATURA</span>
                    <ArrowRight size={16} />
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
