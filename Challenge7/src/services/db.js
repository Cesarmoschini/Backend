import knex from 'knex';
import dbConfig from '../../knexfile';

class DB {
  constructor() {
    const environment = process.env.NODE_ENV || 'development';
    console.log(`SETTING ${environment} DB`);
    const options = dbConfig[environment];
    this.connection = knex(options);
  }

  init() {

    this.connection.schema.hasTable('productos').then((exists) => {
      if (exists) return;
      console.log('Creamos la tabla productos!');

      return this.connection.schema.createTable(
        'productos',
        async (productosTable) => {
          productosTable.increments();
          productosTable.string('nombre').notNullable();
          productosTable.string('descripcion').notNullable();
          productosTable.integer('stock').notNullable();
          productosTable.decimal('precio', 4, 2);
          productosTable.timestamps(true, true);

          const initProducts = [
            {
              nombre: 'Libro',
              descripcion: 'Cien años de soledad',
              stock: 10,
              precio: '120.0',
            },
            {
              nombre: 'Enciclopedia',
              descripcion: 'Atlas 2022',
              stock: 40,
              precio: '45.5',
            },
          ];

          const createProducts = initProducts.map((aCategory) =>
            this.create('productos', aCategory)
          );
          await Promise.all(createProducts);
        }
      );
    });
  }

  get(tableName, id) {
    if (id) return this.connection(tableName).where('id', id);

    return this.connection(tableName);
  }

  create(tableName, data) {
    return this.connection(tableName).insert(data);
  }

  update(tableName, id, data) {
    return this.connection(tableName).where('id', id).update(data);
  }

  delete(tableName, id) {
    return this.connection(tableName).where('id', id).del();
  }
}

export const DBService = new DB();