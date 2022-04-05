install:
	npm ci
test:
	npx jest --bail
test-coverage:
	npm test -- --coverage --coverageProvider=v8
publish:
	npm publish --dry-run
lint:
	npx eslint .
