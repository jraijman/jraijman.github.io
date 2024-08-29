$(document).ready(function() {
    var map, marker;

    // Inicializa el mapa cuando se muestra el modal
    $('#modalEncargarseDeHeladera').on('shown.bs.modal', function () {
        if (!map) {
            map = L.map('mapUbicacion').setView([-34.6037, -58.3816], 12);

            L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}&language=es', {
                maxZoom: 18,
                id: 'mapbox/streets-v11', // Estilo del mapa (puedes cambiarlo)
                tileSize: 512,
                zoomOffset: -1,
                accessToken: 'pk.eyJ1IjoianJhaWptYW4iLCJhIjoiY2x2MmVzanMxMGY5YTJybjVmbXh5MW8weSJ9.NZEa7b9BPMe8znzHHNH8Tg' // Reemplaza con tu token de Mapbox
            }).addTo(map);

            // Maneja el clic en el mapa
            map.on('click', function(e) {
                var latlng = e.latlng;
                if (marker) {
                    marker.setLatLng(latlng);
                } else {
                    marker = L.marker(latlng).addTo(map);
                }

                // URL para la geocodificación inversa
                var url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${latlng.lng},${latlng.lat}.json?access_token=pk.eyJ1IjoianJhaWptYW4iLCJhIjoiY2x2MmVzanMxMGY5YTJybjVmbXh5MW8weSJ9.NZEa7b9BPMe8znzHHNH8Tg`;

                // Realiza la solicitud de geocodificación inversa
                fetch(url)
                    .then(response => response.json())
                    .then(data => {
                        if (data.features && data.features.length > 0) {
                            var address = data.features[0].place_name;
                            $('#ubicacion').val(address); // Actualiza el campo de ubicación con la dirección
                        } else {
                            $('#ubicacion').val('Dirección no encontrada');
                        }
                    })
                    .catch(error => {
                        console.error('Error al obtener la dirección:', error);
                        $('#ubicacion').val('Error al obtener la dirección');
                    });
            });
        }
    });

    // Destruye el mapa cuando se oculta el modal para evitar problemas de inicialización
    $('#modalEncargarseDeHeladera').on('hidden.bs.modal', function () {
        if (map) {
            map.remove();
            map = null;
        }
        marker = null; // Reinicia el marcador
    });

    // Maneja el clic en el botón de recomendar ubicación
    $('#recomendarUbicacion').on('click', function() {
        if (!map) {
            alert('El mapa no está inicializado.');
            return;
        }

        var center = map.getCenter(); // Obtiene el centro del mapa
        var lat = center.lat; // Latitud del centro del mapa
        var lng = center.lng; // Longitud del centro del mapa
        var radius = 1000; // Radio en metros (puedes ajustar esto según sea necesario)

        // URL de la API de recomendación
        var apiUrl = `https://api.consultoraexterna.com/recomendaciones?lat=${lat}&lng=${lng}&radius=${radius}`;

        // Realiza la solicitud a la API de recomendación
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                if (data.recomendaciones && data.recomendaciones.length > 0) {
                    data.recomendaciones.forEach(function(recomendacion) {
                        var latlng = L.latLng(recomendacion.lat, recomendacion.lng);
                        L.marker(latlng).addTo(map).bindPopup(recomendacion.descripcion).openPopup();
                    });
                } else {
                    alert('No se encontraron recomendaciones.');
                }
            })
            .catch(error => {
                console.error('Error al obtener las recomendaciones:', error);
                alert('Error al obtener las recomendaciones.');
            });
    });
});