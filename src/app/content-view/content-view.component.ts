import { Component, OnInit } from '@angular/core';
import axios from 'axios';

interface Characters {
  birth_year: string;
  created: string;
  edited: string;
  eye_color: string;
  films: string[];
  gender: string;
  hair_color: string;
  height: number;
  homeworld: string;
  mass: number;
  name: string;
  skin_color: string;
  species: string[];
  starships: string[];
  url: string;
  vehicles: string[];
}

interface Movies {
  title: string;
  episode_id: string;
  opening_crawl: string;
  director: string;
  producer: string;
  release_date: string;
  characters: string[];
  planets: string[];
  starships: string[];
  vehicles: string[];
  species: string[];
  created: string;
  edited: string;
  url: string;
}

@Component({
  selector: 'app-content-view',
  templateUrl: './content-view.component.html',
  styleUrls: ['./content-view.component.scss'],
})
export class ContentViewComponent implements OnInit {
  isLoading: boolean = false;
  movies: Movies[] = [];
  movieDetails?: Movies;
  characters: Characters[] = [];
  characterDetails?: Characters;

  ngOnInit(): void {
    this.fetchData();
  }

  async fetchData() {
    this.isLoading = true;
    await axios
      .get('https://swapi.dev/api/films')
      .then((response) => (this.movies = response.data.results))
      .finally(() => (this.isLoading = false));
  }

  async showMovieDetails(movie: Movies, characters: string[]) {
    this.movieDetails = movie;
    this.characters = [];
    this.characterDetails = undefined;
    await characters.map((url) => {
      axios.get(url).then((response) => {
        this.characters.push(response.data);
      });
    });
  }

  showCharacterDetails(character: Characters) {
    this.characterDetails = character;
  }

  async showCharacters(characters: string[]) {
    await characters.map((url) => {
      axios.get(url).then((response) => {
        this.characters?.push(response.data);
      });
    });
  }

  previousClick(item: string): void {
    if (item === 'movie') this.movieDetails = undefined;
    if (item === 'character') this.characterDetails = undefined;
  }
}
