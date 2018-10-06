#!/bin/bash

# Do the base installation of Drupal
drush -y -r /var/www/html/web si standard \
  --db-url=mysql://$PORTAL_DB_USERNAME:$PORTAL_DB_PASSWORD@$PORTAL_DB_HOSTNAME/$PORTAL_DB_DATABASE \
  --account-pass="$PORTAL_ADMIN_ACCOUNT_PASSWORD" \
  --account-name="$PORTAL_ADMIN_ACCOUNT_USERNAME" \
  --account-mail="$PORTAL_ADMIN_ACCOUNT_EMAIL" \
  --site-name="Open Source Probo Portal"
chown -R apache:apache /var/www/html


# Make sure we're not confused by old, incompletely-shutdown httpd
# context after restarting the container.  httpd won't start correctly
# if it thinks it is already running.
rm -rf /run/httpd/* /tmp/httpd*

exec /usr/sbin/apachectl -DFOREGROUND