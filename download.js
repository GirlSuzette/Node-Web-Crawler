// importar los mudulos

const http = require('http')
const fs = require('fs')
const path = require('path')
const uuidv5 = require('uuid/v5');

const downloadpage = async (URL) => {
    // Generando el numero random para 
    const folder = await uuidv5('URL', uuidv5.URL)
    // Crea la carpeta
    fs.mkdir(`./${folder}`, { recursive: true }, (err) => {
        if (err) throw err;
    });

    // Recibe una url & callback va a retornar  cuando se ejecute la funcion fetchPage
    const fetchPage = (linkUrl, callback) => {
        console.log("downloading" + URL)
        let content = "";
        const req = http.request(linkUrl, function (res) {
            res.setEncoding("utf8");
            res.on("data", chunk => content += chunk);

            res.on("end", function () {
                callback(folder, content, URL);
            })
        })
        req.on('error', e => console.error(e))
        req.end();
    }

    const write = (carpet, data, urlData) => {
        fs.writeFile(`./${carpet}/file.html`, data, (err) => {
            if (err) throw err;
            // console.log('The file has been saved!');
        });
        fs.writeFile(`./${carpet}/url.txt`, urlData, (err) => {
            if (err) throw err;
            // console.log('The file has been saved!');
        });

        console.log("downloading is done in folder" + urlData)
    }
    fetchPage(URL, write)
}

downloadpage(process.argv[2])



// process.argv propiedad devuelve una matriz que contiene los argumentos de línea de comando que se pasaron cuando se lanzó el proceso Node.js.
//node download.js http://www.google.com.mx

