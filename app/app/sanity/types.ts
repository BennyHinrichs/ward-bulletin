export interface Group {
  _type: 'group';
  _id: string;
  _createdAt: string;
  title: string;
  path: {
    current: string;
  };
  theme?: string;
  message?: string;
  messageSource?: string;
  messageUrl?: string;
  events: {
    eventTitle: string;
    eventDescription: string;
    eventDate: Date;
    eventDateOnly: boolean;
    eventUrl: string;
  }[];
}

export interface Program {
  _type: 'program';
  _id: string;
  _createdAt: string;
  title: string;
  programUrl: string;
  condutor: string;
  prayer1: string;
  prayer2: string;
  song1: number;
  song2: number;
  song3: number;
  includeSacrament: boolean;
  preSacramentItems: {
    _type: 'babyBlessing' | 'confirmation' | 'other';
    name: string;
  }[];
  programItems: (
    | {
        _type: 'speaker';
        speaker: string;
        subtitle: string;
      }
    | {
        _type: 'musicalNumber';
        musicalNumberTitle: string;
        musicalNumberPerformer: string;
      }
    | {
        _type: 'hymn';
        number: number;
      }
    | {
        _type: 'other';
        other: string;
        subtitle: string;
      }
  )[];
}
