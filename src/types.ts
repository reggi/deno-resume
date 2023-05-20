export interface Root {
  name: string
  email: string
  phone: string
  links: string[]
  location: string
  jobs: Job[]
  downloadIcon?: string
  downloadable?: string
}

export interface Job {
  title: string
  summary: string
  start: string
  end: string
  tags: string[]
  company: Company
}

export interface Company {
  name: string
  website: string
  logo: string
}
