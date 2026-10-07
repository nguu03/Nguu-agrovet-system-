// ===============================
// NEW SALE - NGUU AGROVET
// ===============================

function newSale() {
    const product = document.getElementById("saleProduct").value;
    const quantity = Number(document.getElementById("saleQuantity").value);
    const price = Number(document.getElementById("salePrice").value);
    const cost = Number(document.getElementById("saleCost").value);

    if (product === "") {
        alert("Tafadhali chagua bidhaa.");
        return;
    }

    if (quantity <= 0) {
        alert("Tafadhali weka quantity sahihi.");
        return;
    }

    if (price <= 0) {
        alert("Tafadhali weka bei ya kuuza.");
        return;
    }

    const total = quantity * price;
    const profit = quantity * (price - cost);

    const sale = {
        id: Date.now(),
        product: product,
        quantity: quantity,
        price: price,
        cost: cost,
        total: total,
        profit: profit,
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString()
    };

    // Chukua sales zilizopo
    let sales = JSON.parse(localStorage.getItem("sales")) || [];

    // Ongeza sale mpya
    sales.push(sale);

    // Hifadhi sales
    localStorage.setItem("sales", JSON.stringify(sales));

    // Onyesha ujumbe
    alert(
        "SALE IMEHIFADHIWA!\n\n" +
        "Bidhaa: " + product +
        "\nQuantity: " + quantity +
        "\nTotal: TSh " + total.toLocaleString() +
        "\nFaida: TSh " + profit.toLocaleString()
    );

    // Safisha form
    document.getElementById("saleProduct").value = "";
    document.getElementById("saleQuantity").value = "";
    document.getElementById("salePrice").value = "";
    document.getElementById("saleCost").value = "";

    // Refresh Daily Sales
    if (typeof loadDailySales === "function") {
        loadDailySales();
    }
}
// ===============================
// NEW SALE - NGUU AGROVET
// ===============================

// ==========================================
// NGUU AGROVET - NEW SALE + STOCK
// ==========================================

const stockData = {
    "Faru Dust": {
        quantity: 48,
        price: 5000,
        cost: 3000
    },

    "Duduba": {
        quantity: 100,
        price: 5000,
        cost: 3500
    },

    "Blitkill": {
        quantity: 50,
        price: 5000,
        cost: 1600
    },

    "Nuru": {
        quantity: 72,
        price: 7000,
        cost: 5800
    },

    "Shamba Dust": {
        quantity: 50,
        price: 5000,
        cost: 280
    }
};


// ==========================================
// NEW SALE
// ==========================================

function newSale() {

    const productElement =
        document.getElementById("saleProduct");

    const quantityElement =
        document.getElementById("saleQuantity");

    if (!productElement || !quantityElement) {
        alert("NEW SALE form haijapatikana.");
        return;
    }

    const product = productElement.value;
    const quantity = Number(quantityElement.value);

    if (!product) {
        alert("Tafadhali chagua bidhaa.");
        return;
    }

    if (quantity <= 0) {
        alert("Tafadhali weka quantity sahihi.");
        return;
    }

    // Angalia kama bidhaa ipo
    if (!stockData[product]) {
        alert("Bidhaa haipo kwenye STOCK.");
        return;
    }

    // Chukua stock iliyopo
    let stock =
        JSON.parse(localStorage.getItem("stockData")) ||
        stockData;

    // Hakikisha bidhaa ipo
    if (!stock[product]) {
        stock[product] = stockData[product];
    }

    // Angalia stock
    if (quantity > stock[product].quantity) {

        alert(
            "STOCK HAITOSHI!\n\n" +
            "Bidhaa: " + product +
            "\nStock iliyopo: " +
            stock[product].quantity +
            "\nUmeomba: " + quantity
        );

        return;
    }

    const price = stock[product].price;
    const cost = stock[product].cost;

    const total = quantity * price;
    const profit = quantity * (price - cost);

    // Punguza stock
    stock[product].quantity -= quantity;

    // Hifadhi stock
    localStorage.setItem(
        "stockData",
        JSON.stringify(stock)
    );


    // ======================================
    // HIFADHI SALE
    // ======================================

    let sales =
        JSON.parse(localStorage.getItem("sales")) ||
        [];

    const sale = {

        id: Date.now(),

        product: product,

        quantity: quantity,

        price: price,

        cost: cost,

        total: total,

        profit: profit,

        date: new Date().toLocaleDateString(),

        time: new Date().toLocaleTimeString()

    };

    sales.push(sale);

    localStorage.setItem(
        "sales",
        JSON.stringify(sales)
    );


    // ======================================
    // UJUMBE
    // ======================================

    alert(

        "SALE IMEHIFADHIWA!\n\n" +

        "Bidhaa: " + product +

        "\nQuantity: " + quantity +

        "\nBei: TSh " +
        price.toLocaleString() +

        "\nTotal: TSh " +
        total.toLocaleString() +

        "\nFAIDA: TSh " +
        profit.toLocaleString() +

        "\n\nStock iliyobaki: " +
        stock[product].quantity

    );


    // Safisha quantity
    quantityElement.value = "";


    // Onyesha stock mpya
    updateStockTable();

}


// ==========================================
// UPDATE STOCK TABLE
// ==========================================

function updateStockTable() {

    let stock =
        JSON.parse(localStorage.getItem("stockData")) ||
        stockData;

    const rows =
        document.querySelectorAll("table tr");

    rows.forEach(function(row) {

        const cells = row.querySelectorAll("td");

        if (cells.length >= 3) {

            const product =
                cells[0].innerText.trim();

            if (stock[product]) {

                cells[1].innerText =
                    stock[product].quantity;

                cells[2].innerText =
                    "TSh " +
                    stock[product].price.toLocaleString();
            }
        }
    });
}


// ==========================================
// LOAD STOCK
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    function() {

        updateStockTable();

    }
);
