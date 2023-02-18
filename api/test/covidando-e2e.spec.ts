import { HttpModule } from '@nestjs/axios';
import { INestApplication } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { CovidandoModule } from '../src/covidando/covidando.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule, HttpModule, CovidandoModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    await app.init();
  });

  it('Should be defined', () => {});

  describe('/covidando', () => {
    it('/covidando/regions (GET)', () => {
      return request(app.getHttpServer()).get('/covidando/regions').expect(200);
    });
  });
});
