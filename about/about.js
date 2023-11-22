// bundle-ignore
let PROJECT_ID = 'xbb6iszi';
let DATASET = 'production';
let QUERY = encodeURIComponent(`*[_type in ["about"]]{
  _type == "about" => {
    firstSectionHeadline,
    firstSectionText,
  },
}`);

let URL = `https://${PROJECT_ID}.api.sanity.io/v2021-10-21/data/query/${DATASET}?query=${QUERY}`;

const headlineContainer = document.querySelector('#first-section-headline');

const firstSectionTextContainer = document.querySelector('#first-section-text');

// fetch the content
fetch(URL)
  .then((res) => res.json())
  .then(({ result }) => {
    const page = result[0];
    console.log(page);
    // Handle Page
    const firstSectionHeadline = page.firstSectionHeadline;
    headlineContainer.innerText = firstSectionHeadline;

    sanityBlockContent(firstSectionTextContainer, page.firstSectionText);
  })
  .catch((err) => console.error(err));
