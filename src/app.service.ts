import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { DatabaseService } from './db/db.service';

@Injectable()
export class AppService {
  // TODO move db init to here?
}
