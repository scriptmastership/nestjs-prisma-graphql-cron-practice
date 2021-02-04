import { Processor, Process } from '@nestjs/bull';
import { PrismaService } from 'src/prisma/prisma.service';
import axios from 'axios';
import * as moment from 'moment';

@Processor('project')
export class ProjectQueue {

  constructor(
    private readonly prismaService: PrismaService,
  ) { }

  @Process('run')
  async run() {
    return;
    const res = await axios.get('https://www.freelancer.com/api/projects/0.1/projects/active/?user_details=true&user_avatar=true&user_display_info=true&full_description=true&user_employer_reputation=true');
    const { projects, users } = res.data.result;
    const countries = ['India', 'Pakistan'];
    for (let i = 0; i < projects.length; i++) {
      try {
        const {
          owner_id,
          id,
          title,
          description,
          seo_url,
          type,
          currency,
          budget
        } = projects[i];
        const {
          avatar_large_cdn,
          username,
          public_name,
          chosen_role,
          registration_date,
          employer_reputation,
          location
        } = users[owner_id];
        const status = {
          userImage: avatar_large_cdn,
          userLink: `https://www.freelancer.com/u/${username}`,
          userCountry: location.country.name,
          userName: public_name,
          userRole: chosen_role,
          userDate: moment.unix(registration_date).format('YYYY-MM-DD HH:mm:ss'),
          userRating: employer_reputation.entire_history.overall || 0,
          userTotal: employer_reputation.entire_history.all || 0,
          userCompleted: employer_reputation.entire_history.complete || 0,
          userIncompleted: employer_reputation.entire_history.incomplete || 0,
          projectTitle: title,
          projectLink: `https://www.freelancer.com/projects/${seo_url}`,
          projectType: type,
          projectCurrency: currency.code,
          projectBudget: `${budget.minimum}-${budget.maximum}`
        };

        let skip = false;
        for (let k = 0; k < 2; k++) {
          if (status.userCountry.includes(countries[k])) {
            skip = true;
            break;
          }
        }
        if (moment().diff(moment.unix(registration_date), 'days') > 1 && status.userRating === 0) {
          skip = true;
        }
        if (!skip) {
          await this.prismaService.project.create({
            data: {
              description,
              status: JSON.stringify(status),
              projectId: id.toString(),
            }
          });
        }
      } catch (error) {
        console.log(projects[i].id + '--skipped');
      }
    }
  }

}