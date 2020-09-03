

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


$("#login-form").submit(function (e) {

    e.preventDefault();
        const username = $('#username').val();
        const password = $('#password').val();
        toggleFullPageLoader(true);

        $.ajax({
            url:`login_user.php`,
            type:"POST",
            data:{username,password},
            success:function (data, status, xhr) {
                const res = JSON.parse(data);
               console.log(res);
               if(res.status_code===200)
               {
                    window.location.href="user_dashboard.php";
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
                       })
                   }
               }

                //const  url  = data.data.intended_url;
                //redirectTo(url)
            },
            error:function (jqXhr, textStatus, errorMessage) {
                const data  = jqXhr.responseJSON;

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


