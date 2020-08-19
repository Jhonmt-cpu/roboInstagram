const puppeteer = require('puppeteer');
const fs = require('fs');
const link = 'https://instagram.com/rafaelamalim';

const busca = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(link);

  const imgList = await page.evaluate(()=> {
    //Toda essa função será executada no browser

    // vamos pegar toas as imagens que estão na parte de posts
      const NodeList = document.querySelectorAll('article img');
    // transformar o NodeList em array
      const imgArray = [...NodeList];
    // trasnformar os nodes (elementos html) em objetos JS
      const imglist = imgArray.map( ({src, alt}) => ({
        src, alt
      }));
    //colocar para fora da função

      return imglist;
  });

  // escrever os dados em um arquivo local (json)
  fs.writeFile('instagram.json', JSON.stringify(imgList, null, 2), err=>{
    if(err) throw new Error('somenthing went wrong');

    console.log('well done');

  })

  await browser.close();
};

setInterval( busca ,60000);