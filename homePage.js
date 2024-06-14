const containerCards = document.getElementById("containerCards");
// Funzione per creare una card
const creazioneCartaOggetto = function (elementoCard) {
  const colDiv = document.createElement("div");
  colDiv.className = "col-md-3";

  const cardDiv = document.createElement("div");
  cardDiv.className = "card mb-4 shadow-sm";

  const img = document.createElement("img");
  img.className = "bd-placeholder-img card-img-top object-fit-cover";
  img.src = elementoCard.imageUrl;
  img.classList.add("card-img-top");
  img.addEventListener("click", () => {
    window.location.assign(`./dettaglioProdotto.html?id=${elementoCard._id}`);
  });

  const cardBody = document.createElement("div");
  cardBody.className = "card-body";

  const cardTitle = document.createElement("h5");
  cardTitle.className = "card-title";
  cardTitle.textContent = elementoCard.name;

  const cardText = document.createElement("p");
  cardText.className = "card-text";
  cardText.textContent = elementoCard.description;

  const cardPrice = document.createElement("p");
  cardPrice.classList.add("card-text", "fw-bold", "text-primary");
  cardPrice.textContent = `Prezzo: ${elementoCard.price} EUR`;

  // Bottone per andare al Back Office con l'ID del prodotto
  const backButton = document.createElement("button");
  backButton.textContent = "Modifica";
  backButton.className = "btn btn-primary btn-sm mt-2";
  backButton.addEventListener("click", () => {
    window.location.assign(`./backOffice.html?id=${elementoCard._id}`);
  });

  // Aggiungi gli elementi creati alla struttura della carta
  cardBody.appendChild(cardTitle);
  cardBody.appendChild(cardText);
  cardBody.appendChild(cardPrice);
  cardBody.appendChild(backButton);
  cardDiv.appendChild(img);
  cardDiv.appendChild(cardBody);
  colDiv.appendChild(cardDiv);
  containerCards.appendChild(colDiv);
};

window.addEventListener("DOMContentLoaded", () => {
  fetch("https://striveschool-api.herokuapp.com/api/product/", {
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
        throw new Error("Errore nella creazione dell'oggetto");
      }
    })
    .then((caricamentoOggetto) => {
      caricamentoOggetto.forEach((elemento) => {
        creazioneCartaOggetto(elemento);
      });
    })
    .catch((err) => alert(err));
});
