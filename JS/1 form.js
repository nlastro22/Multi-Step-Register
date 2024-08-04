const button1 = document.querySelector("button");
const inputs = document.querySelectorAll("input");
const h1 = document.querySelector("h1");
const labels = document.querySelectorAll("label");
const form = document.querySelector("form");

button1.addEventListener("click", (e) => {
  e.preventDefault();
  let ispunjen = true;
  let inputText = [];

  inputs.forEach((input) => {
    if (input.value.trim() === "") {
      ispunjen = false;
    } else {
      inputText.push(input.value.trim());
    }
  });

  if (!ispunjen) {
    if (!form.querySelector("p")) {
      const par = document.createElement("p");
      par.classList.add("error");
      par.innerText = "Please fill all inputs";
      button1.insertAdjacentElement("beforebegin", par);
    }
  } else {
    const stepNum = document.querySelector("#stepNum");
    stepNum.textContent = "2";
    const dot2 = document.querySelector("#dot2");
    dot2.classList.add("active");
    const dot1 = document.querySelector("#dot1");
    dot1.classList.remove("active");
    const existPar = document.querySelector(".error");
    if (existPar) {
      existPar.remove();
    }
    h1.innerHTML = "What topics are you interested in?";
    inputs.forEach((input) => input.remove());
    labels.forEach((label) => label.remove());

    //kreiramo tri gumba
    const select1 = document.createElement("button");
    const select2 = document.createElement("button");
    const select3 = document.createElement("button");

    //dodamo gumbima klasu
    select1.classList.add("select");
    select2.classList.add("select");
    select3.classList.add("select");

    //dodamo gumbima tekst
    select1.textContent = "Software Development";
    select2.textContent = "User Experience";
    select3.textContent = "Graphic Design";

    //dodamo gumbe na formu
    form.appendChild(select1);
    form.appendChild(select2);
    form.appendChild(select3);

    //oznacimo da je opcija odabrana
    select1.addEventListener("click", (e) => {
      e.preventDefault();
      select1.classList.toggle("clicked");
    });

    select2.addEventListener("click", (e) => {
      e.preventDefault();
      select2.classList.toggle("clicked");
    });

    select3.addEventListener("click", (e) => {
      e.preventDefault();
      select3.classList.toggle("clicked");
    });

    //kreiramo gumb continue za sljedeci(2.) korak
    button1.remove();
    const button2 = document.createElement("button");
    button2.textContent = "Continue";
    form.appendChild(button2);

    button2.addEventListener("click", (e) => {
      e.preventDefault();
      stepNum.textContent = "3";
      //ako nije ni jedan gumb kliknut ne moze se nastaviti
      if (
        !select1.classList.contains("clicked") &&
        !select2.classList.contains("clicked") &&
        !select2.classList.contains("clicked")
      ) {
        //provjerava se postoji li poruka greske na formi, da se ne bi stavarala vise puta
        if (!form.querySelector("p")) {
          const par = document.createElement("p");
          par.classList.add("error");
          par.textContent = "Please choose at least one of the options!";
          button2.insertAdjacentElement("beforebegin", par);
        }
      }

      //ako je barem jedna opcija kliknuta moze se nastavit
      else {
        const dot3 = document.querySelector("#dot3");
        dot3.classList.add("active");
        const dot2 = document.querySelector("#dot2");
        dot2.classList.remove("active");

        let topics = [];
        if (select1.classList.contains("clicked")) {
          topics.push(select1.innerText);
        }
        if (select2.classList.contains("clicked")) {
          topics.push(select2.innerText);
        }
        if (select3.classList.contains("clicked")) {
          topics.push(select3.innerText);
        }
        button2.remove();
        const existP = document.querySelector(".error");
        if (existP) {
          existP.remove();
        }
        select1.remove();
        select2.remove();
        select3.remove();
        h1.innerText = "Summary";

        const emailLabel = document.createElement("span");
        const nameLabel = document.createElement("span");
        const emailValue = document.createElement("span");
        const nameValue = document.createElement("span");

        const nameP = document.createElement("p");
        const emailP = document.createElement("p");

        emailLabel.textContent = "Email: ";
        nameLabel.textContent = "Name: ";
        nameValue.textContent = inputText[0];
        emailValue.textContent = inputText[1];

        emailLabel.classList.add("oznaka");
        nameLabel.classList.add("oznaka");
        emailValue.classList.add("vrijednost");
        nameValue.classList.add("vrijednost");

        nameP.appendChild(nameLabel);
        nameP.appendChild(nameValue);

        emailP.appendChild(emailLabel);
        emailP.appendChild(emailValue);

        form.appendChild(nameP);
        form.appendChild(emailP);
        const ul = document.createElement("ul");
        const span = document.createElement("span");
        span.classList.add("topics");
        span.innerText = "Topics:";
        form.appendChild(span);
        for (let i = 0; i < topics.length; i++) {
          const topic = document.createElement("li");
          topic.innerText = topics[i];
          ul.appendChild(topic);
        }
        form.appendChild(ul);
        const button3 = document.createElement("button");
        button3.innerText = "Confirm";
        form.appendChild(button3);
        button3.addEventListener("click", () => {
          alert("Success");
        });
      }
    });
  }
});
