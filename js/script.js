function showInputs() {
    var tipoPersona = document.getElementById("tipoPersona").value;
    var formFisica = document.getElementById("form-persona-fisica");
    var formJuridica = document.getElementById("form-persona-juridica");

    if (tipoPersona === "fisica") {
        formFisica.style.display = "block";
        formJuridica.style.display = "none";
        toggleRequiredFields(formFisica, ["nombre-fisica", "apellido-fisica", "mail-fisica", "doc-fisica"], true);
        toggleRequiredFields(formJuridica, ["nombre-juridica", "cuit-juridica", "mail-juridica", "razonsocial","tipoOrganizacion","rubro"], false);
    } else if (tipoPersona === "juridica") {
        formFisica.style.display = "none";
        formJuridica.style.display = "block";
        toggleRequiredFields(formFisica, ["nombre-fisica", "apellido-fisica", "mail-fisica", "doc-fisica"], false);
        toggleRequiredFields(formJuridica, ["nombre-juridica", "cuit-juridica", "mail-juridica", "razonsocial","tipoOrganizacion","rubro"], true);
    } else {
        formFisica.style.display = "none";
        formJuridica.style.display = "none";
        toggleRequiredFields(formFisica, ["nombre-fisica", "apellido-fisica", "mail-fisica", "doc-fisica"], false);
        toggleRequiredFields(formJuridica, ["nombre-juridica", "cuit-juridica", "mail-juridica", "razonsocial","tipoOrganizacion","rubro"], false);
    }
}

function showDocInputs() {
    const selectedValue = document.getElementById('tipoDocumento').value;
    const inputContainer = document.getElementById('DocumentoInputContainer');

    inputContainer.innerHTML = '';

    if (selectedValue !== 'nada') {
        const newInput = document.createElement('input');
        newInput.type = 'text';
        newInput.className = 'form-control';
        newInput.placeholder = `Ingrese su numero de ${selectedValue}`;

        inputContainer.appendChild(newInput);
    }
}

function toggleSituacionInput() {
    const situacionValue = document.querySelector('input[name="situacion"]:checked').value;
    const inputContainer = document.getElementById('SituacioninputContainer');


    inputContainer.innerHTML = '';

    if (situacionValue === 'domicilio') {
        const domicilioInput = document.createElement('input');
        domicilioInput.type = 'text';
        domicilioInput.className = 'form-control domicilio-input';
        domicilioInput.placeholder = 'Ingrese Domicilio';

        inputContainer.appendChild(domicilioInput);
    }
}
document.addEventListener('DOMContentLoaded', function() {
    const radioButtons = document.querySelectorAll('input[name="menores"]');
    const addMoreButton = document.getElementById('addMoreButton');

    radioButtons.forEach(radio => {
        radio.addEventListener('change', function() {
            showInputsMenores();
            toggleAddMoreButton();
        });
    });

    addMoreButton.addEventListener('click', addMoreInputs);
});

function showInputsMenores() {
    const selectedValue = document.querySelector('input[name="menores"]:checked').value;
    const inputContainer = document.getElementById('inputContainerMenores');

    inputContainer.innerHTML = '';

    if (selectedValue === 'si') {
        addMoreInputs();
    }
}

function toggleAddMoreButton() {
    const selectedValue = document.querySelector('input[name="menores"]:checked').value;
    const addMoreButton = document.getElementById('addMoreButton');

    if (selectedValue === 'si') {
        addMoreButton.style.display = 'block';
    } else {
        addMoreButton.style.display = 'none';
    }
}

function addMoreInputs() {
    const inputContainer = document.getElementById('inputContainerMenores');
    const lineBreak = document.createElement('br');
    const newInputSet = document.createElement('div');
    newInputSet.className = 'menor-input-set';

    const textInput = document.createElement('input');
    textInput.type = 'text';
    textInput.className = 'form-control';
    textInput.placeholder = 'Ingrese el nombre del Menor';

    const numberInput = document.createElement('input');
    numberInput.type = 'number';
    numberInput.className = 'form-control';
    numberInput.placeholder = 'Ingrese la Edad del menor';

    newInputSet.appendChild(textInput);
    newInputSet.appendChild(lineBreak);
    newInputSet.appendChild(numberInput);

    inputContainer.appendChild(newInputSet);
}

function toggleRequiredFields(form, fieldIds, isRequired) {
    fieldIds.forEach(function(id) {
        var input = form.querySelector('#' + id);
        if (input) {
            if (isRequired) {
                input.setAttribute('required', 'required');
            } else {
                input.removeAttribute('required');
            }
        }
    });
}

function importCSV() {
    const input = document.getElementById('csvFile');
    const file = input.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            const text = event.target.result;
            console.log(text); // For now, just log the CSV content
            alert('CSV file imported successfully!');
        };
        reader.readAsText(file);
    } else {
        alert('Please select a CSV file first.');
    }
}
document.getElementById('imageInput').addEventListener('change', function(event) {
    const imagePreview = document.getElementById('imagePreview');
    imagePreview.innerHTML = ''; // Clear any existing images

    const files = event.target.files; // Get the selected files

    if (files.length > 0) {
        Array.from(files).forEach(file => {
            if (file.type.startsWith('image/')) { // Ensure the file is an image
                const reader = new FileReader();
                reader.onload = function(e) {
                    const img = document.createElement('img');
                    img.src = e.target.result;
                    img.style.width = '100px'; // Set the width of the image
                    img.style.marginRight = '10px'; // Add some space between images
                    img.style.marginBottom = '10px'; // Add space below images
                    img.style.border = '1px solid #ddd'; // Optional: border for better visibility
                    img.style.borderRadius = '4px'; // Optional: rounded corners
                    imagePreview.appendChild(img);
                };
                reader.readAsDataURL(file); // Read the file as a Data URL
            }
        });
    }
});

function closeAndRedirect(modalId) {
    const modal = bootstrap.Modal.getInstance(document.getElementById(modalId));
    modal.hide();

    window.location.href = 'dashboard.html';
}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('enviarDonacionDinero').addEventListener('click', function() {
        closeAndRedirect('modalDonacionDinero');
    });

    document.getElementById('enviarDonacionVianda').addEventListener('click', function() {
        closeAndRedirect('modalDonacionVianda');
    });

    document.getElementById('realizarDistribucion').addEventListener('click', function() {
        closeAndRedirect('modalDistribucionVianda');
    });

    document.getElementById('clickEncargarse').addEventListener('click', function() {
        closeAndRedirect('modalEncargarseDeHeladera');
    });

    document.getElementById('clickOfrecer').addEventListener('click', function() {
        closeAndRedirect('modalOfrecerCosas');
    });

    document.getElementById('clickEntregarTarjetas').addEventListener('click', function() {
        closeAndRedirect('modalEntregarTarjetas');
    });
});

document.addEventListener("DOMContentLoaded", function() {
    fetch('./navbar.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('navbar-placeholder').innerHTML = data;
        });
});