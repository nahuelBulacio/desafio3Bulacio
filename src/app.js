import express from "express";
import ProductManager from "./ProductManager.js"

const app = express();
app.use(express.urlencoded({extended:true}));

const PM = new ProductManager;

PM.addProduct("Lavarropas","Nuevo",10,"https:lavarropas.com",123,2);
PM.addProduct("Cama","Cómoda",12,"https:cama.com",234,11);
PM.addProduct("Vaso","Frágil",30,"https:vaso.com",345,3);
PM.addProduct("Computadora","Inteligente",20,"https:computadora.com",456,9);
PM.addProduct("Televisor","Grande",5,"https:televisor.com",567,4);

app.get("/",(req, res)=>{
    res.send("¡Bienvenidos a la tienda de productos!")
});

app.get("/products",(req, res)=>{
    let limit = req.query.limit;
    const productos = PM.getProducts();

    if(!limit){
    res.send(productos);
    }else{
        productos.length = limit;
        res.send(productos);
    }
});

app.get("/products/:pid", (req, res) => {
    let pid = req.params.pid;
    const prodID = PM.getProductById(pid);
    res.send(prodID);
});

app.listen(8080,()=>{
    console.log("El servidor ya está arriba desde el puerto 8080");
});