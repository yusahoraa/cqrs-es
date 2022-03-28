import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CreatePostCommandService } from '../services/commands/create-post-command.service';
import { LikePostCommandService } from '../services/commands/like-post-command.service';
import { GetFavoritePostQueryService } from '../services/queries/get-favorite-post-query.service';
import { PostWriteRepositoryService } from '../repositories/post-write-repository.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, CreatePostCommandService, LikePostCommandService, GetFavoritePostQueryService, PostWriteRepositoryService],
})
export class AppModule {}
