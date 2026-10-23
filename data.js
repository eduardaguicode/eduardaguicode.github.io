const DATA = {

  hero: {
    name: "Eduarda Guilherme",
    photo: "foto-hero.webp",
    photoAlt: { pt: "Eduarda Guilherme sorrindo, de óculos, com um notebook no colo", en: "Eduarda Guilherme smiling, wearing glasses, with a laptop on her lap" },
        subtitle: { pt: "Estudante de Ciência da Computação", en: "Computer Science Student" },

    code: {
      pt: { fn: "sobremim", text: "Olá! Sou uma estudante de Ciência da Computação na UFRPE, e este é o meu portfólio, onde você pode descobrir mais sobre mim e meus projetos." },
      en: { fn: "about_me", text: "Hi! I'm a Computer Science student at UFRPE, and this is my portfolio, where you can find out more about me and my projects." }
    }
  },

  /*
     MODELO:
       {
         title:  { pt: "Nome da instituição ou curso", en: "Institution or course name" },
         period: { pt: "Mês Ano – Mês Ano",            en: "Mon Year – Mon Year" },
         text:   { pt: "Descrição curta",              en: "Short description" } }
  */
  education: {
    degrees: [
      { icon: "cap", title: { pt: "Universidade Federal Rural de Pernambuco", en: "Federal Rural University of Pernambuco" },
        period: { pt: "Jan 2026 – atualmente", en: "Jan 2026 – present" },
        text: { pt: "Bacharelado em Ciência da Computação", en: "Bachelor's degree in Computer Science" } }
      
    ],
    courses: [
      { icon: "doc", title: { pt: "Administrador de Banco de Dados – IFRS", en: "Database Administrator – IFRS" },
        period: { pt: "Jul 2026 – Set 2026", en: "Jul 2026 – Sep 2026" },
        text: { pt: "Curso livre online - 200h", en: "Online short course - 200h" } }
      
    ]
  },


  tools: ["Git", "Python", "SQL"],

  /* 
      MODELO:
       {
         title:  { pt: "Cargo – Empresa",               en: "Role – Company" },
         period: { pt: "Mês Ano – atualmente",          en: "Mon Year – present" },
         text:   { pt: "O que você fez e aprendeu.",    en: "What you did and learned." },
         bullets: [                                      // OPCIONAL: apague este bloco se não quiser pontos extras
           { pt: "Primeiro ponto", en: "First point" },
           { pt: "Segundo ponto",  en: "Second point" }
         ] }
  */
  experience: [
    /*{ icon: "lock", title: { pt: "Integrante – LIAC UFRPE", en: "Member – LIAC UFRPE" },
      period: { pt: "Out 2026 – atualmente", en: "Oct 2026 – present" },
      text: { pt: "Integrante da Liga Acadêmica de CyberSegurança UFRPE", en: "Member of the UFRPE Cybersecurity Academic League" } },*/
    { icon: "teach", title: { pt: "Professora de Inglês – Melos English School", en: "English teacher – Melos English School" },
      period: { pt: "Jan 2024 – Out 2026", en: "Jan 2024 – Oct 2026" },
      text: { pt: "Professora de curso livre de inglês", en: "Teacher at an English language school" },
      bullets: [ { pt: "Fluência em inglês", en: "English fluency" },
                 { pt: "Escuta ativa, gestão de pessoas, adaptabilidade, comunicação didática", en: "Active listening, people management, adaptability, didactic communication" } ] }
    
  ],


  contact: {
    email: "eduardamgui19@gmail.com",
    instagram: "https://www.instagram.com/eduardaguicode",
    linkedin: "https://www.linkedin.com/in/eduardaguicode"
  },

  /* 
      MODELO:
       {
         slug: "meu-projeto",                  // identificador único: minúsculas, sem espaços nem acentos
         title:   { pt: "Nome do projeto", en: "Project name" },
         summary: { pt: "Resumo de uma linha (aparece no card).", en: "One-line summary (shown on the card)." },
         cover: "meu-projeto.png",             // OPCIONAL: imagem do card, na mesma pasta do index.html (apague a linha se não tiver)
         tools: ["Java", "PostgreSQL"],        // tecnologias usadas (viram tags)
         pitch:   { pt: "Pitch do produto: o que é, para quem, qual problema resolve.", en: "Product pitch." },
         repo:  "https://github.com/seu-usuario/seu-repo",       // link do GitHub
         video: "https://www.youtube.com/watch?v=XXXXXXXX",      // link do YouTube, ou "" se ainda não houver
         steps: [                              // etapas da produção, em ordem cronológica
           { title: { pt: "Planejamento", en: "Planning" },      text: { pt: "O que decidi e por quê.", en: "What I decided and why." } },
           { title: { pt: "Primeira versão", en: "First version" }, text: { pt: "Como construí.", en: "How I built it." } }
         ]
       }
  */
  projects: []
};

/* ---------- TEXTOS DA INTERFACE (PT/EN) ---------- */
const UI = {
  education: { pt: "Educação", en: "Education" }, tools: { pt: "Ferramentas", en: "Tools" },
  experience: { pt: "Experiência", en: "Experience" }, projects: { pt: "Projetos", en: "Projects" },
  contact: { pt: "Contato", en: "Contact" }, notes: { pt: "Bloco de notas", en: "Notebook" },
  skip: { pt: "Pular para o conteúdo", en: "Skip to content" },
  degrees: { pt: "Formação acadêmica", en: "Academic background" }, courses: { pt: "Cursos livres", en: "Complementary courses" },
  toolsSub: { pt: "Tecnologias, linguagens e bibliotecas dos meus projetos.", en: "Technologies, languages and libraries from my projects." },
  lattes: { pt: "Lattes", en: "Lattes" }, lattesFull: { pt: "Abrir meu currículo Lattes", en: "Open my Lattes résumé" }, hello: { pt: "Prazer,", en: "Nice to meet you," },
  notesTxt: { pt: "Veja também meu bloco de notas, onde explico toda a ideação e produção desses projetos", en: "Also see my notebook, where I explain the whole ideation and making of these projects" }, notesBtn: { pt: "Bloco de Notas", en: "Notebook" },
  projSub: { pt: "Um resumo de cada projeto. O passo a passo está no bloco de notas.", en: "A summary of each project. The step-by-step lives in the notebook." },
  openAll: { pt: "Abrir portfólio completo no bloco de notas", en: "Open the full portfolio in the notebook" },
  soon: { pt: "Em breve...", en: "Coming soon..." },
  wip: { pt: "Estou trabalhando nisso.", en: "I'm working on it." },
  wipSub: { pt: "Os projetos serão disponibilizados aqui em breve.", en: "The projects will be available here soon." },
  contactSub: { pt: "Uma mensagem, um e-mail ou um perfil profissional.", en: "A message, an email or a professional profile." },
  name: { pt: "Seu nome", en: "Your name" }, email: { pt: "Seu e-mail", en: "Your email" }, msg: { pt: "Mensagem", en: "Message" },
  send: { pt: "Enviar e-mail", en: "Send email" }, subject: { pt: "Contato pelo portfólio", en: "Contact via portfolio" },
  eName: { pt: "Informe seu nome.", en: "Enter your name." }, eMail: { pt: "Informe um e-mail válido.", en: "Enter a valid email." }, eMsg: { pt: "Escreva uma mensagem.", en: "Write a message." },
  nbTitle: { pt: "Bloco de notas de projetos", en: "Project notebook" },
  nbIntro: { pt: "Cada nota conta como um projeto foi feito, etapa por etapa, e termina com o produto pronto.", en: "Each note tells how a project was made, step by step, and ends with the finished product." },
  nbWhy: { pt: "Para que serve este bloco de notas?", en: "What is this notebook for?" },
  whyTitle: { pt: "Para que serve este bloco de notas", en: "What this notebook is for" },
  why1: { pt: "Aqui reúno informações educativas sobre os projetos que desenvolvo. Cada nota registra a produção em ordem cronológica, em etapas explicadas de forma didática.", en: "This is where I gather educational notes about the projects I build. Each note records the making in chronological order, in steps explained plainly." },
  why2: { pt: "No fim de cada nota está o projeto finalizado: pitch do produto, repositório no GitHub, vídeo no YouTube e tecnologias usadas.", en: "At the end of each note is the finished project: product pitch, GitHub repository, YouTube video and technologies used." },
  back: { pt: "← Todas as notas", en: "← All notes" }, home: { pt: "← Página inicial", en: "← Home" },
  how: { pt: "Como foi feito", en: "How it was made" }, product: { pt: "O produto", en: "The product" },
  repo: { pt: "Repositório no GitHub", en: "GitHub repository" }, video: { pt: "Assistir no YouTube", en: "Watch on YouTube" },
  stack: { pt: "Tecnologias", en: "Technologies" }, open: { pt: "Abrir nota", en: "Open note" },
  notesLink: { pt: "Veja minhas anotações de desenvolvimento no Bloco de Notas", en: "See my development notes in the Notebook" },
  projLabel: { pt: "Projeto", en: "Project" }, prev: { pt: "Projeto anterior", en: "Previous project" }, next: { pt: "Próximo projeto", en: "Next project" },
  run: { pt: "Executar", en: "Run" }, focus: { pt: "Backend, desenvolvimento seguro e dados.", en: "Backend, secure development and data." },
  menu: { pt: "Menu", en: "Menu" }, close: { pt: "Fechar", en: "Close" },
  top: { pt: "Voltar ao topo", en: "Back to top" },
  foot: { pt: "Eduarda Menezes Guilherme · Recife-PE", en: "Eduarda Menezes Guilherme · Recife-PE" }
};
