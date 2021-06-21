const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

function removeClassNone(element) {
  element.classList.toggle('d-none')
}
function addClassNone(element) {
  element.classList.add('d-none')
}

$$('#icon-item-friend').forEach(element => {
  element.addEventListener('click', (event) => {
    // show list action
    removeClassNone(event.target.parentElement.querySelector('.list-action'))

  })
});