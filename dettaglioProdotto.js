const id = new URLSearchParams(window.location.search).get("id");

window.addEventListener("DOMContentLoaded", function () {
  fetch("https://striveschool-api.herokuapp.com/api/product/" + id, {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjZiZmUyODdjMjM5YzAwMTUyZjRiNmEiLCJpYXQiOjE3MTgzNTM0NDgsImV4cCI6MTcxOTU2MzA0OH0.xGdnQ1T9IoQg2pS54zUqxNoi7hCNVWkBJFYRR2mFvM8",
    },
  })
    .then((resp) => {
      if (resp.ok) {
        return resp.json();
      } else {
        throw `Errore ${resp.status} : errore nella creazione del prodotto`;
      }
    })
    .then((prodotto) => {
      const container = document.getElementById("dettagli-prodotto");

      container.innerHTML = "";
      const col = this.document.createElement("div");
      col.className = "col ";

      const img = document.createElement("img");
      img.src = prodotto.imageUrl;
      img.className = "object-fit-cover my-3 w-100 border border-info";
      img.setAttribute("height", "700");
      const h2 = document.createElement("h2");
      h2.innerText = prodotto.brand + " " + prodotto.name;
      const price = document.createElement("p");
      price.innerText = prodotto.price + " €";
      price.className = "text-info fs-3 fw-bold";
      const description = document.createElement("p");
      description.innerText = prodotto.description;
      description.className = " fs-5 fw-bold";
      const modifica = document.createElement("a");
      modifica.innerText = "Modifica";
      modifica.className = "btn  btn-info fs-5 my-3 ";
      modifica.addEventListener("click", handleEditBtnClick);
      col.append(img, h2, price, description, modifica);
      container.append(col);
    })
    .catch((err) => alert(err));
});

const handleEditBtnClick = () => {
  window.location.assign(`./backOffice.html?id=${id}`);
};
