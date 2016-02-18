correct_perms:
	sudo chown -R $$USER .
	chmod -R a+r .
	find extensions/ testcases/ -type d -exec chmod a+x {} \;


init:
	docker-compose run main npm install
	make correct_perms
