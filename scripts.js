function storeData() {
    const barcode = document.getElementById('barcode').value;
    const itemName = document.getElementById('itemName').value;
    const model = document.getElementById('sku').value; // Changed from 'model' to 'sku'
    const qty = document.getElementById('qty').value;
    const storageLocation = document.getElementById('storageLocation').value;
    const isInbound = false;

    const warehouseItem = {
        barcode,
        itemName,
        model, // Changed from 'sku' to 'model'
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

function searchInventory() {
    const searchTerm = document.getElementById('search').value.toLowerCase();
    const inventory = JSON.parse(localStorage.getItem('inventory')) || [];

    const filteredInventory = inventory.filter(item => {
        return (
            item.barcode.toLowerCase().includes(searchTerm) ||
            item.itemName.toLowerCase().includes(searchTerm) ||
            item.model.toLowerCase().includes(searchTerm) || // Changed from 'sku' to 'model'
            item.storageLocation.toLowerCase().includes(searchTerm)
        );
    });

    displayInventory(filteredInventory);
}

function toggleIsInbound(index) {
    const inventory = JSON.parse(localStorage.getItem('inventory')) || [];
    if(!inventory[index].isInbound ){
        alert('The robot is doing something!');
    }
    // Toggle isInbound status
    inventory[index].isInbound = !inventory[index].isInbound;

    // Save the updated inventory back to localStorage
    localStorage.setItem('inventory', JSON.stringify(inventory));

    // Update the table to display the new data
    displayInventory();
}

function displayInventory(inventoryData) {
    const InboundTable = document.getElementById('InboundTable');
    const tbodyinbound = InboundTable.getElementsByTagName('tbody')[0];

    // Clear existing table rows
    tbodyinbound.innerHTML = '';

    
    const OutboundTable = document.getElementById('OutboundTable');
    const tbodyOutbound = OutboundTable.getElementsByTagName('tbody')[0];

    // Clear existing table
