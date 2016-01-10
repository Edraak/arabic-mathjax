correct_perms:
	sudo chown -R $$USER:$$USER .
	chmod a+r -R .
	find extensions/ testcases/ -type d -exec chmod a+x {} \;


init:
	docker-compose run main npm install
	make correct_perms
