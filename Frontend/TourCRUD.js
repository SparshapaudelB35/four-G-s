
function onFormSubmit() {
    const formData = {
      name: document.getElementById('1').value,
      number: document.getElementById('2').value,
      people: document.getElementById('3').value,
      place: document.getElementById('4').value,
      fromDate: document.getElementById('5').value,
      toDate: document.getElementById('6').value,
      price: document.getElementById('7').value
    };

    if (!formData.name || !formData.number || !formData.people || !formData.place || !formData.fromDate || !formData.toDate || !formData.price) {
        alert('All fields must be filled!');
        return false; // Stop form submission
      }

    const selectedRow = document.querySelector('input[type="submit"]').getAttribute('data-row');
    if (selectedRow) {
      updateRow(selectedRow, formData);
    } else {
      addRow(formData);
    }
  
    // Reset the form
    document.querySelector('form').reset();
    document.querySelector('input[type="submit"]').removeAttribute('data-row');
  }
  
  // Function to add a new row to the table
  function addRow(data) {
    const table = document.getElementById('storelist').getElementsByTagName('tbody')[0];
    const newRow = table.insertRow(table.rows.length);
  
    const cell1 = newRow.insertCell(0);
    const cell2 = newRow.insertCell(1);
    const cell3 = newRow.insertCell(2);
    const cell4 = newRow.insertCell(3);
    const cell5 = newRow.insertCell(4);
    const cell6 = newRow.insertCell(5);
    const cell7 = newRow.insertCell(6);
    const cell8 = newRow.insertCell(7);
  
    cell1.innerHTML = data.name;
    cell2.innerHTML = data.number;
    cell3.innerHTML = data.people;
    cell4.innerHTML = data.place;
    cell5.innerHTML = data.fromDate;
    cell6.innerHTML = data.toDate;
    cell7.innerHTML = data.price;
    cell8.innerHTML = `<a onClick="onEdit(this)">Edit</a> <a onClick="onDelete(this)">Delete</a>`;
  }
  
  // Function to update an existing row
  function updateRow(rowIndex, data) {
    const table = document.getElementById('storelist').getElementsByTagName('tbody')[0];
    const row = table.rows[rowIndex];
  
    row.cells[0].innerHTML = data.name;
    row.cells[1].innerHTML = data.number;
    row.cells[2].innerHTML = data.people;
    row.cells[3].innerHTML = data.place;
    row.cells[4].innerHTML = data.fromDate;
    row.cells[5].innerHTML = data.toDate;
    row.cells[6].innerHTML = data.price;
  }
  
  // Function to edit a row
  function onEdit(td) {
    const row = td.parentElement.parentElement;
    const cells = row.getElementsByTagName('td');
  
    document.getElementById('1').value = cells[0].innerHTML;
    document.getElementById('2').value = cells[1].innerHTML;
    document.getElementById('3').value = cells[2].innerHTML;
    document.getElementById('4').value = cells[3].innerHTML;
    document.getElementById('5').value = cells[4].innerHTML;
    document.getElementById('6').value = cells[5].innerHTML;
    document.getElementById('7').value = cells[6].innerHTML;
  
    document.querySelector('input[type="submit"]').setAttribute('data-row', row.rowIndex - 1);
  }
  
  // Function to delete a row
  function onDelete(td) {
    if (confirm('Are you sure you want to delete this record?')) {
      const row = td.parentElement.parentElement;
      document.getElementById('storelist').deleteRow(row.rowIndex);
    }
  }