import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BasetenClient } from './baseten.client';
import { MetaModelClient } from './meta-model.client';

@Module({
  imports: [ConfigModule],
  providers: [BasetenClient, MetaModelClient],
  exports: [BasetenClient, MetaModelClient],
})
export class AiAgentModule {}
