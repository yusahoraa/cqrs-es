import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CreatePostCommand } from '../write/commands/create-post-command.service';
import { LikePostCommand } from '../write/commands/like-post-command.service';
import { GetFavoritePostQuery } from '../read/queries/get-favorite-post-query.service';
import { PostWriteRepositoryService } from '../write/post-write-repository.service';
import { EventBus } from '../synchro/core/event-bus';
import { PostReadRepository } from '../read/post-read-repository';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    AppService,
    CreatePostCommand,
    LikePostCommand,
    GetFavoritePostQuery,
    PostWriteRepositoryService,
    PostReadRepository,
    EventBus,
  ],
})
export class AppModule {}
