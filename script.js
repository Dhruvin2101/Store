let items = [];
let billCounter = parseInt(localStorage.getItem('billCounter')) || 1000;

function addItem() {
    const itemName = document.getElementById('itemName').value;
    const itemPrice = parseFloat(document.getElementById('itemPrice').value);
    const itemQty = parseInt(document.getElementById('itemQty').value);

    if (!itemName || isNaN(itemPrice) || isNaN(itemQty) || itemQty <= 0) {
        alert('Please enter valid item details');
        return;
    }

    items.push({ itemName, itemPrice, itemQty });

    document.getElementById('itemName').value = '';
    document.getElementById('itemPrice').value = '';
    document.getElementById('itemQty').value = '1';
    alert('Item Added');
}

function generateBill() {
    const customerName = document.getElementById('customerName').value;
    const mobileNumber = document.getElementById('mobileNumber').value;

    if (!customerName || !mobileNumber) {
        alert('Customer Name and Mobile Number are required!');
        return;
    }

    if (items.length === 0) {
        alert('Add at least one item!');
        return;
    }

    const billNumber = billCounter++;
    const billDate = new Date().toLocaleDateString();
    let grandTotal = 0;

    let billHTML = `
        <h3>Jalaram Clothes</h3>
        <p>G-21 Sumeru City Mall, Near Sudama Chowk, Varachha, Surat</p>
        <p>Bill Number: ${billNumber}</p>
        <p>Date: ${billDate}</p>
        <p>Customer: ${customerName}</p>
        <p>Mobile: ${mobileNumber}</p>
        <hr>
        <table border="1" cellpadding="5">
            <tr>
                <th>Item</th>
                <th>Price</th>
                <th>Qty</th>
                <th>Total</th>
            </tr>
    `;

    items.forEach(item => {
        const itemTotal = item.itemPrice * item.itemQty;
        grandTotal += itemTotal;

        billHTML += `
            <tr>
                <td>${item.itemName}</td>
                <td>₹${item.itemPrice}</td>
                <td>${item.itemQty}</td>
                <td>₹${itemTotal}</td>
            </tr>
        `;
    });

    billHTML += `
        </table>
        <h4>Grand Total: ₹${grandTotal}</h4>
        <p>NO RETURN NO EXCHANGE</p>
        <hr>
    `;

    document.getElementById('billOutput').innerHTML = billHTML;

    // Save bill to localStorage
    const billData = {
        billNumber,
        customerName,
        mobileNumber,
        billDate,
        items,
        grandTotal
    };

    localStorage.setItem(`bill_${billNumber}`, JSON.stringify(billData));
    localStorage.setItem('billCounter', billCounter);

    // Clear items for the next bill
    items = [];
    alert(`Bill ${billNumber} generated successfully!`);
}

function searchBill() {
    const searchBillNumber = document.getElementById('searchBillNumber').value;
    const billData = JSON.parse(localStorage.getItem(`bill_${searchBillNumber}`));

    if (!billData) {
        document.getElementById('searchResult').innerHTML = `<p>Bill Not Found!</p>`;
        return;
    }

    let billHTML = `
        <h3>Bill Number: ${billData.billNumber}</h3>
        <p>Date: ${billData.billDate}</p>
        <p>Customer: ${billData.customerName}</p>
        <p>Mobile: ${billData.mobileNumber}</p>
        <table border="1" cellpadding="5">
            <tr>
                <th>Item</th>
                <th>Price</th>
                <th>Qty</th>
                <th>Total</th>
            </tr>
    `;

    billData.items.forEach(item => {
        billHTML += `
            <tr>
                <td>${item.itemName}</td>
                <td>₹${item.itemPrice}</td>
                <td>${item.itemQty}</td>
                <td>₹${item.itemPrice * item.itemQty}</td>
            </tr>
        `;
    });

    billHTML += `
        </table>
        <h4>Grand Total: ₹${billData.grandTotal}</h4>
    `;

    document.getElementById('searchResult').innerHTML = billHTML;
                      }
