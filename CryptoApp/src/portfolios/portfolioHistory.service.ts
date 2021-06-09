import { Injectable } from '@nestjs/common';
import { PrismaService } from './../prisma.service';
import {
    PortfolioHistory,
    Prisma
  } from '@prisma/client';


@Injectable()
export class PortfolioHistoryService {
  constructor(private prisma: PrismaService) {}
 


  async createPortfolioHistory(data: Prisma.PortfolioHistoryCreateInput): Promise<PortfolioHistory> {
    return this.prisma.portfolioHistory.create({
        data,
    });
  } 
  

  

 

  

  
}