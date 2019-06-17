import { Test, TestingModule } from '@nestjs/testing';
import { PostService } from './post.service';
import { PostEntity } from '../../data/entities/post';
import { Vote } from '../../data/entities/vote';
import { NotificationEntity } from '../../data/entities/notification';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ModelMappingService } from '../../core/services/model-mapping.service';
import { User } from '../../data/entities/user';
import { Comment } from '../../data/entities/comment';
import { PostStatus } from '../../common/enums/post-status.enum';
import { ShowPostDTO } from '../../models/post/show-post.dto';

describe('PostService', async () => {
  let postService: PostService;

  // dependencies
  const postRepo = {
    find() {},
    findOne() {},
    save() {},
  };
  const voteRepo = {
    find() {},
    findOne() {},
    save() {},
  };
  const notificationRepo = {
    find() {},
    findOne() {},
    save() {},
  };
  const modelMappingService = {
    returnPost() {},
    returnPostComments() {},
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostService,
        {
          provide: ModelMappingService,
          useValue: modelMappingService,
        },
        {
          provide: getRepositoryToken(PostEntity),
          useValue: postRepo,
        },
        {
          provide: getRepositoryToken(Vote),
          useValue: voteRepo,
        },
        {
          provide: getRepositoryToken(NotificationEntity),
          useValue: notificationRepo,
        },
      ],
    }).compile();

    postService = module.get<PostService>(PostService);
  });

  describe('findOnePost', async () => {
    it('should call postRepo.findOne only once with the correct post ID', async () => {
      // Arrange
      const mockID: string = '2b8cf2f0-9a3a-45ac-949a-0e22f3bfe797';
      const mockException = 'No such post exists';
      const postStatus: PostStatus = null;
      const mockUser: Promise<User> = null;
      const mockComments: Promise<Comment[]> = null;
      const mockVote: Promise<Vote[]> = null;
      const mockPost: PostEntity = {
        id: '2b8cf2f0-9a3a-45ac-949a-0e22f3bfe797',
        title: 'Mock Title',
        content: 'Mock message',
        status: postStatus,
        createdOn: new Date('2019-05-20T19:55:29.800Z'),
        updatedOn: new Date('2019-05-20T19:55:29.800Z'),
        version: 1,
        author: mockUser,
        comments: mockComments,
        votes: mockVote,
      };
      const mockMappedPost: ShowPostDTO = {
        title: 'Mock Title',
        content: 'Mock message',
        publishDate: new Date('2019-05-20T19:55:29.800Z'),
        status: postStatus,
        author: {
          id: 'aokfpsjvir365yn4uuo7un',
          username: 'random',
          registerDate: new Date('2019-05-20T19:55:29.800Z'),
        },
      };

      const postFindOneSPY = jest
      .spyOn(postService, 'findOnePost')
      .mockImplementation( () => Promise.resolve(mockMappedPost));

      // Act
      await postService.findOnePost(mockID);

      // Assert
      expect(postFindOneSPY).toBeCalledTimes(1);
      expect(postFindOneSPY).toBeCalledWith(mockID);

      postFindOneSPY.mockRestore();
    });
  });
});
