import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { Project } from "./project.model";
import { PrismaService } from "src/prisma/prisma.service";

@Resolver()
export class ProjectResolver {
  constructor(
    private prismaService: PrismaService
  ) { }

  @Query(returns => Project)
  async project() {
    const project = await this.prismaService.project.findFirst();
    return project;
  }

  @Mutation(returns => Project)
  async deleteProject(
    @Args('id') id: number,
  ) {
    await this.prismaService.project.delete({
      where: {
        id
      }
    })
    return await this.prismaService.project.findFirst();
  }

}
