// bundle-ignore
let PROJECT_ID = 'xbb6iszi';
let DATASET = 'production';
let QUERY = encodeURIComponent(`*[_type in ["home", "galleryImage"]]{
  _type == "home" => {
    headline,
    firstSectionText,
  },
  _type == "galleryImage" => {
    "alt": image.alt,
    "src": image.asset->url,
    featured,
  }
}`);

let URL = `https://${PROJECT_ID}.api.sanity.io/v2021-10-21/data/query/${DATASET}?query=${QUERY}`;

const headlineContainer = document.querySelector('#headline');

const firstSectionTextContainer = document.querySelector('#first-section-text');

const imageContainer = document.querySelector('#image-container');
const imageModalImg = document.querySelector('#img');
const imageModal = document.querySelector('#imageModal');

function animateOut() {
  imageModal.classList.add('modal-out');
  imageModalImg.classList.add('out');
  setTimeout(function () {
    imageModal.classList.remove('active');
    imageModal.classList.remove('modal-out');
    imageModalImg.classList.remove('out');
  }, 400);
}

// Handle the image modal
imageModal.onclick = animateOut;

// fetch the content
fetch(URL)
  .then((res) => res.json())
  .then(({ result }) => {
    const page = result.find((element) => !element.alt);
    const images = result.filter((element) => !!element.alt);

    // Handle Page
    const headline = page.headline;
    headlineContainer.innerText = headline;

    sanityBlockContent(firstSectionTextContainer, page.firstSectionText);

    // Handle Images
    imageContainer.innerHTML = '';
    images
      .filter((image) => !!image.featured)
      .forEach((resultImage) => {
        const button = document.createElement('button');
        const image = document.createElement('img');
        image.src = resultImage.src;
        image.alt = resultImage.alt;
        image.title = resultImage.alt;
        function onInteract() {
          if (imageModal.classList.contains('active')) {
            animateOut();
          } else {
            imageModal.classList.add('active');
            imageModalImg.src = image.src;
            imageModalImg.alt = image.alt;
          }
        }
        button.classList.add('image-button');
        button.onclick = onInteract;
        button.appendChild(image);
        imageContainer.appendChild(button);
      });
  })
  .catch((err) => console.error(err));
