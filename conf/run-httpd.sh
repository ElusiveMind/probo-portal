#!/bin/bash

mkdir /var/www/html/web/modules/custom
git clone https://github.com/ElusiveMind/probo-drupal.git /var/www/html/web/modules/custom
git clone https://github.com/ElusiveMind/jupither.git /var/www/html/web/themes

# Make sure we're not confused by old, incompletely-shutdown httpd
# context after restarting the container.  httpd won't start correctly
# if it thinks it is already running.
rm -rf /run/httpd/* /tmp/httpd*

exec /usr/sbin/apachectl -DFOREGROUND