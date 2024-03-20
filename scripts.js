// Function to store data in localStorage
function storeData() {
    const barcode = document.getElementById('barcode').value;
    const itemName = document.getElementById('itemName').value;
    const model = document.getElementById('sku').value;
    const qty = document.getElementById('qty').value;
    const storageLocation = document.getElementById('storageLocation').value;
    const isInbound = false;

    const warehouseItem = {
        barcode,
        itemName,
        model,
        qty,
        storageLocation,
        isInbound,
    };

    // Retrieve existing inventory data from localStorage
    const inventory = JSON.parse(localStorage.getItem('inventory')) || [];

    // Add the new item to the inventory
    inventory.push(warehouseItem);

    // Save the updated inventory back to localStorage
    localStorage.setItem('inventory', JSON.stringify(inventory));

    // Update the table to display the new data
    displayInventory();
}

// Function to search inventory based on user input
function searchInventory() {
    const searchTerm = document.getElementById('search').value.toLowerCase();
    const inventory = JSON.parse(localStorage.getItem('inventory')) || [];

    const filteredInventory = inventory.filter(item => {
        return (
            item.barcode.toLowerCase().includes(searchTerm) ||
            item.itemName.toLowerCase().includes(searchTerm) ||
            item.model.toLowerCase().includes(searchTerm) ||
            item.storageLocation.toLowerCase().includes(searchTerm)
        );
    });

    // Display the filtered inventory
    displayInventory(filteredInventory);
}

// Function to toggle the inbound/outbound status of an item
function toggleIsInbound(index) {
    const inventory = JSON.parse(localStorage.getItem('inventory')) || [];
    if (!inventory[index].isInbound) {
        alert('The item is being processed!');
    }
    // Toggle isInbound status
    inventory[index].isInbound = !inventory[index].isInbound;

    // Save the updated inventory back to localStorage
    localStorage.setItem('inventory', JSON.stringify(inventory));

    // Update the table to display the new data
    displayInventory();
}

// Function to display inventory data in tables
function displayInventory(inventoryData) {
    const InboundTable = document.getElementById('InboundTable');
    const tbodyInbound = InboundTable.getElementsByTagName('tbody')[0];

    // Clear existing table rows
    tbodyInbound.innerHTML = '';

    const OutboundTable = document.getElementById('OutboundTable');
    const tbodyOutbound = OutboundTable.getElementsByTagName('tbody')[0];

    // Clear existing table rows
    tbodyOutbound.innerHTML = '';

    // Use the provided inventory data or retrieve it from localStorage
    const inventory = inventoryData || JSON.parse(localStorage.getItem('inventory')) || [];

    // Populate the tables with inventory data
    inventory.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.barcode}</td>
            <td>${item.itemName}</td>
            <td>${item.model}</td>
            <td>${item.qty}</td>
            <td>${item.storageLocation}</td>
            <td>${item.isInbound ? 'ΔΙΑΘΕΣΙΜΟ' : 'ΠΡΟΣ ΚΟΥΡΙΕΡ'}</td>
            <td><button class="btn btn-danger" onclick="toggleIsInbound(${inventory.indexOf(item)})">${item.isInbound ? 'Outbound' : 'Inbound'}</button></td>
        `;
        if (item.isInbound) {
            tbodyInbound.appendChild(row);
        } else {
            tbodyOutbound.appendChild(row);
        }
    });
}

// Call displayInventory() initially to load existing data
displayInventory();
