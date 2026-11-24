export interface Contributor {
  name: string;
  url?: string;
}

export interface University {
  id: string;
  name: string;
  initials: string;
  color: string;
  isAvailable: boolean;
  routeCount?: number;
  contributors?: Contributor[];
}
