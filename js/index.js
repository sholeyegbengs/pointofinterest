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
var locationLatLng = {};
let search_query=undefined;
$(document).ready(function () {
    let autocomplete;
    autocomplete = new google.maps.places.Autocomplete((document.getElementById(searchInput)), {
        types: ['establishment'],
    });

    google.maps.event.addListener(autocomplete, 'place_changed', function () {
        let near_place = autocomplete.getPlace();
        console.log(near_place);

        let name = near_place.name;
        let types = near_place.types;
        let country_array = near_place.address_components.filter(function(address_component){
            return address_component.types.includes("country");
        });
        let region_array = near_place.address_components.filter(function(address_component){
            return address_component.types.includes("locality")
                ||address_component.types.includes("postal_town")
                ||address_component.types.includes("political");
        });
        let country = country_array.length ? country_array[0].long_name: "";
        let region = region_array.length ? region_array[0].long_name: "";

        let latitude = near_place.geometry.location.lat();
        let longitude = near_place.geometry.location.lng();
        locationLatLng = {lat:latitude,lon:longitude}
        search_query = {types,name,longitude,latitude,country,region};
    });
    initializeMap();

});

function initializeMap(markers=[],user_location=true) {
    window.navigator.geolocation
        .getCurrentPosition( (position)=> {
            const { latitude, longitude } = position.coords;
            let center = {lat:Number(latitude), lng:Number(longitude)}
            finalizeMap(center,markers,user_location)
        }, console.log);
}
function finalizeMap(center,markers=[],user_location=true) {

    // The map, centered at Uluru
    var map = new google.maps.Map(
        document.getElementById('map'), {zoom: 4, center: center});

    if(user_location===false)
    {
        let new_center = markers[0];
        map.setCenter(new google.maps.LatLng(locationLatLng.lat,locationLatLng.lon));
    }

    var infoWindow = new google.maps.InfoWindow;

    markers.map((marker)=>{
        let pos = {lat: Number(marker.lat), lng: Number(marker.lon)};

       var position = new google.maps.Marker({position: pos, map: map,label: marker.name});
        position.addListener('click', function() {

            infoWindow.setContent(`<p style="margin-bottom: 10px"><b>${marker.name}</b></p>
                            <p  style="margin-bottom: 10px"><b>${marker.region},${marker.country}</b></p>
                             <p  style="margin-bottom: 10px"><b>Location:</b>${marker.lat},${marker.lon}</p>
                <a  style="color:red" href="javascript:void(0)" onclick="getPOIDetails(${marker.id})"><b>View Details</b></a>`);

            infoWindow.open(map, position);


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
                initializeMap(res.data,false);
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


