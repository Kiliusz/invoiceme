import { NextFunction, Request, Response } from 'express';

export const logger = (req: Request, res: Response, next: NextFunction) => {
  const { ip, method, path: url, body } = req;
  const userAgent = req.get('user-agent') || '';
  console.log(
    `${method} ${url}  - ${userAgent} ${ip} body: ${JSON.stringify(
      body,
      null,
      2,
    )}`,
  );

  next();
};
