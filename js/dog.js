const postUrl = 'http://localhost:8762/dog/api/v1/dog/register';
const getAllUrl = 'http://localhost:8762/dog/api/v1/dog/allDogs';
const getByIdUrl = 'http://localhost:8762/dog/api/v1/dog/dogs';
const putUrl = 'http://localhost:8762/dog/api/v1/dog/update';
const deleteUrl = 'http://localhost:8762/dog/api/v1/dog/delete';

// Register a new dog
const form = document.getElementById('register-dog');
form.addEventListener('submit', function (event) {
    event.preventDefault();

    const formData = {
        name: document.getElementById('dog-name').value,
        age: document.getElementById('dog-age').value,
        ownerId: document.getElementById('dog-owner').value
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
            alert("Dog registered")
            console.log('Success:', data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
});

// Show all dogs
function fetchAllDogs() {
    fetch(getAllUrl, {
        method: 'GET',
    })
        .then(response => response.json())
        .then(data => {
            const dogList = document.getElementById('dog-list');
            dogList.innerHTML = '';
            data.forEach(dog => {
                dogList.innerHTML += `
                <tr>
                    <td>${dog.id}</td>
                    <td>${dog.name}</td>
                    <td>${dog.age}</td>
                    <td>${dog.owner.id}</td>
                </tr>`;
            });
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

window.onload = fetchAllDogs;


// dog by ID
document.getElementById('search-dog').addEventListener('submit', function (event) {
    event.preventDefault();

    const dogId = document.getElementById('search-id').value;

    fetch(`${getByIdUrl}/${dogId}`, {
        method: 'GET',
    })
        .then(response => response.json())
        .then(data => {
            alert(`Dog found: Name: ${data.name}, Age: ${data.age}, Owner: ${data.owner.id}`);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
});

// Update a dog
document.getElementById('update-dog').addEventListener('submit', function (event) {
    event.preventDefault();

    const dogId = document.getElementById('update-id').value;
    const updatedDogData = {
        name: document.getElementById('update-name').value,
        age: document.getElementById('update-age').value,
        ownerId: document.getElementById('update-owner').value
    };

    fetch(`${putUrl}/${dogId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedDogData)
    })
        .then(response => response.json())
        .then(data => {
            alert('Dog updated successfully');
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
});

// Delete a dog
document.getElementById('delete-dog').addEventListener('submit', function (event) {
    event.preventDefault();

    const dogId = document.getElementById('delete-id').value;

    fetch(`${deleteUrl}/${dogId}`, {
        method: 'DELETE',
    })
        .then(() => {
            alert('Dog deleted successfully');
        })
        .catch((error) => {
            console.error('Error:', error);
        });
});