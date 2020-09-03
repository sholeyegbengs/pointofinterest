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
        let type = near_place.types.join(",");
        let country_array = near_place.address_components.filter(function(address_component){
            return address_component.types.includes("country");
        });
        let region_array = near_place.address_components.filter(function(address_component){
            return address_component.types.includes("locality");
        });
        let country = country_array.length ? country_array[0].long_name: "";
        let region = region_array.length ? region_array[0].long_name: "";

        let lat = near_place.geometry.location.lat();
        let lon = near_place.geometry.location.lng();

        search_query = {type,name,lon,lat,country,region};
    });

});


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
                pois.map(function (poi) {
                    $('#poi-table tbody').append(`<tr>
                    <th scope="row">${poi.name}</th>
                    <td>${poi.country}</td>
                    <td>${poi.region}</td>
                    <td>Town</td>
                    <td>${poi.lat}</td>
                    <td>${poi.lon}</td>
                    <td><a href="javascript:void(0)" data-id="${poi.id}"  class="view-poi-details btn btn-info">View</a></td>
                    </tr>`);
                })
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
    if(search_query===undefined)
    {
        alert("You not select a place");
    }else{
        const description = $('#description').val();
        toggleFullPageLoader(true);

        $.ajax({
            url:`add_poi.php`,
            type:"POST",
            data:{...search_query,description},
            success:function (data, status, xhr) {
                const res = JSON.parse(data);
              if(res.status_code===201)
              {
                  alert(`${search_query.name} has been added to Point of Interest`)
                  $('#add-poi-form')[0].reset();
                  const poi = res.data;
                  $('#poi-table tbody').prepend(`<tr>
                    <th scope="row">${poi.name}</th>
                    <td>${poi.country}</td>
                    <td>${poi.region}</td>
                    <td>Town</td>
                    <td>${poi.lat}</td>
                    <td>${poi.lon}</td>
                    <td><a href="javascript:void(0)" data-id="${poi.id}"  class="view-poi-details btn btn-info">View</a></td>
                    </tr>`);
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
    }
});


