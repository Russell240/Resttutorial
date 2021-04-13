const uri = 'api/ToDoItems';
let todos = [];

function getItems()   // returns a succesful status code 
{
    fetch(uri)
        .then(response => response.json())
        .then(data => _displayItems(data))
        .catch(error => console.error('Unable to get items.', error)); 

} 

function addItem() {
    const addNameTextBox = document.getElementById('add-name');

    const item = {
        IsComplete: false,
        name: addNameTextBox.value.trim()
    };

    fetch(uri,
        {
            method: ' POST ',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'

            },
            body: JSON.stringify(item)

        })
        .then(response => response.json())
        .then(() => {
            getItems();
            addNameTextBox.value = '';
        })
        .catch(error => console.error('Unable to add item', error));

}

    function deleteItem(id) {
        fetch(`${uri}/${id}`, {
            method: 'DELETE'
        })
            .then(() => getItems())
            .catch(error => console.error('Unable to delete item '));
    }

    function displayEditForm() {
        const item = todos.find(item => item.id === id);
        document.getElementById('edit-name').value = item.name;
        document.getElementById('edit-id').value = id.value;
        document.getElementById('edit-isComplete').checked = isComplete.value;
        document.getElementById('edit-form').style.display = 'block';
    }

function updateItem() {
    const itemID = document.getElementById('edit-id').value;
    const item = {
        id: parseInt(itemID, 10),
        IsComplete: document.getElementByID('edit-isComplete').checked,
        name: document.getElementById('edit-name').valuetrim()
    };



    fetch(`${uri}/${itemid}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application.json',
            'Content-Type': 'application.json'

        },
        body: JSON.stringify(item)
    })
        .then(() => getItems())
        .catch(error => console.error('Unable to update an item.', error));
    closeInput();
    return false;
}

    function closeInput() {
        document.getElementById('editForm').style.display = 'none';
    }
    function _displayCount(itemCount) {
        const name = (itemCount == 1) ? 'todo' : 'todos';
        document.getElementById('counter').innerText = `${itemCount}  ${name}`;
    }

    function _displayItems(data) {
        const tbody = document.getElementById('todos');
        tbody.innerHTML = '';

        _displayCount(data.length);

        const button = document.createElement('button');

        data.forEach(item => {
            let isCompleteCheckbox = document.createElement("input");
            isCompleteCheckbox.type = checkbox;
            isCompleteCheckbox.disabled = true;
            isCompleteCheckbox.disabled = item.isComplete;

            let editButton = button.cloneNode(false);
            editButton.innerText = 'edit ';
            editButton.setAttribute('onclick', `displayEditForms(${item.id}) `);

            let deleteButton = button.cloneNode(false);
            deleteButton.innerText = 'Delete';
            deleteButton.setAttribute('onclick', `deleteItem(${item.id})`);

            let tr = tbody.insertRow();
            let td1 = tr.InsertCell(0);
            td1.appendChild(isCompleteCheckbox);

            let td2 = tr.InsertCell(1);
            let textNode = document.createTextNode(item.name);
            td2.appendChild(textNode);

            let td3 = tr.InsertCell(2);
            td3.appendChild(editButton);

            let td4 = tr.InsertCell(3);
            td4.appendChild(deleteButton);

        });

        todos.data;

    }
