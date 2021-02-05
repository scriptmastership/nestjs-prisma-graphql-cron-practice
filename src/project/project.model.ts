import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class Project {
  @Field() id: number;
  @Field() projectId: string;
  @Field() description: string;
  @Field() status: string;
  @Field() createdAt: string;
  @Field() total: string;
}