export const bgController = (() => {

   const changeBackgroundColor = (bodyClassName) => {
      document.body.style.backgroundImage = "";
      document.body.className = "";
      document.body.classList.add(bodyClassName);
   };

   const changeBackgroundImg = (url) => {
      document.body.style.backgroundImage = `url("${url}")`;
   };

   return {
      changeBackgroundColor: changeBackgroundColor,
      changeBackgroundImg: changeBackgroundImg,
   };
})();
