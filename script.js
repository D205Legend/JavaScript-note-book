function eventHandler(event) {
  event.target.classList.toggle('complete');
}

choresList.onclick = eventHandler;

