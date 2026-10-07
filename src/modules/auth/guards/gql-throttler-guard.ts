// import { ExecutionContext, Injectable } from '@nestjs/common';
// import { GqlExecutionContext } from '@nestjs/graphql';
// import { ThrottlerGuard } from '@nestjs/throttler';

// @Injectable()
// export class GqlThrottlerGuard extends ThrottlerGuard {
//   override async getTracker(req: any): Promise<string> {
//     const ip = req?.ip || req?.headers?.['x-forwarded-for'] || 'unknown';
//     return ip;
//   }

//   override getRequestResponse(context: ExecutionContext) {
//     if (context.getType<'graphql' | 'http'>() === 'graphql') {
//       const gqlCtx = GqlExecutionContext.create(context).getContext();
//       return { req: gqlCtx.req, res: gqlCtx.res };
//     }

//     return {
//       req: context.switchToHttp().getRequest(),
//       res: context.switchToHttp().getResponse(),
//     };
//   }
// }
