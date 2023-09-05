import { galleryItems } from "./gallery-items.js";
// Change code below this line

console.log(galleryItems);

function partsGallery(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `
        <li class="gallery__item">
            <a class="gallery__link" href="${original}">
                <img
                    class="gallery__image"
                    src="${preview}"
                    data-source="${original}"
                    alt="${description}"
                />
            </a>
        </li>
        `;
    })
    .join("");
}

const ul = document.querySelector(".gallery");
const markup = partsGallery(galleryItems);

ul.insertAdjacentHTML("beforeend", markup);

let instance = null;
ul.addEventListener("click", (event) => {
  event.preventDefault();
  if (event.target.classList.contains("gallery__image")) {
    const imageSource = event.target.dataset.source;
    instance = basicLightbox.create(
      `
      <img src="${imageSource}" width="800" height="600">
      `,
      {
        onShow: () => {
          window.addEventListener("keydown", handleKeyPress);
        },
        onClose: () => {
          window.removeEventListener("keydown", handleKeyPress);
        },
      }
    );
    instance.show();
  }
});
function handleKeyPress(event) {
  if (event.key === "Escape") {
    instance.close();
  }
}
