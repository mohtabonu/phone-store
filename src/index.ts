import { phonesData } from './db';
import { boxesWrapper } from './elements';

document.addEventListener('DOMContentLoaded', function () {
  function createBox() {
    for (const key in phonesData) {
      if (phonesData.hasOwnProperty(key)) {
        const phone = phonesData[key as keyof typeof phonesData];

        const box = document.createElement('div');
        box.classList = 'flex w-full flex-col items-center overflow-hidden rounded-md bg-gray-300 pb-5';

        const img = document.createElement('img');
        img.setAttribute('src', `${phone.pictureLink}`);
        box.appendChild(img);

        const bottomWrapper = document.createElement('div');
        bottomWrapper.className = 'mt-4 flex w-full flex-col items-start px-3';
        bottomWrapper.innerHTML = `
        <h1 class="font-poppins text-[22px]">${phone.showName}</h1>
        <p class="mt-2 font-poppins text-[18px]">${phone.showPrice}</p>`;

        const buttonsWrapper = document.createElement('div');
        buttonsWrapper.className = 'mt-8 flex w-full items-center justify-between';
        buttonsWrapper.innerHTML = `
            <a href=""><button class="rounded-md bg-green-500 px-2 py-1 text-white" data-value=${phone.idName}>Information</button></a>
              ${phone.isAddedToCart? `<a href=""><button class="rounded-md bg-yellow-500 px-2 py-1 text-white">Retrieve</button></a>` :`<a href=""><button class="rounded-md bg-blue-500 px-2 py-1 text-white">Add to Cart</button></a>`}`;
        bottomWrapper.appendChild(buttonsWrapper);
        box.appendChild(bottomWrapper);
        boxesWrapper?.appendChild(box);
      }
    }
  }

  function init() {
    createBox();
  }

  init();
});
