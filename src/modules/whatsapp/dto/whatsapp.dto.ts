import { ApiProperty } from "@nestjs/swagger";

export class MessageDto {
    @ApiProperty({ description: 'The recipient phone number in international format' })
    to: string;

    @ApiProperty({ description: 'The text message to be sent' })
    text: string;
}