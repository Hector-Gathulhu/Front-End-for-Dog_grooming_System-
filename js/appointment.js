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
        name: document.getElementById('dog-name').value,
        ownerPhone: document.getElementById('owner-phone').value,
        bathType: document.getElementById('bath-type').value,
        ownerId: document.getElementById('owner-id').value,
        dogId: document.getElementById('dog-id').value,
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
                appointmentList.innerHTML += `
                <tr>
                    <td>${appointment.id}</td>
                    <td>${appointment.name}</td>
                    <td>${appointment.ownerPhone}</td>
                    <td>${appointment.bathType}</td>
                    <td>${appointment.owner.id}</td>
                </tr>`;
            });
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

window.onload = fetchAllAppoitnments;


// appointmet by dog name
document.getElementById('search-appointment').addEventListener('submit', function (event) {
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
});

// Update an appointment
document.getElementById('update-appointment').addEventListener('submit', function (event) {
    event.preventDefault();

    const appointmentId = document.getElementById('update-id').value;
    const updatedAppointmentData = {
        name: document.getElementById('update-dog-name').value,
        ownerPhone: document.getElementById('update-owner-phone').value,
        bathType: document.getElementById('update-bath-type').value,
        owner: document.getElementById('update-owner-id').value,
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
        })
        .catch((error) => {
            console.error('Error:', error);
        });
});