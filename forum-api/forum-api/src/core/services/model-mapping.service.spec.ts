import { Test, TestingModule } from '@nestjs/testing';
import { PostStatus } from '../../common/enums/post-status.enum';
import { PostEntity } from '../../data/entities/post';
import { User } from '../../data/entities/user';
import { ShowPostDTO } from '../../models/post/show-post.dto';
import { ModelMappingService } from './model-mapping.service';
describe('ModelMappingService', () => {
  let service: ModelMappingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ModelMappingService],
    }).compile();

    service = module.get<ModelMappingService>(ModelMappingService);
  });

  describe('returnPost', () => {
    it('should return post with the correct data', async () => {
      // arange
      const expectedObject: ShowPostDTO = {
        title: 'title',
        content: 'content',
        publishDate: new Date(),
        status: PostStatus.PUBLISHED,
        author: {
          id: 'string',
          username: 'username',
          registerDate: new Date(),
        },
      };

      const initialPost = new PostEntity();

      const author = new User();
      author.id = 'string';
      author.name = 'username';
      author.createdOn = new Date();
      initialPost.title = 'title';
      initialPost.content = 'content';
      initialPost.createdOn = new Date();
      initialPost.status = PostStatus.PUBLISHED;
      // tslint:disable-next-line
      initialPost['__author__'] = author;

      console.log(initialPost);

      const result = await service.returnPost(initialPost);

      expect(result).toEqual(expectedObject);
    });
  });
});
