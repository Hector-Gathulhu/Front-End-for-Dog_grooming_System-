const postUrl = 'http://localhost:8762/appointment/api/v1/appointment/register';
const getAllUrl = 'http://localhost:8762/appointment/api/v1/appointment/appointments';
const getByNameUrl = 'http://localhost:8762/appointment/api/v1/appointment/search';
const putUrl = 'http://localhost:8762/appointment/api/v1/appointment/3/update';
const deleteUrl = 'http://localhost:8762/appointment/api/v1/appointment/delete';

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
            alert("Dog registered")
            console.log('Success:', data);
            window.location.reload();
        })
        .catch(error => {
            console.error('Error:', error);
        });
});

function loadDogOptions() {
    fetch('http://localhost:8762/dog/api/v1/dog/allDogs', {
        method: 'GET',
    })
        .then(response => response.json())
        .then(data => {
            const dogSelect = document.getElementById('dog-id');
            dogSelect.innerHTML = '';

            const dogOwner = {};

            data.forEach(dog => {
                const option = document.createElement('option');
                option.value = dog.id;
                option.text = `${dog.id}: ${dog.name}`;
                dogSelect.appendChild(option);

                dogOwner[dog.id] = dog.owner.id;
            });

            dogSelect.addEventListener('change', function () {
                const selectedDogId = dogSelect.value;
                const ownerIdField = document.getElementById('owner-id');
                ownerIdField.value = dogOwner[selectedDogId] || '';
            });

        })
        .catch(error => console.error('Error fetching dog data:', error));
}

window.onload = function () {
    loadDogOptions();
    fetchAllAppoitnments();
};


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
        dateTime: document.getElementById('').value,
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
            alert('Dog updated successfully');
            console.log('Success:', data);
            window.location.reload();
        })
        .catch((error) => {
            console.error('Error:', error);
        });
});

// Delete an appointment
document.getElementById('delete-appointment').addEventListener('submit', function (event) {
    event.preventDefault();

    const appointmentId = document.getElementById('delete-id').value;

    fetch(`${deleteUrl}/${appointmentId}`, {
        method: 'DELETE',
    })
        .then(() => {
            alert('Dog deleted successfully');
            window.location.reload();
        })
        .catch((error) => {
            console.error('Error:', error);
        });
});