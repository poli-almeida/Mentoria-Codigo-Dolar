
import React, { useState, useEffect } from 'react';
import { 
  Menu, 
  X, 
  Globe, 
  ArrowUpRight,
  Sparkles,
  CheckCircle2,
  Database,
  Coins,
  TrendingUp,
  Layers,
  MoveRight,
  ChevronRight,
  Check,
  Clock,
  MessageCircle,
  BarChart3,
  Calendar
} from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

// --- Supabase Config ---
const SUPABASE_URL = "https://bvjxrantwippgzjtzvtc.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ2anhyYW50d2lwcGd6anR6dnRjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA0MTE1MzQsImV4cCI6MjA4NTk4NzUzNH0.5WOVdvXc70DW_u_KherzP3V3u5NnkcMEIycwiH32rS8vc";
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const WHATSAPP_DESTINO = "5541996120258";
const N8N_WEBHOOK_URL = "https://hanadigital-n8n.v0ujh2.easypanel.host/webhook/aplicacao-codigo-dolar"; 

// --- Lead Qualification Modal Component ---
const QualificationModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    nome: '',
    telefone: '',
    instagram: '',
    faturamento: '',
    ingles: '',
    investimento: '',
    motivo: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  if (!isOpen) return null;

  const handleNext = () => setStep(s => s + 1);
  const handleBack = () => setStep(s => s - 1);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // Payload enriquecido para n8n e Supabase
    const payload = {
      ...formData,
      origem: "Landing Page O Código Dólar",
      servico: "Mentoria High-Ticket",
      timestamp: new Date().toISOString(), // ISO format é melhor para bancos de dados
      url_origem: window.location.href
    };

    try {
      // 1. Enviar para n8n (Confirmado pelo usuário que funciona)
      const n8nPromise = fetch(N8N_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      // 2. Enviar para Supabase (Garantindo payload completo)
      const sbPromise = supabase
        .from('leads')
        .insert([payload])
        .select();

      // Redundância Beacon
      if (navigator.sendBeacon) {
        const blob = new Blob([JSON.stringify(payload)], { type: 'application/json' });
        navigator.sendBeacon(N8N_WEBHOOK_URL, blob);
      }

      const [n8nRes, sbRes] = await Promise.all([n8nPromise, sbPromise]);

      // Log específico para Supabase
      if (sbRes.error) {
        console.error("Erro Supabase Detalhado:", sbRes.error.message, sbRes.error.details);
      } else {
        console.log("Lead salvo com sucesso no Supabase.");
      }

    } catch (error) {
      console.error("Erro crítico na submissão:", error);
    }

    setTimeout(() => {
      setIsSubmitting(false);
      setIsFinished(true);
    }, 1000);
  };

  const openWhatsAppFallback = () => {
    const text = `*Nova Aplicação: O Código Dólar*%0A%0A*Nome:* ${formData.nome}%0A*Telefone:* ${formData.telefone}%0A*Instagram:* ${formData.instagram}%0A*Faturamento:* ${formData.faturamento}%0A*Inglês:* ${formData.ingles}%0A*Investimento:* ${formData.investimento}%0A*Motivo:* ${formData.motivo}`;
    window.open(`https://wa.me/${WHATSAPP_DESTINO}?text=${text}`, '_blank');
  };

  const closeAndReset = () => {
    onClose();
    setTimeout(() => {
      setIsFinished(false);
      setStep(1);
      setFormData({ 
        nome: '', 
        telefone: '',
        instagram: '', 
        faturamento: '', 
        ingles: '', 
        investimento: '', 
        motivo: '' 
      });
    }, 500);
  };

  const progress = (step / 5) * 100;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-6 bg-black/95 backdrop-blur-xl">
      <div className="relative w-full max-w-xl bg-[#0A0A0A] border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl shadow-emerald-900/10">
        {!isFinished && (
          <div className="absolute top-0 left-0 h-1 bg-zinc-800 w-full">
            <div className="h-full bg-[#00C853] transition-all duration-500 ease-out" style={{ width: `${progress}%` }} />
          </div>
        )}

        <button onClick={closeAndReset} className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors z-10">
          <X size={24} />
        </button>

        <div className="p-8 md:p-12 pt-16">
          {isFinished ? (
            <div className="text-center py-10 reveal active">
              <div className="w-20 h-20 bg-[#00C853]/10 border border-[#00C853]/20 rounded-full flex items-center justify-center mx-auto mb-8">
                <Check className="text-[#00C853]" size={40} />
              </div>
              <h4 className="text-3xl md:text-4xl font-display text-white mb-6">Aplicação Registrada</h4>
              <p className="text-gray-400 text-lg leading-relaxed mb-10 text-balance">
                Seus dados foram sincronizados com nossa central. **Toque abaixo para confirmar no WhatsApp** e garantir prioridade máxima na análise.
              </p>
              <div className="flex flex-col gap-4">
                <button onClick={openWhatsAppFallback} className="w-full flex items-center justify-center gap-3 py-5 bg-[#00C853] text-black rounded-full font-black text-xs uppercase tracking-widest hover:brightness-110 transition-all shadow-lg shadow-emerald-500/20 active:scale-95">
                  <MessageCircle size={20} /> Finalizar no WhatsApp
                </button>
                <button onClick={closeAndReset} className="w-full py-4 text-gray-500 hover:text-white font-bold text-[10px] uppercase tracking-widest transition-all">Fechar Janela</button>
              </div>
            </div>
          ) : (
            <>
              {step === 1 && (
                <div className="reveal active">
                  <span className="text-[#D4AF37] text-[10px] font-bold uppercase tracking-[0.3em] mb-4 block italic">Passo 01/05</span>
                  <h4 className="text-2xl md:text-3xl font-display text-white mb-8">Quem é o gestor por trás dessa aplicação?</h4>
                  <div className="space-y-4">
                    <div className="group">
                      <label className="text-[9px] uppercase font-bold text-gray-500 ml-4 mb-2 block tracking-widest">Nome Completo</label>
                      <input type="text" placeholder="Ex: João Silva" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-[#00C853] outline-none transition-all" value={formData.nome} onChange={e => setFormData({...formData, nome: e.target.value})} />
                    </div>
                    <div className="group">
                      <label className="text-[9px] uppercase font-bold text-gray-500 ml-4 mb-2 block tracking-widest">WhatsApp / Telefone</label>
                      <input type="tel" placeholder="(00) 00000-0000" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-[#00C853] outline-none transition-all" value={formData.telefone} onChange={e => setFormData({...formData, telefone: e.target.value})} />
                    </div>
                    <div className="group">
                      <label className="text-[9px] uppercase font-bold text-gray-500 ml-4 mb-2 block tracking-widest">Instagram Profissional</label>
                      <input type="text" placeholder="@seu.perfil" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-[#00C853] outline-none transition-all" value={formData.instagram} onChange={e => setFormData({...formData, instagram: e.target.value})} />
                    </div>
                  </div>
                </div>
              )}
              {step === 2 && (
                <div className="reveal active">
                  <span className="text-[#D4AF37] text-[10px] font-bold uppercase tracking-[0.3em] mb-4 block italic">Passo 02/05</span>
                  <h4 className="text-2xl md:text-3xl font-display text-white mb-8">Qual seu faturamento médio mensal hoje?</h4>
                  <div className="grid gap-3">
                    {['Até R$ 5k', 'R$ 5k - R$ 10k', 'R$ 10k - R$ 30k', 'Acima de R$ 30k'].map(opt => (
                      <button key={opt} onClick={() => { setFormData({...formData, faturamento: opt}); handleNext(); }} className={`text-left px-6 py-4 rounded-2xl border transition-all ${formData.faturamento === opt ? 'bg-[#00C853]/10 border-[#00C853] text-[#00C853]' : 'bg-white/5 border-white/10 text-gray-400 hover:border-white/30'}`}>{opt}</button>
                    ))}
                  </div>
                </div>
              )}
              {step === 3 && (
                <div className="reveal active">
                  <span className="text-[#D4AF37] text-[10px] font-bold uppercase tracking-[0.3em] mb-4 block italic">Passo 03/05</span>
                  <h4 className="text-2xl md:text-3xl font-display text-white mb-8">Como você avalia seu nível de inglês?</h4>
                  <div className="grid gap-3">
                    {['Básico / Uso Tradutor', 'Intermediário / Leio bem', 'Fluente / Falo com confiança'].map(opt => (
                      <button key={opt} onClick={() => { setFormData({...formData, ingles: opt}); handleNext(); }} className={`text-left px-6 py-4 rounded-2xl border transition-all ${formData.ingles === opt ? 'bg-[#00C853]/10 border-[#00C853] text-[#00C853]' : 'bg-white/5 border-white/10 text-gray-400 hover:border-white/30'}`}>{opt}</button>
                    ))}
                  </div>
                </div>
              )}
              {step === 4 && (
                <div className="reveal active">
                  <span className="text-[#D4AF37] text-[10px] font-bold uppercase tracking-[0.3em] mb-4 block italic">Passo 04/05</span>
                  <h4 className="text-2xl md:text-3xl font-display text-white mb-8">Pronto para investir no seu próximo nível?</h4>
                  <div className="grid gap-3">
                    {['Sim, quero investir agora', 'Estou me planejando financeiramente', 'Busco apenas informações gratuitas'].map(opt => (
                      <button key={opt} onClick={() => { setFormData({...formData, investimento: opt}); handleNext(); }} className={`text-left px-6 py-4 rounded-2xl border transition-all ${formData.investimento === opt ? 'bg-[#00C853]/10 border-[#00C853] text-[#00C853]' : 'bg-white/5 border-white/10 text-gray-400 hover:border-white/30'}`}>{opt}</button>
                    ))}
                  </div>
                </div>
              )}
              {step === 5 && (
                <div className="reveal active">
                  <span className="text-[#D4AF37] text-[10px] font-bold uppercase tracking-[0.3em] mb-4 block italic">Passo 05/05</span>
                  <h4 className="text-2xl md:text-3xl font-display text-white mb-8">Por que você merece uma das vagas exclusivas?</h4>
                  <textarea placeholder="Fale brevemente sobre sua ambição..." className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-[#00C853] outline-none transition-all h-32 resize-none" value={formData.motivo} onChange={e => setFormData({...formData, motivo: e.target.value})} />
                </div>
              )}
              <div className="mt-12 flex items-center justify-between gap-4">
                {step > 1 && <button onClick={handleBack} className="text-gray-500 hover:text-white font-bold text-[10px] uppercase tracking-widest transition-colors">Voltar</button>}
                <div className="flex-1" />
                {step === 1 && <button disabled={!formData.nome || !formData.instagram || !formData.telefone} onClick={handleNext} className="px-10 py-4 bg-white text-black rounded-full font-black text-[10px] uppercase tracking-widest disabled:opacity-30 flex items-center gap-2 transition-all active:scale-95">Próximo <ChevronRight size={14} /></button>}
                {step === 5 && <button onClick={handleSubmit} disabled={isSubmitting || !formData.motivo} className="px-10 py-4 bg-[#00C853] text-black rounded-full font-black text-[10px] uppercase tracking-widest disabled:opacity-50 flex items-center gap-2 shadow-lg shadow-emerald-500/20 active:scale-95 transition-all">{isSubmitting ? "Sincronizando..." : "Enviar Aplicação"} {!isSubmitting && <Check size={14} />}</button>}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

// --- Navbar Component ---
const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-[100] transition-all duration-700 ${isScrolled ? 'bg-black/95 backdrop-blur-xl border-b border-white/5 py-4' : 'bg-transparent py-8'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div className="flex flex-col group cursor-pointer">
          <span className="text-lg md:text-2xl font-display font-bold tracking-[0.2em] text-white">O CÓDIGO <span className="text-[#D4AF37] text-glow-gold">DÓLAR</span></span>
          <div className="h-[1px] w-0 group-hover:w-full bg-[#D4AF37] transition-all duration-700" />
        </div>
        <div className="hidden lg:flex items-center gap-10">
          {['Resultados', 'Para você', 'Conteúdo', 'Admissão'].map((item) => (
            <a key={item} href={`#${item.toLowerCase().replace(' ', '-')}`} className="text-[10px] uppercase tracking-[0.3em] font-bold text-gray-400 hover:text-white transition-all">{item}</a>
          ))}
          <button className="group flex items-center gap-3 px-6 py-2.5 rounded-full border border-[#00C853]/40 text-[#00C853] text-[10px] font-black uppercase tracking-[0.2em] hover:bg-[#00C853] hover:text-white transition-all duration-500">Suporte Individual <ArrowUpRight size={14} /></button>
        </div>
      </div>
    </nav>
  );
};

// --- Hero Section ---
const Hero = ({ onOpenForm }: { onOpenForm: () => void }) => (
  <section className="relative min-h-screen flex items-center pt-32 pb-16 overflow-hidden bg-[#050505]">
    <div className="absolute top-[-10%] right-[-10%] w-[800px] h-[800px] bg-[#00C853]/10 rounded-full blur-[150px] animate-pulse" />
    <div className="container mx-auto px-6 relative z-10 text-center reveal active">
      <div className="inline-flex items-center gap-3 mb-12 px-6 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md">
        <Sparkles size={14} className="text-[#D4AF37]" />
        <span className="text-[10px] font-black uppercase tracking-[0.5em] text-gray-400">Escala Global Imediata</span>
      </div>
      <h1 className="text-4xl md:text-9xl font-display font-semibold leading-[1.1] text-white mb-12 tracking-tight">Saia do tráfego em real e fature em <span className="italic text-[#D4AF37]">dólar em 30 dias.</span></h1>
      <p className="text-lg md:text-2xl text-gray-400 max-w-4xl mx-auto mb-16 font-light">Aprenda a se posicionar para o mercado internacional e fechar seu primeiro contrato em dólar.</p>
      <button onClick={onOpenForm} className="group relative px-16 py-8 bg-[#00C853] text-black font-black text-sm uppercase tracking-[0.4em] rounded-full hover:scale-105 transition-all shadow-[0_20px_50px_rgba(0,229,118,0.2)]">Quero Iniciar Minha Aplicação</button>
    </div>
  </section>
);

// --- Results Section ---
const Results: React.FC = () => (
  <section id="resultados" className="py-20 md:py-32 bg-[#080808] relative">
    <div className="container mx-auto px-6">
      <div className="max-w-4xl mx-auto text-center mb-16 md:mb-24 reveal">
        <h3 className="text-3xl md:text-7xl font-display text-white mb-6 leading-tight">Faturamento em <br/><span className="text-[#00C853]">Moeda Forte.</span></h3>
        <p className="text-gray-500 text-lg">Resultados auditados diretamente do gerenciador de anúncios.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 reveal">
        {[{ label: "Volume Gerenciado", value: "+R$ 1.2M", sub: "Mensais Globalmente", icon: <Database /> }, { label: "Moedas Aceitas", value: "USD/EUR", sub: "CAD & AUD inclusos", icon: <Coins /> }, { label: "Lucro Multiplicado", value: "5.2x", sub: "Média de conversão", icon: <TrendingUp /> }].map((m, i) => (
          <div key={i} className="p-10 rounded-[2.5rem] bg-zinc-900/50 border border-white/5 hover:border-[#00C853]/30 transition-all group relative overflow-hidden">
            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:scale-125 transition-transform text-[#00C853]">{m.icon}</div>
            <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-6">{m.label}</p>
            <h4 className="text-3xl md:text-5xl font-display text-white mb-2">{m.value}</h4>
            <p className="text-[#00C853] text-[10px] font-bold uppercase tracking-widest">{m.sub}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// --- About Section ---
const About: React.FC = () => (
  <section id="mentora" className="py-24 md:py-40 bg-black overflow-hidden relative border-y border-white/5">
    <div className="container mx-auto px-6">
      <div className="grid lg:grid-cols-2 gap-16 md:gap-24 items-center">
        <div className="reveal">
          <div className="inline-block px-4 py-1 rounded-full border border-[#D4AF37]/20 bg-[#D4AF37]/5 text-[#D4AF37] text-[10px] font-bold uppercase tracking-[0.4em] mb-12 italic">The Mentor</div>
          <h3 className="text-4xl md:text-7xl lg:text-8xl font-display text-white mb-10 leading-[0.9] tracking-tighter">Mestre em <span className="italic text-[#D4AF37]">Educação.</span> <br /> <span className="text-gray-500">Gestora de Milhões.</span></h3>
          <p className="text-lg md:text-2xl text-gray-400 font-light leading-relaxed mb-10">Didática premium aplicada ao tráfego de alta escala. Já gerenciei investimentos massivos para empresas em todo o globo.</p>
          <div className="p-8 rounded-3xl bg-[#00C853]/5 border border-[#00C853]/10">
            <div className="flex items-center gap-4 mb-4">
              <CheckCircle2 className="text-[#00C853]" />
              <span className="text-white font-bold uppercase tracking-widest text-xs">Poder de Elite</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">Em <strong className="text-white">Janeiro de 2026</strong>, gerenciamos mais de <strong className="text-[#00C853]">R$ 1.000.000,00</strong> em investimentos para um único cliente internacional.</p>
          </div>
        </div>
        <div className="relative reveal">
          <div className="absolute inset-0 bg-gradient-to-tr from-[#00C853]/10 to-[#D4AF37]/5 blur-[100px] pointer-events-none" />
          <div className="relative group overflow-hidden rounded-[2.5rem] border border-white/10 bg-zinc-900/40 p-1 shadow-2xl transition-all duration-700 hover:border-[#D4AF37]/40">
            <div className="bg-[#0f0f0f] rounded-[2.3rem] overflow-hidden">
              <div className="px-6 py-4 bg-[#1a1a1a] flex items-center justify-between border-b border-white/5">
                <div className="flex items-center gap-4">
                  <span className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">Performance</span>
                  <div className="h-4 w-[1px] bg-white/10" />
                  <div className="flex items-center gap-2 px-3 py-1 bg-black/40 rounded-md border border-white/5">
                    <Calendar size={12} className="text-gray-500" />
                    <span className="text-[10px] text-gray-400">Jan 1 – 31, 2026</span>
                  </div>
                </div>
                <BarChart3 className="text-gray-600" size={18} />
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 border-b border-white/5">
                <div className="p-5 border-r border-b md:border-b-0 border-white/5"><span className="text-[9px] font-bold text-blue-400 uppercase mb-2 block tracking-widest">Clicks</span><div className="text-2xl font-bold text-white">22.6K</div></div>
                <div className="p-5 border-r border-b md:border-b-0 border-white/5"><span className="text-[9px] font-bold text-red-400 uppercase mb-2 block tracking-widest">Conv.</span><div className="text-2xl font-bold text-white">2.23K</div></div>
                <div className="p-5 border-r border-white/5"><span className="text-[9px] font-bold text-yellow-500 uppercase mb-2 block tracking-widest">Avg. CPC</span><div className="text-2xl font-bold text-white">$8.47</div></div>
                <div className="p-5"><span className="text-[9px] font-bold text-emerald-500 uppercase mb-2 block tracking-widest">Cost</span><div className="text-2xl font-bold text-white">$191K</div></div>
              </div>
              <div className="p-8 h-48 relative flex items-end justify-between gap-1 opacity-50">
                {[40, 60, 45, 90, 65, 30, 85, 95, 40, 60, 75, 55, 35, 80, 70, 45].map((h, i) => (
                  <div key={i} className="w-full bg-gradient-to-t from-[#00C853]/40 to-transparent rounded-t-sm" style={{ height: `${h}%` }} />
                ))}
              </div>
              <div className="px-8 pb-6 text-center"><span className="text-[8px] font-black text-gray-700 uppercase tracking-[0.4em]">Google Ads Certified Performance</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

// --- Deliverables Section ---
const Deliverables: React.FC = () => (
  <section id="entrega" className="py-20 md:py-32 bg-[#050505] relative border-y border-white/5">
    <div className="container mx-auto px-6">
      <div className="max-w-2xl mb-16 md:mb-24 reveal">
        <h2 className="text-[10px] font-bold text-[#00C853] uppercase tracking-[0.6em] mb-8 italic">A Metodologia</h2>
        <h3 className="text-3xl md:text-7xl font-display text-white">O que <span className="italic text-[#D4AF37]">você vai aprender.</span></h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 reveal">
        {[
          { title: "Engine: Tracking & Data", desc: "Configuração de elite de GTM, GA4 e API internacional.", icon: <Database /> }, 
          { title: "Blueprint: Prospecção", desc: "Onde e como encontrar empresas que pagam em dólar.", icon: <Globe /> }, 
          { title: "Closing: Negociação", desc: "Scripts para cobrar fees de $2k USD por cliente.", icon: <Coins /> }, 
          { title: "Scale: Gestão High-Ticket", desc: "Como escalar contas globais com eficiência.", icon: <Layers /> }
        ].map((s, i) => (
          <div key={i} className="p-12 bg-[#080808] border border-white/5 rounded-3xl hover:border-[#D4AF37]/40 transition-all group">
            <div className="text-[#00C853] mb-10 w-12 h-12 flex items-center justify-center bg-[#00C853]/10 rounded-xl">{s.icon}</div>
            <h4 className="text-2xl font-display text-white mb-4">{s.title}</h4>
            <p className="text-gray-500 font-light text-sm">{s.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// --- Admission Criteria Section ---
const AdmissionCriteria: React.FC = ({ onOpenForm }: { onOpenForm: () => void }) => (
  <section id="admissão" className="py-32 md:py-48 bg-black text-center relative overflow-hidden">
    <div className="container mx-auto px-6 relative z-10">
      <div className="reveal mb-24">
        <span className="text-[#D4AF37] text-[10px] font-bold uppercase tracking-[0.6em] mb-8 block italic">CRITÉRIOS DE ADMISSÃO</span>
        <h2 className="text-4xl md:text-8xl font-display text-white mb-10 leading-[1.1] max-w-6xl mx-auto">
          FAÇA PARTE DO 1% <br /> DE GESTORES QUE <br /> ATUAM GLOBALMENTE
        </h2>
        <p className="text-gray-500 text-lg md:text-2xl font-light max-w-2xl mx-auto">
          Processo de admissão rigoroso para garantir suporte individual e resultados incondicionais.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 md:gap-32 max-w-5xl mx-auto text-left mb-32 reveal">
        <div className="flex gap-6 items-start group">
          <div className="w-14 h-14 rounded-full border border-[#00C853]/30 flex items-center justify-center flex-shrink-0 bg-[#00C853]/5 group-hover:bg-[#00C853]/10 transition-colors">
            <Check size={24} className="text-[#00C853]" />
          </div>
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-4">MENTALIDADE GLOBAL</h4>
            <p className="text-gray-500 text-sm leading-relaxed uppercase font-bold tracking-tighter opacity-80 group-hover:opacity-100 transition-opacity">
              FOCO ABSOLUTO EM DEIXAR O AMADORISMO DO REAL PARA TRÁS E ABRAÇAR O LUCRO EM MOEDA FORTE.
            </p>
          </div>
        </div>
        <div className="flex gap-6 items-start group">
          <div className="w-14 h-14 rounded-full border border-[#00C853]/30 flex items-center justify-center flex-shrink-0 bg-[#00C853]/5 group-hover:bg-[#00C853]/10 transition-colors">
            <Check size={24} className="text-[#00C853]" />
          </div>
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-4">COMPROMISSO COM O MÉTODO</h4>
            <p className="text-gray-500 text-sm leading-relaxed uppercase font-bold tracking-tighter opacity-80 group-hover:opacity-100 transition-opacity">
              SEGUIR O PASSO-A-PASSO TÉCNICO (TRACKING, DATA, CLOSING) PARA GARANTIR O ROI INTERNACIONAL.
            </p>
          </div>
        </div>
      </div>

      <div className="reveal">
        <button 
          onClick={onOpenForm}
          className="group relative inline-flex items-center gap-6 px-16 md:px-24 py-8 bg-white text-black font-black text-xs uppercase tracking-[0.4em] rounded-full hover:scale-105 transition-all shadow-[0_30px_60px_rgba(255,255,255,0.05)] active:scale-95"
        >
          APLICAR PARA SELEÇÃO
          <MoveRight size={20} className="group-hover:translate-x-2 transition-transform" />
        </button>
      </div>
    </div>
  </section>
);

// --- Main App Component ---
const App: React.FC = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-black selection:bg-[#00C853]/30 selection:text-[#00C853] overflow-x-hidden">
      <Navbar />
      <main>
        <Hero onOpenForm={() => setIsFormOpen(true)} />
        <Results />
        <About />
        <Deliverables />
        <AdmissionCriteria onOpenForm={() => setIsFormOpen(true)} />
      </main>
      <footer className="py-24 bg-black border-t border-white/5 text-center">
        <span className="text-2xl font-display font-bold tracking-[0.5em] text-white">O CÓDIGO <span className="text-[#D4AF37]">DÓLAR</span></span>
        <p className="mt-8 text-gray-800 text-[9px] uppercase font-bold tracking-[0.3em]">Copyright © {new Date().getFullYear()} - Todos os direitos reservados.</p>
      </footer>
      <QualificationModal isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
    </div>
  );
};

export default App;
