<?php

/**
 * @copyright   Copyright (C) 2015 - 2018 Rich Court. All rights reserved.
 * @license     GNU General Public License version 2 or later
 */
defined('_JEXEC') or die;

$app             = JFactory::getApplication();
$doc             = JFactory::getDocument();
$user            = JFactory::getUser();
$this->language  = $doc->language;
$this->direction = $doc->direction;

JHtml::_('jquery.framework');

// Getting params from template
$params = $app->getTemplate(true)->params;
$bg_image = $params->get('header_bg_image', '');

// Detecting Active Variables
$option   = $app->input->getCmd('option', '');
$view     = $app->input->getCmd('view', '');
$layout   = $app->input->getCmd('layout', '');
$task     = $app->input->getCmd('task', '');
$itemid   = $app->input->getCmd('Itemid', '');
$sitename = $app->get('sitename');

$article = JTable::getInstance("content");
$id = JFactory::getApplication()->input->getInt('id');
$article->load($id);
$images = json_decode($article->images);

// Add JavaScript
$doc->addScript($this->baseurl . '/templates/' . $this->template . '/js/menu.js'.'?'.filemtime(JPATH_ROOT.'/templates/' . $this->template  . '/js/menu.js'));
$doc->addScript($this->baseurl . '/templates/' . $this->template . '/js/parallax.min.js'.'?'.filemtime(JPATH_ROOT.'/templates/' . $this->template  . '/js/parallax.min.js'));
$doc->addScript($this->baseurl . '/templates/' . $this->template . '/js/template.js'.'?'.filemtime(JPATH_ROOT.'/templates/' . $this->template  . '/js/template.js'));
$doc->addScript($this->baseurl . '/templates/' . $this->template . '/js/jquery.scrollify.js'.'?'.filemtime(JPATH_ROOT.'/templates/' . $this->template  . '/js/jquery.scrollify.js'));

// Add Stylesheets
$doc->addStyleSheet($this->baseurl . '/templates/' . $this->template . '/css/template.css'.'?'.filemtime(JPATH_ROOT.'/templates/' . $this->template  . '/css/template.css'));
// $doc->addStyleSheet($this->baseurl . '/templates/' . $this->template . '/css/menu.css'.'?'.filemtime(JPATH_ROOT.'/templates/' . $this->template  . '/css/menu.css'));
$doc->addStyleSheet($this->baseurl . '/media/jui/css/icomoon.css'.'?'.filemtime(JPATH_ROOT.'/media/jui/css/icomoon.css'));

?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="<?php echo $this->language; ?>" lang="<?php echo $this->language; ?>" dir="<?php echo $this->direction; ?>">
<head>
	<link href="https://fonts.googleapis.com/css?family=Roboto+Condensed:700|Roboto+Slab:400,700" rel="stylesheet">
	<?php if ($article->title == 'Together') { ?>
		<style>
			@font-face {
				font-family: 'Indy Pimp';
				src: url('font/indiepimptbs.ttf') format('truetype');
			}
			#title h1, #title p, #header h1, div.category-desc h1, h1.page-header a, div.item-page div.page-header h2, span.subheading-category {
				font-family: 'Indy Pimp', 'Roboto Slab', sans-serif;
			}
		</style>
	<?php }?>
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<meta name="theme-color" content="#BD4932">
	<link rel="shortcut icon" href="<?php echo $this->baseurl .'/templates/'.$this->template.'favicon.ico'?>" type="image/x-icon">
	<jdoc:include type="head" />
</head>

<body>
	<?php // if a header module's included, put a parallax bg on the header div
	//var_dump($article);
	$showTitleAtTop = false;

	if ($this->countModules('header') > 0) {
		$headerAttributes = 'class="extendedheader" data-bleed="10" data-speed="0.5" data-parallax="scroll" data-image-src="'. JUri::root(true) . '/' . $bg_image.'"';
	} else if (isset($images->image_intro) && $images->image_intro != '') {
		$headerAttributes = 'class="extendedheader" data-bleed="10" data-speed="0.5" data-parallax="scroll" data-image-src="'. JUri::root(true) . '/' . $images->image_intro.'"';
		$showTitleAtTop = true;
	} else {
		$headerAttributes = '';
	}

	?>

	<div id="header" <?php echo $headerAttributes ?> >
		<div id="overlay"></div>
		<div id="menubutton" onclick="openDrawer()"><img src="<?php echo $this->baseurl; ?>/templates/<?php echo $this->template; ?>/img/menubutton.png" alt="Open menu" /></div>
		<div id="menu">
			<div id="closebutton" onclick="closeDrawer()">
				<img src="<?php echo $this->baseurl; ?>/templates/<?php echo $this->template; ?>/img/closebutton.png" alt="Close menu" />
			</div>
			<jdoc:include type="modules" name="menu" style="xhtml" />
		</div>

		<?php if ($this->countModules('header') > 0 || $showTitleAtTop) { ?>
		<div id="title">
			<jdoc:include type="modules" name="header" style="none" />
			<?php if ($this->countModules('header') == 0) {
				//echo '<h1>' . $article->title . '<h1>';
			}?>
		</div>
		<?php } ?>

		<?php if ($this->countModules('header') > 0 || (isset($images->image_intro) && $images->image_intro != '')) {
			// echo '<svg class="headerSVG" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 10" preserveAspectRatio="none">
			// 		<polygon points="100 0 100 10 0 10" fill="#f2f2f2"/>
			// 	</svg>';
		} ?>

	</div>

	<div id="wrapper">

		<?php if ($this->countModules('position-1') > 0) { ?>
		<div id="mod1">
			<jdoc:include type="modules" name="position-1" style="xhtml" />
		</div>
		<?php } ?>

		<?php if ($this->countModules('position-2') > 0) { ?>

		<?php } ?>

		<div id="contentwrapper">
			<div id="content" class="">
				<jdoc:include type="message" />
				<div id="mod2">
					<jdoc:include type="modules" name="position-2" style="xhtml" />
				</div>
				<jdoc:include type="component" />
			</div>
		</div>
	</div>

	<div id="footer">
		<div id="footerwrapper">
			<jdoc:include type="modules" name="footer" style="none" />
		</div>
	</div>
</body>
</html>
<?php
