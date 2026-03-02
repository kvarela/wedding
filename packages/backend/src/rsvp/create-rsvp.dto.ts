import {
  ArrayMinSize,
  ArrayMaxSize,
  IsArray,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator'
import { RsvpAttendance } from './rsvp-attendance.enum'
import { RsvpMealChoice } from './rsvp-meal-choice.enum'

export class CreateRsvpDto {
  @IsString()
  @MinLength(1, { message: 'Name is required' })
  @MaxLength(255)
  name: string

  @IsEmail()
  email: string

  @IsString()
  @MaxLength(50)
  phone: string

  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(1, { message: 'At least one guest name is required' })
  guestNames: string[]

  @IsArray()
  @IsEnum(RsvpMealChoice, { each: true })
  @ArrayMinSize(1, { message: 'At least one meal choice is required' })
  @ArrayMaxSize(4, { message: 'At most 4 guests per party' })
  mealChoices: RsvpMealChoice[]

  @IsString()
  @MinLength(1, { message: 'Address is required' })
  address: string

  @IsOptional()
  @IsString()
  message?: string

  @IsEnum(RsvpAttendance)
  attendance: RsvpAttendance
}
