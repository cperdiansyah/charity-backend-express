import { ICharity } from '../module/charity/model/charityInterface.js'
const charities: ICharity[] = [
  {
    title: 'Charity 1',
    slug: 'charity-1',
    description: 'This is the first charity description.',
    status: 'accept',
    is_draft: false,
    donation_target: 5000,
    start_date: new Date('2023-06-01'),
    end_date: new Date('2023-07-31'),
    post_date: new Date('2023-05-20'),
    author: null,
  },
  {
    title: 'Charity 2',
    slug: 'charity-2',
    description: 'This is the second charity description.',
    status: 'inactive',
    is_draft: true,
    donation_target: 10000,
    start_date: new Date('2023-08-01'),
    end_date: new Date('2023-09-30'),
    post_date: new Date('2023-05-22'),
    author: null,
  },
  {
    title: 'Charity 3',
    slug: 'charity-3',
    description: 'This is the third charity description.',
    status: 'accept',
    is_draft: false,
    donation_target: 7500,
    start_date: new Date('2023-07-15'),
    end_date: new Date('2023-08-31'),
    post_date: new Date('2023-05-25'),
    author: null,
  },
  {
    title: 'Charity 4',
    slug: 'charity-4',
    description: 'This is the fourth charity description.',
    status: 'accept',
    is_draft: false,
    donation_target: 2000,
    start_date: new Date('2023-09-01'),
    end_date: null,
    post_date: new Date('2023-06-01'),
    author: null,
  },
  {
    title: 'Charity 5',
    slug: 'charity-5',
    description: 'This is the fifth charity description.',
    status: 'accept',
    is_draft: false,
    donation_target: 3000,
    start_date: new Date('2023-08-15'),
    end_date: new Date('2023-10-15'),
    post_date: new Date('2023-06-05'),
    author: null,
  },
]

export default charities