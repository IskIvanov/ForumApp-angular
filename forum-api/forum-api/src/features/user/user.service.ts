import { Injectable, BadRequestException, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../data/entities/user';
import { Repository } from 'typeorm';
import { ShowUserDTO } from '../../models/user/show-user.dto';
import { plainToClass } from 'class-transformer';
import { Ban } from '../../data/entities/ban';
import { BanDTO } from '../../models/ban/ban.dto';
import { UserRole } from '../../common/enums/user-role.enum';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Ban) private readonly banRepository: Repository<Ban>,
  ) {}

  async banUser(userID: string, description: BanDTO, loggedInUser: User): Promise<string> {
    if (!loggedInUser.roles.includes(UserRole.ADMIN)) {
      throw new UnauthorizedException(`Sorry, you don't have access to this type of system functionality.`);
    }

    const foundTargetedUserForBan = await this.userRepository.findOne({
      where: {
        id: userID,
      },
      //relations: ['banStatus']
    });

    if (!foundTargetedUserForBan) {
      throw new BadRequestException('User does not exist!');
    }

    if (foundTargetedUserForBan.banStatus === null) {
      const banStatusForUser =  new Ban();
      banStatusForUser.user = Promise.resolve(foundTargetedUserForBan);
      banStatusForUser.description = description.description;
      banStatusForUser.isBanned = true;
      await this.banRepository.save(banStatusForUser); 
      return `User ${foundTargetedUserForBan.name} was banned!`;
    } else {
      throw new BadRequestException('User already banned!');
    }
  }

  async deleteUser(userID: string, loggedInUser: User): Promise<string> {
    if (!loggedInUser.roles.includes(UserRole.ADMIN)) {
      throw new UnauthorizedException(`Sorry, you don't have access to this type of system functionality.`);
    }

    const foundTargetedUserToDelete = await this.userRepository.findOne({id: userID});
    if (foundTargetedUserToDelete.isDeleted) {
      throw new BadRequestException('User already deleted!');
    } else {
     foundTargetedUserToDelete.isDeleted = true;
     await this.userRepository.save(foundTargetedUserToDelete);
     return `User ${foundTargetedUserToDelete.name} was deleted!`;
    }
  }

  async subscribe(userTargetedForSubscription: string, loggedInUser: User): Promise<{}> {
    const foundUserTargetedForSubscription = await this.userRepository.findOne(userTargetedForSubscription);

    if (!foundUserTargetedForSubscription) {
      throw new NotFoundException('There is no such user in our system!');
    }

    const targetedUserFollowers: User[] = await foundUserTargetedForSubscription.followers;
    const listOfIDs = targetedUserFollowers.map((follower) => follower.id);
    let message = {};

    if (listOfIDs.includes(loggedInUser.id)) {
      const index = targetedUserFollowers.indexOf(loggedInUser);
      targetedUserFollowers.splice(index, 1);
      message = { message: `Successfully unsubscribed!` };
    } else {
      targetedUserFollowers.push(loggedInUser);
      message = { message: `Successfully subscribed!` };
    }

    foundUserTargetedForSubscription.followers = Promise.resolve(targetedUserFollowers);
    this.userRepository.save(foundUserTargetedForSubscription);

    return message;
  }

  async getSubscribersForGivenUser(userTargetedForSubscriptionList: string): Promise<ShowUserDTO[] | string> {
    const foundUserTargetedForSubscriptionList = await this.userRepository.findOne(userTargetedForSubscriptionList);
    if (!foundUserTargetedForSubscriptionList) {
      throw new NotFoundException('There is no such user in our system!');
    }
    const subscriptionList = await foundUserTargetedForSubscriptionList.followers;

    if (subscriptionList.length === 0) {
      throw new BadRequestException('This user has no subscribers!');
    }
    return subscriptionList.map( item => plainToClass(ShowUserDTO, item, { excludeExtraneousValues: true }));
  }

  async getSubscribersForLoggedInUser(loggedInUser: User): Promise<ShowUserDTO[] | string> {
    const foundUserTargetedForSubscriptionList = await this.userRepository.findOne(loggedInUser);
    if (!foundUserTargetedForSubscriptionList) {
      throw new NotFoundException('There is no such user in our system!');
    }
    const subscriptionList = await foundUserTargetedForSubscriptionList.followers;

    if (subscriptionList.length === 0) {
      throw new BadRequestException('This user has no subscribers!');
    }
    return subscriptionList.map( item => plainToClass(ShowUserDTO, item, { excludeExtraneousValues: true }));
  }
}
