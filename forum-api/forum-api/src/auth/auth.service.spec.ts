import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { JwtPayload } from '../core/interfaces/jwt-payload';
import { UsersService } from '../core/services/users.service';
import { UserLoginDTO } from '../models/user/user-login-dto';
import { AuthService } from './auth.service';
import { User } from '../data/entities/user';

describe('AuthService', () => {
  let service: AuthService;

  const usersService = {
    signIn() {},
    validate() {},
  };

  const jwtService = {
    sign() {},
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: usersService,
        },
        {
          provide: JwtService,
          useValue: jwtService,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  describe('signIn', () => {
    it('should call usersService.signIn() once with correct user', async () => {
      // arrange
      const testUserEntity: any = {
        id: 'userId',
        email: 'test@test.com',
        password: 'P@ssw0rd',
        createdOn: new Date(),
        updatedOn: new Date(),
        name: 'user',
        version: 1,
      };

      const fakeToken = 'token';

      const usersServiceSignInSpy = jest
        .spyOn(usersService, 'signIn')
        .mockImplementation(() => Promise.resolve(testUserEntity));

      const jwtServiceSsignSpy = jest
        .spyOn(jwtService, 'sign')
        .mockImplementation(() => Promise.resolve(fakeToken));

      const testUserDTO: UserLoginDTO = {
        email: 'test@test.com',
        password: 'P@ssw0rd',
      };

      // act
      await service.signIn(testUserDTO);

      // assert
      expect(usersServiceSignInSpy).toBeCalledTimes(1);
      expect(usersServiceSignInSpy).toBeCalledWith(testUserDTO);

      jwtServiceSsignSpy.mockRestore();
      usersServiceSignInSpy.mockRestore();
    });
    it('should call jwtService.sign() once with correct parameter when user is found', async () => {
      // arrange

      const testUserEntity: any = {
        id: 'userId',
        email: 'test@test.com',
        password: 'P@ssw0rd',
        createdOn: new Date(),
        updatedOn: new Date(),
        name: 'user',
        version: 1,
      };

      const fakeToken = 'token';

      const usersServiceSignInSpy = jest
        .spyOn(usersService, 'signIn')
        .mockImplementation(() => Promise.resolve(testUserEntity));

      const jwtServiceSsignSpy = jest
        .spyOn(jwtService, 'sign')
        .mockImplementation(() => Promise.resolve(fakeToken));

      const testUserDTO: UserLoginDTO = {
        email: 'test@test.com',
        password: 'P@ssw0rd',
      };

      const expectedPayload = { email: testUserEntity.email };

      // act
      await service.signIn(testUserDTO);

      // assert
      expect(jwtServiceSsignSpy).toBeCalledTimes(1);
      expect(jwtServiceSsignSpy).toBeCalledWith(expectedPayload);

      jwtServiceSsignSpy.mockRestore();
      usersServiceSignInSpy.mockRestore();
    });
    it('should return token when the user is found', async () => {
      // arrange
      const testUserEntity: any = {
        id: 'userId',
        email: 'test@test.com',
        password: 'P@ssw0rd',
        createdOn: new Date(),
        updatedOn: new Date(),
        name: 'user',
        version: 1,
      };

      const fakeToken = 'token';

      const usersServiceSignInSpy = jest
        .spyOn(usersService, 'signIn')
        .mockImplementation(() => Promise.resolve(testUserEntity));

      const jwtServiceSsignSpy = jest
        .spyOn(jwtService, 'sign')
        .mockImplementation(() => Promise.resolve(fakeToken));

      const testUserDTO: UserLoginDTO = {
        email: 'test@test.com',
        password: 'P@ssw0rd',
      };

      // act
      const actualToken = await service.signIn(testUserDTO);

      // assert
      expect(actualToken).toEqual(fakeToken);

      jwtServiceSsignSpy.mockRestore();
      usersServiceSignInSpy.mockRestore();
    });
    it('should not call jwtService.sign() when user is not found', async () => {
      // arrange
      const fakeToken = 'token';

      const usersServiceSignInSpy = jest
        .spyOn(usersService, 'signIn')
        .mockImplementation(() => Promise.resolve(null));

      const jwtServiceSsignSpy = jest
        .spyOn(jwtService, 'sign')
        .mockImplementation(() => Promise.resolve(fakeToken));

      const testUserDTO: UserLoginDTO = {
        email: 'test@test.com',
        password: 'P@ssw0rd',
      };

      // act
      await service.signIn(testUserDTO);

      // assert
      expect(jwtServiceSsignSpy).not.toHaveBeenCalled();

      jwtServiceSsignSpy.mockRestore();
      usersServiceSignInSpy.mockRestore();
    });
    it('should return null when user is not found', async () => {
      // arrange
      const fakeToken = 'token';

      const usersServiceSignInSpy = jest
        .spyOn(usersService, 'signIn')
        .mockImplementation(() => Promise.resolve(null));

      const jwtServiceSsignSpy = jest
        .spyOn(jwtService, 'sign')
        .mockImplementation(() => Promise.resolve(fakeToken));

      const testUserDTO: UserLoginDTO = {
        email: 'test@test.com',
        password: 'P@ssw0rd',
      };

      // act
      const result = await service.signIn(testUserDTO);

      // assert
      expect(result).toEqual(null);

      jwtServiceSsignSpy.mockRestore();
      usersServiceSignInSpy.mockRestore();
    });
  });

  describe('validate', () => {
    it('should call usersService.validate() once with correct payload', async () => {
      // arrange
      const testUserEntity: any = {
        id: 'userId',
        email: 'test@test.com',
        password: 'P@ssw0rd',
        createdOn: new Date(),
        updatedOn: new Date(),
        name: 'user',
        version: 1,
      };

      const usersServiceValidateSpy = jest
        .spyOn(usersService, 'validate')
        .mockImplementation(() => Promise.resolve(testUserEntity));

      const fakePayload: JwtPayload = { email: 'test@test.com' };

      // act
      await service.validateUser(fakePayload);

      // assert
      expect(usersServiceValidateSpy).toBeCalledTimes(1);
      expect(usersServiceValidateSpy).toBeCalledWith(fakePayload);

      usersServiceValidateSpy.mockRestore();
    });
    it('should return the result from usersService.validate()', async () => {
      // arrange
      const testUserEntity: any = {
        id: 'userId',
        email: 'test@test.com',
        password: 'P@ssw0rd',
        createdOn: new Date(),
        updatedOn: new Date(),
        name: 'user',
        version: 1,
      };

      const usersServiceValidateSpy = jest
        .spyOn(usersService, 'validate')
        .mockImplementation(() => Promise.resolve(testUserEntity));

      const fakePayload: JwtPayload = { email: 'test@test.com' };

      // act
      const validatedUser = await service.validateUser(fakePayload);

      // assert
      expect(validatedUser).toEqual(testUserEntity);

      usersServiceValidateSpy.mockRestore();
    });
  });
});
