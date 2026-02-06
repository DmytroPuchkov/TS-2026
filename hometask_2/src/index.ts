enum GroupStatus {
  Draft = "draft",
  Active = "active",
  Finished = "finished",
}

type LecturerContacts = {
  email: string;
  phone: string;
};

type Lecturer = {
  name: string;
  surname: string;
  position: string;
  company: string;
  experience: number;
  courses: string[];
  contacts: LecturerContacts;
};

class School {
  private _areas: Area[] = [];
  private _lecturers: Lecturer[] = [];

  addArea(area: Area): void {
    this._areas.push(area);
  }

  removeArea(areaName: string): void {
    this._areas = this._areas.filter((a) => a.name !== areaName);
  }

  addLecturer(lecturer: Lecturer): void {
    this._lecturers.push(lecturer);
  }

  removeLecturer(email: string): void {
    this._lecturers = this._lecturers.filter((l) => l.contacts.email !== email);
  }

  get areas(): Area[] {
    return this._areas;
  }

  get lecturers(): Lecturer[] {
    return this._lecturers;
  }
}

class Area {
  private _levels: Level[] = [];
  private _name: string;

  constructor(name: string) {
    this._name = name;
  }

  get name(): string {
    return this._name;
  }

  get levels(): Level[] {
    return this._levels;
  }

  addLevel(level: Level): void {
    this._levels.push(level);
  }

  removeLevel(levelName: string): void {
    this._levels = this._levels.filter((l) => l.name !== levelName);
  }
}

class Level {
  private _groups: Group[] = [];
  private _name: string;
  private _description: string;

  constructor(name: string, description: string) {
    this._name = name;
    this._description = description;
  }

  get name(): string {
    return this._name;
  }

  get description(): string {
    return this._description;
  }

  get groups(): Group[] {
    return this._groups;
  }

  addGroup(group: Group): void {
    this._groups.push(group);
  }

  removeGroup(index: number): void {
    if (index < 0 || index >= this._groups.length) return;
    this._groups.splice(index, 1);
  }
}

class Group {
  private _area: string;
  private _status: GroupStatus = GroupStatus.Draft;
  private _students: Student[] = [];

  directionName: string;
  levelName: string;

  constructor(directionName: string, levelName: string, area: string) {
    this.directionName = directionName;
    this.levelName = levelName;
    this._area = area;
  }

  get area(): string {
    return this._area;
  }

  get status(): GroupStatus {
    return this._status;
  }

  get students(): Student[] {
    return this._students;
  }

  addStudent(student: Student): void {
    this._students.push(student);
  }

  removeStudent(index: number): void {
    if (index < 0 || index >= this._students.length) return;
    this._students.splice(index, 1);
  }

  setStatus(status: GroupStatus): void {
    this._status = status;
  }

  showPerformance(): Student[] {
    return this._students.toSorted(
      (a, b) => b.getPerformanceRating() - a.getPerformanceRating()
    );
  }
}

class Student {
  private _firstName: string;
  private _lastName: string;
  private _birthYear: number;

  private _grades: { [workName: string]: number } = {};
  private _visits: boolean[] = [];

  constructor(firstName: string, lastName: string, birthYear: number) {
    this._firstName = firstName;
    this._lastName = lastName;
    this._birthYear = birthYear;
  }

  get fullName(): string {
    return `${this._lastName} ${this._firstName}`;
  }

  set fullName(value: string) {
    [this._lastName, this._firstName] = value.split(" ");
  }

  get age(): number {
    return new Date().getFullYear() - this._birthYear;
  }

  setGrade(workName: string, mark: number): void {
    this._grades[workName] = mark;
  }

  setVisit(present: boolean): void {
    this._visits.push(present);
  }

  getPerformanceRating(): number {
    const gradeValues = Object.values(this._grades);

    if (!gradeValues.length) return 0;

    const averageGrade =
      gradeValues.reduce((sum, grade) => sum + grade, 0) / gradeValues.length;

    const attendancePercentage =
      this._visits.length === 0
        ? 0
        : (this._visits.filter((present) => present).length / this._visits.length) * 100;

    return (averageGrade + attendancePercentage) / 2;
  }
}
