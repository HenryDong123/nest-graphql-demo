// src/pet/pet.service.ts

import { Injectable } from '@nestjs/common';
import { Pet } from './pet.entity';

@Injectable()
export class PetService {
  private readonly pets: Pet[] = [
    { id: 1, name: '雄火龙', type: 'monster', ownerId: 1 },
    { id: 2, name: '哥斯拉', type: 'monster', ownerId: 1 },
    { id: 3, name: '甘雨', type: 'shechu', ownerId: 1 },
  ];

  findAllByUserId(userId: number): Pet[] {
    return this.pets.filter((pet) => pet.ownerId === userId);
  }
}
