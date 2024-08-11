import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: string) {
    console.log(req)
    res = 'TEST'
    
}