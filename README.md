# Containerized Drupal Portal User Interface for ProboCI OSS Server
This is the Drupal user front end for the ProboCI Open Source Server for which it is designed to run in conjunction with. For more information on the ProboCI Open Source Server, please visit our web site located at Probo.CI

The plan for this project is to have a fully functional Drupal 8 based portal for administering and looking at builds in the Open Source Probo.CI system.

#### Last Updated: March 5, 2018

v.07 - March 5, 2018
  - Added PHPMyAdmin to the repository

v.06 - March 4, 2018
  - Added ReactJS workflow for interface on the theme.

v.05 - January 17, 2018
  - Removed Drupal from the installation and installing from composer directly.
  - Adds MariaDB as part of the container so that web server and database are on the same container (all in one solution).
  - Automated site install of Drupal 8.

v.04 - December 21, 2017
  - Working and configured web server running PHP 7.1
  - Installed components including
    - Composer
    - Drupal Console
    - The latest version of Drush 8
    - Latest version of Drupal Core with key contributed modules.
