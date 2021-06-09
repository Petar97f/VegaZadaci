import { Injectable } from '@nestjs/common';
import { PrismaService } from './../prisma.service';
import {
    Portfolio,
    PortfolioHistory,
    Prisma,Investment
  } from '@prisma/client';


@Injectable()
export class PortfoliosService {
  constructor(private prisma: PrismaService) {}
 
  
  async portfolioValueSum(idd) {
    console.log("eeeeeeeeeeeeeee");
    const investments  = await this.prisma.investment.findMany({
      where: {portfolioId : idd},
    });
    let valueSum = 0;
    investments.forEach(element => {
      valueSum = valueSum + element.value;
    });
    console.log(valueSum);
    return valueSum;
    
  }

  async createPortfolio(data: Prisma.PortfolioCreateInput): Promise<Portfolio> {
    return this.prisma.portfolio.create({
        data,
    });
  } 

  async updatePortfolio(params: {
    where: Prisma.PortfolioWhereUniqueInput;
    data: Prisma.PortfolioUpdateInput;
  }): Promise<Portfolio> {
    const { data, where } = params;
    return this.prisma.portfolio.update({
      data,
      where,
    });
  }
  

  

 

  

  
}