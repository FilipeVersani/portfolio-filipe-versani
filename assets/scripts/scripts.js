const palavras = ["Laravel", "React", "TypeScript", "Tailwind CSS", "SQL", "JavaScript", "PHP", "Wordpress"];

// Função para digitar uma palavra lentamente
function digitarPalavra(palavra, index, velocidade) {
  if (index < palavra.length) {
    const divHabilidade = document.querySelector('#sobre-mim .habilidade');
    divHabilidade.textContent += palavra.charAt(index);
    index++;
    setTimeout(() => digitarPalavra(palavra, index, velocidade), velocidade);
  } else {
    setTimeout(() => apagarPalavra(velocidade), 1000);
  }
}

// Função para apagar a palavra lentamente
function apagarPalavra(velocidade) {
  const divHabilidade = document.querySelector('#sobre-mim .habilidade');
  const palavraAtual = divHabilidade.textContent;
  if (palavraAtual.length > 0) {
    divHabilidade.textContent = palavraAtual.slice(0, -1);
    setTimeout(() => apagarPalavra(velocidade), velocidade);
  } else {
    // Quando a palavra atual for apagada, chama a próxima palavra
    setTimeout(() => proximaPalavra(), 1000);
  }
}

// Função para avançar para a próxima palavra
function proximaPalavra() {
  const divHabilidade = document.querySelector('#sobre-mim .habilidade');
  divHabilidade.textContent = ''; // Limpa a div
  const proximaIndex = (palavras.indexOf(divHabilidade.dataset.palavra) + 1) % palavras.length;
  divHabilidade.dataset.palavra = palavras[proximaIndex];
  digitarPalavra(palavras[proximaIndex], 0, 100);
}

// Inicia o processo com a primeira palavra
document.querySelector('#sobre-mim .habilidade').dataset.palavra = palavras[0];
digitarPalavra(palavras[0], 0, 100);

window.addEventListener('scroll', function () {
  var menu = document.getElementById('menu');
  var menuAltura = menu.offsetHeight;
  var posicaoScroll = window.scrollY;
  const botao = document.querySelector('.btn-top');
  const capturarScroll = document.body.scrollTop || document.documentElement.scrollTop;

  if (capturarScroll > 20) {
    botao.classList.add('topo');
  } else {
    botao.classList.remove('topo');
  }


  if (posicaoScroll >= menuAltura) {
    menu.classList.add('menu-fixo');
  } else {
    menu.classList.remove('menu-fixo');
  }
});


// Menu Mobile
function AbrirMenu() {

  const container = document.querySelector('#menu .box-menu');
  const body = document.querySelector('body');
  const hamburger = document.querySelectorAll('#menu .menu-hamburger .hamburger');

  container.classList.toggle('aberto');
  body.classList.toggle('trava-scroll');

  hamburger.forEach(listra => {
    listra.classList.toggle('girar');
  });

}

const links = document.querySelectorAll("#menu ul li a");
links.forEach(function(link) {
    link.addEventListener("click", function() {
        const container = document.querySelector('#menu .box-menu');
        container.classList.remove('aberto');
        const body = document.querySelector('body');
        body.classList.remove('trava-scroll');
        const hamburgers = document.querySelectorAll('#menu .menu-hamburger .hamburger');
        hamburgers.forEach(hamburger => {
            hamburger.classList.remove('girar');
        });
    });
});


// Botão para rolar para o topo
function ScrollTopo() {

  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

// Virar card

function virarCard(button) {
  var card = button.closest('.card').querySelector('.conteudo');
  card.classList.toggle('virar');
}

function voltarCard(button) {
  var card = button.closest('.card').querySelector('.conteudo');
  card.classList.remove('virar');
}

// Galeria Space (lightbox)

function abrirImagem(item) {
  const lightbox = document.querySelector('#space .lightbox');
  const imagem = item.querySelector('img');
  lightbox.querySelector('img').src = imagem.src;
  lightbox.querySelector('img').alt = imagem.alt;
  lightbox.querySelector('.legenda').textContent = item.querySelector('.legenda').textContent;
  lightbox.classList.add('aberto');
  document.body.classList.add('trava-scroll');
}

function fecharImagem(event) {
  if (event && event.target.tagName === 'IMG') return;
  document.querySelector('#space .lightbox').classList.remove('aberto');
  document.body.classList.remove('trava-scroll');
}

document.addEventListener('keydown', function (event) {
  if (event.key === 'Escape') fecharImagem();
});

// Animações

const reduzirMovimento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Revelar elementos ao rolar (com atraso escalonado dentro de cada grupo)
function marcarReveal(seletor, passo = 0, colunas = 0) {
  const elementos = typeof seletor === 'string' ? document.querySelectorAll(seletor) : seletor;
  elementos.forEach((elemento, index) => {
    const posicao = colunas ? index % colunas : index;
    elemento.classList.add('reveal');
    elemento.style.setProperty('--delay', `${posicao * passo}s`);
  });
}

marcarReveal('#sobre-mim .esq > *', 0.08);
marcarReveal('#sobre-mim .area-foto');
marcarReveal('#experiencia .titulo, #space .content > .titulo, #space .content > .sub, #habilidades .content > .titulo, #habilidades .categoria, #projetos .content > .titulo, #projetos .content > .sub');
marcarReveal('#experiencia .box-experiencia');
marcarReveal('#experiencia .formacao-item', 0.1);
marcarReveal('#space .info');
marcarReveal('#space .galeria .item', 0.12);
document.querySelectorAll('#habilidades .box-habilidades').forEach(grupo => {
  marcarReveal(grupo.querySelectorAll('.habilidade'), 0.05);
});
marcarReveal('#projetos .area-cards .card', 0.1, 3);

const observarReveal = new IntersectionObserver((entradas, observer) => {
  entradas.forEach(entrada => {
    if (entrada.isIntersecting) {
      entrada.target.classList.add('visivel');
      observer.unobserve(entrada.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(elemento => observarReveal.observe(elemento));

// Barra de progresso de leitura
const progresso = document.createElement('div');
progresso.id = 'progresso';
document.body.appendChild(progresso);

function atualizarProgresso() {
  const total = document.documentElement.scrollHeight - window.innerHeight;
  progresso.style.transform = `scaleX(${total > 0 ? window.scrollY / total : 0})`;
}

window.addEventListener('scroll', atualizarProgresso, { passive: true });
atualizarProgresso();

// Link ativo no menu conforme a seção visível
const linksMenu = document.querySelectorAll('#menu ul li a');
const observarSecoes = new IntersectionObserver(entradas => {
  entradas.forEach(entrada => {
    if (entrada.isIntersecting) {
      linksMenu.forEach(link => {
        link.classList.toggle('ativo', link.getAttribute('href') === `#${entrada.target.id}`);
      });
    }
  });
}, { rootMargin: '-45% 0px -50% 0px' });

document.querySelectorAll('main > section[id]').forEach(secao => observarSecoes.observe(secao));

// Inclinação 3D sutil nos cards de projeto
if (!reduzirMovimento && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
  document.querySelectorAll('#projetos .card').forEach(card => {
    card.addEventListener('mousemove', evento => {
      const area = card.getBoundingClientRect();
      const x = (evento.clientX - area.left) / area.width - 0.5;
      const y = (evento.clientY - area.top) / area.height - 0.5;
      card.style.transform = `perspective(1000px) rotateX(${(-y * 6).toFixed(2)}deg) rotateY(${(x * 6).toFixed(2)}deg)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

// // Validação formulário

// document.getElementById('formulario').addEventListener('submit', function(event) {
//   event.preventDefault();
//   const inputs = this.querySelectorAll('input[name], textarea[name]');
//   let isValid = true;
//   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   inputs.forEach(input => {
//       input.classList.remove('error');
//       if (input.value.trim() === '') {
//           input.classList.add('error');
//           isValid = false;
//       }
//       if (input.name === 'email' && !emailRegex.test(input.value.trim())) {
//           input.classList.add('error');
//           isValid = false;
//       }
//   });
//   if (isValid) {
//       this.submit();
//   }
// });