import { ApiProperty } from '@nestjs/swagger';

export class NotFoundGetDoc {
  @ApiProperty({
    type: String,
    description: 'Wrong endpoint',
    example: 'Cannot GET /products',
  })
  message: string;

  @ApiProperty({
    type: String,
    description: 'Error message',
    example: 'Not Found',
  })
  error: string;

  @ApiProperty({
    type: Number,
    description: 'http request status.',
    example: 404,
  })
  statusCode: number;

}
