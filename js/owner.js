
const postUrl = 'http://localhost:8762/owner/api/v1/owners/register';
const getAllUrl = 'http://localhost:8762/owner/api/v1/owners';
const getByIdUrl = 'http://localhost:8762/owner/api/v1/owners/';
const putUrl = 'http://localhost:8762/owner/api/v1/owners/';
const deleteUrl = 'http://localhost:8762/owner/api/v1/owners/delete/';

// Register a new owner
const form = document.getElementById('register-owner');
form.addEventListener('submit', function (event) {
    event.preventDefault();

    const formData = {
        name: document.getElementById('name').value,
        phone: document.getElementById('phone').value,
        email: document.getElementById('email').value
    };

    fetch(postUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            alert("Owner registered")
            console.log('Success:', data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
});


// Show all owners
function fetchAllOwners() {
    fetch(getAllUrl, {
        method: 'GET',
    })
        .then(response => response.json())
        .then(data => {
            const ownerList = document.getElementById('owner-list');
            ownerList.innerHTML = '';
            data.forEach(owner => {
                ownerList.innerHTML += `
                <tr>
                    <td>${owner.id}</td>
                    <td>${owner.name}</td>
                    <td>${owner.phone}</td>
                    <td>${owner.email}</td>
                </tr>`;
            });
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}
window.onload = fetchAllOwners;

// owner by ID
document.getElementById('search-owner').addEventListener('submit', function (event) {
    event.preventDefault();

    const ownerId = document.getElementById('search-id').value;

    fetch(`${getByIdUrl}/${ownerId}`, {
        method: 'GET',
    })
        .then(response => response.json())
        .then(data => {
            alert(`Owner found: Name: ${data.name}, Phone: ${data.phone}, Email: ${data.email}`);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
});

// Update an owner
document.getElementById('update-owner').addEventListener('submit', function (event) {
    event.preventDefault();

    const ownerId = document.getElementById('update-id').value;
    const updatedOwnerData = {
        name: document.getElementById('update-name').value,
        phone: document.getElementById('update-phone').value,
        email: document.getElementById('update-email').value
    };

    fetch(`${putUrl}/${ownerId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedOwnerData)
    })
        .then(response => response.json())
        .then(data => {
            alert('Owner updated successfully');
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
});

// Delete an owner
document.getElementById('delete-owner').addEventListener('submit', function (event) {
    event.preventDefault();

    const ownerId = document.getElementById('delete-id').value;

    fetch(`${deleteUrl}/${ownerId}`, {
        method: 'DELETE',
    })
        .then(() => {
            alert('Owner deleted successfully');
        })
        .catch((error) => {
            console.error('Error:', error);
        });
});


