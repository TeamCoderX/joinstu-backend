import HttpStatusCodes from '@src/constants/HttpStatusCodes';

import UserAuthService from '@src/services/UserAuthService';
import { Router } from 'express';
import { IUser } from '@src/models/User';
import { IReq, IRes } from './types/express/misc';

const router = Router();

// **** Functions **** //

/**
 * Get all users.
 */
router.post('/login', async (req: IReq, res: IRes) => {
  const { id, password } = req.body;
  await UserAuthService.login(id, password)
    .then((result: IUser) => {
      console.log(result);
    })
    .catch((err: any) => {
      res.status(err.status).json({
        error: err.message,
      })
    })

})


// **** Export default **** //

export default router;