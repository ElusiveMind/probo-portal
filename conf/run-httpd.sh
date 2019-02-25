#!/bin/bash

# Only run our Drupal install if we do not have a Drupal install currently.
if [ ! -f "/var/www/html/web/sites/default/settings.php" ]; then
  # Do the base installation of Drupal
  drush -y -r /var/www/html/web si standard \
    --db-url=mysql://$PORTAL_DB_USERNAME:$PORTAL_DB_PASSWORD@$PORTAL_DB_HOSTNAME/$PORTAL_DB_DATABASE \
    --account-pass="$PORTAL_ADMIN_ACCOUNT_PASSWORD" \
    --account-name="$PORTAL_ADMIN_ACCOUNT_USERNAME" \
    --account-mail="$PORTAL_ADMIN_ACCOUNT_EMAIL" \
    --site-name="Open Source Probo Portal"

  drush -y en -r /var/www/html/web admin_toolbar module_filter smtp probo proboci

fi

# Change the permissions of the web files to the Apache user.
chown -R apache:apache /var/www/html

# Make sure we're not confused by old, incompletely-shutdown httpd
# context after restarting the container.  httpd won't start correctly
# if it thinks it is already running.
rm -rf /run/httpd/* /tmp/httpd*

# Start me up.
exec /usr/sbin/apachectl -DFOREGROUND