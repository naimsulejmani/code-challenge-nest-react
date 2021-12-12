import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as path from 'path';
import { ConnectionOptionsReader } from 'typeorm';

import { typeOrmSettings } from './typeorm.helper';

export const typeOrmConfigFactory = registerAs(
  'typeorm',
  async (): Promise<TypeOrmModuleOptions> => {
    // replicate native typeorm behavior:
    //  If TYPEORM_CONNECTION exists, ignore the config file
    process.env.TYPEORM_CONFIG_FACTORY = 'true';
    const options = await new ConnectionOptionsReader({
      root: path.join(__dirname, '..', '..', '..'),
    }).get('default');
    console.log(options)
    console.log('here');

    return typeOrmSettings(options);
  },
);

export const TYPEORM_CONFIG = typeOrmConfigFactory.KEY;
