<!doctype html>
<html class="no-js" lang="en">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <title>POI | User Dashboard</title>
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width, initial-scale=1">
		
        <!-- All Plugin Css --> 
		<link rel="stylesheet" href="css/plugins.css">
		
		<!-- Style & Common Css --> 
		<link rel="stylesheet" href="css/common.css">
        <link rel="stylesheet" href="css/main.css">
		<style type="text/css">
		
		.nav-tabs { border-bottom: 2px solid #DDD; }
		.nav-tabs > li.active > a, .nav-tabs > li.active > a:focus, .nav-tabs > li.active > a:hover { border-width: 0; }
		.nav-tabs > li > a { border: none; color: #ffffff;background: #5a4080; }
			.nav-tabs > li.active > a, .nav-tabs > li > a:hover { border: none;  color: #5a4080 !important; background: #fff; }
			.nav-tabs > li > a::after { content: ""; background: #5a4080; height: 2px; position: absolute; width: 100%; left: 0px; bottom: -1px; transition: all 250ms ease 0s; transform: scale(0); }
		.nav-tabs > li.active > a::after, .nav-tabs > li:hover > a::after { transform: scale(1); }
		.tab-nav > li > a::after { background: ##5a4080 none repeat scroll 0% 0%; color: #fff; }
		.tab-pane { padding: 15px 0; }
		.tab-content{padding:20px}
		.nav-tabs > li  {width:20%; text-align:center;}
		.card {background: #FFF none repeat scroll 0% 0%; box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.3); margin-bottom: 30px; }
		body{ background: #EDECEC; padding:50px}

		@media all and (max-width:724px){
		.nav-tabs > li > a > span {display:none;}	
		.nav-tabs > li > a {padding: 5px 5px;}
		}

		.container
				{
					width: 100%;
					margin: 20px auto;
				}

				.preview
				{
					padding: 10px;
					position: relative;
				}

				.preview i
				{
					color: white;
					font-size: 35px;
					transform: translate(50px,130px);
				}

				.preview-img
				{
					border-radius: 100%;
					box-shadow: 0px 0px 5px 2px rgba(0,0,0,0.7);
				}

				.browse-button
				{
					width: 200px;
					height: 200px;
					border-radius: 100%;
					position: absolute; /* Tweak the position property if the element seems to be unfit */
					top: 10px;
					left: 132px;
					background: linear-gradient(180deg, transparent, black);
					opacity: 0;
					transition: 0.3s ease;
				}

				.browse-button:hover
				{
					opacity: 1;
				}

				.browse-input
				{
					width: 200px;
					height: 200px;
					border-radius: 100%;
					transform: translate(-1px,-26px);
					opacity: 0;
				}

				.form-group
				{
					width:  250px;
					margin: 10px auto;
				}

				.form-group input
				{
					transition: 0.3s linear;
				}

				.form-group input:focus
				{
					border: 1px solid crimson;
					box-shadow: 0 0 0 0;
				}

				.Error
				{
					color: crimson;
					font-size: 13px;
				}

				.Back
				{
					font-size: 25px;
				}
				
		</style>
    </head>
	
    <body>

		<!-- Navigation Start  -->
		<nav class="navbar navbar-default navbar-sticky bootsnav">

			<div class="container">      
				<!-- Start Header Navigation -->
				<div class="navbar-header">
					<button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#navbar-menu">
						<i class="fa fa-bars"></i>
					</button>
					<a class="navbar-brand" href="index.php"><div style="font-weight: bolder; font-size: 1.8em;">PointOfInterest</div><br/></a>
				</div>
				<!-- End Header Navigation -->

				<!-- Collect the nav links, forms, and other content for toggling -->
				<div class="collapse navbar-collapse" id="navbar-menu">
					<ul class="nav navbar-nav navbar-right" data-in="fadeInDown" data-out="fadeOutUp">
							<li><a href="index.php">Home</a></li> 
							<li><a href="login.php">Login</a></li>
							<li><a href="user_dashboard.php">Dashboard</a></li> 
							
						</ul>
				</div><!-- /.navbar-collapse -->
			</div>   
		</nav>
		<!-- Navigation End  -->

		<!-- Main jumbotron for a primary marketing message or call to action -->
		<section class="inner-banner" style="backend:#242c36 url(https://via.placeholder.com/1920x600)no-repeat;">
			<div class="container">
				<div class="caption">
					<h2>View places</h2>
					<p>View Places of Interest <span>202 Places</span></p>
				</div>
			</div>
		</section>


		<section class="profile-detail">
			<div class="container">
				<div class="col-md-12">
					<div class="row">
						<div class="basic-information">
							<div class="col-md-3 col-sm-3">
							 <img src="img/avatar.jpg" alt="" class="img-responsive">
							</div>
							<div class="col-md-9 col-sm-9">
								<div class="profile-content">
										<h2>Tope Damola<span>Tourist</span></h2>
										<p>User</p>
										<ul class="information">
											<li><span>Name:</span>Tope Damola</li>
											<li><span>Email:</span>tope-damola@gmail.com</li>
										</ul>
									</div>
								</div>
							<br/>
							
								<div class="container">
									<div class="row">
										<div class="col-md-12"> 
										<!-- Nav tabs -->
										<div class="card">
											<ul class="nav nav-tabs" role="tablist">
											<li role="presentation" class="active"><a href="#add" aria-controls="add" role="tab" data-toggle="tab"><i class="fa fa-home"></i>  <span>Add Place</span></a></li>
											<li role="presentation"><a href="#profile" aria-controls="profile" role="tab" data-toggle="tab"><i class="fa fa-user"></i>  <span>Places</span></a></li>
											</ul>
											
											<!-- Tab panes -->
											<div class="tab-content">
											<div role="tabpanel" class="tab-pane active" id="add">
											<div class="container">
												<div class="Back">
														<i class="fa fa-arrow-left" onclick="Back()"></i>
													</div>
													<p class="h2 text-center">Form</p>
													<form action="" method="post">
														<div class="preview text-center">
															<img class="preview-img" src="http://simpleicon.com/wp-content/uploads/account.png" alt="Preview Image" width="200" height="200"/>
															<div class="browse-button">
																<i class="fa fa-pencil-alt"></i>
																<input class="browse-input" type="file" required name="UploadedFile" id="UploadedFile"/>
															</div>
															<span class="Error"></span>
														</div>
														<div class="form-group">
															<label>Name of Place:</label>
															<input class="form-control" type="text" name="fullname" required placeholder="Enter The Name of the Place"/>
															<span class="Error"></span>
														</div>
														<div class="form-group">
															<label>Type:</label>
															<select name="type" class="form-control"id="">
																<option value="">Select Type</option>
																<option value="town">Town</option>
																<option value="city">City</option>
															</select>
															<span class="Error"></span>
														</div>
														<div class="form-group">
															<label>Country:</label>
															<input class="form-control" type="text" name="country" required placeholder="Enter Country"/>
															<span class="Error"></span>
														</div>
														<div class="form-group">
															<label>Region:</label>
															<input class="form-control" type="text" name="region" required placeholder="Enter Region"/>
															<span class="Error"></span>
														</div>
														<div class="form-group">
															<label>Description:</label>
															<textarea class="form-control" type="description" name="description" required placeholder="Enter description"></textarea>
															<span class="Error"></span>
														</div>
														
														<div class="form-group">
															<input class="btn btn-primary btn-block" type="submit" value="Submit"/>
														</div>
													</form>
												</div>
											</div>
											<div role="tabpanel" class="tab-pane" id="profile">
											<div class="table-responsive" id="sailorTableArea">
												<table id="sailorTable" class="table table-striped table-bordered" width="100%">
											
													<thead>
														<tr>
															<th>Name</th>
															<th>Type</th>
															<th>Country</th>
															<th>Region</th>
															<th>Lat</th>
															<th>Long</th>
															<th>Description</th>
															<th>Image</th>
														</tr>
													</thead>
													<tbody>
														<tr>
															<td>Lorem</td>
															<td>Lorem</td>
															<td>Lorem</td>
															<td>Lorem</td>
															<td>Lorem</td>
															<td>Lorem</td>
															<td>Lorem</td>
															<td>Lorem</td>
														</tr>
														
													</tbody>
												</table>
												</div>
											</div>
											</div>
										</div>
										</div>
									</div>
							</div>

						</div>
					</div>
				</div>
			</div>
		</section>
		
		<script type="text/javascript" src="js/jquery.min.js"></script>
		<script src="js/bootstrap.min.js"></script>
		<script type="text/javascript" src="js/owl.carousel.min.js"></script>
		<script src="js/bootsnav.js"></script>
		<script src="js/main.js"></script>
		<script>
			function Back()
				{
					window.history.back();
				}
		</script>
    </body>
</html>