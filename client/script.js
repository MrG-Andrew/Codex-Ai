import bot from "./assets/bot.svg";
import user from "./assets/user.svg";

const form = document.querySelector("form");
const chatContainer = document.querySelector("#chat-container");

let loadInterval;

const loader = (ele) => {
  ele.textContent = "";
  loadInterval = setInterval(() => {
    ele.textContent += ".";
    if (ele.textContent === "....") ele.textContent = "";
  }, 300);
};

const botTyping = (ele, text) => {
  let i = 0;
  let interval = setInterval(() => {
    if (i < text.length) {
      ele.innerHtml += text.charAt(i);
      i++;
    } else {
      clearInterval(interval);
    }
  }, 20);
};

const generateId = () => {
  const id = crypto.randomUUID();
  return `id-${id}`;
};

const chatStrip = (isAi, value, id) => {
  return `<div class="wrapper ${isAi && "ai"}">
      <div class="chat">
        <div class="profile">
          <img src="${isAi ? bot : user}" alt="${isAi ? "bot" : "user"}" />
        </div>
        <div class = "message" id =${id}>${value}</div>
      </div>
    </div>`;
};

const handleSubmit = async (e) => {
  e.preventDefault();

  const data = new FormData(form);
  //user Chat Strip
  chatContainer.innerHTML += chatStrip(false, data.get("prompt"));
  form.reset();

  //bot chat strip
  const id = generateId();
  chatContainer.innerHTML += chatStrip(true, "", id);
  chatContainer.scrollTop = chatContainer.scrollHeight;
  const messageDiv = document.getElementById(id);
  loader(messageDiv);
};

form.addEventListener("submit", handleSubmit);
form.addEventListener("keyup", (e) => {
  if (e.key === "Enter") handleSubmit(e);
});
