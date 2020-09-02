<!doctype html>
<html class="no-js" lang="en">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <title>POI | Login</title>
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <!-- All Plugin Css -->
		<link rel="stylesheet" href="css/plugins.css">

		<!-- Style & Common Css -->
		<link rel="stylesheet" href="css/common.css">
        <link rel="stylesheet" href="css/main.css">

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
					<a class="navbar-brand" href="index.php"><div style="font-weight: bolder; font-size: 1.8em;">PointOfInterest</div></a>
				</div>
				<!-- End Header Navigation -->

				<!-- Collect the nav links, forms, and other content for toggling -->
				<div class="collapse navbar-collapse" id="navbar-menu">
					<ul class="nav navbar-nav navbar-right" data-in="fadeInDown" data-out="fadeOutUp">
							<li><a href="index.php">Home</a></li>
							<li><a href="Register.php">Register</a></li>

						</ul>
				</div><!-- /.navbar-collapse -->
			</div>
		</nav>
		<!-- Navigation End  -->

		<!-- login section start -->
		<section class="login-wrapper">
			<div class="container">
				<div class="col-md-6 col-sm-8 col-md-offset-3 col-sm-offset-2">
					<form>
						<div style="font-weight: bolder; font-size: 1.8em;">PointOfInterest</div><br/>
						<input type="text" class="form-control input-lg" placeholder="User Name">
						<input type="password" class="form-control input-lg" placeholder="Password">
						<label><a href="">Forget Password?</a></label>
						<button type="submit" class="btn btn-primary">Login</button>
						<p>Have't Any Account <a href="Register.php">Create An Account</a></p>
					</form>
				</div>
			</div>
		</section>
		<!-- login section End -->
		<script type="text/javascript" src="js/jquery.min.js"></script>
		<script src="js/bootstrap.min.js"></script>
		<script type="text/javascript" src="js/owl.carousel.min.js"></script>
		<script src="js/bootsnav.js"></script>
		<script src="js/main.js"></script>
    </body>
</html>
