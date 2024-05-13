import fs from "fs";
import inquirer from "inquirer";
import qr from "qr-image";

inquirer
.prompt([
     {
          type: "input",
          name: "url",
          message: "Please enter your URL:"
     }
])
.then((answers) => {
     const { url } = answers;
     console.log("Your answer is: " + url);
     fs.appendFile('qrcode_urls.txt', url, (err) => {
          if (err) throw err;
          console.log("Url has been added to text file...");
     });

     var generated_qrcode = qr.imageSync(url, {type: 'png'});
     fs.writeFileSync('qrcode.png', generated_qrcode);

     console.log("QR code genrated successfully.");
}).catch((error) => {
     console.error("Something went wrong:", error);
});