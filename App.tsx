
import React, { useState, useEffect } from 'react';
import { 
  Menu, 
  X, 
  Globe, 
  ArrowUpRight,
  Sparkles,
  CheckCircle2,
  Database,
  Layout,
  MessageSquare,
  Calendar,
  Gift,
  PieChart,
  BrainCircuit,
  MousePointerClick,
  Target,
  ShieldCheck,
  MoveRight,
  TrendingUp,
  DollarSign,
  BarChart3,
  Layers,
  Coins
} from 'lucide-react';

const WHATSAPP_LINK = "https://wa.me/5500000000000?text=Olá!%20Li%20sobre%20a%20mentoria%20e%20quero%20faturar%20em%20dólar.";

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

// --- Components ---

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
    { name: 'Diagnóstico', id: 'para-quem' },
    { name: 'O que aprenderá', id: 'entrega' },
    { name: 'Seleção', id: 'admissao' }
  ];

  return (
    <nav className={`fixed top-0 w-full z-[100] transition-all duration-700 ${isScrolled ? 'bg-black/95 backdrop-blur-xl border-b border-white/5 py-4' : 'bg-transparent py-8'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div className="flex flex-col group cursor-pointer">
          <span className="text-xl md:text-2xl font-display font-bold tracking-[0.2em] text-white">
            O CÓDIGO <span className="text-[#D4AF37] text-glow-gold">DÓLAR</span>
          </span>
          <div className="h-[1px] w-0 group-hover:w-full bg-[#D4AF37] transition-all duration-700" />
        </div>

        <div className="hidden lg:flex items-center gap-10">
          {menuItems.map((item) => (
            <a 
              key={item.id} 
              href={`#${item.id}`} 
              className="text-[10px] uppercase tracking-[0.3em] font-bold text-gray-400 hover:text-white transition-all"
            >
              {item.name}
            </a>
          ))}
          <a 
            href={WHATSAPP_LINK} 
            className="group flex items-center gap-3 px-6 py-2.5 rounded-full border border-[#00C853]/40 text-[#00C853] text-[10px] font-black uppercase tracking-[0.2em] hover:bg-[#00C853] hover:text-white transition-all duration-500"
          >
            Falar com a Mentora <ArrowUpRight size={14} />
          </a>
        </div>

        <button className="lg:hidden text-white" onClick={() => setMobileMenu(!mobileMenu)}>
          {mobileMenu ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileMenu && (
        <div className="lg:hidden fixed inset-0 bg-black z-50 flex flex-col items-center justify-center gap-8 p-6">
           <button className="absolute top-8 right-6 text-white" onClick={() => setMobileMenu(false)}><X size={32} /></button>
           {menuItems.map((item) => (
            <a key={item.id} href={`#${item.id}`} onClick={() => setMobileMenu(false)} className="text-3xl font-display text-white tracking-widest">{item.name}</a>
          ))}
          <a href={WHATSAPP_LINK} className="px-12 py-4 rounded-full bg-[#00C853] text-black font-bold text-lg uppercase tracking-widest">Aplicar Agora</a>
        </div>
      )}
    </nav>
  );
};

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-[#050505]">
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[800px] h-[800px] bg-[#00C853]/10 rounded-full blur-[150px] animate-pulse" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-[#D4AF37]/5 rounded-full blur-[150px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto text-center reveal">
          <div className="inline-flex items-center gap-3 mb-12 px-6 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md">
            <Coins size={14} className="text-[#D4AF37]" />
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-gray-400">Escala Internacional</span>
          </div>
          
          <h1 className="text-5xl md:text-8xl lg:text-9xl font-display font-semibold leading-[1.05] text-white mb-12 tracking-tight text-balance">
            Saia do tráfego em real e fature em <span className="italic text-[#D4AF37]">dólar em 30 dias.</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-400 max-w-4xl mx-auto leading-relaxed mb-16 font-light">
            Aprenda a se posicionar para o mercado internacional e fechar seu primeiro contrato em dólar, mesmo sem falar inglês fluentemente, com o único acompanhamento que não termina enquanto você não assinar seu contrato.
          </p>

          <div className="flex flex-col md:row gap-8 justify-center items-center">
            <a 
              href={WHATSAPP_LINK}
              className="group relative px-16 py-8 bg-[#00C853] text-black font-black text-sm uppercase tracking-[0.4em] rounded-full overflow-hidden transition-all hover:scale-105 shadow-[0_20px_50px_rgba(0,229,118,0.2)]"
            >
              Quero Iniciar Minha Aplicação
              <div className="absolute inset-0 bg-white/30 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            </a>
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
    <section id="resultados" className="py-32 bg-[#080808] relative">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center mb-24 reveal">
          <h2 className="text-xs font-bold text-[#D4AF37] uppercase tracking-[0.6em] mb-8 italic">Proof of Global Authority</h2>
          <h3 className="text-4xl md:text-7xl font-display text-white mb-6">Faturamento em <span className="text-[#00C853]">Moeda Forte.</span></h3>
          <p className="text-gray-500 text-lg">Operações reais rodando nos mercados mais valiosos do mundo.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 reveal">
          {metrics.map((m, i) => (
            <div key={i} className="p-10 rounded-[2.5rem] bg-zinc-900/50 border border-white/5 hover:border-[#00C853]/30 transition-all group overflow-hidden relative">
              <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:scale-125 transition-transform">
                {m.icon}
              </div>
              <div className="relative z-10">
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-6">{m.label}</p>
                <h4 className="text-4xl md:text-5xl font-display text-white mb-2">{m.value}</h4>
                <p className="text-[#00C853] text-[10px] font-bold uppercase tracking-widest">{m.sub}</p>
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
    <section id="para-quem" className="py-32 bg-black relative">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mb-24 reveal">
          <h2 className="text-xs font-bold text-[#D4AF37] uppercase tracking-[0.5em] mb-8 italic">O Diagnóstico</h2>
          <h3 className="text-4xl md:text-7xl font-display text-white leading-tight">Essa mentoria é <br/> <span className="text-[#00C853]">para você que...</span></h3>
        </div>

        <div className="grid lg:grid-cols-3 gap-16 reveal">
          {personas.map((p, i) => (
            <div key={i} className="group cursor-default border-l border-zinc-800 pl-8 hover:border-[#00C853] transition-colors duration-700">
              <span className="text-4xl font-display text-[#D4AF37]">0{i+1}</span>
              <h4 className="text-xl font-bold text-white mt-6 mb-4 uppercase tracking-tighter">{p.title}</h4>
              <p className="text-gray-500 leading-relaxed font-light">{p.desc}</p>
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
    { title: "Blueprint: Prospecção Multi-Moeda", desc: "Onde e como encontrar empresas USA, Europa e Austrália que pagam em moeda forte.", icon: <Globe /> },
    { title: "Closing: Negociação & Fees", desc: "Scripts de fechamento e como cobrar fees de $2k USD/EUR por cliente sem tremer na base.", icon: <DollarSign /> },
    { title: "Scale: Gestão High-Ticket", desc: "Como manter os resultados e escalar as contas sem precisar de uma agência gigante.", icon: <Layers /> }
  ];

  return (
    <section id="entrega" className="py-32 bg-[#050505] relative border-y border-white/5">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-end justify-between mb-24 reveal">
          <div className="max-w-2xl">
            <h2 className="text-xs font-bold text-[#00C853] uppercase tracking-[0.6em] mb-8 italic">A Engenharia da Mentoria</h2>
            <h3 className="text-4xl md:text-7xl font-display text-white">Tudo o que <span className="italic text-[#D4AF37]">você vai aprender.</span></h3>
          </div>
          <p className="text-gray-500 max-w-xs mt-8 md:mt-0 uppercase text-[10px] font-bold tracking-widest leading-relaxed">
            Metodologia testada em Dólar, Euro, CAD e AUD.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 reveal">
          {steps.map((s, i) => (
            <div key={i} className="p-12 bg-[#080808] border border-white/5 rounded-3xl hover:border-[#D4AF37]/40 transition-all group">
              <div className="text-[#00C853] mb-10 w-12 h-12 flex items-center justify-center bg-[#00C853]/10 rounded-xl">
                {s.icon}
              </div>
              <h4 className="text-2xl font-display text-white mb-4">{s.title}</h4>
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
    <section id="mentora" className="py-40 bg-black overflow-hidden relative">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto text-center reveal">
          <div className="inline-block px-4 py-1 rounded-full border border-[#D4AF37]/20 bg-[#D4AF37]/5 text-[#D4AF37] text-[10px] font-bold uppercase tracking-[0.4em] mb-12">
            The Mentor
          </div>
          <h3 className="text-5xl md:text-8xl font-display text-white mb-10 leading-[0.9] tracking-tighter">
            Mestre em <span className="italic text-[#D4AF37]">Educação.</span> <br /> 
            <span className="text-gray-700">Gestora de Milhões.</span>
          </h3>
          <p className="text-xl md:text-2xl text-gray-400 font-light leading-relaxed mb-16 mx-auto max-w-2xl">
            Com a didática de um mestrado e a experiência de quem já faturou em <strong className="text-white">Dólar, Euro, CAD e AUD</strong>, eu não apenas opero milhões; eu sei como te ensinar a dominar o mundo.
          </p>
          <div className="flex flex-wrap justify-center gap-12 md:gap-24">
            <div className="flex flex-col items-center">
              <span className="text-4xl md:text-6xl font-display text-white">+04</span>
              <span className="text-[10px] text-gray-700 font-black uppercase tracking-[0.2em] mt-2">Continentes Atuantes</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-4xl md:text-6xl font-display text-white">4 Moedas</span>
              <span className="text-[10px] text-gray-700 font-black uppercase tracking-[0.2em] mt-2">Faturamento Global</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Admission: React.FC = () => {
  return (
    <section id="admissao" className="py-40 bg-black relative overflow-hidden border-t border-white/5">
      <div className="container mx-auto px-6 text-center flex flex-col items-center">
        <div className="max-w-5xl mx-auto reveal flex flex-col items-center">
          <h2 className="text-xs font-bold text-[#D4AF37] uppercase tracking-[0.6em] mb-16 italic">Critérios de Admissão</h2>
          
          <div className="text-left max-w-5xl mx-auto">
            <h3 className="text-4xl md:text-7xl lg:text-8xl font-display font-semibold text-white mb-12 leading-[1.1] tracking-tight text-center">
              FAÇA PARTE DO 1% DE GESTORES QUE ATUAM GLOBALMENTE
            </h3>

            <p className="text-xl md:text-3xl text-gray-400 font-light mb-24 leading-relaxed text-center max-w-4xl mx-auto">
              Para garantir o acompanhamento individual e o pacto de resultado incondicional, o processo de admissão é rigoroso. Eu não busco apenas alunos, busco parceiros de jornada prontos para a escala internacional.
            </p>
            
            <div className="grid md:grid-cols-2 gap-16 border-t border-white/10 pt-20">
               <div className="flex gap-8 items-start">
                  <div className="w-14 h-14 rounded-full bg-[#00C853]/10 flex items-center justify-center shrink-0 border border-[#00C853]/20">
                    <CheckCircle2 className="text-[#00C853]" size={28} />
                  </div>
                  <div>
                    <h5 className="text-white font-bold uppercase tracking-widest mb-4 text-sm">Mentalidade Global</h5>
                    <p className="text-xs text-gray-500 leading-relaxed font-semibold uppercase tracking-widest">Foco absoluto em deixar o amadorismo do Real para trás e abraçar o lucro em moeda forte.</p>
                  </div>
               </div>
               <div className="flex gap-8 items-start">
                  <div className="w-14 h-14 rounded-full bg-[#00C853]/10 flex items-center justify-center shrink-0 border border-[#00C853]/20">
                    <CheckCircle2 className="text-[#00C853]" size={28} />
                  </div>
                  <div>
                    <h5 className="text-white font-bold uppercase tracking-widest mb-4 text-sm">Compromisso com o Método</h5>
                    <p className="text-xs text-gray-500 leading-relaxed font-semibold uppercase tracking-widest">Seguir o passo-a-passo técnico (Tracking, Data, Closing) para garantir o ROI internacional.</p>
                  </div>
               </div>
            </div>
          </div>

          <div className="mt-24">
            <a 
              href={WHATSAPP_LINK} 
              className="group relative inline-flex items-center gap-6 px-24 py-12 bg-white text-black font-black text-sm uppercase tracking-[0.4em] rounded-full hover:bg-[#00C853] hover:text-white transition-all duration-500 shadow-[0_40px_100px_rgba(255,255,255,0.05)]"
            >
              Aplicar para Seleção
              <MoveRight className="group-hover:translate-x-3 transition-transform" />
            </a>
          </div>
          
          <p className="mt-16 text-gray-800 text-[10px] font-black uppercase tracking-[0.4em]">Exclusividade e suporte individual garantidos.</p>
        </div>
      </div>
    </section>
  );
};

const Footer: React.FC = () => {
  return (
    <footer className="py-24 bg-black border-t border-white/5 relative overflow-hidden">
      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="flex flex-col items-center gap-10 mb-16">
          <span className="text-2xl font-display font-bold tracking-[0.5em] text-white">
            O CÓDIGO <span className="text-[#D4AF37]">DÓLAR</span>
          </span>
          <a 
            href={WHATSAPP_LINK}
            className="text-[10px] font-black uppercase tracking-[0.3em] text-[#00C853] hover:text-white transition-colors"
          >
            Aplicar para a próxima turma →
          </a>
        </div>
        <p className="text-gray-800 text-[9px] uppercase font-bold tracking-[0.3em] max-w-2xl mx-auto leading-relaxed">
          Programa focado em performance internacional multi-moeda. Copyright © {new Date().getFullYear()} - O Código Dólar.
        </p>
      </div>
    </footer>
  );
};

const App: React.FC = () => {
  useReveal();

  return (
    <div className="min-h-screen bg-black selection:bg-[#00C853]/30 selection:text-[#00C853] relative">
      <Navbar />
      <main>
        <Hero />
        <Results />
        <ForWho />
        <Deliverables />
        <About />
        <Admission />
      </main>
      <Footer />
    </div>
  );
};

export default App;
