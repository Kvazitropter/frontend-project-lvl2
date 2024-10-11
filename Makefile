install:
	npm ci \
	npm link
publish:
	npm publish --dry-run
lint:
	npx eslint .
lint-fix:
	npx eslint --fix .
test:
	npm test
test-coverage:
	npm test -- --coverage