//inicio do backend do monitor de chamados
const chamados = []
const input = document.querySelector("#input-adicionar")

let tempoLimite = 30 * 100 * 1000;

const aoExpirar = (chamado) => {
  alert(`Chamado expirou: ${chamado.id}!`)
}

const contagemRegressiva = (restante, chamado) =>{

 const intv = setInterval(() => {
    
    let idLinha = `chamado-${chamado.id}`
    let linha = document.getElementById(idLinha)
    if (!linha) {
      linha = document.createElement('tr')
      linha.id = idLinha;
      for (let i = 0; i < 3; i++) {
        linha.appendChild(document.createElement("td"))
      }
      tbody.appendChild(linha)
    }

    let cels = document.querySelectorAll(`#${idLinha} > td`)

    if (restante == 0) {
      clearInterval(intv)
      aoExpirar(chamado)
      linha.remove()
    }
      
    

    cels[0].innerText = chamado.id;
    cels[1].innerText = fmtRestante(restante)
    cels[2].innerHTML = '<button id="button'+chamado.id+'" class="btn btn-danger">Reiniciar Tempo</button>'
    document.querySelector('#button'+chamado.id+'').addEventListener('click', () => {
      clearInterval(intv)
      contagemRegressiva(3000000, chamado)
     })
  
  restante = restante - 1000
},1000)
}


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



const tbody = document.querySelector("#table-body")


document.querySelector('#btn-adicionar').addEventListener('click', () => {
 
      const listachamados = new Object()
      listachamados.id = input.value
      listachamados.registro = new Date()
      listachamados.intervalo = contagemRegressiva(3000000, listachamados)
      chamados.push(listachamados)
})

//fim do backend do monitor de chamados

//inicio do backend do gerador de texto pro email

const btn = document.getElementById("btn-gerartexto")
const btn2 = document.getElementById("btn-copiartexto")
//const btn3 = document.getElementById("btn-apagartexto")

btn.addEventListener("click", () => {

  const divtxt = document.getElementById("txtemail");
  const radios = document.getElementsByName('gridRadios');
  let inpnumerochamado = document.getElementById('nch').value;
  let inptelefonedousuario = document.getElementById('nusr').value;
  let inpdata = document.getElementById('dttn').value;
  let inphora = document.getElementById('htn').value;
  let string;


  //tratanto o formato que a data vai ser exibida no texto mediante o click no botão
  inpdata = new Date();
  let inpdataFormatada = ((inpdata.getDate())) + "/" + ((inpdata.getMonth() + 1)) + "/" + inpdata.getFullYear();

  //Criando elemento paragrapho
  const paragrapho1 = document.createElement("p");
  const paragrapho2 = document.createElement("p");
  const imagem = document.createElement("img");

  //lógica para os radio buttons exibirem o n° correspondente a tentativa de contato
  for (let i = 0; i < radios.length; i++) {
    if (radios[i].type === "radio") {
      if (radios[i].checked) {
        string = radios[i].value;
        break;
      }
    }
  }

  //lógica para os radio buttons exibirem mudarem uma parte do texto correspondente a tentativa de contato

  for (let i = 0; i < radios.length; i++) {

    if (radios[i].id === "gridRadios1", "gridRadios2") {
      if (radios[i].checked) {
        paragrapho1.innerText = `${inpnumerochamado} - `.concat(string).concat(`° aviso de tentativa de contato com o cliente
        Prezado Cliente,
        A equipe de Suporte Técnico Remoto informa que não obteve sucesso na `).concat(string).concat(`ª tentativa de contato pelo(s) telefone(s) ${inptelefonedousuario} realizada no dia ${inpdataFormatada} às ${inphora} com o objetivo de iniciar o atendimento da ${inpnumerochamado}.
        Dessa forma, realizaremos mais uma tentativa de atendimento sem contato telefônico, aplicando procedimento técnico com o objetivo de solucionar a demanda do chamado sem que haja interferência na utilização do seu microcomputador.
        Eventualmente, poderá ser necessário autorização para acessar a sua área de trabalho. Se for o caso, enviaremos uma solicitação de acesso que aparecerá no centro do seu monitor, conforme janela apresentada abaixo:
        `)


        paragrapho2.innerText = `
        Neste caso, basta clicar no botão “ACCEPT”, para que o atendimento seja iniciado.
        Caso não seja possível atender diretamente a demanda sem contato telefônico ou caso não seja respondido ou não autorizado o acesso remoto, esta demanda será concluída sem o devido atendimento, sendo considerado como um chamado improdutivo.

        Atenciosamente,
        Warleyson Costa Roma `;

        imagem.src = "src/imgpoo.png";

        divtxt.append(paragrapho1);
        divtxt.append(imagem);
        divtxt.append(paragrapho2);
        
      };
    };

    if (radios[i].id === "gridRadios3") {
      if (radios[i].checked) {
        paragrapho1.innerText = `${inpnumerochamado} - `.concat(string).concat(`° aviso de tentativa de contato com o cliente
        Prezado Cliente,
        A equipe de Suporte Técnico Remoto informa que não obteve sucesso na `).concat(string).concat(`ª tentativa de contato pelo(s) telefone(s) ${inptelefonedousuario} realizada no dia ${inpdataFormatada} às ${inphora} com o objetivo de iniciar o atendimento da ${inpnumerochamado}.
        Dessa forma, realizaremos a última tentativa de atendimento sem contato telefônico, aplicando procedimento técnico com o objetivo de solucionar a demanda do chamado sem que haja interferência na utilização do seu microcomputador.
        Eventualmente, poderá ser necessário autorização para acessar a sua área de trabalho. Se for o caso, enviaremos uma solicitação de acesso que aparecerá no centro do seu monitor, conforme janela apresentada abaixo:
        `)


        paragrapho2.innerText =`
        Neste caso, basta clicar no botão “ACCEPT”, para que o atendimento seja iniciado.
        Caso não seja possível atender diretamente a demanda sem contato telefônico ou caso não seja respondido ou não autorizado o acesso remoto, esta demanda será concluída sem o devido atendimento, sendo considerado como um chamado improdutivo.

        Atenciosamente,
        Warleyson Costa Roma `

      };
    };
  

    if (radios[i].id === "gridRadioschfch") {
      if (radios[i].checked) {
        paragrapho1.innerText = `${inpnumerochamado} - `.concat(` Chamado Fechado
        Prezado Cliente,
        
        A equipe de Suporte Técnico Remoto informa que após 3 tentativas de contato (por telefone e e-mail) para atendimento da ${inpnumerochamado}, não foi possível proceder com o atendimento do chamado, sendo concluído como improdutivo.

        Caso ainda necessite de suporte técnico, solicitamos registrar um novo chamado, uma vez que a reabertura desse será considerada indevida.

        Ressaltamos que a equipe de Suporte Técnico preza pela segurança das informações do usuário e por isso adota procedimentos relacionados as tentativas de contato e autorização de usuário para realização do atendimento.

        Com o objetivo de evitarmos outros chamados improdutivos, solicitamos que sejam informados outro(s) número(s) telefônico(s) (se possível, inclusive celular) para que possa ser facilmente encontrado. O(s) e-mail(s) permanecerá(ão) sendo enviado(s) como forma alternada de contato e localização. Desde já agradecemos a compreensão.

        Atenciosamente,
        Warleyson Costa Roma`)

      
        paragrapho2.parentNode.removeChild(paragrapho2);
        imagem.parentNode.removeChild(imagem);
      };
    };
  };

  /**
  Texto padrão para 1°,2° e 3° tentativas de contato.
    
  paragrapho1.innerText = `${inpnumerochamado} - `.concat(string).concat(`° aviso de tentativa de contato com o cliente
    Prezado Cliente,
    A equipe de Suporte Técnico Remoto informa que não obteve sucesso na `).concat(string).concat(`ª tentativa de contato pelo(s) telefone(s) ${inptelefonedousuario} realizada no dia ${inpdataFormatada} às ${inphora} com o objetivo de iniciar o atendimento da ${inpnumerochamado}.
    Dessa forma, realizaremos ${strgtent1} tentativa de atendimento sem contato telefônico, aplicando procedimento técnico com o objetivo de solucionar a demanda do chamado sem que haja interferência na utilização do seu microcomputador.
    Eventualmente, poderá ser necessário autorização para acessar a sua área de trabalho. Se for o caso, enviaremos uma solicitação de acesso que aparecerá no centro do seu monitor, conforme janela apresentada abaixo:
    `)


  paragrapho2.innerText = `
    Neste caso, basta clicar no botão “ACCEPT”, para que o atendimento seja iniciado.
    Caso não seja possível atender diretamente a demanda sem contato telefônico ou caso não seja respondido ou não autorizado o acesso remoto, esta demanda será concluída sem o devido atendimento, sendo considerado como um chamado improdutivo.

    Atenciosamente,
    Warleyson Costa Roma `;

  imagem.src = "src/imgpoo.png";

  divtxt.append(paragrapho1);
  divtxt.append(imagem);
  divtxt.append(paragrapho2);

  //console.log(divtxt);
  */

  //lógica para botão copiar texto
  btn2.addEventListener("click", () => {
    //let mstnumch = inpnumerochamado;
    let copytxt = divtxt.innerText;
    navigator.clipboard.writeText(copytxt).then(() => {

      //alert(`Chamado n° ${mstnumch} copiado para area de transferencia!`);
    });

  });

  //lógica para botão apagar texto
  document.getElementById('infs').onreset = () => {
    let clrtext = divtxt;
    clrtext.innerText = "";
    //return confirm("Gostaria de apagar todas as informações?");
  };

});


//final do backend do gerador de texto pro email

