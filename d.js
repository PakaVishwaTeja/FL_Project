var data0 = [];
async function getArrayOfImage(url){

    const image = new Image();
    image.src = url;

    const canvas = document.createElement('canvas');
    canvas.width = 28;
    canvas.height = 28;
    const context = canvas.getContext('2d');

    image.onload = function() {
    context.drawImage(image, 0, 0, 28, 28);
    const imageData = context.getImageData(0, 0, 28, 28);
    const pixelData = imageData.data;
    const grayscaleData = new Array(28 * 28);

    // Convert pixel data to grayscale and normalize to [0, 1]
    for (let i = 0; i < pixelData.length; i += 4) {
        const r = pixelData[i];
        const g = pixelData[i + 1];
        const b = pixelData[i + 2];
        const grayscale = (0.2989 * r + 0.5870 * g + 0.1140 * b) / 255;
        grayscaleData[i / 4] = grayscale;
    }

    //console.log(grayscaleData);
   data0.push(grayscaleData);

};

}
const input = document.querySelector("input")
let imagesArray = []

input.addEventListener("change", () => {
    const files = input.files
    for (let i = 0; i < files.length; i++) {
      imagesArray.push(files[i])
    }
    //console.log(imagesArray);
     displayImages()
  })


  function displayImages() {
    
    imagesArray.forEach((image, index) => {
    getArrayOfImage(`${URL.createObjectURL(image)}`);})
  }

function splitArrayByPercentage(arr , percentage){
    const shuffledArray = arr.sort(() => 0.5 - Math.random());
    const splitIndex = Math.floor(shuffledArray.length /percentage);
    const array1 = shuffledArray.slice(0, splitIndex);
    const array2 = shuffledArray.slice(splitIndex);
    return {array1 , array2};
}

// Original array
const originalArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];


console.log(splitArrayByPercentage(data0 , 10));
