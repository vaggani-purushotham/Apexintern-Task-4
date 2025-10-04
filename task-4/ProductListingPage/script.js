const products = [
    { name: "Laptop", category: "electronics", price: 900, rating: 4.5 },
    { name: "T-Shirt", category: "clothing", price: 20, rating: 4.0 },
    { name: "Smartphone", category: "electronics", price: 700, rating: 4.7 },
    { name: "Jeans", category: "clothing", price: 50, rating: 4.2 },
    { name: "Novel Book", category: "books", price: 15, rating: 4.8 },
    { name: "Headphones", category: "electronics", price: 100, rating: 4.3 },
];

const productList = document.getElementById("product-list");
const categoryFilter = document.getElementById("category-filter");
const sortFilter = document.getElementById("sort-filter");


function renderProducts(items) {
    productList.innerHTML = "";
    items.forEach(product => {
        const div = document.createElement("div");
        div.classList.add("product-card");
        div.innerHTML = `
            <h3>${product.name}</h3>
            <p>Category: ${product.category}</p>
            <p class="price">$${product.price}</p>
            <p>Rating: ${product.rating}</p>
        `;
        productList.appendChild(div);
    });
}


renderProducts(products);


categoryFilter.addEventListener("change", () => {
    applyFilters();
});


sortFilter.addEventListener("change", () => {
    applyFilters();
});


function applyFilters() {
    let filtered = [...products];

    
    const category = categoryFilter.value;
    if (category !== "all") {
        filtered = filtered.filter(p => p.category === category);
    }


    const sort = sortFilter.value;
    if (sort === "price-asc") filtered.sort((a,b) => a.price - b.price);
    else if (sort === "price-desc") filtered.sort((a,b) => b.price - a.price);
    else if (sort === "rating-desc") filtered.sort((a,b) => b.rating - a.rating);

    renderProducts(filtered);
}
