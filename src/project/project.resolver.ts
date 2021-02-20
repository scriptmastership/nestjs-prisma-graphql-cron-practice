import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { Project } from "./project.model";
import { PrismaService } from "src/prisma/prisma.service";
import * as moment from 'moment';

@Resolver()
export class ProjectResolver {
  constructor(
    private prismaService: PrismaService
  ) { }

  @Query(returns => Project)
  async project() {
    const project = await this.prismaService.project.findFirst({
      orderBy: {
        id: 'asc',
      },
    });
    const total = await this.prismaService.project.count();
    return {
      ...project,
      createdAt: moment(project.createdAt).format('YYYY-MM-DD HH:mm:ss'),
      total
    };
  }

  @Mutation(returns => Project)
  async deleteProject(
    @Args('id') id: number,
  ) {
    await this.prismaService.project.delete({
      where: {
        id
      }
    });
    const project = await this.prismaService.project.findFirst();
    const total = await this.prismaService.project.count();
    return {
      ...project,
      createdAt: moment(project.createdAt).format('YYYY-MM-DD HH:mm:ss'),
      total
    };
  }

}
