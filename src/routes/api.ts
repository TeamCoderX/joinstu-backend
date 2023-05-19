import { Router } from 'express';
import jetValidator from 'jet-validator';

import Paths from './constants/Paths';
import AccountRoutes from './AccountsRoutes';


// **** Variables **** //

const apiRouter = Router(),
  validate = jetValidator();


// ** Add AccountsRouter ** //
apiRouter.use(Paths.Auth.Base, AccountRoutes);


// **** Export default **** //

export default apiRouter;
