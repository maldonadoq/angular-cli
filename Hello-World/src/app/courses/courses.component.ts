import { Component } from '@angular/core';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent{
  name = 'Database';
  year = '09/12/19';
  semester = 9;
  imageUrl = 'http://lorempixel.com/400/200';
  buttonDisabled = false;
  isActive = true;

  getName(){
    return this.name
  }

  getYear(){
    return this.year
  }

  getSemester(){
    return this.semester
  }
}
