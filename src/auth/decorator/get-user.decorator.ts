import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const getUser = createParamDecorator((_, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  return request.user;
});
