//Obtener los parametros desde la consola
const [, , method, endpoint, ...args] = process.argv;

/** Funciones asincronicas */

//Get all products
async function getProducts() {
    try {
        const response = await fetch("https://fakestoreapi.com/products");
        const products = await response.json();
        console.log(products);
    } catch (error) {
        console.error("Error al obtener los productos:", error);
    }
}

//Obtener un solo producto por su id
async function getProductById(id){
    try{
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        const product = await response.json();
        console.log(product);
    }
    catch (error){
        console.error("Error al obtener el producto:", error);
    }
}


//Crear un nuevo producto
async function createProduct(productData){
    try{
        const response = await fetch("https://fakestoreapi.com/products", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(productData)
        });
        const newProduct = await response.json();
        console.log("Producto creado:", newProduct);
    } catch (error){
        console.error("Error al crear el producto:", error);
    }
}

//Eliminar un producto
async function deleteProduct(id){
    try{
        const response = await fetch(`https://fakestoreapi.com/products/${id}`, {
            method: "DELETE"
        });
        console.log("Producto de Id " + id + " eliminado");
    } catch (error){
        console.error("Error al eliminar el producto:", error);
    }
}


// Lógica para determinar qué función ejecutar según los parámetros de la consola
if(method === "GET" && endpoint === "products") {
    getProducts();
} else if(method === "GET" && endpoint.startsWith("products/")) {
    const id = endpoint.split("/")[1];
    getProductById(id);
} else if(method === "POST" && endpoint === "products") {

    // Obtener los datos del nuevo producto desde los argumentos de la consola
    const [title = "Nuevo Producto", price = 29.99, category = "electronics"] = args;

    // Crear el objeto con los datos del nuevo producto
    const newProductData = {
        title: title,
        price: price,
        description: "Descripción del nuevo producto",
        image: "https://i.pravatar.cc",
        category: category
    };
    createProduct(newProductData);
} else if(method === "DELETE" && endpoint.startsWith("products/")) {
    const id = endpoint.split("/")[1];
    deleteProduct(id);
} else {
    console.error("Comando no reconocido. Uso: node index.js <METHOD> <ENDPOINT>");
}