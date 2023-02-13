console.log(`Client side javascript file is loaded!`);

fetch(`https://puzzle.mead.io/puzzle`).then((response) => {
  response.json().then((data) => {
    console.log(data);
  });
});
// fetch(`http://localhost:3000/weather?address=chiniot`).then((response) => {
//   response.json().then((data) => {
//     if (data.error) {
//       console.log(`Error`);
//     } else {
//       console.log(data);
//     }
//   });
// });
const weatherForm = document.querySelector(`form`);
const search = document.querySelector(`input`);
const messageOne = document.querySelector(`#message-1`);
const messageTwo = document.querySelector(`#message-2`);
const emptyInput = document.querySelector(`#msg-location`);

weatherForm.addEventListener(`submit`, (e) => {
  const location = search.value;
  if (location.length === 0) {
    return (emptyInput.textContent = `Location cant be empty`);
  } else {
    messageOne.textContent = `Loading`;
    messageTwo.textContent = ``;
    e.preventDefault();

    fetch(`http://localhost:3000/weather?address=${location}`).then(
      (response) => {
        response.json().then((data) => {
          if (data.error) {
            messageOne.textContent = data.error;
          } else {
            // messageOne.textContent = ``data.weather``;
            messageOne.textContent = `Done`;
            messageTwo.textContent = data.weather;
          }
        });
      }
    );
  }
  // console.log(location);
});
