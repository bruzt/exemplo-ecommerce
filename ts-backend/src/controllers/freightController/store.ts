import { Request, Response } from 'express';

import correios from '../../services/freights/correios';

export default async function store(req: Request, res: Response) {

    const { pac, sedex } = await correios(req);

    return res.json({ pac, sedex });
}
