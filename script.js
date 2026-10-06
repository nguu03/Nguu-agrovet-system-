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
