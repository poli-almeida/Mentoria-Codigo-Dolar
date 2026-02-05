
import React, { useState, useEffect } from 'react';
import { 
  Menu, 
  X, 
  ChevronRight, 
  Globe, 
  Zap,
  ArrowUpRight,
  Sparkles,
  Award,
  CheckCircle2,
  Users,
  Handshake,
  Target,
  LineChart,
  MoveRight,
  Database,
  Layout,
  MessageSquare,
  Calendar,
  Gift,
  Search,
  PieChart,
  BrainCircuit,
  MousePointerClick
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
    { name: 'Público', id: 'para-quem' },
    { name: 'Entrega', id: 'entrega' },
    { name: 'Bônus', id: 'bonus' },
    { name: 'A Mentora', id: 'mentora' },
    { name: 'Aplicação', id: 'admissao' }
  ];

  return (
    <nav className={`fixed top-0 w-full z-[100] transition-all duration-500 ${isScrolled ? 'bg-black/80 backdrop-blur-2xl border-b border-white/5 py-4' : 'bg-transparent py-8'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div className="flex flex-col group cursor-pointer">
          <span className="text-xl md:text-2xl font-display font-bold tracking-[0.2em] text-white">
            O CÓDIGO <span className="text-[#D4AF37] text-glow-gold">DÓLAR</span>
          </span>
          <div className="h-[1px] w-0 group-hover:w-full bg-[#D4AF37] transition-all duration-500" />
        </div>

        <div className="hidden lg:flex items-center gap-10">
          {menuItems.map((item) => (
            <a 
              key={item.id} 
              href={`#${item.id}`} 
              className="text-[10px] uppercase tracking-[0.3em] font-bold text-gray-500 hover:text-white transition-all"
            >
              {item.name}
            </a>
          ))}
          <a 
            href={WHATSAPP_LINK} 
            className="group flex items-center gap-2 px-6 py-2.5 rounded-full border border-[#00C853]/40 text-[#00C853] text-[10px] font-black uppercase tracking-[0.2em] hover:bg-[#00C853] hover:text-white transition-all duration-500"
          >
            Falar com a Equipe <ArrowUpRight size={14} />
          </a>
        </div>

        <button className="lg:hidden text-white" onClick={() => setMobileMenu(!mobileMenu)}>
          {mobileMenu ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileMenu && (
        <div className="lg:hidden fixed inset-0 bg-black z-50 flex flex-col items-center justify-center gap-8 p-6 animate-in fade-in duration-300">
           <button className="absolute top-8 right-6 text-white" onClick={() => setMobileMenu(false)}><X size={32} /></button>
           {menuItems.map((item) => (
            <a key={item.id} href={`#${item.id}`} onClick={() => setMobileMenu(false)} className="text-3xl font-display text-white tracking-widest">{item.name}</a>
          ))}
          <a href={WHATSAPP_LINK} className="px-12 py-4 rounded-full bg-[#00C853] text-white font-bold text-lg uppercase tracking-widest">Aplicar Agora</a>
        </div>
      )}
    </nav>
  );
};

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-[#0A0A0A]">
      <div className="absolute top-0 left-0 w-full h-full opacity-25 pointer-events-none">
        <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-[#00C853]/10 rounded-full blur-[200px]" />
        <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-[#D4AF37]/5 rounded-full blur-[180px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto text-center reveal">
          <div className="inline-flex items-center gap-3 mb-12 px-6 py-2 rounded-full glass-card border-white/10">
            <Sparkles size={14} className="text-[#D4AF37]" />
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-gray-400 italic">Transição Global 2025</span>
          </div>
          
          <h1 className="text-4xl md:text-7xl lg:text-8xl xl:text-9xl font-display font-semibold leading-[1.1] text-white mb-12 tracking-tight max-w-5xl mx-auto text-balance">
            Saia do tráfego em real e fature em <span className="italic text-[#D4AF37]">dólar em 30 dias.</span>
          </h1>
          
          <p className="text-lg md:text-2xl text-gray-400 max-w-4xl mx-auto leading-relaxed mb-16 font-light">
            Aprenda a se posicionar para o mercado internacional e fechar seu primeiro contrato em dólar, <strong className="text-white">mesmo sem falar inglês fluentemente</strong>, com o único acompanhamento que não termina enquanto você não assinar seu contrato.
          </p>

          <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
            <a 
              href={WHATSAPP_LINK}
              className="group relative px-12 py-8 bg-[#00C853] text-white font-black text-xs uppercase tracking-[0.4em] rounded-full overflow-hidden transition-all hover:scale-105 shadow-[0_30px_90px_rgba(0,200,83,0.3)]"
            >
              Aplicar para a Mentoria
              <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            </a>
            <div className="flex items-center gap-4 text-gray-600 text-[10px] font-bold uppercase tracking-widest">
              <Users size={16} /> Apenas para gestores comprometidos
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ForWho: React.FC = () => {
  const profiles = [
    { title: "Gestores em Busca de Liberdade", desc: "Para quem cansa de ganhar R$ 1.500 por cliente e quer os mesmos $1.500 em dólar pelo mesmo trabalho." },
    { title: "Experts em Performance", desc: "Para quem já domina as ferramentas e quer sair do amadorismo do mercado brasileiro para a elite global." },
    { title: "Freelancers de Elite", desc: "Para quem deseja construir uma vitrine internacional que atrai contratos sem precisar 'implorar' por vagas." },
    { title: "Data-Driven Specialists", desc: "Para quem entende que o tráfego hoje é sobre dados e quer aprender a vender essa inteligência para o exterior." }
  ];

  return (
    <section id="para-quem" className="py-32 bg-black relative">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center mb-24 reveal">
          <h2 className="text-xs font-bold text-[#D4AF37] uppercase tracking-[0.5em] mb-8 italic">Público-Alvo</h2>
          <h3 className="text-4xl md:text-7xl font-display text-white">A Mentoria foi desenhada <span className="text-[#00C853]">exclusivamente para você?</span></h3>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 reveal">
          {profiles.map((profile, i) => (
            <div key={i} className="p-8 glass-card rounded-3xl border-white/5 group hover:bg-zinc-900 transition-all duration-500">
              <h4 className="text-white font-bold uppercase tracking-widest text-sm mb-4 leading-tight group-hover:text-[#D4AF37] transition-colors">{profile.title}</h4>
              <p className="text-gray-500 text-sm leading-relaxed">{profile.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Deliverables: React.FC = () => {
  const items = [
    { title: "Domínio Multi-Plataformas", icon: <Globe size={24} />, desc: "Do zero ao avançado em Meta Ads e Google Ads, além de ensino especializado em Bing Ads e Microsoft Advertising." },
    { title: "Arquitetura de Tracking", icon: <Database size={24} />, desc: "Configuração profissional de rastreamento (GTM, GA4, API de Conversão) que os clientes internacionais exigem." },
    { title: "Anti-Subido / Data-Driven", icon: <BrainCircuit size={24} />, desc: "Mentalidade focada em dados. Você não sobe 'campanhazinhas', você gerencia investimentos com base em inteligência." },
    { title: "Visualização com Looker Studio", icon: <PieChart size={24} />, desc: "Aprenda a criar dashboards de elite que justificam seu fee mensal e impressionam CEOs estrangeiros." },
    { title: "Negociação Internacional", icon: <MousePointerClick size={24} />, desc: "Aulas práticas de fechamento: como se portar em calls e assinar contratos de $1k, $3k ou $5k USD." },
    { title: "Vitrine de Ouro", icon: <Layout size={24} />, desc: "Estruturação de portfólio e perfis em plataformas globais para ser caçado por recrutadores." }
  ];

  return (
    <section id="entrega" className="py-32 bg-[#0A0A0A] relative border-y border-white/5">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center text-center mb-24 reveal">
          <h2 className="text-xs font-bold text-[#D4AF37] uppercase tracking-[0.5em] mb-8 italic">Entrega Técnica Profunda</h2>
          <h3 className="text-4xl md:text-7xl font-display text-white max-w-4xl">Do zero ao <span className="text-[#00C853]">nível sênior internacional.</span></h3>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 reveal">
          {items.map((item, i) => (
            <div key={i} className="p-10 bg-black/50 border border-white/5 rounded-[2rem] hover:border-[#D4AF37]/30 transition-all duration-500">
              <div className="text-[#00C853] mb-8">{item.icon}</div>
              <h4 className="text-xl font-bold text-white mb-4 uppercase tracking-widest">{item.title}</h4>
              <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Bonus: React.FC = () => {
  const bonuses = [
    { title: "WhatsApp Direto 24/7", icon: <MessageSquare />, desc: "Acesso ao meu número pessoal sem intermediários. Suporte total para dúvidas em tempo real." },
    { title: "Calls Quinzenais", icon: <Calendar />, desc: "Encontros ao vivo para alinhamento de rota, revisão técnica e análise individual de contas." },
    { title: "Planilhas e Frameworks", icon: <Layout />, desc: "Meus métodos de organização, planilhas de precificação e controle de escala prontos para uso." },
    { title: "Clube de Descontos", icon: <Gift />, desc: "Acesso a descontos exclusivos nas principais ferramentas de automação e dados do mercado global." }
  ];

  return (
    <section id="bonus" className="py-32 bg-black relative">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto glass-card rounded-[4rem] border-[#00C853]/20 p-16 md:p-24 reveal">
          <div className="text-center mb-16">
            <Sparkles className="text-[#D4AF37] mx-auto mb-6" size={40} />
            <h2 className="text-4xl md:text-6xl font-display text-white mb-6">Bônus de <span className="text-[#00C853]">Escala Acelerada.</span></h2>
            <p className="text-gray-400 font-light">Ferramentas e suporte que valeriam o dobro do preço da mentoria isoladamente.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-12">
            {bonuses.map((b, i) => (
              <div key={i} className="flex gap-6 items-start">
                <div className="w-12 h-12 rounded-2xl bg-[#00C853]/10 flex items-center justify-center shrink-0 text-[#00C853]">
                  {b.icon}
                </div>
                <div>
                  <h5 className="text-white font-bold uppercase tracking-widest text-sm mb-2">{b.title}</h5>
                  <p className="text-gray-500 text-xs leading-relaxed">{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const About: React.FC = () => {
  return (
    <section id="mentora" className="py-32 bg-[#0A0A0A] overflow-hidden relative">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-24 items-center">
          <div className="reveal order-2 lg:order-1">
            <h2 className="text-xs font-bold text-[#D4AF37] uppercase tracking-[0.5em] mb-10">The Authority</h2>
            <h3 className="text-5xl md:text-8xl font-display text-white mb-10 leading-[0.9]">Mestre em Educação. <span className="text-gray-600 block">Gestora de Milhões.</span></h3>
            <p className="text-xl text-gray-400 font-light leading-relaxed mb-12 max-w-xl">
              Minha formação como Mestre em Educação me permitiu criar o método mais eficiente de transferência de conhecimento do mercado. Não apenas opero <strong className="text-white">R$ 1.2M+ mensais</strong> globalmente, eu sei como fazer VOCÊ operar e fechar contratos de alto valor. Sete anos de mercado me provaram que o resultado é uma ciência exata.
            </p>
            <div className="flex flex-wrap gap-16">
              <div>
                <p className="text-4xl font-display text-white tracking-tighter">7 ANOS</p>
                <p className="text-[10px] text-gray-600 font-bold uppercase tracking-widest mt-2">No Campo de Batalha</p>
              </div>
              <div>
                <p className="text-4xl font-display text-white tracking-tighter">1.2M+</p>
                <p className="text-[10px] text-gray-600 font-bold uppercase tracking-widest mt-2">Investidos em Jan/2025</p>
              </div>
            </div>
          </div>
          
          <div className="relative reveal order-1 lg:order-2 flex justify-center">
            <div className="relative z-10 w-full max-w-lg aspect-[4/5] rounded-[3rem] overflow-hidden grayscale border-4 border-white/5 shadow-[0_0_50px_rgba(212,175,55,0.1)] transition-all duration-700 hover:grayscale-0 hover:scale-[1.02]">
               <img 
                 src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=1200" 
                 className="w-full h-full object-cover object-center" 
                 alt="Sua Mentora - Foto PB Profissional" 
               />
               <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
               <div className="absolute bottom-12 left-12">
                  <p className="text-white font-display text-4xl italic tracking-wide">A Mentora</p>
               </div>
            </div>
            <div className="absolute -bottom-10 -right-10 w-80 h-80 bg-[#D4AF37]/10 blur-[120px] -z-1" />
          </div>
        </div>
      </div>
    </section>
  );
};

const Admission: React.FC = () => {
  return (
    <section id="admissao" className="py-40 bg-black relative overflow-hidden">
      <div className="container mx-auto px-6 text-center">
        <div className="max-w-4xl mx-auto reveal">
          <h2 className="text-xs font-bold text-[#D4AF37] uppercase tracking-[0.6em] mb-12 italic">Seleção Curada</h2>
          <h3 className="text-5xl md:text-8xl lg:text-9xl font-display text-white mb-16 leading-none tracking-tighter">Entre para o 1% do mercado global.</h3>
          
          <div className="mb-24 text-left">
            <p className="text-2xl md:text-4xl text-gray-300 font-light mb-16 leading-snug">
              Para garantir o acompanhamento individual e o pacto de resultado incondicional, o processo de admissão é rigoroso. Eu não busco apenas alunos, busco parceiros de jornada prontos para a escala internacional. <span className="text-white border-b-2 border-[#00C853] font-medium inline-block mt-4">Esse alguém é você?</span>
            </p>
            
            <div className="grid md:grid-cols-2 gap-12">
               <div className="flex gap-6 items-start">
                  <div className="w-10 h-10 rounded-full bg-[#00C853]/20 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="text-[#00C853]" size={20} />
                  </div>
                  <div>
                    <h5 className="text-white font-bold uppercase tracking-widest mb-2 text-sm">Alinhamento 1-on-1</h5>
                    <p className="text-xs text-gray-500 leading-relaxed font-medium">Sessão individual para diagnosticar sua operação e traçar o plano de transição global em 30 dias.</p>
                  </div>
               </div>
               <div className="flex gap-6 items-start">
                  <div className="w-10 h-10 rounded-full bg-[#00C853]/20 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="text-[#00C853]" size={20} />
                  </div>
                  <div>
                    <h5 className="text-white font-bold uppercase tracking-widest mb-2 text-sm">Acompanhamento Vitalício</h5>
                    <p className="text-xs text-gray-500 leading-relaxed font-medium">Meu suporte só termina quando o seu primeiro contrato em dólar for assinado e registrado.</p>
                  </div>
               </div>
            </div>
          </div>

          <a 
            href={WHATSAPP_LINK} 
            className="group relative inline-flex items-center gap-6 px-20 py-10 bg-white text-black font-black text-sm uppercase tracking-[0.4em] rounded-full hover:bg-[#00C853] hover:text-white transition-all duration-500 shadow-[0_40px_100px_rgba(255,255,255,0.1)]"
          >
            Iniciar Minha Aplicação
            <MoveRight className="group-hover:translate-x-3 transition-transform" />
          </a>
          
          <p className="mt-16 text-gray-800 text-[10px] font-black uppercase tracking-[0.4em]">Faturamento em dólar não é sorte, é método acompanhado.</p>
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
          <div className="flex gap-12 text-[10px] text-gray-600 font-bold uppercase tracking-widest">
             <a href="#" className="hover:text-white transition-colors">Processo Seletivo</a>
             <a href="#" className="hover:text-white transition-colors">Termos de Uso</a>
             <a href="#" className="hover:text-white transition-colors">Suporte Elite</a>
          </div>
        </div>
        <p className="text-gray-800 text-[9px] uppercase font-bold tracking-[0.3em] max-w-2xl mx-auto leading-relaxed">
          Programa de acompanhamento individual focado em performance internacional e transição de mercado em moeda forte. Copyright © {new Date().getFullYear()} - O Código Dólar.
        </p>
      </div>
    </footer>
  );
};

const App: React.FC = () => {
  useReveal();

  return (
    <div className="min-h-screen bg-[#0A0A0A] selection:bg-[#00C853]/30 selection:text-[#00C853] relative">
      <Navbar />
      <main>
        <Hero />
        <ForWho />
        <Deliverables />
        <Bonus />
        <About />
        <Admission />
      </main>
      <Footer />
    </div>
  );
};

export default App;
