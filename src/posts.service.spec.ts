import { Post, PostsService } from './posts.service';

describe('PostsService', () => {
  let postsService: PostsService;
  const post: Omit<Post, 'id' | 'date'> = {
    text: 'Mocked post',
  };

  beforeEach(async () => {
    postsService = new PostsService();

    postsService.create({ text: 'Some pre-existing post' });
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should add a new post', () => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2024-01-01T10:00:00.000Z'));

    const createdPost = postsService.create(post);

    expect(createdPost).toEqual({
      id: '2',
      text: 'Mocked post',
      date: '2024-01-01T10:00:00.000Z',
    });

    expect(postsService.find('2')).toEqual(createdPost);
  });

  it('should find a post', () => {
    const createdPost = postsService.create(post);

    const foundPost = postsService.find(createdPost.id);

    expect(foundPost).toEqual(createdPost);
    expect(foundPost?.text).toBe('Mocked post');
    
    expect(postsService.find('1')?.text).toBe('Some pre-existing post');

    expect(postsService.find('999')).toBeUndefined();
  });
});