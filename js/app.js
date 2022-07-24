const toggleBtn = document.querySelector('.toggle-btn');
const toggleBtnFloat = document.querySelector('.float-btn');
const uploadImg = document.querySelector('#upload');
const imgWrapper = document.querySelector('.img-wrapper');
const imgStudio = document.querySelector('.img-wrapper img');
const removeBtn = document.querySelector('.trash');
const downloadBtn = document.querySelector('.download');
const ranges = document.querySelectorAll('.range-primay');
const btnTools = document.querySelectorAll('.btn-tool');
const body = document.querySelector('body');
let rotateVlue = 0;

toggleBtn.addEventListener('click' , toggleStyle);
uploadImg.addEventListener('change', showImg);
removeBtn.addEventListener('click', removeImg);
ranges.forEach((item) =>{
   item.addEventListener('change' , setFilter);
})
downloadBtn.addEventListener('click' , downloadImg);
btnTools.forEach((item) =>{
   item.addEventListener('click' , rotateLeftRight);
})

function showImg(event) {
   let imgPath = event.target.files[0];
   imgWrapper.style.display = 'block'
   let reader = new window.FileReader();
   reader.onload = (event) =>{
      imgStudio.src = event.target.result;
   };
   reader.readAsDataURL(imgPath);
}

function removeImg(){
   imgWrapper.style.display = 'none';
}

function setFilter(event){
   const rangeId= event.target.id;
   const styleOfWrapper = window.getComputedStyle(imgWrapper);
   const nexElment = event.target.nextElementSibling;
   if(styleOfWrapper.getPropertyValue('display') === 'none'){
      alert('please select an image');
   }else{
      let rangeValue = event.target.value;
      switch (rangeId) {
         case 'oy-range':
            getStyleAndSet(0,'opacity',rangeValue,'%');
            nexElment.innerText = rangeValue + '%';
            break;
         case 'bs-range':
            getStyleAndSet(1,'brightness',rangeValue,'%');
            nexElment.innerText = rangeValue + '%';
            break;
         case 'br-range':
            getStyleAndSet(2,'blur',rangeValue,'px');
            nexElment.innerText = rangeValue + '%';
            break;
         case 'ct-range':
            getStyleAndSet(3,'contrast',rangeValue,'%');
            nexElment.innerText = rangeValue + '%';
            break;
         case 'ge-range':
            getStyleAndSet(4,'grayscale',rangeValue,'%');
            nexElment.innerText = rangeValue + '%';
            break;
         case 'he-range':
            getStyleAndSet(5,' hue-rotate',rangeValue,'deg');
            nexElment.innerText = rangeValue + '%';

      }
   }
}

function getStyleAndSet(index,name,value,unit){
   let styleOfrange = window.getComputedStyle(imgStudio);
   let filters = styleOfrange.filter;
   let filtersSplit = filters.split(' ');
   let filterItem = filtersSplit[index];
   filterItem = `${name}(${value}${unit})`;
   filtersSplit[index] = filterItem;
   let filterJoin = filtersSplit.join(' ');
   imgStudio.style.setProperty('filter' , filterJoin);
}

function downloadImg() {
   const styleOfWrapper = window.getComputedStyle(imgWrapper);
   if(styleOfWrapper.getPropertyValue('display') === 'none') {
      alert('please select an image to download');
   }else {
      domtoimage.toBlob(imgStudio).then(function (blod){
             window.saveAs(blod , 'output.png');
      });
   }
}

function toggleStyle() {
   console.log('ck');
   if(toggleBtnFloat.classList.contains('toggle-active')){
      toggleBtnFloat.classList.remove('toggle-active');
      toggleBtnFloat.classList.add('toggle-deactive');
      body.classList.remove('dark-mode');
   }else {
      toggleBtnFloat.classList.add('toggle-active');
      toggleBtnFloat.classList.remove('toggle-deactive');
      body.classList.add('dark-mode');
   }
}

function rotateLeftRight(event){
   const btnClass = event.target.classList[2];
   const styleOfWrapper = window.getComputedStyle(imgWrapper);
   if(styleOfWrapper.getPropertyValue('display') !== 'none') {
      if(btnClass === 'btn-rotate-right'){
         rotateVlue += 90;
         imgStudio.style.transform = `rotate(${rotateVlue}deg)`;
      }
      if(btnClass === 'btn-rotate-left'){
         rotateVlue -= 90;
         imgStudio.style.transform = `rotate(${rotateVlue}deg)`;
      }
   }else{
      alert('please select an image');
   }
}
