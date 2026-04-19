import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common'

const GUEST_LIST_PASSWORD = 'unicorn'

@Controller('auth')
export class AuthController {
  @Post('verify')
  verify(@Body() body: { password?: string }): { success: true } {
    if (body?.password !== GUEST_LIST_PASSWORD) {
      throw new UnauthorizedException('Invalid password')
    }
    return { success: true }
  }
}
