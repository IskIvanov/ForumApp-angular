import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Not } from 'typeorm';
import { CommentStatus } from '../../common/enums/comment-status.enum';
import { ModelMappingService } from '../../core/services/model-mapping.service';
import { Comment } from '../../data/entities/comment';
import { PostEntity } from '../../data/entities/post';
import { Vote } from '../../data/entities/vote';
import { CommentService } from './comment.service';

describe('CommentService', () => {
  let service: CommentService;

  const mockCommentRepository = {
    find(postId) {},
    findOne() {},
    save() {},
  };
  const mockPostRepository = {
    find() {},
    findOne() {},
    save() {},
  };

  const mockVoteRepository = {
    find() {},
    findOne() {},
    save() {},
  };

  const mockModelMapingService = {
    returnPost() {},
    returnPostComments() {},
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommentService,
        {
          provide: getRepositoryToken(Comment),
          useValue: mockCommentRepository,
        },
        {
          provide: getRepositoryToken(PostEntity),
          useValue: mockPostRepository,
        },
        {
          provide: getRepositoryToken(Vote),
          useValue: mockPostRepository,
        },
        {
          provide: ModelMappingService,
          useValue: mockModelMapingService,
        },
      ],
    }).compile();

    service = module.get<CommentService>(CommentService);
  });

  describe('findAll', () => {
    it('should call commentRepository.find() with postId', async () => {
      // arrange
      const id = 'id';
      const queryParam = {
        where: {
          postId: id,
          status: Not(CommentStatus.ARCHIVED),
        },
        relations: ['author'],
      };

      const testCommentsForPost = ['tested'];

      const commentServiceFindAllSpy = jest
        .spyOn(mockCommentRepository, 'find')
        .mockImplementation(async () => ['test']);

      const commentSerrviceReturnComments = jest
        .spyOn(mockModelMapingService, 'returnPostComments')
        .mockImplementation(async () => 'tested');

      // act

      const result = await service.findAll(id);

      // assert

      expect(commentServiceFindAllSpy).toHaveBeenCalledWith(queryParam);
      expect(result).toEqual(testCommentsForPost);
    });
  });
});
