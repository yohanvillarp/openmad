export interface Career {
  id: string;
  name: string;
  initials: string;
  isAvailable: boolean;
}

export interface Faculty {
  id: string;
  name: string;
  careers: Career[];
}
