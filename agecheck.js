
// POP UP MAIOR IDADE
document.addEventListener("DOMContentLoaded", function () {
    // Verifica se o usuário já respondeu à pergunta
    const ageCheck = localStorage.getItem("ageVerified");
  
    // Se o usuário não respondeu, mostra o pop-up
    if (!ageCheck) {
      const popup = document.createElement("div");
      popup.style.position = "fixed";
      popup.style.top = "0";
      popup.style.left = "0";
      popup.style.width = "100%";
      popup.style.height = "100%";
      popup.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
      popup.style.zIndex = "9999";
      popup.style.display = "flex";
      popup.style.flexDirection = "column";
      popup.style.justifyContent = "center";
      popup.style.alignItems = "center";
      popup.style.color = "white";
      popup.style.fontSize = "18px";
  
      popup.innerHTML = `
        <div style="text-align: center; max-width: 100%; background-color:rgb(133, 133, 133); padding: 20px; border-radius: 10px;">
      <h2>Você é maior de idade?</h2>
      <p>Este site é restrito para maiores de 18 anos.</p>
      <div style="margin-top: 20px;">
        <button id="yesButton" style="margin-right: 10px; padding: 10px 20px; font-size: 16px; background-color: rgb(95, 95, 95); color: white; border: none; border-radius: 5px; cursor: pointer;">Sim</button>
        <button id="noButton" style="padding: 10px 20px; font-size: 16px; background-color: rgb(95, 95, 95); color: white; border: none; border-radius: 5px; cursor: pointer;">Não</button>
      </div>
    </div>
      `;
  
      document.body.appendChild(popup);
  
      // Botão "Sim" - Fecha o pop-up e salva a escolha no localStorage
      document.getElementById("yesButton").addEventListener("click", function () {
        localStorage.setItem("ageVerified", "true");
        popup.remove();
      });
  
      // Botão "Não" - Redireciona para o Google
      document.getElementById("noButton").addEventListener("click", function () {
        window.location.href = "https://www.google.com";
      });
    }
  });
  