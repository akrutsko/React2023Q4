export interface Data<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface Film {
  characters: string[] | Person[];
  created: string;
  director: string;
  edited: string;
  episode_id: string;
  opening_crawl: string;
  planets: string[] | Planet[];
  producer: string;
  release_string: string;
  species: string[] | Specie[];
  starships: string[] | Starship[];
  title: string;
  url: string;
  vehicles: string[] | Vehicle[];
}

export interface Person {
  birth_year: string;
  eye_color: string;
  films: string[] | Film[];
  gender: string;
  hair_color: string;
  height: string;
  homeworld: string | Planet;
  mass: string;
  name: string;
  skin_color: string;
  created: string;
  edited: string;
  species: string[] | Specie[];
  starships: string[] | Starship[];
  url: string;
  vehicles: string[] | Vehicle[];
}

export interface Planet {
  climate: string;
  created: string;
  diameter: string;
  edited: string;
  films: string[] | Film[];
  gravity: string;
  name: string;
  orbital_period: string;
  population: string;
  residents: string[] | Person[];
  rotation_period: string;
  surface_water: string;
  terrain: string;
  url: string;
}

export interface Specie {
  average_height: string;
  average_lifespan: string;
  classification: string;
  created: string;
  designation: string;
  edited: string;
  eye_colors: string;
  hair_colors: string;
  homeworld: string | Planet;
  language: string;
  name: string;
  people: string[] | Person[];
  films: string[] | Film[];
  skin_colors: string;
  url: string;
}

export interface Starship {
  MGLT: string;
  cargo_capacity: string;
  consumables: string;
  cost_in_credits: string;
  created: string;
  crew: string;
  edited: string;
  hyperdrive_rating: string;
  length: string;
  manufacturer: string;
  max_atmosphering_speed: string;
  model: string;
  name: string;
  passengers: string;
  films: string[] | Film[];
  pilots: string[] | Person[];
  starship_class: string;
  url: string;
}

export interface Vehicle {
  cargo_capacity: string;
  consumables: string;
  cost_in_credits: string;
  created: string;
  crew: string;
  edited: string;
  length: string;
  manufacturer: string;
  max_atmosphering_speed: string;
  model: string;
  name: string;
  passengers: string;
  pilots: string[] | Person[];
  films: string[] | Film[];
  url: string;
  vehicle_class: string;
}

export const enum ResourcesType {
  Films = 'films',
  People = 'people',
  Planets = 'planets',
  Species = 'species',
  Starships = 'starships',
  Vehicles = 'vehicles',
}
