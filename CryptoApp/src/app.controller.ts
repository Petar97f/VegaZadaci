import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { AppService } from './app.service';
import { InvestmentsService } from './investments/investments.service';
import { PortfoliosService } from './portfolios/portfolios.service';
import { UsersService } from './users/users.service';
import { Investment as InvestmentModel, Portfolio as PortfolioModel, User as UserModel } from '@prisma/client';
const bcrypt = require('bcrypt');
@Controller()
export class AppController {
  constructor(
    private readonly investmentsService: InvestmentsService,
    private readonly portfoliosService: PortfoliosService,
    private readonly usersService: UsersService,
  ) {}
  
  @Post('user')
  async createUser(
    @Body() userData: { name: string; password: string; surname: string, email: string; phoneNumber: string },
  ): Promise<UserModel> {
    console.log(userData.password);
    userData.password = await bcrypt.hash(userData.password, 12);
    return this.usersService.createUser(userData);
  }

  @Get('investment/:id')
  async getInvestmentById(@Param('id') id: string): Promise<InvestmentModel> {
    return this.investmentsService.investment({ id: Number(id) });
  }
  @Get('allInvestments')
  async getInvestments(){
    return this.investmentsService.investments();
  }
  @Post('portfolio')
  async createPortfolio(
    @Body() portfolioData: { value?: number, userId: number },
  ): Promise<PortfolioModel> {
    return this.portfoliosService.createPortfolio(portfolioData);
  }

  @Put('portfolio/:id')
  async updatePortfolio(@Body() portfolioData: { },
   @Param('id') id: number): Promise<PortfolioModel> {
     console.log(id*1);
    const val = await this.portfoliosService.portfolioValueSum(id*1);
    console.log(val);
    return this.portfoliosService.updatePortfolio({
      where: { id: Number(id) },
      data: { value : Number(val) },
    });
  }





  @Post('investment')
  async createInvestment(
    @Body() investmentData: { name: string; shortNameHandle : string; pricePerUnit: number; amount: number; value: number; portfolioId: number; },
  ): Promise<InvestmentModel> {
    investmentData.value = investmentData.pricePerUnit * investmentData.amount;
    return this.investmentsService.createInvestment(investmentData);
  }

  @Put('investment/:id')
  async publishInvestment(@Body() investmentData: { name: string; shortNameHandle : string; pricePerUnit: number; amount: number; value: number; portfolioId: number; },
   @Param('id') id: string): Promise<InvestmentModel> {
    investmentData.value = investmentData.pricePerUnit * investmentData.amount;
    return this.investmentsService.updateInvestment({
      where: { id: Number(id) },
      data: { name: investmentData.name,
              shortNameHandle: investmentData.shortNameHandle,
              pricePerUnit : investmentData.pricePerUnit,
              amount : investmentData.amount,
              value : investmentData.value },
    });
  }

  @Delete('investment/:id')
  async deleteInvestment(
   @Param('id') id: string): Promise<InvestmentModel> {

    return this.investmentsService.updateInvestment({
      where: { id: Number(id) },
      data: { deleted : true },
    });
  }

}
