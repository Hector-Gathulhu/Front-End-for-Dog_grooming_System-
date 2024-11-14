const postUrl = 'http://localhost:8762/appointment/api/v1/appointment/register';
const getAllUrl = 'http://localhost:8762/appointment/api/v1/appointment/appointments';
const getByNameUrl = 'http://localhost:8762/appointment/api/v1/appointment/search';
const putUrl = 'http://localhost:8762/appointment/api/v1/appointment/update';
const deleteUrl = 'http://localhost:8762/appointment/api/v1/appointment/delete';
const getOwners = 'http://localhost:8762/owner/api/v1/owners';
const getDogs = 'http://localhost:8762/dog/api/v1/dog/allDogs';

// MODAL message
const registerModal = document.getElementById('appointment-modal');
const closeBtn = document.querySelector('.close');

function openApointModal(message) {
    document.getElementById('appointment-modal-message').innerHTML = message;
    registerModal.style.display = 'block';
}

closeBtn.onclick = function () {
    registerModal.style.display = 'none';
}

window.onclick = function (event) {
    if (event.target == registerModal) {
        registerModal.style.display = 'none';
    }
}


// Register a new appointment
const form = document.getElementById('register-appointment');
form.addEventListener('submit', function (event) {
    event.preventDefault();

    const formData = {
        dogId: document.getElementById('dog-id').value,
        ownerId: document.getElementById('owner-id').value,
        bathType: document.getElementById('bath-type').value,
        dateTime: document.getElementById('date_time').value
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
            openApointModal("Appointment registered")
            console.log('Success:', data);

            setTimeout(() => {
                window.location.reload();
            }, 2000);
        })
        .catch(error => {
            console.error('Error:', error);
        });
});

//Function for load DOGs in register Apointment (SELECT)
function loadDogOptions() {
    fetch(getDogs, {
        method: 'GET',
    })
        .then(response => response.json())
        .then(data => {
            const dogSelect = document.getElementById('dog-id');
            dogSelect.innerHTML = '<option value="">Select a Dog</option>';

            const dogOwnerInfo = {};

            data.forEach(dog => {
                const option = document.createElement('option');
                option.value = dog.id;
                option.text = `${dog.id}: ${dog.name}`;
                dogSelect.appendChild(option);


                dogOwnerInfo[dog.id] = {
                    id: dog.owner.id,
                    name: dog.owner.name,
                    phone: dog.owner.phone
                };

            });

            dogSelect.addEventListener('change', function () {
                const selectedDogId = dogSelect.value;
                if (dogOwnerInfo[selectedDogId]) {
                    // Update owner information table
                    document.getElementById('owner-info-id').textContent = dogOwnerInfo[selectedDogId].id;
                    document.getElementById('owner-info-name').textContent = dogOwnerInfo[selectedDogId].name;
                    document.getElementById('owner-info-phone').textContent = dogOwnerInfo[selectedDogId].phone;
                } else {
                    // Clear table if no dog is selected
                    document.getElementById('owner-info-id').textContent = '';
                    document.getElementById('owner-info-name').textContent = '';
                    document.getElementById('owner-info-phone').textContent = '';
                }

            });
        })
        .catch(error => console.error('Error fetching dog data:', error));
}




// Show all appointments
function fetchAllAppoitnments() {
    fetch(getAllUrl, {
        method: 'GET',
    })
        .then(response => response.json())
        .then(data => {
            const appointmentList = document.getElementById('appointment-list');
            appointmentList.innerHTML = '';
            data.forEach(appointment => {

                const date = new Date(appointment.dateTime);

                const newDate = date.toLocaleDateString('es-ES') + ' ' + date.toLocaleTimeString('es-ES', {
                    hour: '2-digit',
                    minute: '2-digit'
                });

                appointmentList.innerHTML += `
                <tr>
                    <td>${appointment.id}</td>
                    <td>${appointment.dog.id}: ${appointment.dog.name} </td>
                    <td>${appointment.owner.id}</td>
                    <td>${appointment.bathType}</td>
                    <td>${newDate}</td>
                </tr>`;
            });
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

// appointmet by dog name
/*document.getElementById('search-appointment').addEventListener('submit', function (event) {
    event.preventDefault();

    const dogName = document.getElementById('search-dog-name').value;

    fetch(`${getByNameUrl}/${dogName}`, {
        method: 'GET',
    })
        .then(response => response.json())
        .then(data => {
            alert(`Appointment found: Id: ${data[0].id}, Name: ${data[0].name}, Owner phone: ${data[0].ownerPhone}, Bath type: ${data[0].bathType}, Owner: ${data[0].owner.id}`);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
});*/


// Update an appointment
document.getElementById('update-appointment').addEventListener('submit', function (event) {
    event.preventDefault();

    const appointmentId = document.getElementById('update-id').value;
    const updatedAppointmentData = {
        dogId: document.getElementById('update-dog-id').value,
        ownerId: document.getElementById('update-owner-id').value,
        bathType: document.getElementById('update-bath-type').value,
        dateTime: document.getElementById('update_date_time').value,
    };

    fetch(`${putUrl}/${appointmentId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedAppointmentData)
    })
        .then(response => response.json())
        .then(data => {
            openApointModal('Dog updated successfully');

            console.log('Success:', data);
            setTimeout(() => {
                window.location.reload();
            }, 1500);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
});

// Function to load appointment IDs into the update appointment select field
function loadAppointmentOptions() {
    fetch(getAllUrl, {
        method: 'GET',
    })
        .then(response => response.json())
        .then(data => {
            const appointmentSelect = document.getElementById('update-id');
            appointmentSelect.innerHTML = '<option value="">Select Appointment ID</option>'; // Clear existing options

            data.forEach(appointment => {
                const option = document.createElement('option');
                option.value = appointment.id;
                option.text = `ID: ${appointment.id}`;
                appointmentSelect.appendChild(option);
            });

            // Add event listener for auto-filling fields when an appointment ID is selected
            appointmentSelect.addEventListener('change', function () {
                const selectedAppointmentId = appointmentSelect.value;
                if (selectedAppointmentId) {
                    autoFillAppointmentFields(selectedAppointmentId);
                } else {
                    clearUpdateFields(); // Clear fields if no ID is selected
                }
            });
        })
        .catch(error => console.error('Error fetching appointments:', error));
}

// Function to auto-fill fields based on selected appointment ID
function autoFillAppointmentFields(appointmentId) {
    fetch(`${getAllUrl}/${appointmentId}`, {
        method: 'GET'
    })
        .then(response => response.json())
        .then(appointment => {
            document.getElementById('update-dog-id').value = appointment.dog.id;
            document.getElementById('update-owner-id').value = appointment.owner.id;
            document.getElementById('update-bath-type').value = appointment.bathType;
            document.getElementById('update_date_time').value = new Date(appointment.dateTime).toISOString().slice(0, -1);
        })
        .catch(error => console.error('Error fetching appointment details:', error));
}

// Clear fields when no appointment is selected
function clearUpdateFields() {
    document.getElementById('update-dog-id').value = '';
    document.getElementById('update-owner-id').value = '';
    document.getElementById('update-bath-type').value = '';
    document.getElementById('update_date_time').value = '';
}



// Delete an appointment
document.getElementById('delete-appointment').addEventListener('submit', function (event) {
    event.preventDefault();

    const appointmentId = document.getElementById('delete-id').value;

    fetch(`${deleteUrl}/${appointmentId}`, {
        method: 'DELETE',
    })
        .then(() => {
            openApointModal('Appointment deleted successfully');
            setTimeout(() => {
                window.location.reload();
            }, 1500);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
});


window.onload = function () {
    loadDogOptions();
    fetchAllAppoitnments();
    loadAppointmentOptions();
};