import { CacheModule, Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import * as redisStore from 'cache-manager-redis-store';
import { ConfigModule } from '@nestjs/config';

import { CovidandoService } from './covidando.service';
import { CovidandoController } from './covidando.controller';

@Module({
  imports: [
    ConfigModule.forRoot(),
    CacheModule.register({
      isGlobal: true,
      store: redisStore,
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
      password: process.env.REDIS_PASS,
    }),
    HttpModule.register({
      baseURL: 'https://covid-19-statistics.p.rapidapi.com',
      headers: {
        'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
        'X-RapidAPI-Host': process.env.RAPIDAPI_HOST,
      },
    }),
  ],
  controllers: [CovidandoController],
  providers: [CovidandoService],
})
export class CovidandoModule {}
