
PLUGINNAME = bgl

all: styles scripts
	cp plugin.info.txt $(PLUGINNAME)/

directory:
	mkdir -p $(PLUGINNAME)

styles: | directory
	cat *.css > $(PLUGINNAME)/style.css
	
scripts: | directory
	cat *.js > $(PLUGINNAME)/script.js



