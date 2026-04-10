import {
  ArrayMinSize,
  ArrayMaxSize,
  IsArray,
  IsEmail,
  IsEnum,
  IsIn,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator'
import { RsvpAttendance } from './rsvp-attendance.enum'
import { RSVP_MEAL_CHOICE_VALUES, type RsvpMealChoice } from './rsvp-meal-choice'

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
  @IsIn([...RSVP_MEAL_CHOICE_VALUES], { each: true })
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
