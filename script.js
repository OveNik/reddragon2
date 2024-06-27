document.addEventListener('DOMContentLoaded', function() {
    const dataUrl = 'data.json'; // Ruta al archivo JSON
    const productList = document.getElementById('product-list');
    const productForm = document.getElementById('product-form');
    const productIdField = document.getElementById('product-id');
    const productNameField = document.getElementById('product-name');
    const productPriceField = document.getElementById('product-price');
    const productDescriptionField = document.getElementById('product-description');
    
    let products = [];

    // Cargar los datos del archivo JSON
    fetch(dataUrl)
        .then(response => response.json())
        .then(data => {
            products = data;
            displayProducts();
        })
        .catch(error => {
            console.error('Error al obtener los datos:', error);
        });

    function displayProducts() {
        productList.innerHTML = ''; // Limpiar la lista de productos
        products.forEach(product => {
            const div = document.createElement('div');
            div.classList.add('product');
            div.innerHTML = `
                <h2>${product.Nombre}</h2>
                <p>Precio: $${product.Precio}</p>
                <p>${product.Descripción}</p>
                <button onclick="editProduct(${product.id})">Editar</button>
                <button onclick="deleteProduct(${product.id})">Eliminar</button>
            `;
            productList.appendChild(div);
        });
    }

    // Agregar o actualizar un producto
    productForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const id = productIdField.value ? parseInt(productIdField.value) : Date.now();
        const name = productNameField.value;
        const price = parseFloat(productPriceField.value);
        const description = productDescriptionField.value;

        const existingProductIndex = products.findIndex(p => p.id === id);

        if (existingProductIndex !== -1) {
            products[existingProductIndex] = { id, Nombre: name, Precio: price, Descripción: description };
        } else {
            products.push({ id, Nombre: name, Precio: price, Descripción: description });
        }

        // Actualizar la visualización y restablecer el formulario
        displayProducts();
        productForm.reset();
        productIdField.value = '';
    });

    // Editar un producto
    window.editProduct = function(id) {
        const product = products.find(p => p.id === id);
        if (product) {
            productIdField.value = product.id;
            productNameField.value = product.Nombre;
            productPriceField.value = product.Precio;
            productDescriptionField.value = product.Descripción;
        }
    };

    // Eliminar un producto
    window.deleteProduct = function(id) {
        products = products.filter(p => p.id !== id);
        displayProducts();
    };
});
