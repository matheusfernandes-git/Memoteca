import api from "./api.js";

const ui = {
  async renderThoughts() {
    const thoughtsList = document.getElementById("thoughts-list");
    try {
      const thoughts = await api.getThoughts();
      thoughts.forEach(ui.addThoughtToList);
    } catch (error) {
      alert("Erro ao renderizar pensamentos");
    }
  },

  addThoughtToList(thought) {
    const thoughtsList = document.getElementById("thoughts-list");
    const li = document.createElement("li");
    li.setAttribute("data-id", thought.id);
    li.classList.add("li-thought");

    const iconAspas = document.createElement("img");
    iconAspas.src = "assets/imagens/aspas-azuis.png";
    iconAspas.alt = "Aspas azuis";
    iconAspas.classList.add("icone-aspas");

    const thoughtContent = document.createElement("div");
    thoughtContent.textContent = thought.content;
    thoughtContent.classList.add("thought-content");

    const thoughtAutoria = document.createElement("div");
    thoughtAutoria.textContent = thought.autoria;
    thoughtAutoria.classList.add("thought-autoria");

    li.appendChild(iconAspas);
    li.appendChild(thoughtContent);
    li.appendChild(thoughtAutoria);
    thoughtsList.appendChild(li);
  },

  clearForm() {
    document.getElementById("thought-form").reset();
  }
};

export default ui;
