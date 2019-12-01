<?php

/**
 * @copyright   Copyright (C) 2015 - 2019 Rich Court. All rights reserved.
 */

defined('_JEXEC') or die;

$this->setHtml5(true);

$app             = JFactory::getApplication();
$doc             = JFactory::getDocument();
$user            = JFactory::getUser();
$this->language  = $doc->language;
$this->direction = $doc->direction;

JHtml::_('jquery.framework');

// Getting params from template
$params = $app->getTemplate(true)->params;
$bg_image = $params->get('header_bg_image', '');
$bodyClass = $params->get('bodyclass', '');

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

// Add Stylesheets
$doc->addStyleSheet($this->baseurl . '/templates/' . $this->template . '/dist/template.css'.'?'.filemtime(JPATH_ROOT.'/templates/' . $this->template  . '/dist/template.css'));

$menu = $app->getMenu();

// additional class to show this is the homepage
$bodyClass .= $menu->getActive() == $menu->getDefault()
	? ' home'
	: ''
;

// if a header module's included, put a parallax bg on the header div
$showTitleAtTop = false;

if ($bg_image !== '' && $this->countModules('header') > 0) {
	$headerAttributes = 'class="extendedheader" data-bleed="10" data-speed="0.5" data-parallax="scroll" data-image-src="'. JUri::root(true) . '/' . $bg_image.'"';
} elseif (isset($images->image_intro) && $images->image_intro != '') {
	$headerAttributes = 'class="extendedheader" data-bleed="10" data-speed="0.5" data-parallax="scroll" data-image-src="'. JUri::root(true) . '/' . $images->image_intro.'"';
	$showTitleAtTop = true;
} elseif ($this->countModules('header') > 0) {
	$headerAttributes = 'class="extendedheader"';
} else {
	$headerAttributes = '';
}

?>
<!DOCTYPE html>
<html lang="<?= $this->language ?>" dir="<?= $this->direction ?>">
<head>
	<?php if (strtolower($article->title) == 'together') : ?>
		<style>
			@font-face {
				font-family: "Indy Pimp";
				src: url('<?= "{$this->baseurl}/templates/{$this->template}/font/indiepimptbs.ttf" ?>') format("truetype");
			}
			#title h1, #title p, #header h1, div.category-desc h1, h1.page-header a, div.item-page div.page-header h2, span.subheading-category {
				font-family: "Indy Pimp", "Roboto Slab", sans-serif;
			}
		</style>
	<?php endif ?>
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<meta name="theme-color" content="#252525">
	<link rel="shortcut icon" href="<?= $this->baseurl .'/templates/'.$this->template.'favicon.ico' ?>" type="image/x-icon">
	<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.2/css/all.css" integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr" crossorigin="anonymous">
	<jdoc:include type="head" />
</head>

<body class="<?= $bodyClass !== '' ? $bodyClass : '' ?>">
	<div id="menubutton">
		<div class="changeable_icon_container">
			<div class="changeable_icon changeable_menu_icon"></div>
		</div>
	</div>
	<div id="overlay"></div>

	<div id="header" <?= $headerAttributes ?> >
		<!-- Must be first selectable element, for accessibility -->
		<a class="skip-main" href="#contentwrapper">Skip to main content</a>
		<div id="menu">
			<jdoc:include type="modules" name="menu" style="xhtml" />
		</div>

		<?php if ($this->countModules('header') > 0 || $showTitleAtTop) : ?>
		<div id="title">
			<jdoc:include type="modules" name="header" style="none" />
		</div>
		<?php endif ?>
	</div>

	<div id="wrapper">
		<?php if ($this->countModules('position-1') > 0) : ?>
			<div id="mod1">
				<jdoc:include type="modules" name="position-1" style="xhtml" />
			</div>
		<?php endif ?>

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

	<?php if ($this->countModules('bottom-tabs') > 0) : ?>
		<div id="bottom-tabs">
			<jdoc:include type="modules" name="bottom-tabs" style="xhtml" />
		</div>
	<?php endif ?>

	<?= createScriptTag($this->baseurl . '/templates/' . $this->template . '/dist/template.js'.'?'.filemtime(JPATH_ROOT.'/templates/' . $this->template  . '/dist/template.js')) ?>
</body>
</html>
<?php

function createScriptTag($url) {
	return '<script src="' . $url . '"></script>';
}
