import { ApiProperty } from '@nestjs/swagger';

export class NotFoundByIdGetDoc {
  @ApiProperty({
    type: String,
    description: 'Error message',
    example: 'Product not found with the specified ID.',
  })
  message: string;

  @ApiProperty({
    type: Number,
    description: 'HTTP status code',
    example: 404,
  })
  statusCode: number;

  @ApiProperty({
    type: String,
    description: 'Request URL',
    example: 'products/7898215151708',
  })
  url: string;
}
