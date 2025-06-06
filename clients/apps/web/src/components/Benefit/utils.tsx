import { schemas } from '@polar-sh/client'
import { Check, Download, Gauge, Key } from 'lucide-react'
import { twMerge } from 'tailwind-merge'
import GitHubIcon from '../Icons/GitHubIcon'

export type CreatableBenefit = schemas['BenefitType']

export const resolveBenefitCategoryIcon = (
  type?: schemas['BenefitType'],
  className?: string,
) => {
  const cn = twMerge('h-4 w-4', className)
  switch (type) {
    case 'discord':
      return <DiscordIcon className={cn} />
    case 'github_repository':
      return <GitHubIcon className={cn} />
    case 'downloadables':
      return <Download className={cn} />
    case 'license_keys':
      return <Key className={cn} />
    case 'meter_credit':
      return <Gauge className={cn} />
    default:
      return <Check className={cn} />
  }
}

export const resolveBenefitIcon = (
  type: schemas['BenefitType'],
  className?: string,
) => {
  return resolveBenefitCategoryIcon(type, className)
}

export const resolveBenefitTypeDisplayName = (
  type: schemas['BenefitType'] | 'usage',
) => {
  switch (type) {
    case 'usage':
      return 'Usage'
    case 'discord':
      return 'Discord Server Invite'
    case 'github_repository':
      return 'GitHub Repository Access'
    case 'downloadables':
      return 'Downloadable Files'
    case 'license_keys':
      return 'License Keys'
    default:
      return 'Custom'
  }
}

export const DiscordIcon = ({
  className,
  size = 16,
}: {
  className?: string
  size?: number
}) => (
  <svg
    className={className}
    viewBox="0 -28.5 256 256"
    version="1.1"
    preserveAspectRatio="xMidYMid"
    fill="currentColor"
    width={size}
    height={size}
  >
    <g>
      <path
        d="M216.856339,16.5966031 C200.285002,8.84328665 182.566144,3.2084988 164.041564,0 C161.766523,4.11318106 159.108624,9.64549908 157.276099,14.0464379 C137.583995,11.0849896 118.072967,11.0849896 98.7430163,14.0464379 C96.9108417,9.64549908 94.1925838,4.11318106 91.8971895,0 C73.3526068,3.2084988 55.6133949,8.86399117 39.0420583,16.6376612 C5.61752293,67.146514 -3.4433191,116.400813 1.08711069,164.955721 C23.2560196,181.510915 44.7403634,191.567697 65.8621325,198.148576 C71.0772151,190.971126 75.7283628,183.341335 79.7352139,175.300261 C72.104019,172.400575 64.7949724,168.822202 57.8887866,164.667963 C59.7209612,163.310589 61.5131304,161.891452 63.2445898,160.431257 C105.36741,180.133187 151.134928,180.133187 192.754523,160.431257 C194.506336,161.891452 196.298154,163.310589 198.110326,164.667963 C191.183787,168.842556 183.854737,172.420929 176.223542,175.320965 C180.230393,183.341335 184.861538,190.991831 190.096624,198.16893 C211.238746,191.588051 232.743023,181.531619 254.911949,164.955721 C260.227747,108.668201 245.831087,59.8662432 216.856339,16.5966031 Z M85.4738752,135.09489 C72.8290281,135.09489 62.4592217,123.290155 62.4592217,108.914901 C62.4592217,94.5396472 72.607595,82.7145587 85.4738752,82.7145587 C98.3405064,82.7145587 108.709962,94.5189427 108.488529,108.914901 C108.508531,123.290155 98.3405064,135.09489 85.4738752,135.09489 Z M170.525237,135.09489 C157.88039,135.09489 147.510584,123.290155 147.510584,108.914901 C147.510584,94.5396472 157.658606,82.7145587 170.525237,82.7145587 C183.391518,82.7145587 193.761324,94.5189427 193.539891,108.914901 C193.539891,123.290155 183.391518,135.09489 170.525237,135.09489 Z"
        fillRule="nonzero"
      ></path>
    </g>
  </svg>
)

export const benefitsDisplayNames: {
  [key in schemas['BenefitType']]: string
} & { usage: string } = {
  usage: 'Usage',
  license_keys: 'License Keys',
  github_repository: 'GitHub Repository Access',
  discord: 'Discord Invite',
  downloadables: 'File Downloads',
  custom: 'Custom',
  meter_credit: 'Meter Credits',
}
