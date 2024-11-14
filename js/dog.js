const postUrl = 'http://localhost:8762/dog/api/v1/dog/register';
const getAllUrl = 'http://localhost:8762/dog/api/v1/dog/allDogs';
const getByIdUrl = 'http://localhost:8762/dog/api/v1/dog/dogs';
const putUrl = 'http://localhost:8762/dog/api/v1/dog/update';
const deleteUrl = 'http://localhost:8762/dog/api/v1/dog/delete';
const getOwners = 'http://localhost:8762/owner/api/v1/owners';

// Obtener el modal y el botón de cierre
const registerModal = document.getElementById('dog-modal');
const closeBtn = document.querySelector('.close');

// Función para abrir el modal con un mensaje
function openDogModal(message) {
    document.getElementById('dog-modal-message').innerHTML = message;  // Mensaje en el modal
    registerModal.style.display = 'block';  // Mostrar el modal
}

// Cierra el modal al hacer clic en el botón de cierre
closeBtn.onclick = function () {
    registerModal.style.display = 'none';  // Ocultar el modal
}

// Cierra el modal al hacer clic fuera del contenido
window.onclick = function (event) {
    if (event.target == registerModal) {  // Si el clic es fuera del contenido
        registerModal.style.display = 'none';  // Ocultar el modal
    }
}


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
            openDogModal("Dog registered!");
            console.log('Success:', data);

            setTimeout(() => {
                window.location.reload();
            }, 2000);
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

// function load owner for select owner ID in Register
function loadOwnerOptions() {
    fetch(getOwners, {
        method: 'GET'
    })
        .then(response => response.json())
        .then(data => {
            const ownerSelect = document.getElementById('dog-owner');
            ownerSelect.innerHTML = '<option value="">Select an option</option>';
            data.forEach(owner => {
                const option = document.createElement('option');
                option.value = owner.id;
                option.textContent = `ID: ${owner.id} - Name: ${owner.name}`;
                ownerSelect.appendChild(option);
            });
        })
        .catch(error => console.error('Error fetching owner data:', error));
}


// dog by ID
document.getElementById('search-dog').addEventListener('submit', function (event) {
    event.preventDefault();

    const dogId = document.getElementById('search-id').value;

    fetch(`${getByIdUrl}/${dogId}`, {
        method: 'GET',
    })
        .then(response => response.json())
        .then(data => {
            openDogModal(`Dog found:<br>Name: ${data.name}<br>Age: ${data.age}<br>Owner: ${data.owner.id}`);
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
            openDogModal('Dog updated successfully');
            console.log('Success:', data);

            setTimeout(() => {
                window.location.reload();
            }, 1500)

        })
        .catch((error) => {
            console.error('Error:', error);
        });
});

// select dog id for update section
function loadDogsUpdate() {
    fetch(getAllUrl, {
        method: 'GET',
    })
        .then(response => response.json())
        .then(data => {
            const dogSelect = document.getElementById('update-id');
            dogSelect.innerHTML = '<option value="">Select a Dog</option>';

            const dogInfo = {};

            data.forEach(dog => {
                const option = document.createElement('option');
                option.value = dog.id;
                option.text = `${dog.id}`;
                dogSelect.appendChild(option);

                dogInfo[dog.id] = dog;
            });

            dogSelect.addEventListener('change', function () {
                const selectedDogId = dogSelect.value;
                const dog = dogInfo[selectedDogId];

                document.getElementById('update-name').value = dog.name;
                document.getElementById('update-age').value = dog.age;
                loadOwnerUpdate(dog.owner.id);
            });
        })
        .catch(error => console.error('Error fetching dog data:', error));
}

//select owner id for update 
function loadOwnerUpdate(currentOwnerId) {
    fetch(getOwners, {
        method: 'GET',
    })
        .then(response => response.json())
        .then(owners => {
            const ownerSelect = document.getElementById('update-owner');
            ownerSelect.innerHTML = '';

            // Primero agregamos el dueño actual como opción seleccionada
            owners.forEach(owner => {
                const option = document.createElement('option');
                option.value = owner.id;
                option.text = `${owner.id} - ${owner.name}`;
                if (owner.id === currentOwnerId) {
                    option.selected = true;
                }
                ownerSelect.appendChild(option);
            });
        })
        .catch(error => console.error('Error fetching owner data:', error));
}


// Delete a dog
document.getElementById('delete-dog').addEventListener('submit', function (event) {
    event.preventDefault();

    const dogId = document.getElementById('delete-id').value;

    fetch(`${deleteUrl}/${dogId}`, {
        method: 'DELETE',
    })
        .then(() => {
            openDogModal('Dog deleted successfully');

            setTimeout(() => {
                window.location.reload();
            }, 1500)
        })
        .catch((error) => {
            console.error('Error:', error);
        });
});

window.onload = function () {
    fetchAllDogs();
    loadOwnerOptions();
    loadDogsUpdate();
};