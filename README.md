# Containerized Drupal Portal User Interface for ProboCI OSS Server
This is the Drupal user front end for the ProboCI Open Source Server for which it is designed to run in conjunction with. For more information on the ProboCI Open Source Server, please visit our web site located at Probo.CI

The plan for this project is to have a fully functional Drupal 8 based portal for administering and looking at builds in the Open Source Probo.CI system.

#### Last Updated: February 8, 2020

#### v.18 - February 8, 2020  

- Upgraded web server to use PHP 7.3
- Updated Drupal to use the recommended project on version 8.8.2
- Updated to use Drush 10
- Updated README

#### v.17 - May 31, 2019

- Updated to Remi Repositories
- Updated to PHP 7.2
- Added mCrypt to PHP 7.2
- Added SSH2 to PHP 7.2

#### v.16 - May 24, 2019

- Added LDAP module

#### v.15 - March 27, 2019

- Add npm (node)

#### v.14 - March 26,2019  

- Add the Docker client so it can interface with the host docker containers.

#### v.13 - March 1, 2019  

- Add a composer update for Drupal/modules for creating a container with an existing install

#### v.12 - February 26, 2019  

- Moved site install and composer scripts to run-httpsd.sh
- Move the proboci theme into the proper drush script to enable

#### v.11 - February 25, 2019

- Corrected versions of contributed modules.
- Removed duplicate download from composer
- Enabled modules after site install

#### v.08 - April 16, 2018

- Moved Drupal installation into the Dockerfile and set up mounts.

#### v.07 - March 5, 2018

- Added PHPMyAdmin to the repository

#### v.06 - March 4, 2018

- Added ReactJS workflow for interface on the theme.

#### v.05 - January 17, 2018

- Removed Drupal from the installation and installing from composer directly.
- Adds MariaDB as part of the container so that web server and database are on the same container (all in one solution).
- Automated site install of Drupal 8.

#### v.04 - December 21, 2017

- Working and configured web server running PHP 7.1
- Installed components including
-- Composer
-- Drupal Console
-- The latest version of Drush 8
-- Latest version of Drupal Core with key contributed modules.
