let sklad = {
    storage: [],
    add({ name, img, description, quantity, price }) {
        let newTovar = {
            id: this.storage.length + 1,
            img: img,
            name: name,
            description: description,
            quantity: quantity,
            price: price,
        };
        this.storage.push(newTovar);
        return newTovar;
    },
    update(id, updateItem) {
        let index = this.storage.findIndex(item => item.id === id);
        if (index !== -1) {
            this.storage[index] = Object.assign(this.storage[index], updateItem);
        }
    },
    remove(id) {
        let index = this.storage.findIndex(item => item.id === id);
        if (index !== -1) {
            this.storage.splice(index, 1);
        }
    }
};
const PROMOKOD = {
    test: 5,
    mega: 20,
};
const backed = {
    storage: [],
    promokod: null,
    getCount() {
        let count = 0;
        this.storage.forEach((item) => count += item.quantity);

        return count;
    },
    applyPromokod(promokod) {
        if (PROMOKOD[promokod] !== undefined) {
            this.promokod = promokod;
            console.log(`Промокод"${promokod}"успішно застосованною`);
        } else {
            console.log(`Такого"${promokod}"не існує.`);
        }
        return this;
    },
    clearPromokod() {
        this.promokod = null;
        console.log("Промокод очищеною");
    },
    add(itemId, quantity) {
        const itemInBacked = this.storage.find(item => item.id === itemId)
        if (itemInBacked) {
            const newQuantity = itemInBacked.quantity + quantity;
            return this.update(itemId, newQuantity);
        }
        let item = sklad.storage.find(item => item.id === itemId);
        if (item && item.quantity >= quantity) {
            let korzItem = {
                id: item.id,
                name: item.name,
                quantity: quantity,
                price: item.price,
            };
            this.storage.push(korzItem);
            item.quantity -= quantity;
        } else {
            console.log("Такої кількості товару,немає на складі")
        }
        return this;
    },
    update(itemId, newQuantity) {
        let itemUpdate = this.storage.find(item => item.id === itemId);
        if (itemUpdate) {
            let dostupnQuantity = itemUpdate.quantity + sklad.storage.find(item => item.id === itemId).quantity;
            if (dostupnQuantity >= newQuantity) {
                const diffSkladQuantity = newQuantity - itemUpdate.quantity;
                itemUpdate.quantity = newQuantity;
                sklad.storage.find(item => item.id === itemId).quantity -= diffSkladQuantity;
                console.log(this.storage);
            } else {
                alert("Нема такої кількості товару на складі.");
            }
        } else {
            console.log("Такого товару немає в корзині");
        }
        return this;
    },
    remove(itemId) {
        let itemIndex = this.storage.findIndex(item => item.id === itemId);
        if (itemIndex !== -1) {
            let removedItem = this.storage.splice(itemIndex, 1)[0];
            sklad.storage.find(item => item.id === removedItem.id).quantity += removedItem.quantity;
            //console.log(this.storage);
        } else {
            alert("Нема такого товару в корзині.");
        }
        return this;
    },
    calculate() {
        let sum = 0;
        for (let item of this.storage) {
            sum += item.price * item.quantity;
        }
        if (this.promokod && PROMOKOD[this.promokod]) {
            let discount = PROMOKOD[this.promokod];
            sum -= (sum * discount) / 100;
        }
        return sum;
    }
};
// let newProduct = {
//     name: "Table",
//     description: "Display:11;SSD:128",
//     quantity: 20,
//     price: 200,
// };
// let newProduct2 = {
//     name: "Laptop",
//     description: "Display:19;SSD:500",
//     quantity: 26,
//     price: 600,
// };
//   console.log(sklad.add(newProduct.name, newProduct.description, newProduct.quantity, newProduct.price))
//   console.log(sklad.add(newProduct2.name, newProduct2.description, newProduct2.quantity, newProduct2.price))
//   console.log(sklad);
//   console.log(backed.add(1, 4));
//   console.log(backed);
//   console.log(backed.update(1, 2));
//   console.log(backed.add(2, 4));
//   console.log(backed.calculate());
//   console.log(backed.applyPromokod("mega"));
//   console.log(backed.calculate());
const productList = [
    {
        img: src = "https://content.rozetka.com.ua/goods/images/big_tile/416061140.jpg",
        name: "Холодильник SAMSUNG",
        description: "SAMSUNG RB38T676FSA/UA0",
        price: 26399,
        quantity: 25,
    },
    {
        img: "https://content2.rozetka.com.ua/goods/images/big_tile/408285320.jpg",
        name: "Ноутбук ASUS TUF Gaming",
        description: "ASUS TUF Gaming A15 (2023) FA507NU-LP131 15.6 IPS Full HD",
        price: 43999,
        quantity: 15,
    },
    {
        img: "https://content1.rozetka.com.ua/goods/images/big_tile/144249716.jpg",
        name: "Ноутбук Apple MacBook",
        description: "Apple MacBook Air 13'' M1 8/256GB 2020 (MGN63) Space Gray",
        price: 35999,
        quantity: 46,
    },
    {
        img: "https://content.rozetka.com.ua/goods/images/big_tile/319580696.jpg",
        name: "Мобильный телефон Samsung",
        description: "Samsung Galaxy A34 8/256GB Black (SM-A346EZKESEK)",
        price: 13899,
        quantity: 47,
    },
    {
        img: "https://content2.rozetka.com.ua/goods/images/big_tile/21243840.jpg",
        name: "Моющий беспроводной пылесос Philips",
        description: "Philips SpeedPro Aqua FC6729/01",
        price: 12299,
        quantity: 22,
    },
    {
        img: "https://content.rozetka.com.ua/goods/images/big_tile/209061387.jpg",
        name: "Аккумуляторная дрель-шуруповёрт Bosch",
        description: "Bosch Professional GSR 12 V-35 (06019H8002)",
        price: 10919,
        quantity: 42,
    },
    {
        img: "https://content2.rozetka.com.ua/goods/images/big_tile/315066008.jpg",
        name: "Холодильник SAMSUNG",
        description: "SAMSUNG RB38T676FSA/UA0",
        price: 26399,
        quantity: 25,
    },
    {
        img: "https://content.rozetka.com.ua/goods/images/big_tile/194041086.jpg",
        name: "Бетономешалка",
        description: "Скиф БСМ-140 (БСМ 140)",
        price: 14519,
        quantity: 20,
    },
    {
        img: "https://content2.rozetka.com.ua/goods/images/big_tile/430597991.jpg",
        name: "Велосипед Crossride",
        description: "Crossride 26 МТВ ST Bullet 17'' Черно-желтый (02621-170-1)",
        price: 6206,
        quantity: 27,
    },
    {
        img: "https://content1.rozetka.com.ua/goods/images/big_tile/311652132.jpg",
        name: "Электросамокат Acer",
        description: "Acer Electrical Scooter 5 Black (AES015)",
        price: 16999,
        quantity: 30,
    },
    {
        img: "https://content1.rozetka.com.ua/goods/images/big_tile/376781422.jpg",
        name: "Компьютер ARTLINE",
        description: "ARTLINE Gaming X49 (X49v35) AMD Ryzen 5 5500 / RAM 16ГБ / SSD 1ТБ / nVidia GeForc",
        price: 33999,
        quantity: 23,
    },
    {
        img: "https://content2.rozetka.com.ua/goods/images/big_tile/224009737.jpg",
        name: "Планшет Apple",
        description: "Apple iPad 10.2'' 2021 Wi-Fi 64GB Space Gray (MK2K3RK/A)",
        price: 11999,
        quantity: 37,
    },
    {
        img: "https://content.rozetka.com.ua/goods/images/big_tile/427572401.jpg",
        name: "Телевизор Samsung",
        description: "Samsung UE50CU7100UXUA",
        price: 19999,
        quantity: 26,
    },
    {
        img: "https://content.rozetka.com.ua/goods/images/big_tile/202796629.jpg",
        name: "Акустическая система JBL",
        description: "JBL PartyBox 110 (JBLPARTYBOX110EU)",
        price: 15999,
        quantity: 31,
    },
    {
        img: "https://content1.rozetka.com.ua/goods/images/big_tile/236917051.jpg",
        name: "Набор инструментов Stanley",
        description: "Stanley 210 предметов (STHT5-73795)",
        price: 9874,
        quantity: 35,
    },
    {
        img: "https://content.rozetka.com.ua/goods/images/big_tile/325139122.jpg",
        name: "Стиральная машина полногабаритная BOSCH",
        description: "BOSCH WAN28263UA",
        price: 20199,
        quantity: 25,
    },
];

const shop = document.createElement("div");

function createTemplateProduct(productItem) {
    return `
    <div class="card" id="${productItem.id}">
        <div class="image"><img src="${productItem.img}" alt="Product Image"></div>
        <div class="name">${productItem.name}</div>
        <div class="description">${productItem.description}</div>
        <div class="price">${productItem.price} грн</div>
        <div class="quantity">
            <div class="quantity-All">
                <div class="quantity__sklad">Доступно шт. <div class="quantity__sklad-shop" data-id=${productItem.id}>${productItem.quantity}</div></div>
            </div>
            <div class="add__product-korz" data-id="${productItem.id}"><img src="assets/korzAdd.png" alt="Add to Cart"></div>
        </div>
    </div>`;
}

function createProduct(productList) {
    shop.classList.add("product__item");

    productList.forEach(item => {
        const productItem = sklad.add(item);
        const listProduct = createTemplateProduct(productItem);

        shop.insertAdjacentHTML("beforeend", listProduct);

        // shop.setAttribute("id",productList.id)
    });

    const cardShop = document.querySelector(".content");
    cardShop.appendChild(shop);

    return shop;
}

function createTemplateProductUserKorz(item, resultPriceCard) {
    return `
    <div class ="korz__user-product">
        <div class="korz__user-product-image"><img src="${item.img}"></div>
        <div class="korz__user-info">
            <div class="korz__user-product-description">${item.name}</div>
            <div class="korz__user-product-quantiti">
                <button class="korz__user-minus" data-id2=${item.id}>-</button>
                <div class="korz__user-show-quantity">${item.quantity}</div>
                <button class="korz__user-plus" data-id1=${item.id}>+</button>
            </div>
            <div class="korz__user-product-price">Ціна:<div class="korz-price">${item.price}</div> грн
            </div>
        </div>
        <div class="korz-button-all-price">
            <button class="korz__user-delete" data-id=${item.id}>Видалити</button>
            <div class="korz-price-all">Всього:<div class="korz-price-all-card">${resultPriceCard}</div>грн.</div></div>
        </div>   
    </div>
`;
}

function addProductKorz() {
    const addProductKorz = [...document.querySelectorAll(".add__product-korz")];

    addProductKorz.forEach((button, index) => {
        button.addEventListener("click", function () {
            backed.add(+button.dataset.id, 1);
            updateKorzShop();
            availableQuantityShop();
        });
    });
}

function updateKorzShop() {
    const korzQuantity = document.querySelector(".korz__quantity");
    korzQuantity.innerHTML = backed.getCount();
}

function korzUserContentUpdate(autoClearContent) {
    const backedStorage = backed.storage;
    const korzUserContent = document.querySelector(".korz__user-content");

    if (autoClearContent) {
        korzUserContent.innerHTML = "";
    }

    const allPrice = document.querySelector(".all-price");
    allPrice.innerHTML = backed.calculate();

    backedStorage.forEach(item => {
        const product = sklad.storage.find(skladItem => skladItem.id === item.id);
        const newItem = {
            ...product,
            ...item
        };

        const resultPriceCard = newItem.price * newItem.quantity;

        korzUserContent.insertAdjacentHTML("beforeend", createTemplateProductUserKorz(newItem, resultPriceCard));
    });
}

function korzUserProduct() {
    const korzUserButton = document.querySelector(".korz-logo");
    deleteItemKorz();
    korzUserButton.addEventListener("click", function () {
        korzUserContentUpdate();
        openKorz();
    });

    const closetKorzUser = document.querySelector(".korz__user-closet");
    closetKorzUser.addEventListener("click", (event) => {
        event.stopPropagation();
        closeKorz();
    });

    const korz = document.querySelector(".korz");

    korz.addEventListener("click", (event) => {
        console.log(event.target);
        closeKorz();
    });
}

function openKorz() {
    document.querySelector(".korz").classList.add("korz--show");
    document.querySelector("body").classList.add("body--no-scroll");
}



function closeKorz() {
    document.querySelector(".korz").classList.remove("korz--show")
    document.querySelector(".korz__user-content").innerHTML = "";
    document.querySelector("body").classList.remove("body--no-scroll")
}

function deleteItemKorz() {
    const contentKorz = document.querySelector(".korz__user-content");
    contentKorz.addEventListener("click", function (event) {
        event.stopPropagation();

        if (event.target.classList.contains("korz__user-delete")) {
            backed.remove(+event.target.dataset.id);
            updateKorzShop();
            korzUserContentUpdate(true);
            availableQuantityShop();
        }
    });
}

function quantitiItemKorz() {
    const korzUserContent = document.querySelector(".korz__user-content");
    korzUserContent.addEventListener("click", function (event) {
        event.stopPropagation();

        let itemId;
        let newQuantity;

        if (event.target.classList.contains("korz__user-plus")) {
            itemId = +event.target.dataset.id1;
            const item = backed.storage.find(item => item.id === itemId);
            if (item) {
                newQuantity = item.quantity + 1;
                backed.update(itemId, newQuantity);
                updateKorzShop();
                korzUserContentUpdate(true);
                availableQuantityShop();
            }
        } else if (event.target.classList.contains("korz__user-minus")) {
            itemId = +event.target.dataset.id2;
            const item = backed.storage.find(item => item.id === itemId);
            if (item && item.quantity > 1) {
                newQuantity = item.quantity - 1;
                backed.update(itemId, newQuantity);
                updateKorzShop();
                korzUserContentUpdate(true);
                availableQuantityShop();
            }
        }
    });
}

function availableQuantityShop() {
    const quantityItemShop = [...document.querySelectorAll(".quantity__sklad-shop")];
    quantityItemShop.forEach(element => {
        const productId = +element.dataset.id;
        const product = sklad.storage.find(item => item.id === productId);
        const quantity = product.quantity;
        element.innerHTML = quantity;
    });
}
function init() {
    createProduct(productList);
    addProductKorz();
    korzUserProduct();
    quantitiItemKorz();
    availableQuantityShop();
}

document.addEventListener("DOMContentLoaded", init);