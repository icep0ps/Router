import { Request, Response } from 'express';

const msg = 'how to make route';

export default function hander(req: Request, res: Response): void {
  res.send(msg);
}
