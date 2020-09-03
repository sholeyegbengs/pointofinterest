<!doctype html>
<html class="no-js" lang="en">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <title>POI | Point of Interest</title>
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <!-- All Plugin Css -->
        <link rel="stylesheet" href="css/plugins.css">

        <!-- Style & Common Css -->
		<link rel="stylesheet" href="css/common.css">
        <link rel="stylesheet" href="css/main.css">
        <style>
            .loader-demo-box{
                height: 100vh;
                width: 100%;
                position: fixed;
                z-index: 999999999999999;
                border: none !important;
                background-color: rgba(0,0,0,0.6);
            }

            .loader-demo-box.hide{
                display: none !important;
            }
            .circle-loader:before{
                border-top-color: #da0833;
            }

            .circle-loader:after{
                border: 10px solid  grey;
            }
        </style>
    </head>

    <body>

    <div id="full-loader" class="loader-demo-box hide">
        <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
    </div>
    <!-- Navigation Start  -->
		<nav class="navbar navbar-default navbar-sticky bootsnav">

			<div class="container">
				<!-- Start Header Navigation -->
				<div class="navbar-header">
					<button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#navbar-menu">
						<i class="fa fa-bars"></i>
					</button>
					<a class="navbar-brand" href="index.php">POI</a>
				</div>
				<!-- End Header Navigation -->

				<!-- Nav links, forms, and other content for toggling -->
				<div class="collapse navbar-collapse" id="navbar-menu">
					<ul class="nav navbar-nav navbar-right" data-in="fadeInDown" data-out="fadeOutUp">
							<li><a href="index.php">Home</a></li>
							<li><a href="login.php">Add Places</a></li>
						</ul>
				</div><!-- /.navbar-collapse -->
			</div>
		</nav>


		<!-- Main jumbotron for a primary marketing message or call to action -->
		<section class="main-banner" style="background:#242c36 url(img/background-picture.jpg) no-repeat">
			<div class="container">
				<div class="caption">
					<h2>Visit Amazing places</h2>
					<div class="row">
                        <div class="col-md-8 col-md-offset-2">
                            <form id="search-place">
                                <fieldset>

                                    <div class="col-md-10 no-pad">
                                        <input type="text" class="form-control" id="search_input"
                                               placeholder="Search for your Places of Interest">
                                    </div>
                                    <div class="col-md-2 col-sm-2 no-pad">
                                        <input type="submit" class="btn seub-btn" value="Search" />
                                    </div>
                                </fieldset>
                            </form>
                        </div>
                    </div>
				</div>
			</div>
		</section>
    <div class="modal fade" id="details" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title" id="poi_name">New message</h4>
                </div>
                <div class="modal-body">

                        <div class="form-group">
                            <label for="recipient-name" class="control-label">Place Description:</label>
                          <p id="poi_description">

                          </p>
                        </div>
                        <hr/>
                        <div class="form-group">
                            <label for="message-text" class="control-label">User Reviews:</label>
                           <ul id="poi_reviews" class="reviews">
                               <li><span class="glyphicon glyphicon-comment"></span> sit amet, consectetur adipiscing elit. Morbi scelerisque efficitur</li>
                           </ul>
                            <hr>
                            <form id="add-review-form">
                                <input type="hidden" id="poi_id">
                                <div class="form-group">
                                    <div class="input-group" style="display: flex; flex-wrap: wrap">
                                        <input type="text" id="review_input"
                                               style="flex-grow: 1;width: auto;"
                                               required class="form-control" placeholder="Enter your comment...">
                                        <span class="input-group-btn " style="width: auto">
                                            <button  class="btn btn-success" style="height: 45px;" type="submit">Add Review!</button>
                                        </span>
                                    </div>
                                </div>
                            </form>
                        </div>
                </div>

            </div>
        </div>
    </div>


    <section class="features">
			<div class="container">
                <div class="col-12">
                    <div id="map" style="height: 400px; width: 100%"></div>
                </div>
			</div>
		</section>
		<section class="testimonials dark">
			<div class="container">
				<div class="row">
					<div class="col-md-12">
						<div id="testimonial-slider" class="owl-carousel">
							<div class="testimonial">
								<div class="pic">
									<img src="./img/mary_jane.jpg" alt="">
								</div>
								<p class="description">
									"from swimming to get obsidian to talks on board of our wonderful gulet, from ever-changing and filled with surprises meals offered on board to culinary experiences on the shore. Rome is definitely a point of interest for me "
								</p>
								<h3 class="testimonial-title">Mary Jane</h3>
								<span class="post">Newyork, USA</span>
							</div>

							<div class="testimonial">
								<div class="pic">
									<img src="img/mike_kesley.jpg" alt="">
								</div>
								<p class="description">
									" This was our fourth trip to rome and it lived up to our very high expectations. It was a wonderfully organized trip with beautiful cruising and swimming spots, great hikes, and fascinating lectures on the region and history. "
								</p>
								<h3 class="testimonial-title">Mike Kesley</h3>
								<span class="post">Rome, Italy</span>
							</div>

							<div class="testimonial">
								<div class="pic">
									<img src="img/client-3.jpg" alt="">
								</div>
								<p class="description">
									" My experience, a week-long tour of Frankfurt, was superb. We saw not only the usual tourist sites, but several that were certainly off the beaten track. Best of the best"
								</p>
								<h3 class="testimonial-title">Mary Kane</h3>
								<span class="post">Frankfurt, Germany</span>
							</div>
							<div class="testimonial">
								<div class="pic">
									<img src="img/client-4.jpg" alt="">
								</div>
								<p class="description">
									" My wife and I have done many tours with a variety of tour companies. Travel to London is definitely the best."
								</p>
								<h3 class="testimonial-title">Iryna Shayk</h3>
								<span class="post">London, United Kingdom</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>

        <script src="./js/jquery.min.js">
        </script>

        <script src="js/bootstrap.min.js">
        </script>
        <script src="https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyB6sHzPYSC5je3CLYxidlb0kn28PI6O7BE&libraries=places"
        ></script>
		<script type="text/javascript" src="js/owl.carousel.min.js">
        </script>
		<script src="js/bootsnav.js"></script>
		<script src="js/main.js"></script>
		<script src="js/index.js"></script>

    </body>
</html>
