import { ApiProperty } from "@nestjs/swagger";
import { IsOptional } from "class-validator";

export class MessageDto {
    @ApiProperty({ description: 'The recipient phone number in international format' })
    to: string;

    @ApiProperty({ description: 'The text message to be sent' })
    text: string;
}

export class AccessTokenDto {
    @ApiProperty()
    appId: string;

        @ApiProperty()
    appSecret: string;
}

export class WebhookSubscriptionDto {
    @ApiProperty()
    @IsOptional()
    userId: string;

    @ApiProperty()
    @IsOptional()
    override_callback_uri: string;

    @ApiProperty()
    @IsOptional()
    verify_token: string
}