correct_perms:
	sudo chown -R $$USER:$$USER .
	chmod a+r -R .
	find extensions/ mathjax/ testcases/ -type d -exec chmod a+x {} \;
