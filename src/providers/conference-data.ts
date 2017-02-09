import { Injectable } from '@angular/core';

import { Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';


@Injectable()
export class ConferenceData {
  data: any;

  constructor(public http: Http) { }

  load(): any {
    if (this.data) {
      return Observable.of(this.data);
    } else {
      return this.http.get('assets/data/data.json')
        .map(this.processData);
    }
  }

  processData(data) {
    // just some good 'ol JS fun with objects and arrays
    // build up the data by linking speakers to sessions
    this.data = data.json();

    let isOn: boolean = true;

    // loop through each day in the schedule
    this.data.schedule.forEach(day => {
      // loop through each timeline group in the day
      day.groups.forEach(group => {
        // loop through each session in the timeline group
        group.sessions.forEach(session => {
          session.opt = isOn ? "even" : "odd";
          isOn = !isOn;
          session.speakers = [];
          if (session.speakerNames) {
            session.speakerNames.forEach(speakerName => {
              let speaker = this.data.speakers.find(s => s.name === speakerName);
              if (speaker) {
                session.speakers.push(speaker);
                speaker.sessions = speaker.sessions || [];
                speaker.sessions.push(session);
              }
            });
          }

        });
      });
    });

    this.data.musics.forEach(music => {
      this.data.tones.forEach(tone => {
        if (music.tone == tone.tone) {
          music.sequence = tone.sequence;
        }
      });
    });

    return this.data;
  }

  getTimeline(dayIndex) {
    return this.load().map(data => {
      let day = data.schedule[dayIndex];
      return day;
    });
  }

  getSpeakers() {
    return this.load().map(data => {
      return data.speakers.sort((a, b) => {
        let aName = a.name;
        let bName = b.name;
        return aName.localeCompare(bName);
      });
    });
  }

  getMap() {
    return this.load().map(data => {
      return data.map;
    });
  }

  getMusics() {
    return this.load().map(data => {
      return data.musics.sort((a, b) => {
        let aName = a.name;
        let bName = b.name;
        return aName.localeCompare(bName);
      });
    });
  }

  getTones() {
    return this.load().map(data => {
      return data.tones;
    });
  }

  getSeminars() {
    return this.load().map(data => {
      return data.seminars;
    });
  }

  getProducts() {
    return this.load().map(data => {
      return data.products;
    });
  }

}