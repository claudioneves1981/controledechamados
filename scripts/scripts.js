//inicio do backend do monitor de chamados
const chamados = []

const tempoLimite = 30 * 100 * 1000;

const aoExpirar = (chamado) => {
  alert(`Chamado expirou: ${chamado.id}!`)
}

const intv = setInterval(() => {
  for (let i = chamados.length - 1; i >= 0; i--) {
    const chamado = chamados[i];
    const idLinha = `chamado-${chamado.id}`;
    let linha = document.getElementById(idLinha);
    if (!linha) {
      linha = document.createElement('tr')
      linha.id = idLinha;
      for (let i = 0; i < 3; i++) {
        linha.appendChild(document.createElement("td"))
      }
      tbody.appendChild(linha)
    }
    const cels = document.querySelectorAll(`#${idLinha} > td`)
    const restante = msRestante(chamado.registro, new Date())
    cels[1].innerText = chamado.id;
    cels[2].innerText = fmtRestante(restante)

    if (restante <= 0) {
      // logica pra chamado expirado
      aoExpirar(chamado)
      chamados.splice(i, 1)
      linha.remove()
    }
  }
}, 1000)

const msRestante = (dtInicio, dtFim) => {
  return tempoLimite - (dtFim.getTime() - dtInicio.getTime());
}

const fmtRestante = (restante) => {
  const mins = Math.floor(restante / 60 / 1000);
  const segs = Math.floor(restante / 1000 % 60);
  return restante > 0 ?
    `${(mins + '').padStart(2, '0')}:${(segs + '').padStart(2, '0')}` :
    'Expirado!'
}

const input = document.querySelector("#input-adicionar")
const tbody = document.querySelector("#table-body")

document.querySelector('#btn-adicionar').addEventListener('click', () => {
  if (input.value
    && input.value.length
    && !chamados.find(x => x.id === input.value)) {
    chamados.push({ id: input.value, registro: new Date() })
  }
})

//fim do backend do monitor de chamados

//inicio do backend do gerador de texto pro email

const btn = document.getElementById("btn-gerartexto")

const radios = document.getElementsByName('gridRadios');

  let string;

 

  btn.addEventListener("click", function () {

    let inpnumerochamado = document.getElementById('nch').value;
    let inptelefonedousuario = document.getElementById('nusr').value;
    let inpdata = document.getElementById('dttn').value;
    let inphora = document.getElementById('htn').value;

    const div = document.getElementById("txtemail");


    inpdata = new Date();
    let inpdataFormatada = ((inpdata.getDate())) + "/" + ((inpdata.getMonth() + 1)) + "/" + inpdata.getFullYear();


    //Criando elemento paragrapho
    const paragrapho1 = document.createElement("p");
    const paragrapho2 = document.createElement("p");

    const imagem = document.createElement("img");

    const radios = document.getElementsByName('gridRadios');

    let string;

    let strgtent1;

    for (let i = 0; i < radios.length; i++) {
        if (radios[i].type === "radio") {
            if (radios[i].checked) {
                string = radios[i].value;
                break;
            }
        }
    }

    for (let i = 0; i < radios.length; i++) {
      if (radios[i].id === "gridRadios1", "gridRadios2") {
          if (radios[i].checked) {
            strgtent1 = "mais uma";
              
          }
      }

      if (radios[i].id === "gridRadios3") {
        if (radios[i].checked) {
          strgtent1 = "a última";
          break;
        }
    }
  }

    paragrapho1.innerText = `${inpnumerochamado} - `.concat(string).concat(`° aviso de tentativa de contato com o cliente
    Prezado Cliente,
    A equipe de Suporte Técnico Remoto informa que não obteve sucesso na `) .concat(string).concat(`ª tentativa de contato pelo(s) telefone(s) ${inptelefonedousuario} realizada no dia ${inpdataFormatada} às ${inphora} com o objetivo de iniciar o atendimento da ${inpnumerochamado}.
    Dessa forma, realizaremos ${strgtent1} tentativa de atendimento sem contato telefônico, aplicando procedimento técnico com o objetivo de solucionar a demanda do chamado sem que haja interferência na utilização do seu microcomputador.
    Eventualmente, poderá ser necessário autorização para acessar a sua área de trabalho. Se for o caso, enviaremos uma solicitação de acesso que aparecerá no centro do seu monitor, conforme janela apresentada abaixo:
    `)


    paragrapho2.innerText = `
    Neste caso, basta clicar no botão “ACCEPT”, para que o atendimento seja iniciado.
    Caso não seja possível atender diretamente a demanda sem contato telefônico ou caso não seja respondido ou não autorizado o acesso remoto, esta demanda será concluída sem o devido atendimento, sendo considerado como um chamado improdutivo.

    Atenciosamente,
    Warleyson Costa Roma `;

    imagem.src = "src/imgpoo.png";

    //imprimindo os dados na página html

    div.append(paragrapho1);

    div.append(imagem);

    div.append(paragrapho2);
});


//final do backend do gerador de texto pro email

