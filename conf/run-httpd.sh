#!/bin/bash

# Only run our Drupal install if we do not have a Drupal install currently.
if [ ! -f "/var/www/html/web/sites/default/settings.php" ]; then
  # Install Drupal via composer and do so as the apache user.
  rm -rf /var/www/html
  composer create-project drupal-composer/drupal-project:8.x-dev /var/www/html --stability dev --no-interaction
  composer --working-dir=/var/www/html require drupal/admin_toolbar:^1.0
  composer --working-dir=/var/www/html require drupal/module_filter:^3.0
  composer --working-dir=/var/www/html require drupal/smtp:^1.0
  composer --working-dir=/var/www/html require drupal/probo:1.x-dev
  composer --working-dir=/var/www/html require drupal/proboci:1.x-dev

  # Do the base installation of Drupal
  drush -y -r /var/www/html/web si standard \
    --db-url=mysql://$PORTAL_DB_USERNAME:$PORTAL_DB_PASSWORD@$PORTAL_DB_HOSTNAME/$PORTAL_DB_DATABASE \
    --account-pass="$PORTAL_ADMIN_ACCOUNT_PASSWORD" \
    --account-name="$PORTAL_ADMIN_ACCOUNT_USERNAME" \
    --account-mail="$PORTAL_ADMIN_ACCOUNT_EMAIL" \
    --site-name="Open Source Probo Portal"

  drush -y pm:enable -r /var/www/html/web admin_toolbar admin_toolbar_tools module_filter smtp probo
  drush -y theme:enable -r /var/www/html/web proboci
  drush -y cset system.theme -r /var/www/html/web default proboci
  drush -y cset system.site -r /var/www/html/web page.front '/probo'
  drush -y cset system.site -r /var/www/html/web page.403 '/user/login'
else
  # If the imnstall exists, then try to do an update.
  composer --working-dir=/var/www/html update
fi

# Change the permissions of the web files to the Apache user.
chown -R apache:apache /var/www/html

# Make sure we're not confused by old, incompletely-shutdown httpd
# context after restarting the container.  httpd won't start correctly
# if it thinks it is already running.
rm -rf /run/httpd/* /tmp/httpd*

# Start me up.
exec /usr/sbin/apachectl -DFOREGROUND