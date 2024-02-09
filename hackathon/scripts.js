// Importing AE libraries
const { Node, Universal } = require('@aeternity/aepp-sdk');
const { Crypto } = require('@aeternity/aepp-sdk/es/utils');
const { AE_AMOUNT_FORMATS } = require('@aeternity/aepp-sdk/es/utils/amount-formatter');

// Initialize AE SDK
const node = new Node({ url: 'http://localhost:3013' });
const client = await Universal({
  nodes: [{ name: 'test', instance: node }],
  compilerUrl: 'http://localhost:3080'
});

// Contract address and instance
const contractAddress = 'your_contract_address_here';
const contractInstance = await client.getContractInstance(contractSource, { contractAddress });

// Handle add roommate form submission
document.getElementById('addRoommateForm').addEventListener('submit', async (event) => {
  event.preventDefault();
  const name = document.getElementById('roommateName').value.trim();
  if (name !== '') {
    try {
      await contractInstance.methods.addRoommate(name);
      alert('Roommate added successfully!');
      // Reload roommates list
      await displayRoommates();
    } catch (error) {
      console.error('Error adding roommate:', error);
      alert('Error adding roommate. Please try again.');
    }
  }
});

// Handle add expense form submission
document.getElementById('addExpenseForm').addEventListener('submit', async (event) => {
  event.preventDefault();
  const description = document.getElementById('expenseDescription').value.trim();
  const amount = parseInt(document.getElementById('expenseAmount').value);
  if (description !== '' && !isNaN(amount) && amount > 0) {
    try {
      await contractInstance.methods.addExpense(description, amount);
      alert('Expense added successfully!');
      // Reload expenses list
      await displayExpenses();
    } catch (error) {
      console.error('Error adding expense:', error);
      alert('Error adding expense. Please try again.');
    }
  }
});

// Display roommates
async function displayRoommates() {
  const roommatesList = document.getElementById('roommatesList');
  roommatesList.innerHTML = '';
  const roommates = await contractInstance.methods.showRoommates();
  roommates.forEach((roommate) => {
    const listItem = document.createElement('li');
    listItem.textContent = roommate.name;
    roommatesList.appendChild(listItem);
  });
}

// Display expenses
