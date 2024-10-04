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
	npm test --coverage
run-json:
	gendiff __fixtures__/file1.json __fixtures__/file2.json