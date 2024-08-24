const api = {
  async getThoughts() {
    try {
      const response = await fetch("http://localhost:3000/pensamentos");
      return await response.json();
    } catch (error) {
      alert("Erro ao buscar pensamentos");
      throw error;
    }
  },

  async saveThoughts(thought) {
    try {
      const response = await fetch("http://localhost:3000/pensamentos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(thought),
      });
      return await response.json();
    } catch (error) {
      alert("Erro ao buscar pensamentos");
      throw error;
    }
  },
};

export default api;
