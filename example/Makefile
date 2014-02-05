SRC = $(wildcard lib/*/*.js)
CSS = $(wildcard lib/*/*.css)
JSON = $(wildcard lib/*/component.json)

build: component.json $(SRC) $(CSS) $(JSON)
	@node --harmony index.js
	

clean:
	rm -rf build
