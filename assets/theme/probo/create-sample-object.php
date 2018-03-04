<?php

$o = new stdClass();

$o->repositoryName = 'itcon_drupal/cmp_gov_build';

$builds = [];
$steps = [];


$build = new stdClass();
$build->pullRequestName = 'Master - Michael Bagnall';
$build->URL = 'http://24367944-eae8-479c-9cee-4065aaed5a65.probo.itcon-dev.com';
$build->pullRequestURL = 'https://bitbucket.org/itcon_drupal/cmp_gov_build/pull-requests/323';

$step = new stdClass();
$step->statusIcon = 'fa-check-circle';
$step->statusColor = 'probo-text-green';

$steps[] = $step;
$builds[] = $build;
$build->steps = $steps;
$o->builds = $builds;

print json_encode($o);

