// bundle-ignore
let PROJECT_ID = 'xbb6iszi';
let DATASET = 'production';
let QUERY = encodeURIComponent(`*[_type in ["home"]]{
  _type == "home" => {
    headline,
    firstSectionText,
  },
}`);

let URL = `https://${PROJECT_ID}.api.sanity.io/v2021-10-21/data/query/${DATASET}?query=${QUERY}`;

const headlineContainer = document.querySelector('#headline');

const firstSectionTextContainer = document.querySelector('#first-section-text');

// fetch the content
fetch(URL)
  .then((res) => res.json())
  .then(({ result }) => {
    const page = result[0];
    // Handle Page
    const headline = page.headline;
    headlineContainer.innerText = headline;

    sanityBlockContent(firstSectionTextContainer, page.firstSectionText);
  })
  .catch((err) => console.error(err));
