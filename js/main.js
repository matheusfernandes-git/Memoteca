import ui from "./ui.js";
import api from "./api.js";

document.addEventListener("DOMContentLoaded", () => {
  ui.renderThoughts();

  const thoughtForm = document.getElementById("thought-form");
  const cancelBtn = document.getElementById("cancel-button");
  thoughtForm.addEventListener("submit", submitForm);
  cancelBtn.addEventListener("click", handleCancel);
});

function handleCancel() {
  ui.clearForm();
}

async function submitForm(event) {
  event.preventDefault();
  const id = document.getElementById("thought-id").value;
  const content = document.getElementById("thought-content").value;
  const autoria = document.getElementById("thought-autoria").value;

  try {
    if (id) {
      await api.editThought({ id, content, autoria });
    } else {
      await api.saveThoughts({ content, autoria });
    }
    ui.renderThoughts();
  } catch (error) {
    alert("Erro ao salvar pensamento");
  }
}
