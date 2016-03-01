correct_perms:
	sudo chown -R $$USER .
	chmod -R a+r .
	find extensions/ testcases/ -type d -exec chmod a+x {} \;


init:
	docker-compose run main npm install
	make correct_perms

deploy:
	cat extensions/arabic/arabic.js > static/arabic/arabic.js
	cd static/  \
	   && git add arabic/arabic.js  \
	   && git push  \
	   && (git ci -m "Auto update on `date`" || true)  \
	   && git push
