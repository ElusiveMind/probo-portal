FROM centos:7

# Set our our meta data for this container.
LABEL name="Containerized Open Source Probo.CI Server"
LABEL description="This is our Docker container for the open source version of ProboCI."
LABEL author="Michael R. Bagnall <mrbagnall@icloud.com>"
LABEL vendor="ProboCI, LLC."
LABEL version="0.05"

# Set up our standard binary paths.
ENV PATH /usr/local/src/vendor/bin/:/usr/local/rvm/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin

# Set TERM env to avoid mysql client error message "TERM environment variable not set" when running from inside the container
ENV TERM xterm 

# Fix command line compile issue with bundler.
ENV LC_ALL en_US.utf8

# Install and enable repositories RUN yum -y update && \
RUN yum -y install epel-release && \
  rpm -Uvh https://centos7.iuscommunity.org/ius-release.rpm && \
  yum -y update

# Install our common set of commands that we will need to do the various things.
RUN yum -y install \
  curl \
  git2u \
  mariadb101u-server.x86_64 \
  which \
  wget \
  gettext \
  gd-devel.x86_64 \
  mod_ssl.x86_64

RUN yum -y install \
  php71u \
  php71u-curl \
  php71u-gd \
  php71u-imap \
  php71u-mbstring \
  php71u-mcrypt \
  php71u-mysqlnd \
  php71u-odbc \
  php71u-pear \
  php71u-pecl-imagick \
  php71u-pecl-zendopcache \
  php71u-json

# Install Composer and Drush 
RUN curl -sS https://getcomposer.org/installer | php -- \
  --install-dir=/usr/local/bin \
  --filename=composer \
  --version=1.6.2 && \
  composer \
  --working-dir=/usr/local/src/ \
  global \
  require \
  drush/drush:8.* && \
  ln -s /usr/local/src/vendor/bin/drush /usr/bin/drush

# Install Drupal Console
RUN curl https://drupalconsole.com/installer -L -o /drupal.phar
RUN cp /drupal.phar /bin/drupal
RUN chmod 755 /bin/drupal

# Move our Apache and PHP configuration into position.
COPY etc/httpd/conf/httpd.conf /etc/httpd/conf/httpd.conf
COPY etc/php.ini /etc/php.ini

COPY docroot /var/www/html/web/
RUN chmod -R 775 /var/www/html
RUN chown -R apache:apache /var/www/html

# Simple startup script to avoid some issues observed with container restart 
ADD conf/run-httpd.sh /run-httpd.sh
RUN chmod -v +x /run-httpd.sh

CMD ["/run-httpd.sh"]
