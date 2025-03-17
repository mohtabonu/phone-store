import { phonesData } from './db';
import { boxesWrapper, cartContainer, infoContainer, logo, mainContainer } from './elements';

document.addEventListener('DOMContentLoaded', function () {
  function createBox() {
    for (const key in phonesData) {
      if (phonesData.hasOwnProperty(key)) {
        const phone = phonesData[key as keyof typeof phonesData];

        const box = document.createElement('div');
        box.className = 'flex flex-col items-center w-full pb-5 overflow-hidden bg-gray-300 rounded-md';

        const img = document.createElement('img');
        img.setAttribute('src', `${phone.pictureLink}`);
        box.appendChild(img);

        const bottomWrapper = document.createElement('div');
        bottomWrapper.className = 'flex flex-col items-start w-full px-3 mt-4';
        bottomWrapper.innerHTML = `
        <h1 class="font-poppins text-[22px]">${phone.showName}</h1>
        <p class="mt-2 font-poppins text-[18px]">${phone.showPrice}</p>`;

        const buttonsWrapper = document.createElement('div');
        buttonsWrapper.className = 'flex items-center justify-between w-full mt-8';
        buttonsWrapper.innerHTML = `
            <button class="information-btn rounded-md bg-green-500 px-2 py-1 text-white" data-value=${phone.idName}>Information</button>
              ${phone.isAddedToCart ? `<a href=""><button class="rounded-md bg-yellow-500 px-2 py-1 text-white">In Cart</button></a>` : `<a href=""><button class="rounded-md bg-blue-500 px-2 py-1 text-white" data-value=${phone.idName}>Add to Cart</button></a>`}`;
        bottomWrapper.appendChild(buttonsWrapper);
        box.appendChild(bottomWrapper);
        boxesWrapper?.appendChild(box);
      }
    }
  }

  function showOnlyContainer(targetContainer: HTMLDivElement) {
    const containers = [mainContainer, infoContainer, cartContainer];
    containers.forEach(container => {
      if (container === targetContainer) {
        container.classList.remove('hidden');
        container.classList.add('flex');
      } else {
        container.classList.remove('flex');
        container.classList.add('hidden');
      }
    });
  }

  logo.addEventListener('click', () => showOnlyContainer(mainContainer));

  function addToCartHandler() {
    const addToCartButtons = document.querySelectorAll('.bg-blue-500');

    addToCartButtons.forEach(btn => {
      btn.addEventListener('click', e => {
        e.preventDefault();
        const button = e.target as HTMLButtonElement;
        const key = button.dataset.value!;

        if (phonesData.hasOwnProperty(key)) {
          phonesData[key as keyof typeof phonesData].isAddedToCart = true;

          boxesWrapper.innerHTML = '';
          createBox();

          renderCart();
        }
      });
    });
  }

  function renderCart() {
    cartContainer.innerHTML = `<h1 class="text-3xl text-center">Your Cart</h1>`;
    for (const key in phonesData) {
      if (phonesData[key as keyof typeof phonesData].isAddedToCart) {
        const phone = phonesData[key as keyof typeof phonesData];

        cartContainer.innerHTML += `
          <div class="flex items-center justify-between border-b py-4 px-6">
            <img src="${phone.pictureLink}" class="w-20 h-20">
            <h2>${phone.showName}</h2>
            <p>${phone.showPrice}</p>
            <button class="remove-from-cart bg-red-500 text-white px-4 py-2 rounded" data-value="${phone.idName}">Remove</button>
          </div>
        `;
      }
    }

    removeFromCartHandler();
  }

  function removeFromCartHandler() {
    const removeButtons = document.querySelectorAll('.remove-from-cart');

    removeButtons.forEach(btn => {
      btn.addEventListener('click', e => {
        const button = e.target as HTMLButtonElement;
        const key = button.dataset.value!;

        if (phonesData.hasOwnProperty(key)) {
          phonesData[key as keyof typeof phonesData].isAddedToCart = false;

          renderCart();
          if (boxesWrapper) {
            boxesWrapper.innerHTML = '';
          }
          createBox();
        }
      });
    });
  }

  function renderInformation() {
    const informationBtn = document.querySelectorAll('.information-btn');
    informationBtn.forEach(btn => {
      btn?.addEventListener('click', e => {
        showOnlyContainer(infoContainer);

        const button = e.target as HTMLButtonElement;
        let key: string = button.dataset.value!;
        if (phonesData.hasOwnProperty(key)) {
          const phone = phonesData[key as keyof typeof phonesData];
          infoContainer.innerHTML = `<h1 class="text-[60px] text-blue-800">${phone.showName}</h1>
             <div class="flex justify-center items-center gap-5 mt-[50px] w-[900px]" >
                 <div class="me-[100px] w-[3000px]">
                     <img class="w-full h-auto" src="${phone.pictureLink}" alt="">
                 </div>
                 <div>
                     <h1 class="text-[40px] mb-5">${phone.showName}</h1>
                     <p class="text-[20px] mb-2 font-semibold ">Price: ${phone.showPrice}</p>
                     <p class="text[16px]">${phone.information}</p>
                     <div class="mt-5 flex gap-4">
                        <button class="bg-gray-800 px-7 py-2 font-poppins text-[18px] text-white rounded-md" id="infoBackButton">Back</button>
                         ${phone.isAddedToCart ? `<a href=""><button class="rounded-md bg-yellow-500 px-7 py-2 text-white text-[18px]">In cart</button></a>` : `<button class="bg-blue-600 px-7 py-2 font-poppins text-[18px] text-white rounded-md"  data-value=${phone.idName}>Add to Cart</button>`}
                     </div>
                 </div>
             </div>
            `;
          document.querySelector('#infoBackButton')?.addEventListener('click', () => showOnlyContainer(mainContainer));

          const addToCartBtn = infoContainer.querySelector('.add-to-cart');
          if (addToCartBtn) {
            addToCartBtn.addEventListener('click', () => {
              phonesData[key as keyof typeof phonesData].isAddedToCart = true;
              renderCart();
              renderInformation();
            });
          }
        }
      });
    });
  }

  function init() {
    createBox();
    renderInformation();
    addToCartHandler();
    renderCart();
  }

  init();

  document.querySelector("a[href='#']")?.addEventListener('click', e => {
    e.preventDefault();
    showOnlyContainer(cartContainer);
  });
});
