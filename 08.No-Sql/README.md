// Structured Query langauge
Made with table

Relation with table
One to one
one to many
many to many

Scale DB
Horizontal => we will always add more server
Vertical => making existing more powerful. Improve the server capcity.

## Camparision
# SQL `npm i --save mysql2`
Data uses schemas
Reations
Data is distributed across the multiple tables
horizontal scaling is defficult. Verical is possible
Limitation fo los of (thousand) read and write per second.

# NO-SQL
Schemas less
No(or very ) relations
Data is typically merged/nested in a few collections
Both horizontal and vertical scale possible
Great performance for mass read and write requests


# Sequilize `npm i --save sequelize`
An object relationl shpping libary
Models -> User Product
Instances -> const user = User.build()
Quireis -> User.findAll()
Association: -> User.hasMany(Product)