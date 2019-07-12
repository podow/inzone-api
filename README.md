# Commands

- For generate model with migration
```
npx sequelize-cli model:generate --name {MODEL_NAME} --attributes {MODEL_ATTRS}
```
- For create migration
```
npx sequelize-cli migration:generate --name {NAME}
```
- For generating seeds (mock data)
```
npx sequelize-cli seed:generate --name {NAME}
```
- For execute migration
```
npx sequelize-cli db:migrate
```
- For undo migration
```
npx sequelize-cli db:migrate:undo
npx sequelize-cli db:migrate:undo:all
```
