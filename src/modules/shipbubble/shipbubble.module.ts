import { Module } from '@nestjs/common';
import { PublicCouriersController, ShipbubbleController } from './shipbubble.controller';
import { ShipbubbleService } from './shipbubble.service';

@Module({
	controllers: [PublicCouriersController, ShipbubbleController],
	providers: [ShipbubbleService],
	exports: [ShipbubbleService],
})
export class ShipbubbleModule {}
