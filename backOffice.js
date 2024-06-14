/* ottengo id se presente */
const id = new URLSearchParams(window.location.search).get("id");

console.log("RESOURCE ID:", id);

const URL = id
  ? `https://striveschool-api.herokuapp.com/api/product/${id}`
  : "https://striveschool-api.herokuapp.com/api/product/";
const method = id ? "PUT" : "POST";
/// Funzione per mostrare il modale di conferma
const showConfirmModal = (callback) => {
  const confirmModal = new bootstrap.Modal(
    document.getElementById("confirmModal")
  );
  confirmModal.show();
  document
    .getElementById("confirmActionButton")
    .addEventListener("click", () => {
      confirmModal.hide();
      callback();
    });
};

if (id) {
  fetch(URL, {
    method: method,
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjZiZmUyODdjMjM5YzAwMTUyZjRiNmEiLCJpYXQiOjE3MTgzNTM0NDgsImV4cCI6MTcxOTU2MzA0OH0.xGdnQ1T9IoQg2pS54zUqxNoi7hCNVWkBJFYRR2mFvM8",
    },
  })
    .then((resp) => {
      if (resp.ok) {
        return resp.json();
      } else {
        throw new Error("Errore nel caricamento dell'oggetto");
      }
    })
    .then((articoloObj) => {
      const { name, description, brand, imageUrl, price } = articoloObj;

      // Precompilazione dei campi del form
      document.getElementById("inputName").value = name;
      document.getElementById("inputDescrizione").value = description;
      document.getElementById("inputBrand").value = brand;
      document.getElementById("inputImageUrl").value = imageUrl;
      document.getElementById("inputPrezzo").value = price;
      // Cambio il testo del bottone di submit in "Modifica"
      const submitButton = document.getElementById("submitButton");
      submitButton.textContent = "Modifica";
      submitButton.classList.remove("btn-success");
      submitButton.classList.add("btn-info");
      // Nascondo il bottone di reset
      document.getElementById("resetButton").style.display = "none";
      /* Aggiungo il bottone per elimina */
      const bottoneElimina = document.createElement("button");
      bottoneElimina.textContent = "Elimina";
      bottoneElimina.className = "btn btn-danger ml-2";
      bottoneElimina.addEventListener("click", () => {
        const eliminaOggetto = () => {
          fetch(URL, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjZiZmUyODdjMjM5YzAwMTUyZjRiNmEiLCJpYXQiOjE3MTgzNTM0NDgsImV4cCI6MTcxOTU2MzA0OH0.xGdnQ1T9IoQg2pS54zUqxNoi7hCNVWkBJFYRR2mFvM8",
            },
          })
            .then((resp) => {
              if (resp.ok) {
                console.log("Oggetto eliminato con successo");
              } else {
                throw new Error("Errore durante l'eliminazione dell'oggetto");
              }
            })
            .catch((err) => {
              console.error("Errore durante l'eliminazione dell'oggetto:", err);
            });
        };
        showConfirmModal(eliminaOggetto);
      });
      form.appendChild(bottoneElimina);
    })
    .catch((err) => console.log(err));
}
const form = document.getElementById("FormIdOggetto");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  showConfirmModal(() => {
    const newArticle = {
      name: document.getElementById("inputName").value,
      description: document.getElementById("inputDescrizione").value,
      brand: document.getElementById("inputBrand").value,
      imageUrl: document.getElementById("inputImageUrl").value,
      price: document.getElementById("inputPrezzo").value,
    };

    fetch(URL, {
      method: method,
      body: JSON.stringify(newArticle),
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjZiZmUyODdjMjM5YzAwMTUyZjRiNmEiLCJpYXQiOjE3MTgzNTM0NDgsImV4cCI6MTcxOTU2MzA0OH0.xGdnQ1T9IoQg2pS54zUqxNoi7hCNVWkBJFYRR2mFvM8",
      },
    })
      .then((resp) => {
        if (resp.ok) {
          console.log("Oggetto caricato con successo");
          resetForm();
        } else {
          throw new Error("Errore durante la modifica dell'oggetto");
        }
      })
      .catch((err) => {
        console.error("Errore durante la modifica dell'oggetto:", err);
      });
  });
});

const resetForm = () => {
  document.getElementById("inputName").value = "";
  document.getElementById("inputDescrizione").value = "";
  document.getElementById("inputBrand").value = "";
  document.getElementById("inputImageUrl").value = "";
  document.getElementById("inputPrezzo").value = "";
};

const resetButton = document.getElementById("resetButton");
resetButton.addEventListener("click", () => {
  showConfirmModal(() => {
    resetForm();
  });
});
