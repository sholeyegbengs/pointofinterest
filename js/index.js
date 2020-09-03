let searchInput = 'search_input';

 function toggleFullPageLoader(show) {

    if(show!==undefined)
    {
        if(show===true)
        {
            $('#full-loader').removeClass("hide");
        }else{

            $('#full-loader').addClass("hide");
        }
    }else{

        $('#full-loader').toggleClass("hide");
    }
}

let search_query=undefined;
$(document).ready(function () {
    let autocomplete;
    autocomplete = new google.maps.places.Autocomplete((document.getElementById(searchInput)), {
        types: ['establishment'],
    });

    google.maps.event.addListener(autocomplete, 'place_changed', function () {
        let near_place = autocomplete.getPlace();

        let name = near_place.name;
        let types = near_place.types;
        let country_array = near_place.address_components.filter(function(address_component){
            return address_component.types.includes("country");
        });
        let region_array = near_place.address_components.filter(function(address_component){
            return address_component.types.includes("locality");
        });
        let country = country_array.length ? country_array[0].long_name: "";
        let region = region_array.length ? region_array[0].long_name: "";

        let latitude = near_place.geometry.location.lat();
        let longitude = near_place.geometry.location.lng();

        search_query = {types,name,longitude,latitude,country,region};
    });

    initializeMap();
});

function initializeMap(markers=[]) {
    window.navigator.geolocation
        .getCurrentPosition( (position)=> {
            const { latitude, longitude } = position.coords;
            let center = {lat:Number(latitude), lng:Number(longitude)}
            finalizeMap(center,markers)
        }, console.log);
}
function finalizeMap(center,markers=[]) {

    // The map, centered at Uluru
    var map = new google.maps.Map(
        document.getElementById('map'), {zoom: 3, center: center});

    var infoWindow = new google.maps.InfoWindow;

    markers.map((marker)=>{
        let pos = {lat: Number(marker.lat), lng: Number(marker.lon)};
        console.log(pos);
       var position = new google.maps.Marker({position: pos, map: map,label: marker.name});
        position.addListener('click', function() {
            // infoWindow.setContent(marker.description);
            // infoWindow.open(map, position);

            getPOIDetails(marker.id)
        });
    });

}

$(document).on('change', '#'+searchInput, function () {
    search_query=undefined;
});

$("#search-place").submit(function (e) {

    e.preventDefault();
    if(search_query===undefined)
    {
        alert("You not select a place");
    }else{
        toggleFullPageLoader(true);
        let query="?";
        Object.keys(search_query).forEach(function(key){
           query += `${key}=${search_query[key]}&`;
        });
        $.ajax({
            url:`search.php${query}`,
            success:function (data, status, xhr) {
                const res = JSON.parse(data);
                initializeMap(res.data);
                //const  url  = data.data.intended_url;
                //redirectTo(url)
            },
            error:function (jqXhr, textStatus, errorMessage) {
                const data  = jqXhr.responseJSON;
                if(typeof data.errors === "object")
                {
                    Object.keys(data.errors).forEach(function(key){
                        let selector =  $(`#${key}-error-msg`);
                        selector.html(data.errors[key][0]);
                        $(`#${key}`).parent('.form-group').removeClass("has-danger");
                        selector.fadeIn();
                    })
                }else{

                    $('#email-error-msg').html(data.errors)
                    $('#email-error-msg').fadeIn();
                }
            },
            complete:function () {
                toggleFullPageLoader(false);
            }
        })
    }
});

$("#add-review-form").submit(function (e) {

    e.preventDefault();

        toggleFullPageLoader(true);
        const poi_id = $('#poi_id').val();
        const review = $('#review_input').val();
        $.ajax({
            url:`add_review.php`,
            type:"POST",
            data:{poi_id,review},
            success:function (data, status, xhr) {
                const res = JSON.parse(data);
                $('#poi_reviews').prepend(`
                <li><span class="glyphicon glyphicon-comment"></span>
                            ${review}</li>`);
                $('#review_input').val("")
                //const  url  = data.data.intended_url;
                //redirectTo(url)
            },
            error:function (jqXhr, textStatus, errorMessage) {
                const data  = jqXhr.responseJSON;
                if(typeof data.errors === "object")
                {
                    Object.keys(data.errors).forEach(function(key){
                        let selector =  $(`#${key}-error-msg`);
                        selector.html(data.errors[key][0]);
                        $(`#${key}`).parent('.form-group').removeClass("has-danger");
                        selector.fadeIn();
                    })
                }else{

                    $('#email-error-msg').html(data.errors)
                    $('#email-error-msg').fadeIn();
                }
            },
            complete:function () {
                toggleFullPageLoader(false);
            }
        })
});

function getPOIDetails(poi_id) {
    toggleFullPageLoader(true);
            $.ajax({
                url:`details.php?poi_id=${poi_id}`,
                success:function (data, status, xhr) {
                    const res = JSON.parse(data);
                    $('#poi_id').val(res.data.id);
                   $('#poi_name').html(res.data.name);
                   $('#poi_description').html(res.data.description);
                    $('#poi_reviews').html("");
                    const reviews = res.data.reviews.map((review)=>{
                        $('#poi_reviews').append(`<li><span class="glyphicon glyphicon-comment"></span>
                            ${review.review}</li>
`)
                    })

                    $('#details').modal("show");
                    //const  url  = data.data.intended_url;
                    //redirectTo(url)
                },
                error:function (jqXhr, textStatus, errorMessage) {
                    const data  = jqXhr.responseJSON;
                    if(typeof data.errors === "object")
                    {
                        Object.keys(data.errors).forEach(function(key){
                            let selector =  $(`#${key}-error-msg`);
                            selector.html(data.errors[key][0]);
                            $(`#${key}`).parent('.form-group').removeClass("has-danger");
                            selector.fadeIn();
                        })
                    }else{

                        $('#email-error-msg').html(data.errors)
                        $('#email-error-msg').fadeIn();
                    }
                },
                complete:function () {
                    toggleFullPageLoader(false);
                }
            })
}


