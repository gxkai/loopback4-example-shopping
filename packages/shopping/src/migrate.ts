import {ShoppingApplication} from './application';
import { CategoryRepository } from './repositories'
import { Category } from './models'
export async function migrate(args: string[]) {
  console.log(args)
  const existingSchema = args.includes('rebuild') ? 'drop' : 'alter';
  console.log('Migrating schemas (%s existing schema)', existingSchema);
  const app = new ShoppingApplication();
  await app.boot();
  await app.migrateSchema({existingSchema});
  const categoryRepo = await app.getRepository(CategoryRepository);
  const categories = [{name: 'NodeJs'}, {name: 'Linux'}]
  categories.map( async  e => {
    const found = await categoryRepo.findOne({where: e})
    if(found) {
      await categoryRepo.updateById(found.id, new Category(e))
    } else {
      const category: Omit<Category, 'id'> = new Category(e)
      await categoryRepo.create(category)
    }
  })

  // Connectors usually keep a pool of opened connections,
  // this keeps the process running even after all work is done.
  // We need to exit explicitly.
  process.exit(0);
}

migrate(process.argv).catch(err => {
  console.error('Cannot migrate database schema', err);
  process.exit(1);
});
