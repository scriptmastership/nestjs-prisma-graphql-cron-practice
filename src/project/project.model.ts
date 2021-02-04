import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class Project {
  @Field() project_id: string;
  @Field() description: string;
  @Field() status: string;
}