// index.js

// Callbacks
const handleClick = (ramen) => {
  // Add code
  const detailImage = document.querySelector('.detail-image');
  const name = document.querySelector('.name');
  const restaurant = document.querySelector('.restaurant');
  const ratingDisplay = document.querySelector('#rating-display');
  const commentDisplay = document.querySelector('#comment-display');

  if (detailImage && name && restaurant && ratingDisplay && commentDisplay) {
    detailImage.src = ramen.image;
    detailImage.alt = ramen.image;
    name.textContent = ramen.name;
    restaurant.textContent = ramen.restaurant;
    ratingDisplay.textContent = ramen.rating;
    commentDisplay.textContent = ramen.comment;
  }
};

const addSubmitListener = () => {
  // Add code
  const form = document.querySelector('#new-ramen');
  if (form) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      
      const newRamen = {
        name: document.querySelector('#new-name').value,
        restaurant: document.querySelector('#new-restaurant').value,
        image: document.querySelector('#new-image').value,
        rating: document.querySelector('#new-rating').value,
        comment: document.querySelector('#new-comment').value,

      };

      displayNewRamen(newRamen);
      form.reset();
    });
  }
};

const displayRamens = () => {
  // Add code
  fetch('http://localhost:3000/ramens')
    .then(response => response.json())
    .then(ramens => {
      const ramenMenu = document.querySelector('#ramen-menu');
      if (ramenMenu) {
        ramenMenu.innerHTML = ''; //to clear existing ramens
        ramens.forEach(ramen => {
          const ramenContainer = document.createElement('div');
          ramenContainer.classList.add('ramen-item');

          const img = document.createElement('img');
          img.src = ramen.image;
          img.alt = ramen.name;
          img.addEventListener('click', () => handleClick(ramen));

          const deleteButton = document.createElement('button');
          deleteButton.textContent = 'Delete';
          deleteButton.addEventListener('click', () => deleteRamen(ramenContainer, ramen));

          ramenContainer.appendChild(img);
          ramenContainer.appendChild(deleteButton);
          ramenMenu.appendChild(ramenContainer);
        });

        if (ramens.length > 0) {
          handleClick(ramens[0]);
        }
      }
    });
};

const displayNewRamen = (ramen) => {
  const ramenMenu = document.querySelector('#ramen-menu');
  if (ramenMenu) {
    const ramenContainer = document.createElement('div');
    ramenContainer.classList.add('ramen-item');

    const img = document.createElement('img');
    img.src = ramen.image;
    img.alt = ramen.image;
    img.addEventListener('click', () => handleClick(ramen));

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => deleteRamen(ramenContainer, ramen));


    ramenMenu.appendChild(img);
    ramenContainer.appendChild(deleteButton);
    ramenMenu.appendChild(ramenContainer);

  }
};

const deleteRamen = (ramenContainer, ramen) => {
  const ramenMenu = document.querySelector('#ramen-menu');
  const ramenDetail = document.querySelector('ramen-detail');
  const detailImage = document.querySelector('.detail-image');

  // Remove the ramen from the menu
  ramenMenu.removeChild(ramenContainer);

  if (detailImage && detailImage.src === ramen.image) {
    ramenDetail.innerHTML = `
      <img class="detail-image" src="./assets/image-placeholder.jpg" alt="Insert Name Here" />
      <h2 class="name">Insert Name Here</h2>
      <h3 class="restaurant">Insert Restaurant Here</h3>
    `;
    document.querySelector('#rating-display').textContent = 'Insert rating here';
    document.querySelector('#comment-display').textContent = 'Insert comment here';
  }
};

const main = () => {
  // Invoke displayRamens here
  // Invoke addSubmitListener here
  document.addEventListener('DOMContentLoaded', () => {
    displayRamens();
    addSubmitListener();
  });
};

main();

// Export functions for testing
export {
  displayRamens,
  addSubmitListener,
  handleClick,
  main,
  deleteRamen,
};
