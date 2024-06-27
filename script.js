document.addEventListener('DOMContentLoaded', function() {
    const dataUrl = 'data.json'; // Ruta al archivo JSON
    const productList = document.getElementById('product-list');

    fetch(dataUrl)
        .then(response => response.json())
        .then(data => {
            displayProducts(data);
        })
        .catch(error => {
            console.error('Error al obtener los datos:', error);
        });

    function displayProducts(products) {
        products.forEach(product => {
            const div = document.createElement('div');
            div.classList.add('product');
            div.innerHTML = `
                <h2>${product.Nombre}</h2>
                <p>Precio: ${product.Precio}</p>
                <p>${product.Descripción}</p>
            `;
            productList.appendChild(div);
        });
    }
});
