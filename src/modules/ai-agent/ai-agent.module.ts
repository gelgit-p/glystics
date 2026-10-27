import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MetaModelClient } from './meta-model.client';

@Module({
  imports: [ConfigModule],
  providers: [MetaModelClient],
  exports: [MetaModelClient],
})
export class AiAgentModule {}
