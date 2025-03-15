import { phonesData } from './db';
import { boxesWrapper, informationContainer} from './elements';

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
            <button class="information-btn rounded-md bg-green-500 px-2 py-1 text-white" data-value=${phone.idName}>Information</button>
              ${phone.isAddedToCart? `<a href=""><button class="rounded-md bg-yellow-500 px-2 py-1 text-white">Retrieve</button></a>` :`<a href=""><button class="rounded-md bg-blue-500 px-2 py-1 text-white">Add to Cart</button></a>`}`;
        bottomWrapper.appendChild(buttonsWrapper);
        box.appendChild(bottomWrapper);
        boxesWrapper?.appendChild(box);
      }
    }
  }


 function getInformation(){
    const informationBtn = document.querySelectorAll('.information-btn')
    informationBtn.forEach(btn => {
      btn?.addEventListener('click', (e) => {   
        const target = e.target as HTMLButtonElement
        let key: string  = target.dataset.value!
        if (phonesData.hasOwnProperty(key)){
             const phone = phonesData[key as keyof typeof phonesData];
             localStorage.setItem('clickedButton', JSON.stringify(phone))    
        }
        window.location.href = "../public/infromation.html"    
      })
    })
  }
function renderInformation(){
    let phoneData = localStorage.getItem('clickedButton') 
    if(phoneData){
      let parsePhoneData = JSON.parse(phoneData)
      if(informationContainer){
        informationContainer.innerHTML = `<h1 class="text-[60px] text-blue-800">${parsePhoneData.showName}</h1>
          <div class="flex justify-center items-center gap-5 mt-[50px] w-[900px]" >
              <div class="me-[100px] w-[3000px]">
                  <img class="w-full h-auto" src="${parsePhoneData.pictureLink}" alt="">
              </div>
              <div>
                  <h1 class="text-[40px] mb-5">${parsePhoneData.showName}</h1>
                  <p class="text-[20px] mb-2 font-semibold ">Price: ${parsePhoneData.showPrice}</p>
                  <p class="text[16px]">${parsePhoneData.information}</p>
                  <div class="mt-5 flex gap-4">
                      <a href="./index.html"><button class="bg-gray-800 px-7 py-2 font-poppins text-[18px] text-white rounded-md">Back</button></a>
                      ${parsePhoneData.isAddedToCart? `<a href=""><button class="rounded-md bg-yellow-500 px-7 py-2 text-white text-[18px]">Retrieve</button></a>` :`<a href=""><button class="bg-blue-600 px-7 py-2 font-poppins text-[18px] text-white rounded-md">Add to Cart</button></a>`}
                  </div>
              </div>
          </div>`
      }
    }
  }


  
  function init() {
    createBox();
    getInformation()
    renderInformation()
  }

  init();
});
