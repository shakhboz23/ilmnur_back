import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsNumber, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { Test_settingsDto } from 'src/test_settings/dto/test_settings.dto';

class QuestionDto {
  @ApiProperty({
    example: 'Quyidagi izotopda nechta proton, elektron va neytron bor? 18^F-',
    description: 'The question text',
  })
  @IsNotEmpty()
  @IsString()
  question: string;

  @ApiProperty({
    example: [
      '5 proton, 4 elektron, 2 neytron',
      '4 proton, 8 elektron, 1 neytron',
      '6 proton, 1 elektron, 8 neytron'
    ],
    description: 'Answer options for the question',
  })
  @IsArray()
  @IsNotEmpty({ each: true })
  variant: string[];
}

export class TestsDto extends Test_settingsDto {
  @ApiProperty({
    example: 1,
    description: 'Test id of the tests',
  })
  @IsNotEmpty()
  @IsNumber()
  lesson_id: number;

  @ApiProperty({
    type: [QuestionDto],
    description: 'Array of test questions',
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => QuestionDto)
  test: QuestionDto[];
}
