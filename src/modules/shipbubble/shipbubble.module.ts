import { Module } from '@nestjs/common';
import { ShipbubbleController } from './shipbubble.controller';
import { ShipbubbleService } from './shipbubble.service';

@Module({
	controllers: [ShipbubbleController],
	providers: [ShipbubbleService],
	exports: [ShipbubbleService],
})
export class ShipbubbleModule {}
