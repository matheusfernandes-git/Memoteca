import api from "./api.js";

const ui = {
  async fillForm(thoughtId) {
    const thought = await api.getThoughtByid(thoughtId);
    document.getElementById("thought-id").value = thought.id;
    document.getElementById("thought-content").value = thought.content;
    document.getElementById("thought-autoria").value = thought.autoria;
    document.getElementById("thought-h2").textContent = "Edite o pensamento";
  },

  async renderThoughts() {
    const thoughtsList = document.getElementById("thoughts-list");
    const emptyList = document.getElementById("empty-list");
    thoughtsList.innerHTML = "";

    try {
      const thoughts = await api.getThoughts();
      thoughts.forEach(ui.addThoughtToList);
      if (thoughts.length === 0) {
        emptyList.style.display = "block";
      } else {
        emptyList.style.display = "none";
      }
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

    const editButton = document.createElement("button");
    editButton.classList.add("edit-button");
    editButton.onclick = () => ui.fillForm(thought.id);

    const editIcon = document.createElement("img");
    editIcon.src = "assets/imagens/icone-editar.png";
    editIcon.alt = "Editar";
    editIcon.classList.add("edit-icon");
    editButton.appendChild(editIcon);

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-button");
    deleteButton.onclick = async () => {
      try {
        await api.deleteThought(thought.id);
        ui.renderThoughts();
      } catch (error) {
        alert("Erro ao excluir pensamento");
      }
    };

    const deleteIcon = document.createElement("img");
    deleteIcon.src = "assets/imagens/icone-excluir.png";
    deleteIcon.alt = "Deletar";
    deleteIcon.classList.add("delete-icon");
    deleteButton.appendChild(deleteIcon);

    const icons = document.createElement("div");
    icons.classList.add("icons");
    icons.appendChild(editButton);
    icons.appendChild(deleteButton);

    li.appendChild(iconAspas);
    li.appendChild(thoughtContent);
    li.appendChild(thoughtAutoria);
    li.appendChild(icons);
    thoughtsList.appendChild(li);
  },

  clearForm() {
    document.getElementById("thought-form").reset();
  },
};

export default ui;
