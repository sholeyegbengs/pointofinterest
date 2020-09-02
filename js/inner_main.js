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

});

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


