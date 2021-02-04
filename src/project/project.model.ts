import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class Project {
  @Field() projectId: string;
  @Field() description: string;
  @Field() status: string;
  @Field() createdAt: string;
}