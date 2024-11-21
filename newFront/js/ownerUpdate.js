const getAllUrl = 'http://localhost:8762/owner/api/v1/owners';
const putUrl = 'http://localhost:8762/owner/api/v1/owners/';
const getByIdUrl = 'http://localhost:8762/owner/api/v1/owners/'


// Obtener el modal y el botón de cierre
const registerModal = document.getElementById('updateModal');
const closeBtn = document.querySelector('.close');

// Función para abrir el modal con un mensaje
function openModal(message) {
    document.getElementById('modal-message').innerHTML = message;
    registerModal.style.display = 'block';
}

// Cierra el modal al hacer clic en el botón de cierre
closeBtn.onclick = function () {
    registerModal.style.display = 'none';
}

// Cierra el modal al hacer clic fuera del contenido
window.onclick = function (event) {
    if (event.target == registerModal) {
        registerModal.style.display = 'none';
    }
}

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


const urlParams = new URLSearchParams(window.location.search);
const ownerId = urlParams.get('ownerId');

    loadOwnerOptions(ownerId);

//Function for load OWNER ID in Update owner
function loadOwnerOptions(ownerId) {
    fetch(`${getByIdUrl}${ownerId}`, {
        method: 'GET',
    })
        .then(response => response.json())
        .then(owner => {
            // Llenamos los campos del formulario con los datos del propietario
            document.getElementById('update-id').value = owner.id;  // Asignamos el ID del propietario
            document.getElementById('update-name').value = owner.name;  // Asignamos el nombre
            document.getElementById('update-phone').value = owner.phone;  // Asignamos el teléfono
            document.getElementById('update-email').value = owner.email;  // Asignamos el correo electrónico
        })
        .catch(error => console.error('Error fetching owner data:', error));
}



