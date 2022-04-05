install:
	npm ci
test:
	npm test
test-coverage:
	npm test -- --coverage
publish:
	npm publish --dry-run
lint:
	npx eslint .
