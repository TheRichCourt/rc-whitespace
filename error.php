<?php

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

?>

<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="<?php echo $this->language; ?>" lang="<?php echo $this->language; ?>" dir="<?php echo $this->direction; ?>">
<head>
	<meta http-equiv="content-type" content="text/html; charset=utf-8" />
	<title><?php echo $this->title; ?> <?php echo htmlspecialchars($this->error->getMessage(), ENT_QUOTES, 'UTF-8'); ?></title>
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link rel="stylesheet" href="<?php echo $this->baseurl . '/templates/' . $this->template . '/css/template.css?' . filemtime(JPATH_ROOT.'/templates/' . $this->template  . '/css/template.css'); ?>" type="text/css" />
</head>

<body class="error">
	<div id="errorcontainer">
		<div id="error">
			<h1><?php echo $this->error->getCode() ?></h1>
			<h2><?php echo "Sorry, this isn't a page.";?></h2>
			<a class="home" href="<?php echo $this->baseurl; ?>/index.php" title="<?php echo JText::_('JERROR_LAYOUT_GO_TO_THE_HOME_PAGE'); ?>"><?php echo JText::_('JERROR_LAYOUT_HOME_PAGE'); ?></a>
			<p><?php echo htmlspecialchars($this->error->getMessage(), ENT_QUOTES, 'UTF-8');?></p>
		</div>
	</div>
</body>
</html>
