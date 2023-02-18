import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { CovidandoModule } from './covidando/covidando.module';

@Module({
  imports: [ConfigModule, HttpModule, CovidandoModule],
})
export class AppModule {}
