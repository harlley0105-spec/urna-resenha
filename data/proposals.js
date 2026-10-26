// Todos os textos da urna ficam aqui. Edite à vontade; o script.js não precisa mudar.
window.URNA = {
  data: "25/10",
  cargo: "Ministro das Pequenas Gentilezas",
 candidatos: [
  { num: "08", nome: "Harlley", partido: "Partido da Atenção aos Detalhes", sigla: "PAD", cor: "#264479",
    foto: "harlley.jpg" },
  { num: "31", nome: "Idiota", partido: "Partido do Atraso Sincero", sigla: "PAS", cor: "#7a7f8a",
    slogan: "Eu aviso quando sair.", msg: "Obrigado pelo voto! A posse é às 14h. (Eu chego às 16h.)",
    foto: "idiota.jpg" },
  { num: "64", nome: "Escroto", partido: "Partido do Deixa Pra Lá", sigla: "PDL", cor: "#8a7a6a",
    slogan: "Depois eu vejo isso.", msg: "Obrigado pelo voto! Vi. Respondo depois.",
    foto: "escroto.jpg" }
],
  planos: {
    "08": [
      { cat: "Presença", itens: [
        ["Resposta de verdade", "Quando você mandar mensagem, eu respondo como quem estava esperando."],
        ["Na hora certa", "Se eu disser “tô chegando”, já estou na esquina."],
        ["Sem sumiço", "Se eu estiver sem tempo, aviso. Não desapareço no meio da conversa."],
        ["Celular no bolso", "Quando estou com você, o celular fica quieto."],
        ["Palavra dada", "Se eu disser que vou, eu vou."],
        ["Chegou bem?", "Eu pergunto. E espero a resposta com paciência."],
        ["Imprevisto não vira hábito", "Acontece de cancelar. O que não vou fazer é transformar isso em rotina."] ] },
      { cat: "Atenção", itens: [
        ["O elogio na hora", "O elogio que eu quase não fiz no ginásio, eu faço na hora, em voz alta."],
        ["Ouvir até o fim", "Pode falar de filosofia por uma hora. Vou querer saber a parte seguinte."],
        ["Memória de detalhes", "O que você me contar, eu guardo. Até o que você achou que ninguém ia notar."],
        ["Notar o novo", "Unha nova, cabelo diferente, tênis novo. Eu vejo e falo."],
        ["Datas dela", "Seu aniversário e as datas que importam para você ficam anotados."],
        ["E você, como está?", "Pergunto de verdade, e espero a resposta de verdade."],
        ["Sinal de cansaço", "Quando você estiver cansada, eu percebo e mudo o plano."],
        ["Lembrei de você", "De vez em quando, uma mensagem boba só porque lembrei. Sem esperar nada de volta."] ] },
      { cat: "Apoio", itens: [
        ["Torcida organizada", "Em dia de prova, apresentação ou coisa importante, eu mando mensagem antes."],
        ["Dia ruim", "Não tento resolver tudo. Fico por perto e deixo você decidir o que precisa."],
        ["Seus planos importam", "O que você quer ser e fazer, eu levo a sério."],
        ["Do seu lado", "Se duvidarem de uma opinião sua, eu não fico em silêncio."],
        ["Crédito justo", "Quando você tiver razão, eu falo na hora."],
        ["Sua vitória, meu grito", "Comemoro o que você conquista mais alto do que as minhas coisas."] ] },
      { cat: "Diversão", itens: [
        ["Gol do Vasco", "Comemoro o gol do seu time sem reclamar. Mesmo sendo flamenguista aqui."],
        ["O que você ama vira assunto", "eu leio, assisto e ouço por vontade própria."],
        ["Pé protegido", "Prometo dançar sem pisar no seu pé. Ou avisar antes."],
        ["Música à escolha", "Você escolhe e eu não reclamo da repetição."],
        ["Escudo contra spoiler", "Ninguém conta o final de nada para você."],
        ["Piada boba garantida", "Faço a piada boba mesmo se você não rir. Eu rio por nós dois."],
        ["Cinema sem reclamação", "Qualquer filme que você escolher, eu assisto inteiro."] ] },
      { cat: "Respeito", itens: [
        ["Seu tempo, seu ritmo", "Sem pressa e sem cobrança."],
        ["Seus amigos, seus rolês", "Sem ciúme nem controle. Se você sair e se divertir, eu fico feliz."],
        ["Verdade, mesmo quando custa", "Falo o que é real, de um jeito cuidadoso."],
        ["Desculpa sem “mas”", "Quando eu errar, eu peço desculpa. Sem “mas” no final."],
        ["Resolver, não vencer", "Se a gente discordar, o objetivo é resolver."] ] },
      { cat: "Absurdos", itens: [
        ["Guarda-chuva oficial", "Guarda-chuva azul-marinho reservado para você."],
        ["Ministério do Azul", "Todos os documentos oficiais só aceitam azul no tom certo."],
        ["Última fatia", "A última fatia de qualquer comida é sua. Sem discussão."],
        ["Tradutor de silêncio", "Entendo quando você está cansada e mudo de assunto."],
        ["A protagonista", "Garanto que você seja a protagonista desse mundo"] ] }
    ],
    "31": [
      ["“Tô chegando” oficial", "Significa “ainda estou no banho”."],
      ["Cancelamento relâmpago", "O aviso vem 10 minutos antes, “porque surgiu um negócio”."],
      ["Reunião do lanche", "Decidir o lanche exige 3 horas de reunião, com pauta e ata."],
      ["Taxa do meme", "R$ 0,50 por meme enviado, cobrado no fim do mês."],
      ["Semana que vem", "Tudo fica para a semana que vem, que nunca chega."],
      ["Horário flexível", "Combinar “por volta das 15h, mais ou menos, talvez 16h”."],
      ["Cinema criativo", "Chega no meio do filme e pergunta o que perdeu."],
      ["Pontualidade garantida", "Só a partir do ano que vem. Sempre o ano que vem."]
    ],
    "64": [
      ["Visualizou", "Vê a mensagem e responde dois dias depois com “kkkk”."],
      ["Calendário culpado", "Esquece datas importantes e diz que o calendário errou."],
      ["Só a primeira frase", "Escuta só o começo do que você fala e responde outra coisa."],
      ["Estou ouvindo", "Diz “tô ouvindo” enquanto joga."],
      ["Spoiler grátis", "Conta o final de todos os filmes, de graça."],
      ["Elogio atrasado", "Elogia a unha três semanas depois, sem lembrar de qual."],
      ["Tanto faz", "Responde “tanto faz” a tudo e depois reclama da escolha."],
      ["Depois eu vejo", "A resposta oficial para qualquer pedido."]
    ]
  },
  // TODO (Harlley): troque os dois textos secretos pelos seus.
  secretas: [
    ["Chave do coração", "Você ficou com a chave. Ela continua sendo sua."],
    ["Aulas de dança", "Vou aprender a dançar de verdade. Pelo menos o básico, em respeito aos seus pés."],
    ["Fácil ser você", "Quero ser alguém com quem é fácil ser você mesma. Sem precisar explicar demais, sem precisar fingir."]
  ],
  // TODO (Harlley): este texto final é um rascunho neutro. Reescreva com a sua voz.
  final: "Obrigado por votar. Eu te amo sua maravilhosa"
};