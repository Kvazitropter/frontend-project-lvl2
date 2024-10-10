# Gendiff:

[![Actions Status](https://github.com/Kvazitropter/frontend-project-lvl2/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/Kvazitropter/frontend-project-lvl2/actions)
[![Node CI](https://github.com/Kvazitropter/frontend-project-lvl2/actions/workflows/nodejs.yml/badge.svg)](https://github.com/Kvazitropter/frontend-project-lvl2/actions/workflows/nodejs.yml)
[![Maintainability](https://api.codeclimate.com/v1/badges/16f10a5e86cfc51a6022/maintainability)](https://codeclimate.com/github/Kvazitropter/frontend-project-lvl2/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/16f10a5e86cfc51a6022/test_coverage)](https://codeclimate.com/github/Kvazitropter/frontend-project-lvl2/test_coverage)

---

Compares two configuration files and shows a difference.

---

# Set up:

```
git clone git@github.com:Kvazitropter/frontend-project-lvl2.git
make install
```

---

# Usage:

```

gendiff filepath1 filepath2 [-h] [-v] [-f]

```

```

Required arguments:
  filepath1  path to original file
  filepath2  path to file that original will be compared to

Optional arguments:
  -h --help           show usage information
  -V --version        show program's version number
  -f --format [type]  choose output format (default: "stylish")

```

---

# Stylish \(default\) format:

[![asciicast](https://asciinema.org/a/DwqV7pequ9D0kaw1QtPFvII5S.svg)](https://asciinema.org/a/DwqV7pequ9D0kaw1QtPFvII5S)

---