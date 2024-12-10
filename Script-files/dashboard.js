document.addEventListener('DOMContentLoaded', function() {
    // Load the saved schedule from localStorage
    loadSchedule();
    loadReceipts();

    // Function to save the schedule to localStorage
    function saveSchedule() {
        const scheduleTable = document.querySelector('.schedule-table tbody');
        const scheduleData = [];

        for (let row of scheduleTable.rows) {
            const rowData = {};
            rowData['employee'] = row.cells[0].innerText;
            rowData['schedule'] = [];
            for (let i = 1; i < row.cells.length; i++) {
                rowData['schedule'].push(row.cells[i].innerText);
            }
            scheduleData.push(rowData);
        }

        localStorage.setItem('scheduleData', JSON.stringify(scheduleData));
        alert('Schedule saved successfully!');
    }

    // Function to load the schedule from localStorage
    function loadSchedule() {
        const scheduleData = JSON.parse(localStorage.getItem('scheduleData'));

        if (scheduleData) {
            const scheduleTable = document.querySelector('.schedule-table tbody');

            for (let i = 0; i < scheduleTable.rows.length; i++) {
                const row = scheduleTable.rows[i];
                const rowData = scheduleData[i];
                row.cells[0].innerText = rowData['employee'];
                for (let j = 1; j < row.cells.length; j++) {
                    row.cells[j].innerText = rowData['schedule'][j - 1];
                }
            }
        }
    }

    // Attach saveSchedule function to the save button
    document.getElementById('save-schedule-btn').addEventListener('click', saveSchedule);
});

function loadReceipts() {
    var receipts = JSON.parse(localStorage.getItem('receipts')) || [];
    var receiptList = document.getElementById('receipt-list');

    receipts.forEach(function(receipt) {
        var receiptContent = `<h2>Receipt for ${receipt.name}</h2>`;
        receiptContent += `<ul>`;
        receipt.items.forEach(function(item) {
            receiptContent += `<li>${item.title} - ${item.quantity} x ${item.price}</li>`;
        });
        receiptContent += `</ul><strong>Total: ${receipt.total}</strong><br><small>${receipt.timestamp}</small>`;

        var receiptContainer = document.createElement('div');
        receiptContainer.classList.add('receipt-container');
        receiptContainer.innerHTML = receiptContent;
        receiptList.appendChild(receiptContainer);
    });
}
