# Yeoman Base Project Scaffold

This respository is not meant to be cloned. This repository is a supplement to the guided documentation
from the library [getting-started](https://yeoman.io/learning)

---

## Yeoman concepts to observe

Yeoman is capabale of having multiple **generators** in one generator-context folder.

---

## Register a generator to global npm

Use the command below within the **root folder** of the **generator-context**.

```bash
npm link

```

A new file will be linked in **$NODE_PATH/lib/node_modules** folder of global npm.

```bash
mkdir project_name
cd project_name
yo generator_name
```

Use help to see a list of available generators for use localy

```bash
yo --help
```
