import { Request, Response } from 'express';

export default function hander(req: Request, res: Response): void {
  res.send('users endpoint!');
}
