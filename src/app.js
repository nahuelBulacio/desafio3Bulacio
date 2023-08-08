import express from "express";
import fs from "fs";

const app = express();
app.use(express.urlencoded({extended: true}));


// creo la clase ProductManager
class ProductManager {
  
    // creo el constructor.
    constructor() {
      this.path = "Products.json";
      this.products = [];
      this.createFile();
    }
    // inicializo el "Products.json" con un metodo createFile().
    createFile() {
      if (!fs.existsSync(this.path)) {
        this.saveProductsInJSON();
      }
    }

    // creo addProduct.
    addProduct(title, description, price, thumbnail, code, stock) {
        const noDupCode = this.products.some((prod) => prod.code === code);
        if (noDupCode) {
          console.error(`¡Ha ocurrido un error! El producto de código: "${code}" ya existe`);
        return;
        }
        // validación de los campos 
        if (!title || !description || !price || !thumbnail || !code || stock === undefined) {
            console.error("All fields are mandatory.");
          return;
        }
        // creo el ID
        let id = this.products.length + 1;
        // construyo el producto y lo guardo
        const newProduct = {id, title, description, price, thumbnail, code, stock};
        this.products.push(newProduct);
        this.saveProductsInJSON();
    }

    // creo getProducts()
    getProducts() {
        this.products = JSON.parse(fs.readFileSync(this.path, "utf-8"));
        return this.products;
    }

    // creo getProductById()
    getProductById(id) {
        const products = this.getProducts();
        return (
            products.find((prod) => prod.id === id) || console.error("Hubo un error")
        );
    }

    // creo deleteProduct()
    deleteProduct(id) {
        this.products = this.getProducts();
        const product = this.getProductById(id);
        if (!product) {
          console.error(`¡El producto: ${id} no existe! Intente de nuevo.`);
        } else {
          this.products = this.products.filter((prod) => prod.id !== product.id);
          this.saveProductsInJSON();
          console.log(`El producto: ${product.id} ha sido eliminado`);
        }
    }

    // creo updateProduct()
    updateProduct(id, product) {
        this.products = this.getProducts();
        let position = this.products.findIndex((prod) => prod.id === id);
    
        if (position === -1) {
          console.error(`¡El producto: ${id} no existe! Intente de nuevo.`);
        } else {
          this.products[position].title = product.title;
          this.products[position].stock = product.stock;
          this.products[position].price = product.price;
          this.products[position].code = product.code;
          this.products[position].description = product.description;
          this.products[position].thumbnail = product.thumbnail;
          this.saveProductsInJSON();
          console.log("¡Producto actualizado!");
        }
      }

    saveProductsInJSON() {
        fs.writeFileSync(this.path, JSON.stringify(this.products));
    }
}

//---------------------------------------------------------------------------------------------------

app.get('/products', (req, res) => {

    const elementos = fs.readFile(path, "utf-8");
    res.send(elementos);
});

// lo exporto
export default { ProductManager };