import api from "./api.js";

const ui = {
  async renderThoughts() {
    const thoughtsList = document.getElementById("lista-pensamentos");
    try {
      const thoughts = await api.getThoughts();
      thoughts.forEach((thought) => {
        thoughtsList.innerHTML += `
        <li class="li-pensamento" data-id="${thought.id}">
         <img src="assets/imagens/aspas-azuis.png" alt="Aspas azuis" class="icone-aspas">
         <div class="pensamento-conteudo">${thought.conteudo}</div>
         <div class="pensamento-autoria">${thought.autoria}</div>
        </li>
        `;
      });
    } catch (error) {
      alert("Erro ao renderizar pensamentos");
    }
  },
};

export default ui;
