
const postUrl = 'http://localhost:8762/owner/api/v1/owners/register';
const getAllUrl = 'http://localhost:8762/owner/api/v1/owners';
const getByIdUrl = 'http://localhost:8762/owner/api/v1/owners/';
const putUrl = 'http://localhost:8762/owner/api/v1/owners/';
const deleteUrl = 'http://localhost:8762/owner/api/v1/owners/delete';


// call modal an close button
const registerModal = document.getElementById('registerModal');
const closeBtn = document.querySelector('.close');

// Open modal with a message
function openModal(message) {
    document.getElementById('modal-message').innerHTML = message;
    registerModal.style.display = 'block';
}

// Close modal with button
closeBtn.onclick = function () {
    registerModal.style.display = 'none';
}

// Close modal clicking anywhere
window.onclick = function (event) {
    if (event.target == registerModal) {
        registerModal.style.display = 'none';
    }
}


// -------------------- REGISTER OWNER SECTION ------------------------
/*const form = document.getElementById('register-owner');
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
            openModal("Owner registered successfully!");
            console.log('Success:', data);

            setTimeout(() => {
                window.location.reload();
            }, 2000);

        })
        .catch(error => {
            openModal('Error: ' + error.message);
            console.error('Error:', error);
        });
});*/


// ------------------------- SHOW OWNERS SECTION -----------------------------
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
                    <td>
                        <div class="options-container">
                            <button class="action-button" onclick="toggleOptions(this)">...</button>
                                <div class="options-menu" style="display: none;">
                                    <button onclick="redirectToUpdate(${owner.id})">Update</button>
                                    <button onclick="showDeleteConfirmModal(${owner.id})">Delete</button>
                                </div>
                        </div>
                    </td>
                </tr>`;
            });
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

//function to close selection Update an Delete
function toggleOptions(button) {
    const optionsMenu = button.nextElementSibling;

    const isVisible = optionsMenu.style.display === 'block';
    document.querySelectorAll('.options-menu').forEach(menu => menu.style.display = 'none');
    optionsMenu.style.display = isVisible ? 'none' : 'block';
}

document.addEventListener('click', (event) => {
    const isButton = event.target.matches('.action-button');
    const isMenu = event.target.closest('.options-menu');

    if (!isButton && !isMenu) {
        document.querySelectorAll('.options-menu').forEach(menu => menu.style.display = 'none');
    }
});

//Function that allows pass the id Owner to update data
function redirectToUpdate(ownerId) {
    window.location.href = `newFront/html/ownerUpdate.html?ownerId=${ownerId}`;
}


// ------------------------- FIND BY ID SECTION --------------------
/*document.getElementById('search-owner').addEventListener('submit', function (event) {
    event.preventDefault();

    const ownerId = document.getElementById('search-id').value;

    fetch(`${getByIdUrl}/${ownerId}`, {
        method: 'GET',
    })
        .then(response => response.json())
        .then(data => {
            openModal(`Owner found: <br> Name: ${data.name} <br> Phone: ${data.phone} <br> Email: ${data.email}`);

            console.log('Success:', data);

        })
        .catch((error) => {
            console.error('Error:', error);
        });
});*/


// ----------------------- UPDATE OWNER SECTION ----------------------------------
/*document.getElementById('update-owner').addEventListener('submit', function (event) {
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

            openModal("Owner updated successfully");
            console.log('Success:', data);

            setTimeout(() => {
                window.location.reload();
            }, 1500);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
});

//Function for load OWNER ID in Update owner
function loadOwnerOptions() {
    fetch(getAllUrl, {
        method: 'GET',
    })
        .then(response => response.json())
        .then(data => {
            const ownerSelect = document.getElementById('update-id');
            ownerSelect.innerHTML = '<option value="">Select an Owner</option>';

            const ownerInfo = {};

            data.forEach(owner => {
                const option = document.createElement('option');
                option.value = owner.id;
                option.text = `${owner.id}`;
                ownerSelect.appendChild(option);

                ownerInfo[owner.id] = owner;
            });

            ownerSelect.addEventListener('change', function () {
                const selectedOwnerId = ownerSelect.value;

                const owner = ownerInfo[selectedOwnerId]
                document.getElementById('update-name').value = owner.name;
                document.getElementById('update-phone').value = owner.phone;
                document.getElementById('update-email').value = owner.email;

            });

        })
        .catch(error => console.error('Error fetching owner data:', error));
}*/

window.onload = function () {
    //loadOwnerOptions();
    fetchAllOwners();
};


// Delete an owner (OLD FUNCTION) 
/*document.getElementById('delete-owner').addEventListener('submit', function (event) {
    event.preventDefault();

    const ownerId = document.getElementById('delete-id').value;

    fetch(`${deleteUrl}/${ownerId}`, {
        method: 'DELETE',
    })
        .then(() => {
            openModal('Owner deleted successfully');
            setTimeout(() => {
                window.location.reload();
            }, 1500)

        })
        .catch((error) => {
            console.error('Error:', error);
        });
});*/

// ---------------------------- DELETE SECTION -------------------------------------

let ownerIdToDelete = null;

// ---- MODAL ---
// Show Confirm delete
function showDeleteConfirmModal(ownerId) {
    ownerIdToDelete = ownerId;
    document.getElementById('deleteConfirmModal').style.display = 'block';
}

// Close Confirm delete
function closeDeleteConfirmModal() {
    document.getElementById('deleteConfirmModal').style.display = 'none';
}


//------- New function delete ----

function deleteOwner() {
    fetch(`${deleteUrl}/${ownerIdToDelete}`, { method: 'DELETE' })
        .then(response => {
            if (response.ok) {
                closeDeleteConfirmModal();
                document.getElementById('registerModal').style.display = 'block';
                document.getElementById('modal-message').innerText = 'Owner deleted successfully';
                fetchAllOwners();
            } else {
                console.error('Failed to delete owner');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

// Event listeners for bottons
document.getElementById('confirmDeleteBtn').addEventListener('click', deleteOwner);
document.getElementById('cancelDeleteBtn').addEventListener('click', closeDeleteConfirmModal);
