import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as path from 'path';

export function typeOrmSettings(
  options: TypeOrmModuleOptions,
): TypeOrmModuleOptions {
  const src = path.join(__dirname, '..', '..');
  return {
    maxQueryExecutionTime: 1000, // log long queries
    ...options,
    synchronize: false, // never use synchronize
    entities: [path.join(src, 'database', 'entities', '*.entity{.ts,.js}')],
    migrations: [path.join(src, 'database', 'migrations', '*{.ts,.js}')],
  };
}
