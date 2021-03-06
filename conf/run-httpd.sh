#!/bin/bash

# Only run our Drupal install if we do not have a Drupal install currently.
if [ ! -f "/var/www/html/web/sites/default/settings.php" ]; then
  # Install Drupal via composer and do so as the apache user.
  rm -rf /var/www/html
  composer create-project drupal-composer/drupal-project:8.x-dev /var/www/html --stability dev --no-interaction
  composer --working-dir=/var/www/html require drupal/admin_toolbar:^2.0 drupal/module_filter:^3.0 drupal/smtp:^1.0 drupal/probo:1.x-dev drupal/proboci:1.x-dev

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
  drush -y cset probo.probosettings -r /var/www/html/web probo_builds_domain "$PROBO_BUILDS_DOMAIN"
  drush -y cset probo.probosettings -r /var/www/html/web probo_builds_protocol "$PROBO_BUILDS_PROTOCOL"
  drush -y cset probo.probosettings -r /var/www/html/web asset_receiver_url_port "$PROBO_ASSET_RECEIVER_URL"
  drush -y cset probo.probosettings -r /var/www/html/web asset_receiver_token "$PROBO_ASSET_RECEIVER_TOKEN"
  drush -y cset probo.probosettings -r /var/www/html/web base_url "$PROBO_BASE_URL"
  drush -y cset probo.probosettings -r /var/www/html/web probo_mailcatcher_domain "$PROBO_MAILCATCHER"
  drush -y cset probo.probosettings -r /var/www/html/web probo_solr_domain "$PROBO_SOLR"
  drush -y cset probo.probosettings -r /var/www/html/web probo_loom_stream_url "$PROBO_LOOM_URL"
  drush -y cset probo.probosettings -r /var/www/html/web probo_loom_stream_token "$PROBO_LOOM_TOKEN"
  drush -y cset probo.probosettings -r /var/www/html/web probo_api_token "$PROBO_API_TOKEN"
else
  # If the imnstall exists, then try to do an update.
  composer --working-dir=/var/www/html update
  drush -y -r /var/www/html/web updb
fi

# Change the permissions of the web files to the Apache user.
chown -R apache:apache /var/www/html

# Make sure we're not confused by old, incompletely-shutdown httpd
# context after restarting the container.  httpd won't start correctly
# if it thinks it is already running.
rm -rf /run/httpd/* /tmp/httpd*

# Start me up.
exec /usr/sbin/apachectl -DFOREGROUND