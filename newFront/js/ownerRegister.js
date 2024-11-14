const postUrl = 'http://localhost:8762/owner/api/v1/owners/register';


// Obtener el modal y el botón de cierre
const registerModal = document.getElementById('registerModal');
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
});