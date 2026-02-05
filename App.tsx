
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
  MessageCircle
} from 'lucide-react';

const WHATSAPP_DESTINO = "5541996120258";
const N8N_WEBHOOK_URL = "https://hanadigital-n8n.v0ujh2.easypanel.host/webhook/aplicacao-codigo-dolar"; 

// --- Lead Qualification Modal Component ---
const QualificationModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    nome: '',
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
    
    const payload = {
      ...formData,
      origem: "Landing Page O Código Dólar",
      timestamp: new Date().toLocaleString('pt-BR')
    };

    /** 
     * TÉCNICA DE DISPARO "SIMPLE REQUEST"
     * Removemos o cabeçalho 'Content-Type: application/json' para evitar o preflight (OPTIONS) do CORS.
     * O n8n receberá os dados no corpo da requisição.
     */
    try {
      console.log("Iniciando disparo para n8n via Simple Request...");
      
      // Tentativa 1: Fetch com no-cors (Não gera erro de CORS, mas a resposta é opaca)
      fetch(N8N_WEBHOOK_URL, {
        method: 'POST',
        mode: 'no-cors', // Ignora política de CORS do navegador
        body: JSON.stringify(payload)
      }).then(() => {
        console.log("Requisição enviada ao n8n (Status Oculto via no-cors)");
      }).catch(e => console.error("Falha no fetch:", e));

      // Tentativa 2: Beacon (Redundância para garantir envio ao fechar aba ou instabilidade)
      if (navigator.sendBeacon) {
        const blob = new Blob([JSON.stringify(payload)], { type: 'text/plain' });
        navigator.sendBeacon(N8N_WEBHOOK_URL, blob);
        console.log("Beacon disparado como redundância.");
      }

    } catch (error) {
      console.error("Erro ao tentar disparar automação:", error);
    }

    // Transição de UI (Sempre mostramos sucesso para o usuário)
    setTimeout(() => {
      setIsSubmitting(false);
      setIsFinished(true);
    }, 1500);
  };

  const openWhatsAppFallback = () => {
    const text = `*Nova Aplicação: O Código Dólar*%0A%0A*Nome:* ${formData.nome}%0A*Instagram:* ${formData.instagram}%0A*Faturamento:* ${formData.faturamento}%0A*Inglês:* ${formData.ingles}%0A*Investimento:* ${formData.investimento}%0A*Motivo:* ${formData.motivo}`;
    window.open(`https://wa.me/${WHATSAPP_DESTINO}?text=${text}`, '_blank');
  };

  const closeAndReset = () => {
    onClose();
    setTimeout(() => {
      setIsFinished(false);
      setStep(1);
      setFormData({ nome: '', instagram: '', faturamento: '', ingles: '', investimento: '', motivo: '' });
    }, 500);
  };

  const progress = (step / 5) * 100;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-6 bg-black/95 backdrop-blur-xl">
      <div className="relative w-full max-w-xl bg-[#0A0A0A] border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl shadow-emerald-900/10">
        
        {!isFinished && (
          <div className="absolute top-0 left-0 h-1 bg-zinc-800 w-full">
            <div 
              className="h-full bg-[#00C853] transition-all duration-500 ease-out" 
              style={{ width: `${progress}%` }}
            />
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
                Seu perfil entrou na nossa fila de análise. **Clique no botão abaixo** para confirmar seu envio via WhatsApp e acelerar o retorno.
              </p>
              
              <div className="flex flex-col gap-4">
                <button 
                  onClick={openWhatsAppFallback}
                  className="w-full flex items-center justify-center gap-3 py-5 bg-[#00C853] text-black rounded-full font-black text-xs uppercase tracking-widest hover:brightness-110 transition-all shadow-lg shadow-emerald-500/20 active:scale-95"
                >
                  <MessageCircle size={20} /> Confirmar no WhatsApp
                </button>
                <button 
                  onClick={closeAndReset}
                  className="w-full py-4 text-gray-500 hover:text-white font-bold text-[10px] uppercase tracking-widest transition-all"
                >
                  Pular e aguardar contato
                </button>
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
                      <input 
                        type="text" 
                        placeholder="Ex: João Silva" 
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-[#00C853] outline-none transition-all"
                        value={formData.nome}
                        onChange={e => setFormData({...formData, nome: e.target.value})}
                      />
                    </div>
                    <div className="group">
                      <label className="text-[9px] uppercase font-bold text-gray-500 ml-4 mb-2 block tracking-widest">Instagram Profissional</label>
                      <input 
                        type="text" 
                        placeholder="@seu.perfil" 
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-[#00C853] outline-none transition-all"
                        value={formData.instagram}
                        onChange={e => setFormData({...formData, instagram: e.target.value})}
                      />
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
                      <button 
                        key={opt}
                        onClick={() => { setFormData({...formData, faturamento: opt}); handleNext(); }}
                        className={`text-left px-6 py-4 rounded-2xl border transition-all ${formData.faturamento === opt ? 'bg-[#00C853]/10 border-[#00C853] text-[#00C853]' : 'bg-white/5 border-white/10 text-gray-400 hover:border-white/30'}`}
                      >
                        {opt}
                      </button>
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
                      <button 
                        key={opt}
                        onClick={() => { setFormData({...formData, ingles: opt}); handleNext(); }}
                        className={`text-left px-6 py-4 rounded-2xl border transition-all ${formData.ingles === opt ? 'bg-[#00C853]/10 border-[#00C853] text-[#00C853]' : 'bg-white/5 border-white/10 text-gray-400 hover:border-white/30'}`}
                      >
                        {opt}
                      </button>
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
                      <button 
                        key={opt}
                        onClick={() => { setFormData({...formData, investimento: opt}); handleNext(); }}
                        className={`text-left px-6 py-4 rounded-2xl border transition-all ${formData.investimento === opt ? 'bg-[#00C853]/10 border-[#00C853] text-[#00C853]' : 'bg-white/5 border-white/10 text-gray-400 hover:border-white/30'}`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 5 && (
                <div className="reveal active">
                  <span className="text-[#D4AF37] text-[10px] font-bold uppercase tracking-[0.3em] mb-4 block italic">Passo 05/05</span>
                  <h4 className="text-2xl md:text-3xl font-display text-white mb-8">Por que você merece uma das vagas exclusivas?</h4>
                  <textarea 
                    placeholder="Fale brevemente sobre sua ambição e comprometimento..." 
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-[#00C853] outline-none transition-all h-32 resize-none"
                    value={formData.motivo}
                    onChange={e => setFormData({...formData, motivo: e.target.value})}
                  />
                  <div className="mt-4 flex items-center gap-2 text-[#00C853]">
                    <Clock size={14} />
                    <span className="text-[9px] uppercase font-bold tracking-widest">Tempo estimado de preenchimento: 2 min</span>
                  </div>
                </div>
              )}

              <div className="mt-12 flex items-center justify-between gap-4">
                {step > 1 && (
                  <button onClick={handleBack} className="text-gray-500 hover:text-white font-bold text-[10px] uppercase tracking-widest transition-colors">
                    Voltar
                  </button>
                )}
                <div className="flex-1" />
                {step === 1 && (
                  <button 
                    disabled={!formData.nome || !formData.instagram}
                    onClick={handleNext} 
                    className="px-10 py-4 bg-white text-black rounded-full font-black text-[10px] uppercase tracking-widest disabled:opacity-30 flex items-center gap-2 transition-all active:scale-95"
                  >
                    Próximo <ChevronRight size={14} />
                  </button>
                )}
                {step === 5 && (
                  <button 
                    onClick={handleSubmit}
                    disabled={isSubmitting || !formData.motivo}
                    className="px-10 py-4 bg-[#00C853] text-black rounded-full font-black text-[10px] uppercase tracking-widest disabled:opacity-50 flex items-center gap-2 shadow-lg shadow-emerald-500/20 active:scale-95 transition-all"
                  >
                    {isSubmitting ? "Finalizando..." : "Enviar Minha Aplicação"} 
                    {!isSubmitting && <Check size={14} />}
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

// --- Custom Reveal Hook ---
const useReveal = () => {
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
};

// --- UI Components ---

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { name: 'Resultados', id: 'resultados' },
    { name: 'Para você', id: 'para-quem' },
    { name: 'Conteúdo', id: 'entrega' },
    { name: 'Admissão', id: 'admissao' }
  ];

  return (
    <nav className={`fixed top-0 w-full z-[100] transition-all duration-700 ${isScrolled ? 'bg-black/95 backdrop-blur-xl border-b border-white/5 py-4' : 'bg-transparent py-6 md:py-8'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div className="flex flex-col group cursor-pointer">
          <span className="text-lg md:text-2xl font-display font-bold tracking-[0.2em] text-white">
            O CÓDIGO <span className="text-[#D4AF37] text-glow-gold">DÓLAR</span>
          </span>
          <div className="h-[1px] w-0 group-hover:w-full bg-[#D4AF37] transition-all duration-700" />
        </div>

        <div className="hidden lg:flex items-center gap-10">
          {menuItems.map((item) => (
            <a key={item.id} href={`#${item.id}`} className="text-[10px] uppercase tracking-[0.3em] font-bold text-gray-400 hover:text-white transition-all">{item.name}</a>
          ))}
          <button className="group flex items-center gap-3 px-6 py-2.5 rounded-full border border-[#00C853]/40 text-[#00C853] text-[10px] font-black uppercase tracking-[0.2em] hover:bg-[#00C853] hover:text-white transition-all duration-500">
            Suporte Individual <ArrowUpRight size={14} />
          </button>
        </div>

        <button className="lg:hidden text-white p-2" onClick={() => setMobileMenu(!mobileMenu)}>
          {mobileMenu ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      <div className={`lg:hidden fixed inset-0 bg-black z-[110] flex flex-col items-center justify-center gap-8 p-6 transition-transform duration-500 ease-in-out ${mobileMenu ? 'translate-x-0' : 'translate-x-full'}`}>
           <button className="absolute top-8 right-6 text-white" onClick={() => setMobileMenu(false)}>
             <X size={32} />
           </button>
           {menuItems.map((item) => (
            <a key={item.id} href={`#${item.id}`} onClick={() => setMobileMenu(false)} className="text-3xl font-display text-white tracking-widest">{item.name}</a>
          ))}
          <button onClick={() => { setMobileMenu(false); }} className="px-10 py-5 rounded-full bg-[#00C853] text-black font-bold text-base uppercase tracking-widest shadow-lg">Aplicar Agora</button>
      </div>
    </nav>
  );
};

const Hero = ({ onOpenForm }: { onOpenForm: () => void }) => {
  return (
    <section className="relative min-h-[90vh] md:min-h-screen flex items-center pt-24 md:pt-32 pb-16 overflow-hidden bg-[#050505]">
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[300px] md:w-[800px] h-[300px] md:h-[800px] bg-[#00C853]/10 rounded-full blur-[80px] md:blur-[150px] animate-pulse" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[250px] md:w-[600px] h-[250px] md:h-[600px] bg-[#D4AF37]/5 rounded-full blur-[80px] md:blur-[150px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto text-center reveal">
          <div className="inline-flex items-center gap-3 mb-8 md:mb-12 px-4 md:px-6 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md">
            <Sparkles size={14} className="text-[#D4AF37]" />
            <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] md:tracking-[0.5em] text-gray-400">Escala Global Imediata</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-8xl lg:text-9xl font-display font-semibold leading-[1.1] text-white mb-8 md:mb-12 tracking-tight text-balance">
            Saia do tráfego em real e fature em <span className="italic text-[#D4AF37]">dólar em 30 dias.</span>
          </h1>
          
          <p className="text-lg md:text-2xl text-gray-400 max-w-4xl mx-auto leading-relaxed mb-10 md:mb-16 font-light text-balance">
            Aprenda a se posicionar para o mercado internacional e fechar seu primeiro contrato em dólar, mesmo sem falar inglês fluentemente.
          </p>

          <div className="flex justify-center items-center">
            <button 
              onClick={onOpenForm}
              className="w-full sm:w-auto group relative px-8 md:px-16 py-6 md:py-8 bg-[#00C853] text-black font-black text-xs md:text-sm uppercase tracking-[0.3em] md:tracking-[0.4em] rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_20px_50px_rgba(0,229,118,0.2)]"
            >
              Quero Iniciar Minha Aplicação
              <div className="absolute inset-0 bg-white/30 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

const Results: React.FC = () => {
  const metrics = [
    { label: "Volume Gerenciado", value: "+R$ 1.2M", sub: "Mensais Globalmente", icon: <Database className="text-[#00C853]" /> },
    { label: "Moedas Aceitas", value: "USD/EUR", sub: "CAD & AUD inclusos", icon: <Coins className="text-[#D4AF37]" /> },
    { label: "Lucro Multiplicado", value: "5.2x", sub: "Média de conversão", icon: <TrendingUp className="text-[#00C853]" /> }
  ];

  return (
    <section id="resultados" className="py-20 md:py-32 bg-[#080808] relative">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center mb-16 md:mb-24 reveal">
          <h2 className="text-[10px] md:text-xs font-bold text-[#D4AF37] uppercase tracking-[0.4em] md:tracking-[0.6em] mb-6 md:mb-8 italic">Proof of Global Authority</h2>
          <h3 className="text-3xl md:text-7xl font-display text-white mb-4 md:mb-6 leading-tight">Faturamento em <br className="md:hidden" /><span className="text-[#00C853]">Moeda Forte.</span></h3>
          <p className="text-gray-500 text-base md:text-lg">Operações reais rodando nos mercados mais valiosos do mundo.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 reveal">
          {metrics.map((m, i) => (
            <div key={i} className="p-8 md:p-10 rounded-3xl md:rounded-[2.5rem] bg-zinc-900/50 border border-white/5 hover:border-[#00C853]/30 transition-all group overflow-hidden relative">
              <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:scale-125 transition-transform">
                {m.icon}
              </div>
              <div className="relative z-10">
                <p className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-gray-500 mb-4 md:mb-6">{m.label}</p>
                <h4 className="text-3xl md:text-5xl font-display text-white mb-2">{m.value}</h4>
                <p className="text-[#00C853] text-[9px] md:text-[10px] font-bold uppercase tracking-widest">{m.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ForWho: React.FC = () => {
  const personas = [
    { title: "O Gestor 'Teto'", desc: "Você já domina o tráfego, mas não consegue passar dos R$ 10k/mês porque os clientes brasileiros não têm orçamento para escalar." },
    { title: "O Operacional Sobrecargado", desc: "Você tem 15 clientes de R$ 1.000. Trabalha 14h por dia e sente que está vendendo sua saúde por migalhas de Real." },
    { title: "O Visionário em Pausa", desc: "Sabe que o mercado global (USA, Europa, Austrália) é a solução, mas tem medo do inglês ou de não saber onde os clientes estão." }
  ];

  return (
    <section id="para-quem" className="py-20 md:py-32 bg-black relative">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mb-16 md:mb-24 reveal">
          <h2 className="text-[10px] md:text-xs font-bold text-[#D4AF37] uppercase tracking-[0.4em] md:tracking-[0.5em] mb-6 md:mb-8 italic">O Diagnóstico</h2>
          <h3 className="text-3xl md:text-7xl font-display text-white leading-tight text-balance">Essa mentoria é <br/> <span className="text-[#00C853]">para você que...</span></h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 md:gap-16 reveal">
          {personas.map((p, i) => (
            <div key={i} className="group cursor-default border-l border-zinc-800 pl-6 md:pl-8 hover:border-[#00C853] transition-colors duration-700">
              <span className="text-3xl md:text-4xl font-display text-[#D4AF37]">0{i+1}</span>
              <h4 className="text-lg md:text-xl font-bold text-white mt-4 md:mt-6 mb-3 md:mb-4 uppercase tracking-tighter">{p.title}</h4>
              <p className="text-gray-500 leading-relaxed font-light text-sm md:text-base">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Deliverables: React.FC = () => {
  const steps = [
    { title: "Engine: Tracking & Data", desc: "Configuração de elite de GTM, GA4 e API. O mercado internacional não aceita amadores que não medem dados.", icon: <Database /> },
    { title: "Blueprint: Prospecção Ativa", desc: "Onde e como encontrar empresas USA, Europa e Austrália que pagam em moeda forte.", icon: <Globe /> },
    { title: "Closing: Negociação & Fees", desc: "Scripts de fechamento e como cobrar fees de $2k USD/EUR por cliente sem tremer na base.", icon: <Coins /> },
    { title: "Scale: Gestão High-Ticket", desc: "Como manter os resultados e escalar as contas sem precisar de uma agência gigante.", icon: <Layers /> }
  ];

  return (
    <section id="entrega" className="py-20 md:py-32 bg-[#050505] relative border-y border-white/5">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-16 md:mb-24 reveal">
          <div className="max-w-2xl">
            <h2 className="text-[10px] md:text-xs font-bold text-[#00C853] uppercase tracking-[0.4em] md:tracking-[0.6em] mb-6 md:mb-8 italic">A Metodologia</h2>
            <h3 className="text-3xl md:text-7xl font-display text-white leading-tight">Tudo o que <br className="md:hidden" /><span className="italic text-[#D4AF37]">você vai aprender.</span></h3>
          </div>
          <p className="text-gray-500 max-w-xs mt-6 md:mt-0 uppercase text-[9px] md:text-[10px] font-bold tracking-widest leading-relaxed">
            Estratégia multimoeda: Dólar, Euro, CAD e AUD.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 reveal">
          {steps.map((s, i) => (
            <div key={i} className="p-8 md:p-12 bg-[#080808] border border-white/5 rounded-3xl hover:border-[#D4AF37]/40 transition-all group">
              <div className="text-[#00C853] mb-6 md:mb-10 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-[#00C853]/10 rounded-xl">
                {s.icon}
              </div>
              <h4 className="text-xl md:text-2xl font-display text-white mb-3 md:mb-4">{s.title}</h4>
              <p className="text-gray-500 font-light leading-relaxed text-sm">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const About: React.FC = () => {
  return (
    <section id="mentora" className="py-24 md:py-40 bg-black overflow-hidden relative">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto text-center reveal">
          <div className="inline-block px-4 py-1 rounded-full border border-[#D4AF37]/20 bg-[#D4AF37]/5 text-[#D4AF37] text-[9px] md:text-[10px] font-bold uppercase tracking-[0.3em] md:tracking-[0.4em] mb-8 md:mb-12">
            The Mentor
          </div>
          <h3 className="text-3xl sm:text-4xl md:text-8xl font-display text-white mb-8 md:mb-10 leading-[1.1] md:leading-[0.9] tracking-tighter text-balance">
            Mestre em <span className="italic text-[#D4AF37]">Educação.</span> <br /> 
            <span className="text-gray-700">Gestora de Milhões.</span>
          </h3>
          <p className="text-base md:text-2xl text-gray-400 font-light leading-relaxed mb-12 md:mb-16 mx-auto max-w-2xl text-balance">
            Unindo didática e prática operacional. Já faturei em <strong className="text-white">Dólar, Euro, CAD e AUD</strong>. Minha missão é te guiar até o contrato que vai mudar seu padrão de vida.
          </p>
        </div>
      </div>
    </section>
  );
};

const Admission = ({ onOpenForm }: { onOpenForm: () => void }) => {
  return (
    <section id="admissao" className="py-24 md:py-40 bg-[#080808] relative overflow-hidden border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto reveal">
          <div className="text-center mb-16 md:mb-24">
            <h2 className="text-[10px] md:text-xs font-bold text-[#D4AF37] uppercase tracking-[0.4em] md:tracking-[0.6em] mb-8 md:mb-12 italic">Critérios de Admissão</h2>
            <h3 className="text-3xl sm:text-4xl md:text-7xl lg:text-8xl font-display font-semibold text-white mb-8 md:mb-12 leading-tight tracking-tight text-balance">
              FAÇA PARTE DO 1% DE GESTORES QUE ATUAM GLOBALMENTE
            </h3>
            <p className="text-base md:text-2xl lg:text-3xl text-gray-400 font-light max-w-4xl mx-auto leading-relaxed text-balance">
              Processo de admissão rigoroso para garantir suporte individual e resultados incondicionais.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 border-t border-white/10 pt-16 md:pt-20">
             <div className="flex gap-6 md:gap-8 items-start">
                <div className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-[#00C853]/10 flex items-center justify-center shrink-0 border border-[#00C853]/20">
                  <CheckCircle2 className="text-[#00C853]" size={24} />
                </div>
                <div>
                  <h5 className="text-white font-bold uppercase tracking-widest mb-3 md:mb-4 text-xs md:text-sm">Mentalidade Global</h5>
                  <p className="text-[10px] md:text-xs text-gray-500 leading-relaxed font-semibold uppercase tracking-widest">Foco absoluto em deixar o amadorismo do Real para trás e abraçar o lucro em moeda forte.</p>
                </div>
             </div>
             <div className="flex gap-6 md:gap-8 items-start">
                <div className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-[#00C853]/10 flex items-center justify-center shrink-0 border border-[#00C853]/20">
                  <CheckCircle2 className="text-[#00C853]" size={24} />
                </div>
                <div>
                  <h5 className="text-white font-bold uppercase tracking-widest mb-3 md:mb-4 text-xs md:text-sm">Compromisso com o Método</h5>
                  <p className="text-[10px] md:text-xs text-gray-500 leading-relaxed font-semibold uppercase tracking-widest">Seguir o passo-a-passo técnico (Tracking, Data, Closing) para garantir o ROI internacional.</p>
                </div>
             </div>
          </div>

          <div className="mt-16 md:mt-24 text-center">
            <button 
              onClick={onOpenForm}
              className="w-full sm:w-auto group relative inline-flex items-center justify-center gap-6 px-10 md:px-24 py-6 md:py-12 bg-white text-black font-black text-xs md:text-sm uppercase tracking-[0.3em] md:tracking-[0.4em] rounded-full hover:bg-[#00C853] hover:text-white transition-all duration-500 shadow-[0_40px_100px_rgba(255,255,255,0.05)] active:scale-95"
            >
              Aplicar para Seleção
              <MoveRight className="hidden sm:block group-hover:translate-x-3 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer: React.FC = () => {
  return (
    <footer className="py-16 md:py-24 bg-black border-t border-white/5">
      <div className="container mx-auto px-6 text-center">
        <span className="text-xl md:text-2xl font-display font-bold tracking-[0.3em] md:tracking-[0.5em] text-white">
          O CÓDIGO <span className="text-[#D4AF37]">DÓLAR</span>
        </span>
        <p className="mt-6 md:mt-8 text-gray-800 text-[8px] md:text-[9px] uppercase font-bold tracking-[0.2em] md:tracking-[0.3em] max-w-xs md:max-w-none mx-auto">
          Copyright © {new Date().getFullYear()} - O Código Dólar. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
};

const App: React.FC = () => {
  useReveal();
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <div className="min-h-screen bg-black selection:bg-[#00C853]/30 selection:text-[#00C853] overflow-x-hidden">
      <Navbar />
      <main>
        <Hero onOpenForm={() => setIsFormOpen(true)} />
        <Results />
        <ForWho />
        <Deliverables />
        <About />
        <Admission onOpenForm={() => setIsFormOpen(true)} />
      </main>
      <Footer />
      
      <QualificationModal 
        isOpen={isFormOpen} 
        onClose={() => setIsFormOpen(false)} 
      />
    </div>
  );
};

export default App;
