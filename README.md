# Installation

1. Install ruby on rails https://gorails.com/setup/ubuntu/16.04
2. Install redis-server https://www.digitalocean.com/community/
tutorials/how-to-install-and-configure-redis-on-ubuntu-16-04
3. git clone https://github.com/trungth12/qlgd-ubuntu
4. cd qlgd-ubuntu
5. Set database.yml  (config/database.yml)
	production:
  	adapter: postgresql
  	host: localhost
 	port: 5432
  	username: postgres
  	password: 
  	database: qlgd
  	pool: 5
  	timeout: 5000
6. bundle install
7. bundle exec rake db:migrate
8. Config solr.xml port 8983
9. Set tennant 
INSERT INTO tenants(
	id, hoc_ky, nam_hoc, created_at, 
	updated_at, host, adapter,
	database, username, password, port)
VALUES (1, '2', '2015-2016', '2016-01-11 00:00:00',
	'2016-01-11 00:00:00', 'localhost', 'postgresql',
	'qlgd', 'qlgd', 'qlgd', '5432');

10. bundle exec rake qtm:load_tuan
11. bundle exec rake qtm:load_phong
12. bundle exec rake qtm:load_mon_hoc
13. bundle exec rake qtm:load_sinh_vien

14. bundle exec rake qtm:load_giang_vien
15. bundle exec rake qtm:load_lop_mon_hoc

16. bundle exec rake qtm:load_sinh_vien_lop_mon_hoc

17. bundle exec rake qtm:start_lop

18. bundle exec rake qtm:reindex
19. bundle exec rake sunspot:solr:start
20. redis-server redis6981.conf
21. RAILS_ENV=production bundle exec rails s 

# Nix

1. Install nix

2. Build ruby environment

```
nix-shell --run "bundix -d"
```

3. Deployment
