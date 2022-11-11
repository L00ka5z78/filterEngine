const data = [
    {
        id: 1,
        name: "Invicta Men's Pro Diver",
        img: "https://m.media-amazon.com/images/I/71e04Q53xlL._AC_UY879_.jpg",
        price: 74,
        category: "Dress",
    },
    {
        id: 11,
        name: "Invicta Men's Pro Diver 2",
        img: "https://m.media-amazon.com/images/I/71e04Q53xlL._AC_UY879_.jpg",
        price: 74,
        category: "Dress",
    },
    {
        id: 2,
        name: "Timex Men's Expedition Scout ",
        img: "https://m.media-amazon.com/images/I/91WvnZ1g40L._AC_UY879_.jpg",
        price: 40,
        category: "Sport",
    },
    {
        id: 3,
        name: "Breitling Superocean Heritage",
        img: "https://m.media-amazon.com/images/I/61hGDiWBU8L._AC_UY879_.jpg",
        price: 200,
        category: "Luxury",
    },
    {
        id: 4,
        name: "Casio Classic Resin Strap ",
        img: "https://m.media-amazon.com/images/I/51Nk5SEBARL._AC_UY879_.jpg",
        price: 16,
        category: "Sport",
    },
    {
        id: 5,
        name: "Garmin Venu Smartwatch ",
        img: "https://m.media-amazon.com/images/I/51kyjYuOZhL._AC_SL1000_.jpg",
        price: 74,
        category: "Casual",
    },
];

const productsContainer = document.querySelector('.products');
const searchInput = document.querySelector('.search');
const categoriesContainer = document.querySelector('.categories');
const priceRange = document.querySelector('.priceRange');
const priceValue = document.querySelector('.priceValue');

const displayProducts = (filteredProducts) => {
    productsContainer.innerHTML = filteredProducts.map(
        (product) =>
            `
        <div class="product">
        <img src=${product.img} alt="">
        <span class="name">${product.name}</span>
        <span class="priceText">$ ${product.price}</span>
        </div>
        `
    ).join("")      // "" ==> to avoid comas/ bacticks in the browser
};

displayProducts(data);

searchInput.addEventListener("keyup", (e) => {
    // console.log(e.target.value)                     // <== to check values written in search box therefore ==>
    const value = e.target.value.toLowerCase();         //doesnt matter if search capitals or lower letters

    if (value) {
        displayProducts(data.filter(item => item.name.toLowerCase().indexOf(value) !== -1))

        /**reminder for me how indexOf works
        * const a = "abcde"
        * a.indexOf("c") <-2
        */
    } else {
        displayProducts(data);
    }
});

const setCategories = () => {
    const allCategories = data.map(item => item.category)
    // console.log(allCategories)
    const categories = ["All", ...allCategories.filter((item, i) => {

        //created array, first element will be ALL'and after that will be  whatever is inside allCategories 

        return allCategories.indexOf(item) === i;
    })];

    categoriesContainer.innerHTML = categories.map(categories =>
        `
        <span class="category">${categories}</span>
        `
    ).join("")

    categoriesContainer.addEventListener("click", (e) => {
        const selectedCat = e.target.textContent                 /**  <--using parent element and text content to display category text */

        selectedCat === "All" ? displayProducts(data) : displayProducts(data.filter(item => item.category === selectedCat))
    });
};

const setPrices = () => {
    const priceList = data.map(item => item.price);
    const minPrice = Math.min(...priceList)
    const maxPrice = Math.max(...priceList)

    priceRange.min = minPrice;
    priceRange.max = maxPrice;
    priceRange.value = maxPrice
    priceValue.textContent = "$" + maxPrice

    priceRange.addEventListener("input", (e) => {
        priceValue.textContent = "$" + e.target.value;
        displayProducts(data.filter(item => item.price <= e.target.value))
    })
}

setCategories();
setPrices();