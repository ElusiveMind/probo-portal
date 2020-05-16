FROM centos:7

# Set our our meta data for this container.
LABEL name="Containerized Drupal Portal User Interface for ProboCI OSS Server"
LABEL description="This is our Docker container for the open source version of ProboCI."
LABEL author="Michael R. Bagnall <mbagnall@zivtech.com>"
LABEL vendor="ProboCI, LLC."
LABEL version="0.20"

# Set up our standard binary paths.
ENV PATH /usr/local/src/vendor/bin/:/usr/local/rvm/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin

# Set TERM env to avoid mysql client error message "TERM environment variable not set" when running from inside the container
ENV TERM xterm 

# Fix command line compile issue with bundler.
ENV LC_ALL en_US.utf8

# Install and enable repositories
RUN yum -y update && \
    yum -y install epel-release && \
    yum -y install http://rpms.remirepo.net/enterprise/remi-release-7.rpm && \
    rpm -Uvh https://centos7.iuscommunity.org/ius-release.rpm && \
    yum -y update

# Install our common set of commands that we will need to do the various things.
RUN yum -y install \
  curl \
  git2u \
  mariadb \
  which \
  wget \
  gettext \
  gd-devel.x86_64 \
  mod_ssl.x86_64 \
  docker-client \
  npm \
  zip \
  unzip \
  libsodium-devel

# Install PHP modules
RUN yum-config-manager --enable remi-php74 && \
  yum -y install \
    php \
    php-cli \
    php-curl \
    php-gd \
    php-imap \
    php-mbstring \
    php-mysqlnd \
    php-odbc \
    php-pear \
    php-pecl-imagick \
    php-pecl-json \
    php-pecl-uploadprogress \
    php-pecl-apcu \
    php-pecl-redis5 \
    php-pecl-memcached \
    php-bcmath \
    php-xml \
    php-ldap \
    php-devel \
    php-pecl-ssh2

RUN pecl install libsodium

# Install Composer and Drush 
RUN curl -sS https://getcomposer.org/installer | php -- \
  --install-dir=/usr/local/bin \
  --filename=composer \
  --version=1.10.5 && \
  composer \
  --working-dir=/usr/local/src/ \
  global \
  require \
  drush/drush:10.* && \
  ln -s /usr/local/src/vendor/bin/drush /usr/bin/drush

# Move our Apache and PHP configuration into position.
COPY etc/httpd/conf/loading-httpd.conf /etc/httpd/conf/loading-httpd.conf
COPY etc/httpd/conf/probo-httpd.conf /etc/httpd/conf/probo-httpd.conf
COPY var/www/loading /var/www/loading
COPY etc/php.ini /etc/php.ini

# Simple startup script to avoid some issues observed with container restart 
ADD conf/run-httpd.sh /run-httpd.sh
RUN chmod -v +x /run-httpd.sh

CMD ["/run-httpd.sh"]
 