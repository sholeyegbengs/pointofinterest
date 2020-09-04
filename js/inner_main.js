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
        types: ['geocode'],
    });

    google.maps.event.addListener(autocomplete, 'place_changed', function () {
        let near_place = autocomplete.getPlace();

        let name = near_place.name;
        let type = near_place.types.join(",");
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
        let longitude =near_place.geometry.location.lng();

        locationLatLng= {lat:latitude,lon:longitude}
        toggleFullPageLoader(true);

        $.ajax({
            url:`search.php?country=${country}&region=${region}`,
            success:function (data, status, xhr) {
                const res = JSON.parse(data);
                initializeMap(res.data,false,lat,longitude);
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
        });
    });

    var map = null;
    var locationLatLng = {};
    var infoWindow = new google.maps.InfoWindow;
    var geocoder = new google.maps.Geocoder();

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
        map = new google.maps.Map(
            document.getElementById('map'), {zoom: 4, center: center});
        map.setMapTypeId(google.maps.MapTypeId.ROADMAP);

        if(user_location===false)
        {
            let new_center = markers[0];
            map.setCenter(new google.maps.LatLng(locationLatLng.lat,locationLatLng.lon));
        }

        markers.map((marker)=>{
            let pos = {lat: Number(marker.lat), lng: Number(marker.lon)};
            var position = new google.maps.Marker({position: pos, map: map,label: marker.name});
            position.addListener('click', function(e) {
                infoWindow.setContent(`<p style="margin-bottom: 10px"><b>${marker.name}</b></p>
                            <p  style="margin-bottom: 10px"><b>${marker.region},${marker.country}</b></p>
                             <p  style="margin-bottom: 10px"><b>Location:</b>${marker.lat},${marker.lon}</p>
                <a  style="color:red" href="javascript:void(0)" onclick="getPOIDetails(${marker.id})"><b>View Details</b></a>`);

                infoWindow.open(map, position);
                //e.stopPropagation();

            });
        });

        google.maps.event.addListener(map, 'click', function(event) {

            geocoder.geocode({'latLng': event.latLng}, function(results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    console.log(results);
                    if (results[0]) {

                        let country_array = results[0].address_components.filter(function(address_component){
                            return address_component.types.includes("country");
                        });
                        let region_array = results[0].address_components.filter(function(address_component){
                            return address_component.types.includes("locality")
                                ||address_component.types.includes("postal_town")
                                ||address_component.types.includes("political");
                        });

                        let country = country_array.length ? country_array[0].long_name: undefined;

                        if(country===undefined)
                        {
                            alert("please select a valid location!")
                        }else{

                            let region = region_array.length ? region_array[0].long_name: "";

                            let lat = results[0].geometry.location.lat();
                            let lon = results[0].geometry.location.lng();

                            $('#lat').val(lat);
                            $('#lon').val(lon);
                            $('#country').val(country);
                            $('#region').val(region);
                            $('#region').val(region);

                            $('#add-poi-modal').modal("show");
                        }

                    }
                } else {
                    alert("Geocoder failed due to: " + status);
                }
            });
        });


    }


    function getPOIDetails(poi_id) {
        toggleFullPageLoader(true);
        $.ajax({
            url:`details.php?poi_id=${poi_id}`,
            success:function (data, status, xhr) {
                const res = JSON.parse(data);
                $('#poi_name').html(res.data.name);
                $('#poi_description').html(res.data.description);
                $('#poi_reviews').html("");
                const reviews = res.data.reviews.map((review)=>{
                    $('#poi_reviews').append(`<li><span class="glyphicon glyphicon-comment"></span>
                            ${review.review}</li>
`)
                })

                $('#details').modal("show");
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

    $(document).ready(function () {
        $.ajax({
            url:`get_poi.php`,
            success:function (data, status, xhr) {
                const res = JSON.parse(data);
                if(res.status_code===200)
                {
                    const pois = res.data??[];
                    initializeMap(pois);
                }else{
                    if(res.data.message)
                    {
                        alert(res.data.message);
                    }else{
                        Object.keys(data.errors).forEach(function(key){
                            let selector =  $(`#${key}-error-msg`);
                            selector.html(data.errors[key][0]);
                            $(`#${key}`).parent('.form-group').removeClass("has-danger");
                            selector.fadeIn();
                        });
                    }
                }
            },
            error:function (jqXhr, textStatus, errorMessage) {
                const data  = jqXhr.responseJSON;

            },
            complete:function () {
                toggleFullPageLoader(false);
            }
        })
    });

    $(document).on("click",".view-poi-details",function () {
        const id = $(this).data("id");
        getPOIDetails(id);
    });

    $(document).on('change', '#'+searchInput, function () {
        search_query=undefined;
    });

    $("#add-poi-form").submit(function (e) {

        e.preventDefault();

        const description = $('#description').val();
        const name = $('#name').val();
        const type = $('#type').val();
        const lat = $('#lat').val();
        const lon = $('#lon').val();
        const country = $('#country').val();
        const region = $('#region').val();
        toggleFullPageLoader(true);

        $.ajax({
            url:`add_poi.php`,
            type:"POST",
            data:{name,type,lat,lon,country,region,description},
            success:function (data, status, xhr) {
                const res = JSON.parse(data);
                if(res.status_code===201)
                {
                    alert(`${name} has been added to Point of Interest`);
                    $('#add-poi-modal').modal("hide");
                    $('#add-poi-form')[0].reset();
                    const poi = res.data;
                    let pos = {lat: Number(poi.lat), lng: Number(poi.lon)};
                    var position = new google.maps.Marker({position: pos, map: map,label: poi.name});
                    position.addListener('click', function(e) {
                        infoWindow.setContent(`<p style="margin-bottom: 10px"><b>${poi.name}</b></p>
                            <p  style="margin-bottom: 10px"><b>${poi.region},${poi.country}</b></p>
                             <p  style="margin-bottom: 10px"><b>Location:</b>${poi.lat},${poi.lon}</p>
                <a  style="color:red" href="javascript:void(0)" onclick="getPOIDetails(${poi.id})"><b>View Details</b></a>`);

                        infoWindow.open(map, position);


                    });
                    // marker = new google.maps.Marker({
                    //     position: event.latLng,
                    //     map: map
                    // });
                    // infoWindow.setContent(results[1].formatted_address);
                    // infoWindow.open(map, marker);

                }else{
                    if(res.data.message)
                    {
                        alert(res.data.message);
                    }else{
                        Object.keys(data.errors).forEach(function(key){
                            let selector =  $(`#${key}-error-msg`);
                            selector.html(data.errors[key][0]);
                            $(`#${key}`).parent('.form-group').removeClass("has-danger");
                            selector.fadeIn();
                        });
                    }
                }
            },
            error:function (jqXhr, textStatus, errorMessage) {
                const data  = jqXhr.responseJSON;
            },
            complete:function () {
                toggleFullPageLoader(false);
            }
        })

    });


});



